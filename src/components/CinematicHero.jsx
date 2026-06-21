import { useState } from 'react';
import { Play, ArrowDown, MessageSquare, Sparkles } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// CinematicHero — full-screen "meet me" hero, in the spirit of Harsh Goyal's site.
//
// PLACEHOLDER: it currently uses /Pavan_Profile_Pic.jpg. Swap AVATAR_IMAGE for
// your 3D-avatar render when ready, and (later) drop a talking <video> in the
// avatar layer for the lip-synced welcome. The "Talk to me" / play controls
// dispatch a global "open-ai-agent" event that AIAgent.jsx listens for.
// ─────────────────────────────────────────────────────────────────────────────

const AVATAR_IMAGE = '/Pavan_Profile_Pic.jpg'; // ← replace with /avatar-3d.png later
const AVATAR_VIDEO = null; // ← later: '/avatar-welcome.mp4' (talking clip in your voice)

function openAgent() {
  window.dispatchEvent(new Event('open-ai-agent'));
}

function scrollToContent() {
  const el = document.getElementById('projects') || window;
  el === window ? window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
                : el.scrollIntoView({ behavior: 'smooth' });
}

export function CinematicHero() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-zinc-950 text-white">
      {/* ── Avatar layer (full-bleed, right-weighted) ───────────────────────── */}
      <div className="absolute inset-0">
        {AVATAR_VIDEO ? (
          <video
            className="absolute inset-0 h-full w-full object-cover object-[center_20%] md:object-[75%_20%] opacity-90"
            src={AVATAR_VIDEO}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={AVATAR_IMAGE}
            alt="Pavan Kalyan Ghanta"
            className="absolute inset-0 h-full w-full object-cover object-[center_15%] md:object-[78%_20%] opacity-90"
            loading="eager"
          />
        )}

        {/* Cinematic grade: darken left (for text) + top (for nav) + bottom (for scroll) */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 md:via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/70" />
        {/* Subtle brand tint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10 mix-blend-screen" />
      </div>

      {/* ── "Tap to meet me" affordance over the avatar ─────────────────────── */}
      <button
        onClick={openAgent}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group absolute right-6 md:right-[14%] top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3"
        aria-label="Meet my AI — talk to me"
      >
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
          <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-60" />
          <Play className="relative h-6 w-6 translate-x-0.5 fill-white" />
        </span>
        <span className={`text-xs font-medium tracking-wider uppercase transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-70'}`}>
          Tap to meet me
        </span>
      </button>

      {/* ── Foreground content ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-5 text-xs font-medium tracking-[0.3em] uppercase text-white/60 animate-fade-down">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5">
            <Sparkles className="h-3 w-3 text-blue-400" />
            AI avatar · speaks in my voice
          </span>
        </div>

        <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/50 mb-4 animate-fade-down">
          Portfolio · 2026
        </p>

        <h1 className="font-black tracking-tighter leading-[0.85] text-6xl md:text-8xl lg:text-9xl animate-fade-up">
          <span className="block">Pavan</span>
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Kalyan Ghanta
          </span>
        </h1>

        <p className="mt-6 text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-white/70 animate-fade-up animation-delay-200">
          AI Engineer · Full-Stack Developer · GenAI
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up animation-delay-300">
          <button
            onClick={openAgent}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-blue-600/50"
          >
            <MessageSquare className="h-4 w-4" />
            Talk to me
          </button>
          <button
            onClick={scrollToContent}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-semibold transition-all hover:bg-white/10"
          >
            View my work
          </button>
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────────────────── */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-7 left-6 md:left-12 lg:left-20 z-10 flex items-center gap-3 text-white/50 hover:text-white/80 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[11px] font-medium tracking-[0.3em] uppercase">Scroll</span>
        <span className="relative block h-10 w-px bg-white/30 overflow-hidden">
          <span className="absolute top-0 left-0 h-1/2 w-full bg-white animate-[bounce_1.8s_ease-in-out_infinite]" />
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}
