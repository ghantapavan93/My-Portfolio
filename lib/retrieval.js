// ─────────────────────────────────────────────────────────────────────────────
// retrieval.js — extractive RAG over the curated answer bank. No LLM, no keys.
//
//   question ──normalize──> exact canonical match?  ──yes──> that answer
//                               │ no
//                               ▼
//                        BM25F over (questions ×3, tags ×2, answer ×1)
//                               │
//              score ≥ threshold ──> best answer verbatim + related follow-ups
//              score < threshold ──> honest "no verified answer" + closest topics
//
// Pure functions with no Node or browser APIs, so the same module runs in the
// Vercel function and, as a last resort, in the browser.
// ─────────────────────────────────────────────────────────────────────────────

import { ANSWER_BANK } from './answer-bank.js';

// Tuned against scripts/eval-retrieval.mjs — rerun the eval after changing either.
// An answer is used only if it matches enough of the question (coverage: the
// idf-weighted share of the question's words found in the entry's questions and
// tags) AND scores well
// enough overall. Coverage is what stops one stray word ("Dallas" in a weather
// question) from pulling in an unrelated answer.
export const MIN_SCORE = 2;
export const MIN_COVERAGE = 0.5;

const K1 = 1.2;
const B = 0.75;
const FIELD_WEIGHTS = { q: 3, tags: 2, a: 1 };

const STOPWORDS = new Set(
  (
    'a an the and or but if so of to in on at by for from with about into over as is are was were be been being ' +
    'am do does did done doing have has had having can could would should will shall may might must ' +
    'i me my mine we us our you your yours he him his she her it its they them their this that these those ' +
    'what which who whom whose how tell please any some there here just also very really more most much many ' +
    'give show let know get got like want wanted wanna need needs ever one kind sort bit lot lots stuff thing things ' +
    'happened happen anything something someone okay ok sure yes actually basically quick quickly willing ' +
    'explain describe walk through share'
  ).split(' ')
);

// Words people type that the bank spells differently.
const SYNONYMS = {
  k8s: ['kubernetes'], js: ['javascript'], ts: ['typescript'], ml: ['machine', 'learning'],
  llm: ['llms'], gen: ['generative'], cv: ['resume', 'vision'], pm: ['product', 'managers'],
  salary: ['compensation'], pay: ['salary'], wfh: ['remote'], relocating: ['relocation'],
  masters: ['masters', 'degree'], ms: ['masters'], bachelors: ['bachelor', 'degree'],
  sponsor: ['sponsorship', 'visa'], greencard: ['green', 'card'],
};

function stem(w) {
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ies')) return `${w.slice(0, -3)}y`;
  if (w.length > 4 && /(ches|shes|sses|xes)$/.test(w)) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  if (w.length > 5 && w.endsWith('ed')) return w.slice(0, -2);
  return w;
}

