// ─────────────────────────────────────────────────────────────────────────────
// voice.js — global player for Pavan's cloned-voice clips (public/voice/*.wav).
// One clip plays at a time: starting a new one stops the previous. Components
// subscribe to know what's playing (VoiceButton, AIAgent).
// ─────────────────────────────────────────────────────────────────────────────

let audio = null;
let currentKey = null;
const listeners = new Set();

function notify() {
  listeners.forEach((l) => l(currentKey));
}

export function subscribeVoice(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function currentVoice() {
  return currentKey;
}

export function stopVoice() {
  if (audio) {
    audio.pause();
    audio = null;
  }
  currentKey = null;
  notify();
}

// Play a clip by key (filename without extension). Resolves true if playback
// started, false if it couldn't (missing file, blocked autoplay, …).
export function playVoice(key) {
  stopVoice();
  const a = new Audio(`/voice/${key}.wav`);
  audio = a;
  currentKey = key;
  notify();

  const clear = () => {
    if (currentKey === key) {
      currentKey = null;
      audio = null;
      notify();
    }
  };
  a.onended = clear;
  a.onerror = clear;

  return a.play().then(
    () => true,
    () => {
      clear();
      return false;
    }
  );
}

// Word-for-word transcripts of the recorded clips — shown as the text answer
// when the chat plays a clip while the live LLM isn't connected.
export const VOICE_SCRIPTS = {
  'faq-strongest-project':
    "Honestly? EagleEye AI. The problem that started it: most safety cameras scream 'alert' at every shadow, so nobody trusts them. So I flipped it — rules and physics decide what's actually risky, and the AI only explains it, with proof attached: the exact frame, the timestamp. It went from noise to something a security team would actually act on. It even won a hackathon. Want the how-it-works?",
  'faq-why-strong-engineer':
    "Let me give you a story instead of a list. At 100 Miles of Summer they had no AI yet — I was the first to bring it in. I built an AI health coach and the platform it runs on, and today two hundred seventy thousand people use it. That's me: I don't hand off a model and walk away — I build the whole thing, zero to one, until real people are using it.",
  'faq-100mos':
    "I'm their full-stack AI engineer, and the first person to bring AI into the company. I built a one-of-a-kind AI health coach and the React-and-Node platform around it — now in front of two hundred seventy thousand people. My job is turning 'wouldn't it be cool if AI could…' into something that actually ships.",
  'faq-krowdguide':
    "That was my founding-engineer chapter. An idea — keep crowds safe with AI — and nothing built. I built it zero to one: the cloud platform, the real-time AI pipeline, even plain-English alerts so non-technical staff could act fast. We ran it live at AfroTech for twenty thousand people. Owning something end-to-end like that is where I do my best work.",
  'faq-unt':
    "I helped run an AI-first discovery initiative at UNT. The fun part: I built 'Scrappy,' a retrieval-powered research assistant that answers researchers' messy, complex questions from their own materials. I also taught twenty-plus workshops for two hundred-plus students — submissions jumped fifty-three percent. I like making AI approachable, not intimidating.",
  'faq-project-h':
    "Project-H is my founder project — an AI health coach called 'Oats' that reads your Apple Watch and WHOOP data and gives grounded, personal coaching. It's where my family's healthcare roots meet my engineering.",
  'faq-other-projects':
    "Depends what you're into! NexusWatch — an AI invoice-risk console I built with a startup's CTO. Design Room — AI exterior-design tooling. ShelfTrace — a reliability control plane for retail pricing. FanFlow — event-day intelligence for StubHub fans. And a hackathon-winning real-time AI surveillance system. Want the story behind any one?",
  'faq-ai-engineer-fit':
    "Strong fit — concretely, not buzzwords. The job is usually: take an AI idea and make it real and reliable. That's exactly what I do — LLMs, RAG, agents with LangChain and LangGraph, plus the unglamorous MLOps to keep them alive — shipped to hundreds of thousands of users, not just a demo.",
  fallback:
    "Good question — I don't have that detail on hand, but reach me through the contact section or LinkedIn, and I'll answer it personally.",
};
