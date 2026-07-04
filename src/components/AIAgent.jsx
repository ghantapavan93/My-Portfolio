import { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles } from 'lucide-react';
import { playVoice, stopVoice, VOICE_SCRIPTS } from '../lib/voice';

// Starter chips — the questions people actually ask (safe to expose; the real
// brain + knowledge base live server-side in /api/chat).
const SUGGESTED = [
  'What are you working on right now?',
  "What's your strongest project?",
  'Why should we hire you?',
  'Do you need visa sponsorship?',
  "What's the hardest problem you've solved?",
  'Experience with RAG, agents & LangGraph?',
];

// Questions that have a pre-recorded answer in Pavan's cloned voice: clicking
// these chips speaks the answer while the text renders.
const QUESTION_CLIPS = {
  "What's your strongest project?": 'faq-strongest-project',
  'Why should we hire you?': 'faq-why-strong-engineer',
  'Experience with RAG, agents & LangGraph?': 'faq-ai-engineer-fit',
};

// Pre-written answers (his words) for chips without a voice clip yet — shown
// when the live brain is unreachable so the assistant never feels broken.
const OFFLINE_ANSWERS = {
  'What are you working on right now?':
    "Right now I'm the full-stack AI engineer at 100 Miles of Summer — I was the first to bring AI into the company. I built QUANTUM, an AI health coach grounded in real wearable data, and the platform it runs on — now serving 270,000+ people. And yes, this assistant you're talking to? Also me. Well… us. 😄",
  'Do you need visa sponsorship?':
    "Short version: not today. I'm on F-1 STEM OPT — fully authorized to work in the US right now, so you could hire me tomorrow with zero paperwork, and there's a multi-year runway before sponsorship is even a conversation. My plan for when it matters is simple: by then I'll have shipped enough that it's the easiest yes you'll sign. For exact dates, grab me via the contact section.",
  "What's the hardest problem you've solved?":
    "Making an LLM trustworthy enough to ship. At Vosyn our agent hallucinated about 8% of the time — fine in a demo, a liability in production. I rebuilt the retrieval and added guardrails until it hit 2%, which cut human escalations by 42%. The lesson that stuck: the model is the easy part — the system that keeps it honest is the real work.",
};

const GREETING = {
  role: 'assistant',
  content:
    "Hey — I'm GPK, Pavan's AI twin. Real stories, real numbers, zero fluff. Ask me anything — my projects, how I build, whether I'm the engineer you're looking for. I'll keep it short and human. Shoot. 🎯",
};

// The reactive orb — pure CSS/SVG, no deps. Reacts to agent state.
function Orb({ state = 'idle', size = 56 }) {
  const active = state === 'thinking';
  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-md transition-all duration-500 ${
          active ? 'opacity-90 scale-110 animate-pulse' : 'opacity-60 animate-[pulse_3s_ease-in-out_infinite]'
        }`}
      />
      <span
        className="absolute inset-[3px] rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
        style={{ animation: active ? 'spin 1.4s linear infinite' : 'spin 8s linear infinite' }}
      />
      <span className="absolute inset-[7px] rounded-full bg-background/70 backdrop-blur-sm" />
      <Sparkles className={`relative w-1/3 h-1/3 text-primary ${active ? 'animate-pulse' : ''}`} />
    </span>
  );
}

export function AIAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Let other components (e.g. the cinematic hero "Talk to me" button) open the agent.
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener('open-ai-agent', openHandler);
    return () => window.removeEventListener('open-ai-agent', openHandler);
  }, []);

  // Closing the panel stops any clip that's mid-sentence.
  useEffect(() => {
    if (!open) stopVoice();
  }, [open]);

  const ask = async (question) => {
    const q = question.trim();
    if (!q || loading) return;
    // Speak the answer in Pavan's cloned voice when we have a recorded clip for it.
    const clip = QUESTION_CLIPS[q];
    if (clip) playVoice(clip);
    const history = messages.filter((m) => m !== GREETING).map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, history }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 429) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.error || "You're going a bit fast — give me a few seconds and try again." }]);
      } else if (!res.ok || !data.answer) {
        throw new Error('bad response');
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
      }
    } catch {
      // Live brain unreachable. Answer chain: exact clip transcript (voice is
      // already playing) → pre-written answer → recorded fallback line.
      let content = VOICE_SCRIPTS[clip] || OFFLINE_ANSWERS[q];
      if (!content) {
        playVoice('fallback');
        content = VOICE_SCRIPTS.fallback;
      }
      setMessages((prev) => [...prev, { role: 'assistant', content }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-background/70 backdrop-blur-xl border border-white/15 shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
          aria-label="Open Pavan's AI assistant"
        >
          <Orb state="idle" size={44} />
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Ask GPK
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-[400px] h-[600px] max-h-[calc(100vh-3rem)] flex flex-col rounded-3xl bg-background/80 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-primary/20 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-3">
              <Orb state={loading ? 'thinking' : 'idle'} size={40} />
              <div>
                <p className="text-sm font-bold leading-tight">GPK</p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  {loading ? 'thinking…' : "Pavan's AI twin · real answers, zero fluff"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-sm'
                      : 'bg-white/8 dark:bg-white/5 border border-white/10 rounded-bl-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/8 border border-white/10 flex gap-1.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested chips — only before the first user message */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/10 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="p-3 border-t border-white/10 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Ask me anything…"
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/40 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-primary/30 disabled:opacity-40 hover:scale-105 transition-all"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
