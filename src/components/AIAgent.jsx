import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Sparkles, FileText, Linkedin, Mail, Volume2, VolumeX } from 'lucide-react';
import { playVoice, stopVoice, currentVoice, subscribeVoice, VOICE_SCRIPTS } from '../lib/voice';

// ─────────────────────────────────────────────────────────────────────────────
// GPK — Pavan's AI twin. Typewriter answers, cloned-voice playback, contextual
// follow-ups, and grounded offline answers so it never feels broken.
// ─────────────────────────────────────────────────────────────────────────────

const RESUME_URL = 'https://drive.google.com/file/d/1ZzsEtDdGER8rRoCCX9zFI3qQSAgfj50z/view?usp=sharing';
const LINKEDIN_URL = 'https://www.linkedin.com/in/pavankalyan-ghanta-b20115200/';

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
const QUESTION_CLIPS = {
  "What's your strongest project?": 'faq-strongest-project',
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
  'Experience with RAG, agents & LangGraph?': ['How does this assistant work?', '🧪 Try to make me hallucinate'],
  'How does this assistant work?': ['🧪 Try to make me hallucinate', 'Why should we hire you?'],
};
const DEFAULT_FOLLOW_UPS = ['Why should we hire you?', "What's your strongest project?", 'How do I reach Pavan?'];

// Pre-written answers (his words) — used when the live brain is unreachable,
// so every core question still lands perfectly.
const OFFLINE_ANSWERS = {
  'Introduce yourself':
    "I'm Pavan — an AI engineer who ships. The quick version: I was the first person to bring AI into 100 Miles of Summer, where I built an AI health coach now in front of 270,000+ people. Before that I was founding engineer on a crowd-safety platform that protected 20,000 people live at AfroTech. I own the whole pipeline — data, model, backend, frontend, deploy — and my rule is simple: **it's not done until real people rely on it.** Ask me anything — the stories are better than the resume. 😄",
  'What are you working on right now?':
    "Right now I'm the full-stack AI engineer at 100 Miles of Summer — I was the first to bring AI into the company. I built QUANTUM, an AI health coach grounded in real wearable data, and the platform it runs on — now serving 270,000+ people. And yes, this assistant you're talking to? Also me. Well… us. 😄",
  'Do you need visa sponsorship?':
    "Short version: **I don't need sponsorship until mid-2028.** My STEM OPT runs through June 2028 — you could hire me tomorrow with zero paperwork, and you get two full years to judge me on shipped work before sponsorship is even a conversation. And honestly, that's my favorite part of the deal: someone with everything to prove brings a level of ownership that comfort can't buy. By 2028, my plan is for the H-1B to be the easiest yes you'll ever sign — backed by two years of receipts, not promises.",
  "What's the hardest problem you've solved?":
    "Making an LLM trustworthy enough to ship. At Vosyn our agent hallucinated about 8% of the time — fine in a demo, a liability in production. I rebuilt the retrieval and added guardrails until it hit **2%**, which cut human escalations by 42%. The lesson that stuck: the model is the easy part — the system that keeps it honest is the real work.",
  "What's your technical background?":
    "Full-stack with an AI core. Python and TypeScript daily; LLMs, RAG, and agents with LangChain and LangGraph; FastAPI and Node on the back, React and React Native on the front; AWS, Docker, and Kubernetes to keep it alive — plus evals and observability, because **AI you can't measure is AI you can't trust.** And here's the honest part: in small teams I never got to say \"that's not my layer\" — **I'm not broad because I'm unfocused; real products forced me to become useful wherever the fire was.** Which layer do you want to go deep on?",
  'Tell me about your education':
    "Master's in Computer Science from the University of North Texas, and a bachelor's in Electronics & Communication Engineering from SRM in India. The bachelor's gave me the engineering mindset — systems, signals, discipline; the master's pulled me deep into software and AI. But the best part of my education wasn't the classroom: at UNT I was simultaneously building AI assistants, mentoring 200+ students, and running 20+ workshops. **I didn't just study CS — I built with it, taught it, broke things with it, and learned to make it useful for real people.**",
  'Tell me about a production incident':
    "Krowd Guide, live event night, 10 p.m. — my founder calls: \"something is breaking.\" That sentence wakes an engineer faster than coffee. ☕ The twist: it was breaking for the best reason — way more people were using it than we planned, and real attendees depended on it for safer routes. Burst traffic was choking the backend and the AI pipeline, which still had prototype-level limits. I isolated the failure domain, scaled past the free-tier constraints, spread traffic across pods, and moved hot paths to cached insights and fallbacks instead of full reasoning. **Stable by 2 a.m.** Before that night, scale was something I planned for. After it, scale became something I respect.",
  'How did you cut the false positives?':
    "Two-stage gating. Stage one: signals and heuristics — motion, trajectory, physics — build a candidate event. Stage two: a threat lexicon filters it before anyone gets pinged. For low-light and blur, I bundle multi-frame context and peak-motion keyframes as **evidence**, so even when model confidence drops, a human can verify in seconds. Alerts went from noise to something a security team actually acts on.",
  'How does this assistant work?':
    "Glad you asked — **I'm his work, not just his words.** Under the hood: a LangGraph agent (retrieve → generate) on a serverless function, Gemini with automatic Groq fallback so one rate limit never kills me, answering only from a grounded knowledge base of his real projects — same discipline he ships professionally: grounding, guardrails, honest refusals. The voice? His real voice, AI-cloned, pre-generated so it's instant and free. Go ahead — try to break me. 😄",
  '🧪 Try to make me hallucinate':
    "Love it — you're my favorite kind of visitor. 😄 Here's the deal: I only answer from Pavan's real, verified work. Ask me if he worked at Google (he didn't), whether he has 20 years of experience (he doesn't), or about some framework he's never touched — **I'll tell you the truth every time.** Honesty under pressure is the whole demo. Fire away.",
  'How do I reach Pavan?':
    "Easiest ways: the **contact section** right on this site (he replies within a day), or **LinkedIn** — both buttons are right below this chat. If you're a recruiter with a role in mind, mention the team and stack and he'll come back with specifics, fast.",
};

const GREETING = {
  role: 'assistant',
  content:
    "Hey — I'm GPK, Pavan's AI twin. Real stories, real numbers, zero fluff. Ask me anything — my projects, how I build, whether I'm the engineer you're looking for. I'll keep it short and human. Shoot. 🎯",
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

  const markDone = useCallback((idx, question) => {
    setMessages(prev => prev.map((m, i) => (i === idx ? { ...m, done: true } : m)));
    setFollowUps(FOLLOW_UPS[question] || DEFAULT_FOLLOW_UPS);
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
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer, clip, question: q }]);
      }
    } catch {
      // Offline chain: clip transcript (voice already playing) → pre-written answer → fallback line.
      let content = VOICE_SCRIPTS[clip] || OFFLINE_ANSWERS[q];
      let usedClip = clip;
      if (!content) {
        if (voiceOn) playVoice('fallback');
        content = VOICE_SCRIPTS.fallback;
        usedClip = 'fallback';
      }
      setMessages(prev => [...prev, { role: 'assistant', content, clip: usedClip, question: q }]);
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
                  {loading ? 'thinking…' : speakingClip ? '🔊 speaking — my real voice' : "Pavan's AI twin · real answers, zero fluff"}
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
                    <Typewriter text={m.content} onTick={scrollDown} onDone={() => markDone(i, m.question)} />
                  ) : (
                    renderRich(m.content)
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