/** Lowercase → words (hyphenated words also yield their joined form) → stopwords out → stem. */
export function tokenize(text, { expand = false } = {}) {
  const out = [];
  const words = (text || '').toLowerCase().replace(/[’']/g, '').match(/[a-z0-9+#]+(?:-[a-z0-9+#]+)*/g) || [];
  for (const word of words) {
    const parts = word.includes('-') ? [word.replace(/-/g, ''), ...word.split('-')] : [word];
    for (const p of parts) {
      if (p.length < 2 || STOPWORDS.has(p)) continue;
      out.push(stem(p));
      if (expand) for (const syn of SYNONYMS[p] || []) out.push(stem(syn));
    }
  }
  return out;
}

const normalize = (s) => tokenize(s).join(' ');

// Openers whose content words are all stopwords ("tell me about you").
const INTENTS = [
  [/\b(about|describe|introduce) (you|yourself)\b|^who are you\b|\byour (background|story)\b/i, 'intro'],
];

function termFreq(tokens) {
  const tf = new Map();
  for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
  return tf;
}

// ── Index (built once per process / page) ────────────────────────────────────
const DOCS = ANSWER_BANK.map((entry) => {
  const fields = {
    q: termFreq(tokenize(entry.q.join(' '))),
    tags: termFreq(tokenize((entry.tags || []).join(' '))),
    a: termFreq(tokenize(entry.a)),
  };
  const tf = new Map();
  for (const [field, weight] of Object.entries(FIELD_WEIGHTS)) {
    for (const [term, n] of fields[field]) tf.set(term, (tf.get(term) || 0) + n * weight);
  }
  const length = [...tf.values()].reduce((sum, n) => sum + n, 0);
  // What the entry is *about* (its questions + tags). Coverage is judged on these
  // only, so an incidental word in the answer text ("today") can't make an
  // unrelated question look covered.
  const topic = new Set([...fields.q.keys(), ...fields.tags.keys()]);
  return { entry, tf, length, topic, canonical: new Set(entry.q.map(normalize)) };
});

const AVG_LENGTH = DOCS.reduce((sum, d) => sum + d.length, 0) / DOCS.length;
const DOC_FREQ = new Map();
for (const d of DOCS) for (const term of d.tf.keys()) DOC_FREQ.set(term, (DOC_FREQ.get(term) || 0) + 1);

// A word no answer contains gets a moderate weight: enough that an off-topic
// question ("weather", "poem") fails coverage, not so much that one unusual
// filler word sinks an otherwise clear question.
const UNSEEN_IDF = 1.5;

function idf(term) {
  const df = DOC_FREQ.get(term) || 0;
  if (!df) return UNSEEN_IDF;
  return Math.log(1 + (DOCS.length - df + 0.5) / (df + 0.5));
}

/**
 * All entries ranked by BM25F score for the query (highest first), each with
 * its coverage of the question (0–1). Exact canonical questions short-circuit.
 */
export function rank(question) {
  const exact = normalize(question);
  const intent = INTENTS.find(([pattern]) => pattern.test(question))?.[1];
  // Each word the visitor typed, with the synonyms that also count as a match for it.
  const groups = [...new Set(tokenize(question))].map((w) => [w, ...tokenize(w, { expand: true }).slice(1)]);
  const terms = [...new Set(groups.flat())];
  const totalIdf = groups.reduce((sum, [w]) => sum + idf(w), 0);

  return DOCS.map((d) => {
    if ((exact && d.canonical.has(exact)) || d.entry.id === intent) return { entry: d.entry, score: Infinity, coverage: 1 };
    let score = 0;
    for (const term of terms) {
      const tf = d.tf.get(term);
      if (!tf) continue;
      score += (idf(term) * tf * (K1 + 1)) / (tf + K1 * (1 - B + (B * d.length) / AVG_LENGTH));
    }
    const covered = groups.reduce((sum, g) => sum + (g.some((t) => d.topic.has(t)) ? idf(g[0]) : 0), 0);
    return { entry: d.entry, score, coverage: totalIdf ? covered / totalIdf : 0 };
  }).sort((x, y) => y.score - x.score);
}

const confident = (r) => r && (r.score === Infinity || (r.score >= MIN_SCORE && r.coverage >= MIN_COVERAGE));

// ── Answering ────────────────────────────────────────────────────────────────
const FOLLOW_UP = /^(tell me more|more|go on|continue|elaborate|go deeper|dig deeper|more details?|details|explain( more)?|and\??|why\??|how so\??)[\s.!?]*$/i;
const DEFAULT_TOPICS = ['intro', 'strongest-project', 'why-hire'];
// Small talk and polite declines are never offered as "ask me next" suggestions.
const NOT_SUGGESTIBLE = new Set(['greeting', 'thanks', 'tasks', 'personal']);
const byId = new Map(ANSWER_BANK.map((e) => [e.id, e]));

const canonicalOf = (entry) => entry.q[0];

// Entries closest in topic to a given entry (ranked by its own tags + questions).
function neighbours(entry) {
  return rank([...(entry.tags || []), ...entry.q.slice(1)].join(' '));
}

// Hand-picked next questions win over computed neighbours when an entry has them.
function suggestionsFor(entry) {
  if (entry.next) return entry.next.map((id) => canonicalOf(byId.get(id)));
  return relatedTo(neighbours(entry), entry.id);
}

function relatedTo(ranked, exclude) {
  const picks = ranked
    .filter((r) => r.score > 0 && r.entry.id !== exclude && !NOT_SUGGESTIBLE.has(r.entry.id))
    .slice(0, 3)
    .map((r) => r.entry);
  for (const id of DEFAULT_TOPICS) {
    if (picks.length >= 3) break;
    if (id !== exclude && !picks.some((p) => p.id === id)) picks.push(byId.get(id));
  }
  return picks.map(canonicalOf);
}

/** The bank entry whose answer (or deeper answer) is this text, if any. */
function entryForAnswer(text) {
  if (!text) return undefined;
  return ANSWER_BANK.find((e) => e.a === text || e.more === text);
}

/**
 * Answer a question from the bank.
 * @param {string} question
 * @param {{role: 'user'|'assistant', content: string}[]} history  earlier turns (optional)
 * @returns {{answer: string, entryId: string|null, score: number, grounded: boolean, related: string[]}}
 */
export function answerQuestion(question, history = []) {
  // "Tell me more" → go deeper on whatever was just answered.
  if (FOLLOW_UP.test(question.trim())) {
    const lastAnswer = [...history].reverse().find((m) => m.role === 'assistant')?.content;
    const lastQuestion = [...history].reverse().find((m) => m.role === 'user')?.content;
    const prev = entryForAnswer(lastAnswer) || (lastQuestion && rank(lastQuestion)[0]?.entry);
    if (prev?.more && lastAnswer !== prev.more) {
      return { answer: prev.more, entryId: prev.id, score: Infinity, grounded: true, related: suggestionsFor(prev) };
    }
    if (prev) {
      const related = suggestionsFor(prev);
      return {
        answer: `That's the core of it — happy to go deeper in a different direction. Try: **${related[0]}**, **${related[1]}**, or **${related[2]}**`,
        entryId: prev.id, score: 0, grounded: true, related,
      };
    }
    const related = DEFAULT_TOPICS.map((id) => canonicalOf(byId.get(id)));
    return {
      answer: `Happy to — more about what? Good places to start: **${related[0]}**, **${related[1]}**, or **${related[2]}**`,
      entryId: null, score: 0, grounded: false, related,
    };
  }

  const ranked = rank(question);
  // Highest-scoring answer that also covers the question — the raw top hit can
  // be a partial match ("current job") when the real topic is "leaving".
  const best = ranked.slice(0, 5).find(confident);
  if (best) {
    return { answer: best.entry.a, entryId: best.entry.id, score: best.score, grounded: true, related: suggestionsFor(best.entry) };
  }

  const related = relatedTo(ranked, null);
  return {
    answer:
      "I don't have a verified answer for that one, and I'd rather not guess — that's the whole point of me. " +
      `Closest things I can tell you about: **${related[0]}**, **${related[1]}**, or **${related[2]}** ` +
      'Or ask Pavan directly through the contact section — he replies within a day.',
    entryId: null,
    score: ranked[0]?.score || 0,
    grounded: false,
    related,
  };
}
