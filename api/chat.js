// ─────────────────────────────────────────────────────────────────────────────
// api/chat.js — Vercel Node serverless function. The "brain" of the portfolio AI.
//
// Architecture (the part that shows the AI-engineering skill):
//   client  ──POST /api/chat──>  LangGraph StateGraph  ──>  Gemini 2.5 Flash
//                                  (retrieve → generate)      (Groq fallback)
//
// • Runs as a NODE serverless function (not Edge) — LangGraph's runtime is too
//   heavy for Edge cold-starts, per current guidance.
// • All API keys stay server-side (process.env). The browser only ever calls
//   this endpoint, never an LLM provider directly. Never use VITE_-prefixed keys.
// • Grounded: the model answers only from lib/persona.js, with a Gemini→Groq
//   provider fallback so a single provider's rate limit doesn't take the agent down.
// ─────────────────────────────────────────────────────────────────────────────

import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { SYSTEM_PROMPT, KNOWLEDGE_BASE } from "../lib/persona.js";

// ── Graph state ──────────────────────────────────────────────────────────────
const AgentState = Annotation.Root({
  question: Annotation(),
  history: Annotation(),
  focus: Annotation(),   // lightweight retrieval hint
  answer: Annotation(),
  provider: Annotation(),
});

// ── Node 1: retrieve ─────────────────────────────────────────────────────────
// Dependency-free relevance pass: score the knowledge-base sections by keyword
// overlap with the question and surface the most relevant ones as a focus hint.
// (The full KB is always in context — Flash's long context handles it — so this
// is a steering signal, not a hard filter, which keeps answers grounded.)
function retrieveNode(state) {
  const q = (state.question || "").toLowerCase();
  const words = new Set(q.split(/[^a-z0-9]+/).filter((w) => w.length > 3));
  const sections = KNOWLEDGE_BASE.split(/\n(?=# )/); // split on top-level headings
  const scored = sections
    .map((s) => {
      const text = s.toLowerCase();
      let score = 0;
      for (const w of words) if (text.includes(w)) score++;
      const heading = (s.match(/^#\s*(.+)/) || [, ""])[1].trim();
      return { heading, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.heading);
  return { focus: scored.length ? scored.join("; ") : "general overview" };
}

// ── Node 2: generate ─────────────────────────────────────────────────────────
function toMessages(history = []) {
  return history
    .slice(-6) // keep the last few turns; tokens stay small
    .map((m) =>
      m.role === "assistant" ? new AIMessage(m.content) : new HumanMessage(m.content)
    );
}

async function callModel(messages) {
  // Primary: Google Gemini 2.5 Flash (generous free tier)
  if (process.env.GOOGLE_API_KEY) {
    try {
      const llm = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        temperature: 0.6,
        maxOutputTokens: 600,
        apiKey: process.env.GOOGLE_API_KEY,
      });
      const res = await llm.invoke(messages);
      return { content: res.content, provider: "gemini-2.5-flash" };
    } catch (err) {
      console.error("[chat] Gemini failed, trying fallback:", err?.message);
    }
  }
  // Fallback: Groq (fast, free tier) so a rate limit doesn't kill the agent
  if (process.env.GROQ_API_KEY) {
    const llm = new ChatGroq({
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
      maxTokens: 600,
      apiKey: process.env.GROQ_API_KEY,
    });
    const res = await llm.invoke(messages);
    return { content: res.content, provider: "groq-llama-3.3-70b" };
  }
  throw new Error("No LLM API key configured (set GOOGLE_API_KEY or GROQ_API_KEY).");
}

async function generateNode(state) {
  const system = `${SYSTEM_PROMPT}\n\n(The visitor's question seems most related to: ${state.focus}.)`;
  const messages = [
    new SystemMessage(system),
    ...toMessages(state.history),
    new HumanMessage(state.question),
  ];
  const { content, provider } = await callModel(messages);
  const answer = Array.isArray(content)
    ? content.map((c) => (typeof c === "string" ? c : c.text || "")).join("")
    : String(content);
  return { answer: answer.trim(), provider };
}

// ── Compile the graph once (module scope = reused across warm invocations) ─────
const agent = new StateGraph(AgentState)
  .addNode("retrieve", retrieveNode)
  .addNode("generate", generateNode)
  .addEdge(START, "retrieve")
  .addEdge("retrieve", "generate")
  .addEdge("generate", END)
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

function sanitizeHistory(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (m) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant")
    )
    .slice(-6)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
}

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} timed out`)), ms)),
  ]);
}

// ── HTTP handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  if (rateLimited(clientIp(req))) {
    return res.status(429).json({
      error: "You're going a bit fast — give me a few seconds and ask again.",
    });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const question = (body.question || "").toString().trim();
    const history = sanitizeHistory(body.history);

    if (!question) return res.status(400).json({ error: "Missing 'question'." });
    if (question.length > 1000)
      return res.status(400).json({ error: "Question too long — keep it under 1000 characters." });

    const result = await withTimeout(agent.invoke({ question, history }), 25_000, "Agent");
    return res.status(200).json({ answer: result.answer, provider: result.provider });
  } catch (err) {
    console.error("[chat] error:", err);
    return res.status(500).json({
      error:
        "The assistant is unavailable right now. Add a GOOGLE_API_KEY (or GROQ_API_KEY) and try again.",
    });
  }
}
