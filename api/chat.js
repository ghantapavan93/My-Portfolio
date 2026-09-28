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
// Files: this handler (HTTP, limits) · lib/agent.js (the graph, loaded only when a
// model is configured) · lib/providers.js · lib/retrieval.js + lib/answer-bank.js.
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

import { answerQuestion } from "../lib/retrieval.js";
import { providerChain } from "../lib/providers.js";

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

  const fromBank = () => {
    const bank = answerQuestion(question, history);
    return { answer: bank.answer, provider: "retrieval", sources: [], related: bank.related, grounded: bank.grounded };
  };

  // Zero-key mode: no model configured → answer from the verified bank directly.
  if (!providerChain().length) return res.status(200).json(fromBank());

  try {
    const { runAgent } = await import("../lib/agent.js");
    const deadline = Date.now() + REQUEST_BUDGET_MS;
    const result = await withTimeout(runAgent({ question, history, deadline }), REQUEST_BUDGET_MS + 1_000, "Agent");
    return res.status(200).json({
      answer: result.answer,
      provider: result.provider,
      sources: result.sources,
      related: result.bank?.related || [],
      grounded: result.provider === "retrieval" ? result.bank.grounded : true,
    });
  } catch (err) {
    // Details go to the server log only. Even if the agent fails to load or run,
    // the visitor still gets the verified answer rather than an error.
    console.error("[chat]", err?.message || err);
    return res.status(200).json(fromBank());
  }
}
