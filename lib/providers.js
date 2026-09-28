// Provider chain for GPK's generate step. Dependency-free so api/chat.js can
// check whether a model is configured without loading any LLM libraries.

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
