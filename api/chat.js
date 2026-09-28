// ─────────────────────────────────────────────────────────────────────────────
// api/chat.js — Vercel Node serverless function. The "brain" of the portfolio AI.
//
// Architecture (the part that shows the AI-engineering skill):
//
//   client ──POST /api/chat──> retrieve ──(model configured?)──yes──> generate ──ok──> answer
//                                  │                                     │ all providers failed
//                                  │ no                                  ▼
//                                  └────────────────────────────────> extract ──> answer
//
// • retrieve: picks the relevant knowledge-base sections for the LLM AND ranks
//   the curated answer bank (lib/retrieval.js, BM25) in one pass.
// • generate: an open model writes the answer from the retrieved sections.
// • extract: no model (or every provider down) → return the best verified answer
//   from the bank verbatim, or an honest "no verified answer". Works with zero
//   API keys, costs nothing, and cannot hallucinate.
//
// • Runs as a NODE serverless function (not Edge) — LangGraph's runtime is too
//   heavy for Edge cold-starts.
// • All API keys stay server-side (process.env). The browser only ever calls
//   this endpoint, never an LLM provider directly. Never use VITE_-prefixed keys.
// • Retrieval-grounded: the KB is split into sections, scored against the
//   question, and only the relevant ones are sent (~2–3K tokens instead of ~8K).
//   That keeps every request inside free-tier token limits (Groq free = 8K TPM).
// • Free & open by default: every provider speaks the OpenAI-compatible API, so
//   one client (ChatOpenAI + baseURL) covers self-hosted Ollama/vLLM, Groq,
//   Cloudflare Workers AI, OpenRouter and Gemini. Providers are tried in order;
//   a 429/5xx/timeout on one just falls through to the next.
// ─────────────────────────────────────────────────────────────────────────────

import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { SYSTEM_RULES, KNOWLEDGE_BASE } from "../lib/persona.js";
import { answerQuestion } from "../lib/retrieval.js";

// ── Provider chain ───────────────────────────────────────────────────────────
// Model IDs are env-overridable because free-tier catalogs change often.
const DEFAULT_GROQ_MODELS = ["qwen/qwen3.8-27b", "openai/gpt-oss-120b"];

function splitList(value, fallback) {
  const items = (value || "").split(",").map((s) => s.trim()).filter(Boolean);
  return items.length ? items : fallback;
}

export function providerChain(env = process.env) {
  const chain = [];

  // 1. Self-hosted / any OpenAI-compatible endpoint: Ollama (http://localhost:11434/v1),
  //    vLLM or llama.cpp on a VM, LM Studio, Hugging Face router, …
  if (env.LLM_BASE_URL && env.LLM_MODEL) {
    chain.push({
      name: `custom:${env.LLM_MODEL}`,
      baseURL: env.LLM_BASE_URL,
      apiKey: env.LLM_API_KEY || "not-needed",
      model: env.LLM_MODEL,
      timeoutMs: Number(env.LLM_TIMEOUT_MS) || 20_000, // self-hosted models are slower
    });
  }

  // 2. Groq — free, no card, open models (Qwen, gpt-oss). Each model has its own quota.
  if (env.GROQ_API_KEY) {
    for (const model of splitList(env.GROQ_MODELS, DEFAULT_GROQ_MODELS)) {
      chain.push({
        name: `groq:${model}`,
        baseURL: "https://api.groq.com/openai/v1",
        apiKey: env.GROQ_API_KEY,
        model,
      });
    }
  }

  // 3. Cloudflare Workers AI — 10K free neurons/day, open models.
  if (env.CF_ACCOUNT_ID && env.CF_API_TOKEN) {
    const model = env.CF_MODEL || "@cf/qwen/qwen3-30b-a3b-fp8";
    chain.push({
      name: `cloudflare:${model}`,
      baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/v1`,
      apiKey: env.CF_API_TOKEN,
      model,
    });
  }

  // 4. OpenRouter ":free" open models.
  if (env.OPENROUTER_API_KEY) {
    const model = env.OPENROUTER_MODEL || "qwen/qwen3.8-27b:free";
    chain.push({
      name: `openrouter:${model}`,
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: env.OPENROUTER_API_KEY,
      model,
    });
  }

  // 5. Gemini (not open-weight, but a generous free tier) — last resort.
  const geminiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
  if (geminiKey) {
    const model = env.GEMINI_MODEL || "gemini-flash-latest";
    chain.push({
      name: `gemini:${model}`,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      apiKey: geminiKey,
      model,
    });
  }

  return chain;
}

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

// ── Abuse / cost protection ───────────────────────────────────────────────────
// Best-effort per-IP rate limiting. Serverless instances are short-lived so this
// resets on cold start; for durable cross-instance limits, swap for Upstash Redis
// or Vercel KV. Still a solid first line against spam and cost-runaway.
const RL_WINDOW_MS = 60_000; // 1 minute
const RL_PER_MIN = 12;
const RL_PER_HOUR = 60;
const ipHits = new Map(); // ip -> timestamp[]

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (ipHits.get(ip) || []).filter((t) => now - t < 3_600_000);
  recent.push(now);
  ipHits.set(ip, recent);
  if (ipHits.size > 5000) ipHits.clear(); // crude memory guard
  const lastMinute = recent.filter((t) => now - t < RL_WINDOW_MS).length;
  return lastMinute > RL_PER_MIN || recent.length > RL_PER_HOUR;
}

// Browsers always send Origin on cross-site POSTs; only this site may call us.
// (Non-browser clients can spoof it — the rate limit is the backstop there.)
function crossOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  try {
    return new URL(origin).host !== req.headers.host;
  } catch {
    return true;
  }
}

function sanitizeHistory(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (m) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant")
    )
    .slice(-6)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));
}

function withTimeout(promise, ms, label) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
    }),
  ]).finally(() => clearTimeout(timer));
}

const REQUEST_BUDGET_MS = 28_000;

// ── HTTP handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }
  if (crossOrigin(req)) {
    return res.status(403).json({ error: "Forbidden." });
  }
  if (rateLimited(clientIp(req))) {
    return res.status(429).json({
      error: "You're going a bit fast — give me a few seconds and ask again.",
    });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return res.status(400).json({ error: "Invalid JSON body." });
  }
  const question = (body.question || "").toString().trim();
  const history = sanitizeHistory(body.history);

  if (!question) return res.status(400).json({ error: "Missing 'question'." });
  if (question.length > 1000)
    return res.status(400).json({ error: "Question too long — keep it under 1000 characters." });

  try {
    const deadline = Date.now() + REQUEST_BUDGET_MS;
    const result = await withTimeout(
      agent.invoke({ question, history, deadline }),
      REQUEST_BUDGET_MS + 1_000,
      "Agent"
    );
    return res.status(200).json({
      answer: result.answer,
      provider: result.provider,
      sources: result.sources,
      related: result.bank?.related || [],
      grounded: result.provider === "retrieval" ? result.bank.grounded : true,
    });
  } catch (err) {
    // Details go to the server log only. Even a failed graph run still answers
    // from the verified bank rather than showing the visitor an error.
    console.error("[chat]", err?.message || err);
    const bank = answerQuestion(question, history);
    return res
      .status(200)
      .json({ answer: bank.answer, provider: "retrieval", sources: [], related: bank.related, grounded: bank.grounded });
  }
}
