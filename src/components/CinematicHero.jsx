import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, ArrowDown, MessageSquare, Sparkles } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// CinematicHero — full-screen video-first hero.
//
// The welcome video autoplays MUTED right after the preloader (browsers block
// un-muted autoplay — no way around that). A speaker button invites sound:
// tap → the video restarts with Pavan's voice; when it ends the AI agent opens.
// Ignore it and the reel just keeps looping silently. Overlay UI is deliberately
// low-key (ghost/glass, brightens on hover) so the video is the star.
// ─────────────────────────────────────────────────────────────────────────────

const AVATAR_IMAGE = '/avatar-hero.webp';  // poster + fallback if the video can't play
const AVATAR_VIDEO = '/avatar-welcome.mp4';
// true  = lip-synced talking clip: the speaker button replays it UNMUTED.
// false = ambient motion clip: it keeps looping silently and the cloned-voice
//         intro.wav plays over it instead.
const AVATAR_VIDEO_TALKS = true;
const INTRO_AUDIO = '/voice/intro.wav';

function openAgent() {
  window.dispatchEvent(new Event('open-ai-agent'));
}

function scrollToContent() {
  const el = document.getElementById('projects') || window;
  el === window ? window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
                : el.scrollIntoView({ behavior: 'smooth' });
}

export function CinematicHero() {
  const [soundOn, setSoundOn] = useState(false);
  const [videoLive, setVideoLive] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => () => audioRef.current?.pause(), []);

  const playIntroAudio = () => {
    try {
      const audio = new Audio(INTRO_AUDIO);
      audioRef.current = audio;
      audio.onended = () => { setSoundOn(false); openAgent(); };
      audio.onerror = () => setSoundOn(false);
      audio.play().then(() => setSoundOn(true)).catch(() => {});
    } catch { /* stay silent */ }
  };

  // Speaker toggle:
  // • sound OFF → restart the talking video un-muted (or play the wav intro over
  //   an ambient clip); when it finishes, drop back to the silent loop and open the chat.
  // • sound ON → mute back to the silent loop.
  const toggleSound = () => {
    const v = videoRef.current;

    if (soundOn) {
      if (v) { v.muted = true; v.loop = true; v.play().catch(() => {}); }
      audioRef.current?.pause();
      setSoundOn(false);
      return;
    }

    if (AVATAR_VIDEO && v && AVATAR_VIDEO_TALKS && !videoFailed) {
      try {
        v.currentTime = 0;
        v.muted = false;
        v.loop = false;
        v.onended = () => {
          v.muted = true;
          v.loop = true;
          v.play().catch(() => {});
          setSoundOn(false);
          openAgent();
        };
        v.play().then(() => setSoundOn(true)).catch(() => playIntroAudio());
      } catch {
        playIntroAudio();
      }
      return;
    }

    playIntroAudio();
  };

  return (
    <section className="group/hero relative min-h-[100svh] w-full overflow-hidden bg-zinc-950 text-white">
      {/* ── Media layer ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        {/* Poster/fallback under the video (covers buffering + failure) */}
        <img
          src={AVATAR_IMAGE}
          alt="Pavan Kalyan Ghanta"
          className="absolute inset-0 h-full w-full object-cover object-[62%_30%] md:object-[center_30%]"
          loading="eager"
        />

        {/* Welcome video — starts immediately, muted, and fades in as it plays */}
        {AVATAR_VIDEO && !videoFailed && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-out ${
              videoLive ? 'opacity-100' : 'opacity-0'
            }`}
            src={AVATAR_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setVideoLive(true)}
            onError={() => setVideoFailed(true)}
          />
        )}

        {/* Cinematic grade — lighter than before so the video shines */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/40 md:via-zinc-950/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
      </div>

      {/* ── Speaker button — the one loud affordance ────────────────────────── */}
      <button
        onClick={toggleSound}
        className="absolute right-6 md:right-[10%] top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 opacity-80 hover:opacity-100 transition-opacity duration-300"
        aria-label={soundOn ? 'Mute' : 'Unmute — hear my welcome in my own voice'}
      >
        <span className={`relative flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
          soundOn
            ? 'bg-white/15 border-white/50 shadow-xl shadow-blue-500/20'
            : 'bg-white/10 border-white/25 hover:bg-white/20'
        }`}>
          {!soundOn && <span className="absolute inset-0 rounded-full bg-white/15 animate-ping opacity-50" />}
          {soundOn ? (
            <Volume2 className="relative h-5 w-5" />
          ) : (
            <VolumeX className="relative h-5 w-5" />
          )}
        </span>
        <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/70">
          {soundOn ? 'Mute' : 'Hear me out'}
        </span>
      </button>

      {/* ── Overlay content — ghost-quiet, brightens on hover ──────────────── */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="mb-5 opacity-40 group-hover/hero:opacity-90 transition-opacity duration-700">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/10 px-3 py-1.5 text-[10px] font-medium tracking-[0.3em] uppercase text-white/70">
            <Sparkles className="h-3 w-3 text-blue-300/80" />
            AI avatar · my real voice
          </span>
        </div>

        <p className="text-xs font-medium tracking-[0.35em] uppercase text-white/30 mb-4 opacity-70 group-hover/hero:opacity-100 transition-opacity duration-700">
          Portfolio · 2026
        </p>

        <h1 className="font-black tracking-tighter leading-[0.85] text-5xl md:text-7xl lg:text-8xl opacity-85 group-hover/hero:opacity-100 transition-opacity duration-700">
          <span className="block text-white/90">Pavan</span>
          <span className="block bg-gradient-to-r from-blue-400/90 via-purple-400/90 to-pink-400/90 bg-clip-text text-transparent">
            Kalyan Ghanta
          </span>
        </h1>

        <p className="mt-5 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/40 opacity-80 group-hover/hero:opacity-100 transition-opacity duration-700">
          AI Engineer · Full-Stack Developer · GenAI
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 opacity-60 group-hover/hero:opacity-100 transition-opacity duration-700">
          <button
            onClick={openAgent}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md px-5 py-2.5 text-xs font-semibold tracking-wide text-white/90 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600/80 hover:to-purple-600/80 hover:border-transparent hover:scale-[1.03]"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Talk to me
          </button>
          <button
            onClick={scrollToContent}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md px-5 py-2.5 text-xs font-semibold tracking-wide text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            View my work
          </button>
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────────────────── */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-7 left-6 md:left-12 lg:left-20 z-10 flex items-center gap-3 text-white/30 hover:text-white/70 transition-colors duration-300"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase">Scroll</span>
        <span className="relative block h-9 w-px bg-white/20 overflow-hidden">
          <span className="absolute top-0 left-0 h-1/2 w-full bg-white/70 animate-[bounce_1.8s_ease-in-out_infinite]" />
        </span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </button>
    </section>
  );
}
