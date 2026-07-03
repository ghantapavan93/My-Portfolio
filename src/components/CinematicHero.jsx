import { useEffect, useRef, useState } from 'react';
import { Play, Square, ArrowDown, MessageSquare, Sparkles } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// CinematicHero — full-screen "meet me" hero, in the spirit of Harsh Goyal's site.
//
// "Tap to meet me" plays INTRO_AUDIO (Pavan's cloned voice) and opens the AI
// agent when the intro finishes. Swap AVATAR_IMAGE for the 3D-avatar render
// when ready, and AVATAR_VIDEO for the lip-synced talking clip (it will play
// muted/looped as the backdrop, like a video reel).
// ─────────────────────────────────────────────────────────────────────────────

const AVATAR_IMAGE = '/avatar-hero.webp'; // cinematic desk render (AI-generated from his photo)
const AVATAR_VIDEO = '/avatar-welcome.mp4'; // welcome video — fades in over the photo
const VIDEO_START_MS = 5000; // photo shows first; video starts (muted) after this delay
// true  = the video is a lip-synced TALKING clip (HeyGen/SadTalker): tap replays it unmuted.
// false = the video is AMBIENT motion (Google Flow): it keeps looping silently and the
//         cloned-voice intro.wav plays over it on tap.
const AVATAR_VIDEO_TALKS = true;
const INTRO_AUDIO = '/voice/intro.wav'; // Pavan's cloned-voice welcome

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
  const [speaking, setSpeaking] = useState(false);
  const [videoLive, setVideoLive] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => () => audioRef.current?.pause(), []);

  // The photo shows first; after VIDEO_START_MS the welcome video fades in and
  // plays muted (browsers block un-muted autoplay — sound comes on tap).
  useEffect(() => {
    if (!AVATAR_VIDEO) return;
    const t = setTimeout(() => {
      setVideoLive(true);
      videoRef.current?.play().catch(() => setVideoFailed(true));
    }, VIDEO_START_MS);
    return () => clearTimeout(t);
  }, []);

  const playIntroAudio = () => {
    try {
      const audio = new Audio(INTRO_AUDIO);
      audioRef.current = audio;
      audio.onended = () => { setSpeaking(false); openAgent(); };
      audio.onerror = () => { setSpeaking(false); openAgent(); };
      audio.play().then(() => setSpeaking(true)).catch(() => openAgent());
    } catch {
      openAgent();
    }
  };

  // Tap to meet me:
  // • With a talking AVATAR_VIDEO: restart it UNMUTED (lips + voice in sync),
  //   then return to the silent loop and open the chat when it ends.
  // • Without video: play the cloned-voice intro audio.
  // Tap again while speaking = skip straight to the chat.
  const meetMe = () => {
    const v = videoRef.current;

    if (speaking) {
      if (v) { v.muted = true; v.loop = true; v.play().catch(() => {}); }
      audioRef.current?.pause();
      setSpeaking(false);
      openAgent();
      return;
    }

    if (AVATAR_VIDEO && v && AVATAR_VIDEO_TALKS && !videoFailed) {
      try {
        setVideoLive(true); // tapped before the 5s fade-in? bring the video up now
        v.currentTime = 0;
        v.muted = false;
        v.loop = false;
        v.onended = () => {
          v.muted = true;
          v.loop = true;
          v.play().catch(() => {});
          setSpeaking(false);
          openAgent();
        };
        v.play().then(() => setSpeaking(true)).catch(() => playIntroAudio());
      } catch {
        playIntroAudio();
      }
      return;
    }

    playIntroAudio();
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-zinc-950 text-white">
      {/* ── Avatar layer (full-bleed, right-weighted) ───────────────────────── */}
      <div className="absolute inset-0">
        {/* Base layer: the cinematic photo (always present — also the video fallback) */}
        <img
          src={AVATAR_IMAGE}
          alt="Pavan Kalyan Ghanta"
          className="absolute inset-0 h-full w-full object-cover object-[62%_30%] md:object-[center_30%] opacity-90"
          loading="eager"
        />

        {/* Welcome video: fades in over the photo after VIDEO_START_MS */}
        {AVATAR_VIDEO && !videoFailed && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1500ms] ease-out ${
              videoLive ? 'opacity-90' : 'opacity-0'
            }`}
            src={AVATAR_VIDEO}
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
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
        onClick={meetMe}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group absolute right-6 md:right-[14%] top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3"
        aria-label={speaking ? 'Skip intro and open chat' : 'Meet me — hear my welcome in my own voice'}
      >
        <span className={`relative flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-md border shadow-2xl transition-all duration-300 group-hover:scale-110 ${
          speaking
            ? 'bg-gradient-to-br from-blue-500/40 to-purple-500/40 border-blue-300/60 shadow-blue-500/40'
            : 'bg-white/10 border-white/30 group-hover:bg-white/20'
        }`}>
          <span className={`absolute inset-0 rounded-full animate-ping ${speaking ? 'bg-blue-400/30 opacity-90' : 'bg-white/20 opacity-60'}`} />
          {speaking ? (
            <span className="relative flex items-end gap-[3px] h-6" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-white"
                  style={{ animation: `pulse 0.${6 + i}s ease-in-out infinite alternate`, height: `${8 + (i % 3) * 6}px` }}
                />
              ))}
            </span>
          ) : (
            <Play className="relative h-6 w-6 translate-x-0.5 fill-white" />
          )}
        </span>
        <span className={`text-xs font-medium tracking-wider uppercase transition-opacity duration-300 ${hovered || speaking ? 'opacity-100' : 'opacity-70'}`}>
          {speaking ? 'Speaking — tap to skip' : 'Tap to meet me'}
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
