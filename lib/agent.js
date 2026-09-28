// ─────────────────────────────────────────────────────────────────────────────
// agent.js — GPK's LangGraph agent: retrieve → generate (open models) → extract.
// Loaded by api/chat.js only when a model provider is configured, so the
// zero-key path never pays for (or can be broken by) the LLM libraries.
// ─────────────────────────────────────────────────────────────────────────────

import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { SYSTEM_RULES, KNOWLEDGE_BASE } from "./persona.js";
import { answerQuestion } from "./retrieval.js";
import { providerChain } from "./providers.js";

// Reasoning models (Qwen3, DeepSeek-R1 distills) may emit <think>…</think> blocks.
// The visitor should only ever see the answer.
function stripReasoning(text) {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/^[\s\S]*?<\/think>/i, "") // opening tag cut off by the provider
    .trim();
}

function contentToText(content) {
  return Array.isArray(content)
    ? content.map((c) => (typeof c === "string" ? c : c.text || "")).join("")
    : String(content ?? "");
}

async function callModel(messages, deadline) {
  const chain = providerChain();
  if (!chain.length) throw new Error("No LLM provider configured.");

  const failures = [];
  for (const p of chain) {
    const remaining = deadline - Date.now();
    if (remaining < 3_000) break; // not enough time left for another attempt
    try {
      const llm = new ChatOpenAI({
        model: p.model,
        apiKey: p.apiKey,
        configuration: { baseURL: p.baseURL },
        temperature: 0.6,
        maxTokens: 600,
        maxRetries: 0, // fall through to the next provider instead of retrying
        timeout: Math.min(p.timeoutMs || 12_000, remaining),
      });
      // Qwen3's soft switch: skip the (slow, hidden) thinking phase.
      const msgs = /qwen3/i.test(p.model)
        ? [...messages.slice(0, -1), new HumanMessage(`${messages.at(-1).content} /no_think`)]
        : messages;
      const res = await llm.invoke(msgs);
      const answer = stripReasoning(contentToText(res.content));
      if (answer) return { answer, provider: p.name };
      failures.push(`${p.name}: empty answer`);
    } catch (err) {
      failures.push(`${p.name}: ${err?.status || ""} ${err?.message || err}`.slice(0, 200));
    }
  }
  throw new Error(`All providers failed → ${failures.join(" | ")}`);
}

