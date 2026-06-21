import { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles } from 'lucide-react';

// Starter chips (safe to expose; the real brain + knowledge base live server-side in /api/chat).
const SUGGESTED = [
  "What's your strongest project?",
  "What's the hardest problem you've solved?",
  "Why should we hire you?",
  "Experience with RAG, agents & LangGraph?",
];

const GREETING = {
  role: 'assistant',
  content:
    "Hey — I'm Pavan's AI (yes, genuinely an AI, grounded in his real work). Ask me about his projects, experience, or whether he's a fit for your team. What are you curious about?",
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

  const ask = async (question) => {
    const q = question.trim();
    if (!q || loading) return;
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
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "My live brain isn't connected in this environment yet. In the meantime, reach Pavan via the Contact section or LinkedIn — he'd love to talk.",
        },
      ]);
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
            Ask my AI
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
                <p className="text-sm font-bold leading-tight">Pavan's AI</p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  {loading ? 'thinking…' : 'grounded in his real work'}
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
