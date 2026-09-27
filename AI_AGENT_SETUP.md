# 🤖 Pavan's Portfolio AI Agent — Setup

A grounded AI agent that answers recruiter/visitor questions about your work — built with
**LangChain + LangGraph.js** on a **Vercel Node serverless function**, running **free open
models** (Qwen, gpt-oss) through a provider chain. All keys stay server-side.

## What's in the box
| File | Role |
|------|------|
| `lib/persona.js` | Knowledge base + personality (server-only, never shipped to the browser) |
| `api/chat.js` | LangGraph `retrieve → generate`; retrieval sends only relevant KB sections; provider chain with fall-through |
| `src/components/AIAgent.jsx` | Chat UI; voice-clip questions answer instantly from pre-written transcripts |
| `vite.config.js` | Dev-only middleware so `npm run dev` also serves `/api/chat` |
| `.env.example` | Every supported provider (copy to `.env.local`) |

## Zero-key mode (works out of the box)
With **no API keys at all**, GPK still answers every question instantly. The graph routes
`retrieve → extract`: `lib/retrieval.js` ranks a curated bank of verified, first-person answers
(`lib/answer-bank.js`) with BM25 and returns the best one verbatim. If the question isn't covered
well enough, it says so honestly and suggests the closest topics — it cannot invent anything.

- Add or edit answers in `lib/answer-bank.js` (facts must come from `lib/persona.js`).
- Run the regression eval after any change: `npm run eval:chat` (fails below 90%).
- If `/api/chat` is unreachable, the browser runs the same retrieval itself.
- When a model key is added, the graph routes `retrieve → generate` instead, and still falls back
  to `extract` if every provider fails.

## Provider chain (tried in order, all OpenAI-compatible)
| # | Provider | Cost | Env vars |
|---|----------|------|----------|
| 1 | Self-hosted (Ollama / vLLM / HF router) | free | `LLM_BASE_URL`, `LLM_MODEL`, `LLM_API_KEY` |
| 2 | Groq — Qwen3, gpt-oss | free, no card | `GROQ_API_KEY` (`GROQ_MODELS` optional) |
| 3 | Cloudflare Workers AI — Qwen3 | free 10K neurons/day | `CF_ACCOUNT_ID`, `CF_API_TOKEN` |
| 4 | OpenRouter `:free` models | free, 50 req/day | `OPENROUTER_API_KEY` |
| 5 | Gemini | free tier | `GEMINI_API_KEY` |

A 429 / 5xx / timeout on one provider falls through to the next. If all fail (or none are
set), the answer comes from zero-key mode — never a raw error.

**Recommended for production:** a free Groq key (+ Cloudflare as backup). Groq's free tier
is 8K tokens/min per model, which is why retrieval trims each request to ~4K tokens.

## 1. Run it locally with Ollama (fully free, no accounts)
```bash
ollama pull qwen2.5:7b-instruct
```
Create `.env.local`:
```
LLM_BASE_URL=http://localhost:11434/v1
LLM_MODEL=qwen2.5:7b-instruct
```
Then `npm run dev` and open the chat. (Small 3B models run faster but hallucinate more —
use 7B+ for realistic answers.)

## 2. Deploy
Add `GROQ_API_KEY` (and optionally the Cloudflare pair) in
**Vercel → Settings → Environment Variables**, then redeploy.

Want your *own* model in production? Run Ollama or vLLM on any VM with a public HTTPS
URL (or a Cloudflare Tunnel) and set `LLM_BASE_URL`/`LLM_MODEL`/`LLM_API_KEY` in Vercel.

## 3. Keep it grounded
Edit `lib/persona.js` to update facts. Sections are split on `# HEADINGS` — keep each
section focused so retrieval picks the right one. The agent answers **only** from what it
retrieves and admits when it doesn't know.

## 4. Abuse / cost safety
Already in `api/chat.js`: per-IP rate limit (12/min, 60/hr, in-memory), same-origin check,
history sanitization, 1000-char input cap, 28s request budget. For durable limits across
instances, swap the in-memory map for Upstash Redis / Vercel KV.

---

## 🎙️ Phase 2 — your voice (ElevenLabs)
**Subscription: go Creator ($11/mo)** for the Professional Voice Clone (best fidelity); Starter
($6) works with the Instant clone if budget-tight.

**Steps in ElevenLabs:**
1. Sign up → **Voices → Add Voice → Instant/Professional Voice Clone**.
2. Record using the script provided in chat (quiet room, decent mic, consistent energy).
3. Copy your **Voice ID** (Voices → your voice → ID) and an **API key** (Settings → API Keys).
4. Paste both into `.env.local` (`ELEVENLABS_VOICE_ID`, `ELEVENLABS_API_KEY`).

**Then (deterministic = free to serve):** we add a one-time script that turns your intro + top
FAQ answers into static `.mp3` files in `public/` — generated once, played instantly forever,
no per-visitor cost. The orb plays the intro on tap; the text agent handles the long tail.
