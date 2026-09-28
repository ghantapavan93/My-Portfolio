import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Sparkles, FileText, Linkedin, Mail, Volume2, VolumeX } from 'lucide-react';
import { playVoice, stopVoice, currentVoice, subscribeVoice, VOICE_SCRIPTS } from '../lib/voice';
import { RESUME_URL, LINKEDIN_URL } from '../lib/links';

// ─────────────────────────────────────────────────────────────────────────────
// GPK — Pavan's AI twin. Typewriter answers, cloned-voice playback, contextual
// follow-ups. Answers come from /api/chat (generated when a model is configured,
// otherwise retrieved verbatim from lib/answer-bank.js); if the API is
// unreachable the same retrieval runs right here in the browser.
// ─────────────────────────────────────────────────────────────────────────────


// Starter chips — the questions people actually ask.
const SUGGESTED = [
  'Introduce yourself',
  'What are you working on right now?',
  "What's your strongest project?",
  'Why should we hire you?',
  'Do you need visa sponsorship?',
  "What's the hardest problem you've solved?",
  'Experience with RAG, agents & LangGraph?',
];

// Questions with a pre-recorded answer in Pavan's cloned voice.
// ("What's your strongest project?" is not mapped: its recording describes
// EagleEye's designed architecture as if it were built — re-record before re-adding.)
const QUESTION_CLIPS = {
  'Why should we hire you?': 'faq-why-strong-engineer',
  'Experience with RAG, agents & LangGraph?': 'faq-ai-engineer-fit',
};

// Contextual follow-ups shown after an answer — the conversation never dead-ends.
const FOLLOW_UPS = {
  'Introduce yourself': ["What's your strongest project?", 'Tell me about your education', 'Why should we hire you?'],
  'What are you working on right now?': ["What's your strongest project?", 'Why should we hire you?', 'How does this assistant work?'],
  "What's your strongest project?": ['How did you cut the false positives?', 'Tell me about a production incident', 'Why should we hire you?'],
  'Why should we hire you?': ['Do you need visa sponsorship?', "What's your technical background?", 'How do I reach Pavan?'],
  'Do you need visa sponsorship?': ['Why should we hire you?', 'How do I reach Pavan?'],
  "What's the hardest problem you've solved?": ['Tell me about a production incident', 'Experience with RAG, agents & LangGraph?'],
  'Tell me about a production incident': ["What's the hardest problem you've solved?", 'Why should we hire you?'],
  'Tell me about your education': ['What are you working on right now?', "What's your technical background?"],
  'Experience with RAG, agents & LangGraph?': ['How does this assistant work?', 'Try to make me hallucinate'],
  'How does this assistant work?': ['Try to make me hallucinate', 'Why should we hire you?'],
};
const DEFAULT_FOLLOW_UPS = ['Why should we hire you?', "What's your strongest project?", 'How do I reach Pavan?'];

const GREETING = {
  role: 'assistant',
  content:
    "Hey — I'm GPK, Pavan's AI twin. Real stories, real numbers, zero fluff. Ask me anything — my projects, how I build, whether I'm the engineer you're looking for. I'll keep it short and human.",
  done: true,
};

// Minimal markdown: **bold** + paragraph breaks. Pure string ops — no HTML injection.
function renderRich(text) {
  return text.split(/\n{2,}/).map((para, pi) => (
    <p key={pi} className={pi > 0 ? 'mt-2' : ''}>
      {para.split(/(\*\*[^*]+\*\*)/g).map((seg, si) =>
        seg.startsWith('**') && seg.endsWith('**') ? (
          <strong key={si} className="font-semibold text-foreground">{seg.slice(2, -2)}</strong>
        ) : (
          <span key={si}>{seg}</span>
        )
      )}
    </p>
  ));
}

// Typewriter for the newest assistant message. Click the bubble to complete instantly.
function Typewriter({ text, onTick, onDone }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= text.length) { onDone?.(); return; }
    const step = Math.max(1, Math.round(text.length / 220)); // ~4s regardless of length
    const t = setTimeout(() => { setShown(s => Math.min(text.length, s + step)); onTick?.(); }, 16);
    return () => clearTimeout(t);
  }, [shown, text, onTick, onDone]);
  return (
    <span onClick={() => setShown(text.length)} className="cursor-text">
      {renderRich(text.slice(0, shown))}
      {shown < text.length && <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-primary/70 animate-pulse rounded-sm" />}
    </span>
  );
}