// ── Retrieval over the knowledge base ────────────────────────────────────────
const SECTIONS = KNOWLEDGE_BASE.split(/\n(?=# )/)
  .map((s) => s.trim())
  .filter(Boolean)
  .map((text) => {
    const heading = (text.match(/^#\s*(.+)/)?.[1] || "").trim();
    return { heading, text, body: text.toLowerCase(), head: heading.toLowerCase() };
  });

// Sections every answer may need (identity + how to reach him). Small on purpose.
const ALWAYS = ["WHO PAVAN IS", "LINKS & CONTACT"];
// Used when the question matches nothing specific ("hi", "tell me everything").
const DEFAULT_FOCUS = ["INTRODUCE YOURSELF", "WHY HIRE ME", "WHAT HE'S DOING NOW"];
const CONTEXT_BUDGET_CHARS = 7_000; // ≈1.8K tokens of KB on top of the ~2.2K-token rules

// Question words → words that appear in the section that answers them.
const ALIASES = {
  visa: ["authorization", "sponsorship"], sponsor: ["authorization", "sponsorship"],
  sponsorship: ["authorization"], opt: ["authorization"], h1b: ["authorization"],
  salary: ["logistics", "targeting"], compensation: ["logistics"], pay: ["logistics"],
  relocate: ["logistics"], relocation: ["logistics"], remote: ["logistics"],
  onsite: ["logistics"], start: ["logistics"], available: ["logistics"],
  weakness: ["growth"], weaknesses: ["growth"], improve: ["growth", "differently"],
  mistake: ["differently"], regret: ["differently"],
  outage: ["incident"], broke: ["incident"], failure: ["incident"], pressure: ["incident"],
  conflict: ["behavioral"], team: ["team", "behavioral"], lead: ["team", "behavioral"],
  degree: ["education"], university: ["education"], school: ["education"], study: ["education"],
  hire: ["hire", "differentiator"], why: ["hire"], strongest: ["flagship"], best: ["flagship"],
  hardest: ["flagship", "incident"], architecture: ["flagship", "systems"],
  rag: ["flagship", "technical"], agent: ["assistant", "flagship"], langgraph: ["technical", "assistant"],
  stack: ["skills", "technical"], tech: ["skills", "technical"], languages: ["skills"],
  work: ["experience"], job: ["experience", "doing"], current: ["doing"], now: ["doing"],
  metrics: ["impact", "measure"], accuracy: ["measure"], hallucinate: ["assistant", "measure"],
  contact: ["links"], email: ["links"], linkedin: ["links"], github: ["links", "open"],
  "open-source": ["open"], yourself: ["introduce"], background: ["technical"],
};

const STOPWORDS = new Set(
  "about above after again also been being both could does doing from have having here into just like more most much only other over same should some such than that their them then there these they this those through under very what when where which while with would your yours tell know want".split(" ")
);

function terms(text) {
  const out = new Set();
  for (const raw of (text || "").toLowerCase().split(/[^a-z0-9-]+/)) {
    if (raw.length < 3 || STOPWORDS.has(raw)) continue;
    const w = raw.length > 4 && raw.endsWith("s") ? raw.slice(0, -1) : raw;
    out.add(w);
    for (const alias of ALIASES[raw] || ALIASES[w] || []) out.add(alias);
  }
  return out;
}

export function buildContext(question, history = []) {
  // Follow-ups ("tell me more") lean on the previous user turn for relevance.
  const lastUser = [...history].reverse().find((m) => m.role === "user")?.content || "";
  const words = terms(`${question} ${lastUser}`);

  // TF-free BM25-lite: a term found in few sections (e.g. "kubernetes") outweighs
  // one found everywhere (e.g. "production"); heading hits count triple.
  const scored = SECTIONS.map((s) => {
    let score = 0;
    for (const w of words) {
      const df = SECTIONS.filter((x) => x.body.includes(w)).length;
      if (!df) continue;
      const idf = Math.log(1 + SECTIONS.length / df);
      if (s.head.includes(w)) score += 3 * idf;
      if (s.body.includes(w)) score += idf;
    }
    return { ...s, score };
  })
    .filter((s) => s.score > 0 && !ALWAYS.includes(s.heading))
    .sort((a, b) => b.score - a.score);

  const picked = SECTIONS.filter((s) => ALWAYS.includes(s.heading));
  const ranked = scored.length
    ? scored
    : SECTIONS.filter((s) => DEFAULT_FOCUS.some((h) => s.heading.startsWith(h)));

  let used = picked.reduce((n, s) => n + s.text.length, 0);
  for (const s of ranked) {
    if (used + s.text.length > CONTEXT_BUDGET_CHARS && picked.length > ALWAYS.length) continue;
    picked.push(s);
    used += s.text.length;
  }

  return {
    context: picked.map((s) => s.text).join("\n\n"),
    sources: picked.filter((s) => !ALWAYS.includes(s.heading)).map((s) => s.heading.split(" (")[0]),
  };
}

// ── Graph state ──────────────────────────────────────────────────────────────
const AgentState = Annotation.Root({
  question: Annotation(),
  history: Annotation(),
  context: Annotation(),
  sources: Annotation(),
  deadline: Annotation(),
  bank: Annotation(), // answer-bank retrieval result (lib/retrieval.js)
  answer: Annotation(),
  provider: Annotation(),
});

// ── Node 1: retrieve ─────────────────────────────────────────────────────────
function retrieveNode(state) {
  return {
    ...buildContext(state.question, state.history),
    bank: answerQuestion(state.question, state.history),
  };
}

// ── Node 2: generate ─────────────────────────────────────────────────────────
function toMessages(history = []) {
  return history.map((m) =>
    m.role === "assistant" ? new AIMessage(m.content) : new HumanMessage(m.content)
  );
}

async function generateNode(state) {
  const system = `${SYSTEM_RULES}\n\nKNOWLEDGE BASE (the parts relevant to this conversation — if the answer isn't here, say so honestly):\n${state.context}`;
  const messages = [
    new SystemMessage(system),
    ...toMessages(state.history),
    new HumanMessage(state.question),
  ];
  try {
    return await callModel(messages, state.deadline);
  } catch (err) {
    console.warn("[chat] generation unavailable, answering from the bank:", err?.message || err);
    return {}; // no answer → the graph routes to extract
  }
}

// ── Node 3: extract (zero-key fallback) ──────────────────────────────────────
function extractNode({ bank }) {
  return {
    answer: bank.answer,
    provider: "retrieval",
    sources: bank.entryId ? [bank.entryId] : [],
  };
}

// ── Compile the graph once (module scope = reused across warm invocations) ─────
const agent = new StateGraph(AgentState)
  .addNode("retrieve", retrieveNode)
  .addNode("generate", generateNode)
  .addNode("extract", extractNode)
  .addEdge(START, "retrieve")
  .addConditionalEdges("retrieve", () => (providerChain().length ? "generate" : "extract"), ["generate", "extract"])
  .addConditionalEdges("generate", (state) => (state.answer ? END : "extract"), [END, "extract"])
  .addEdge("extract", END)
  .compile();

/** Run the graph for one question. Resolves to { answer, provider, sources, bank }. */
export function runAgent({ question, history, deadline }) {
  return agent.invoke({ question, history, deadline });
}
