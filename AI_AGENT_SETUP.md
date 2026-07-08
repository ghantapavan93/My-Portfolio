# 🤖 Pavan's Portfolio AI Agent — Setup

A grounded, witty AI agent that answers recruiter/visitor questions about your work — built
with **LangChain + LangGraph.js**, **Gemini 2.5 Flash** (free, Groq fallback), running on a
**Vercel Node serverless function** with all keys kept server-side.

## What's in the box
| File | Role |
|------|------|
| `lib/persona.js` | Your knowledge base + the agent's personality (server-only, never shipped to browser) |
| `api/chat.js` | The brain: LangGraph `retrieve → generate` graph, Gemini→Groq fallback |
| `src/components/AIAgent.jsx` | The UI: floating reactive orb, chat panel, suggested-question chips |
| `.env.example` | The keys you need (copy to `.env.local`) |

## 1. Get a free LLM key (2 min)
- **Gemini (primary):** https://aistudio.google.com/apikey → create key.
- *(Optional)* **Groq (fallback):** https://console.groq.com/keys → create key.

Copy `.env.example` → `.env.local` and paste the key(s) in. **Never** rename them to `VITE_…`.

## 2. Run it locally
Plain `npm run dev` (Vite) shows the UI but **not** the `/api` brain. To run both:
```bash
npm i -g vercel      # once
vercel dev           # serves the app AND /api/chat with your .env.local keys
```
Open the site, click **“Ask my AI”** (bottom-right), and chat.

> Without `vercel dev`/keys, the orb + panel still render and show a friendly
> “brain not connected” message — so the UI is always demoable.

## 3. Deploy
Push to your Vercel project, then add `GOOGLE_API_KEY` (and optionally `GROQ_API_KEY`)
in **Vercel → Settings → Environment Variables**. Done — it's live and free.

## 4. Keep it grounded
Edit `lib/persona.js` to update facts. The agent answers **only** from that file and admits
when it doesn't know — so add a fact rather than hoping it guesses. *(There's a TODO marker for
your education details.)*

## 5. Abuse / cost safety (before sharing widely)
Free tiers have rate limits. Recommended before a big launch:
- add per-IP rate limiting to `api/chat.js`,
- cache answers to the common FAQ,
- keep the Groq fallback configured so one provider's limit doesn't take it down.

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