// The reactive orb (launcher + thinking states).
function Orb({ state = 'idle', size = 56 }) {
  const active = state === 'thinking';
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }} aria-hidden="true">
      <span className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-md transition-all duration-500 ${active ? 'opacity-90 scale-110 animate-pulse' : 'opacity-60 animate-[pulse_3s_ease-in-out_infinite]'}`} />
      <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500" style={{ animation: active ? 'spin 1.4s linear infinite' : 'spin 8s linear infinite' }} />
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
  const [followUps, setFollowUps] = useState(null); // chips shown after an answer
  const [voiceOn, setVoiceOn] = useState(true);
  const [speakingClip, setSpeakingClip] = useState(null);
  const [pendingAsk, setPendingAsk] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const scrollDown = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollDown(); }, [messages, loading, followUps, scrollDown]);
  useEffect(() => subscribeVoice(setSpeakingClip), []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    const askHandler = (e) => { setOpen(true); setPendingAsk(e.detail); };
    window.addEventListener('open-ai-agent', openHandler);
    window.addEventListener('ask-gpk', askHandler);
    return () => {
      window.removeEventListener('open-ai-agent', openHandler);
      window.removeEventListener('ask-gpk', askHandler);
    };
  }, []);

  // A question handed over from the command palette — ask it once the panel is up.
  useEffect(() => {
    if (open && pendingAsk) {
      const q = pendingAsk;
      setPendingAsk(null);
      setTimeout(() => ask(q), 250);
    }
  }, [open, pendingAsk]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (!open) stopVoice(); }, [open]);

  const markDone = useCallback((idx, question, related) => {
    setMessages(prev => prev.map((m, i) => (i === idx ? { ...m, done: true } : m)));
    setFollowUps(related?.length ? related : FOLLOW_UPS[question] || DEFAULT_FOLLOW_UPS);
  }, []);

  const ask = async (question) => {
    const q = question.trim();
    if (!q || loading) return;
    setFollowUps(null);
    const clip = QUESTION_CLIPS[q];
    if (clip && voiceOn) playVoice(clip);
    const history = messages.filter(m => m !== GREETING).map(({ role, content }) => ({ role, content }));
    setMessages(prev => [...prev, { role: 'user', content: q, done: true }]);
    setInput('');
    // Voice-backed questions answer from the clip's exact transcript, so what you
    // hear always matches what you read (and it's instant — no API call).
    if (clip && VOICE_SCRIPTS[clip]) {
      setMessages(prev => [...prev, { role: 'assistant', content: VOICE_SCRIPTS[clip], clip, question: q }]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, history }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 429) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || "You're going a bit fast — give me a few seconds and try again.", done: true, question: q }]);
        setFollowUps(FOLLOW_UPS[q] || DEFAULT_FOLLOW_UPS);
      } else if (!res.ok || !data.answer) {
        throw new Error('bad response');
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.answer,
          question: q,
          related: data.related,
          verified: data.provider === 'retrieval' && data.grounded,
        }]);
      }
    } catch {
      // API unreachable (offline, blocked, static hosting): run the same
      // retrieval in the browser. Only if that chunk can't load either do we
      // fall back to the one generic line.
      try {
        const { answerQuestion } = await import('../../lib/retrieval.js');
        const r = answerQuestion(q, history);
        setMessages(prev => [...prev, { role: 'assistant', content: r.answer, question: q, related: r.related, verified: r.grounded }]);
      } catch {
        setMessages(prev => [...prev, { role: 'assistant', content: VOICE_SCRIPTS.fallback, question: q }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleVoicePref = () => {
    if (voiceOn) stopVoice();
    setVoiceOn(v => !v);
  };

  const replay = (clipKey) => {
    if (currentVoice() === clipKey) stopVoice();
    else playVoice(clipKey);
  };

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-background/70 backdrop-blur-xl border border-white/15 shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
          aria-label="Open GPK — Pavan's AI twin"
        >
          <Orb state="idle" size={44} />
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Ask GPK
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-[400px] h-[620px] max-h-[calc(100vh-3rem)] flex flex-col rounded-3xl bg-background/85 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-primary/20 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-3">
              <span className="relative">
                <img
                  src="/avatar-hero.webp"
                  alt=""
                  className="h-10 w-10 rounded-full object-cover border border-white/20"
                  style={{ objectPosition: '62% 22%' }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background animate-pulse" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">GPK</p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  {loading ? 'thinking…' : speakingClip ? 'speaking — my real voice' : "Pavan's AI twin · real answers, zero fluff"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleVoicePref}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label={voiceOn ? 'Turn voice off' : 'Turn voice on'}
                title={voiceOn ? 'Voice on — answers play in my real voice' : 'Voice off'}
              >
                {voiceOn ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4 text-muted-foreground" />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div
                  className={`relative max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-sm'
                      : 'bg-white/8 dark:bg-white/5 border border-white/10 rounded-bl-sm'
                  }`}
                >
                  {m.role === 'assistant' && !m.done ? (
                    <Typewriter text={m.content} onTick={scrollDown} onDone={() => markDone(i, m.question, m.related)} />
                  ) : (
                    renderRich(m.content)
                  )}
                  {m.role === 'assistant' && m.verified && m.done && (
                    <p className="mt-1.5 text-[11px] text-muted-foreground">
                      ✓ Verified answer — retrieved from Pavan's notes, not generated
                    </p>
                  )}
                  {m.role === 'assistant' && m.clip && m.done && (
                    <button
                      onClick={() => replay(m.clip)}
                      className={`mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                        speakingClip === m.clip ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      }`}
                      aria-label="Play this answer in my voice"
                    >
                      <Volume2 className="w-3 h-3" />
                      {speakingClip === m.clip ? 'speaking…' : 'hear it in my voice'}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/8 border border-white/10 flex gap-1.5">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Starter chips */}
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

            {/* Contextual follow-ups after an answer */}
            {followUps && !loading && messages.length > 1 && (
              <div className="flex flex-wrap gap-2 pt-1 animate-in fade-in duration-500">
                {followUps.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-primary/5 border border-primary/20 text-primary/90 hover:bg-primary/15 hover:border-primary/40 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick links — conversion built in */}
          <div className="px-4 py-2 border-t border-white/10 flex items-center justify-center gap-2">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
              <FileText className="w-3 h-3" /> Resume
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
              <Linkedin className="w-3 h-3" /> LinkedIn
            </a>
            <button
              onClick={() => { setOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Mail className="w-3 h-3" /> Contact
            </button>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); ask(input); }}
            className="p-3 pt-2 flex items-center gap-2"
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
