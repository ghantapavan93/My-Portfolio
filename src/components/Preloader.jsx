import { useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Preloader — cinematic entrance shown on page load, before the hero.
// Name rises in letter-by-letter with a gradient shimmer, a light sweep line,
// then the whole curtain lifts to reveal the cinematic hero underneath.
// Click anywhere (or press Esc) to skip. Respects prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────────────────────

const HOLD_MS = 2100;  // how long the intro plays before the curtain lifts
const EXIT_MS = 700;   // curtain lift duration

const NAME = 'PAVAN KALYAN GHANTA';

export function Preloader() {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Skip the show entirely for users who prefer reduced motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hold = reduced ? 150 : HOLD_MS;

    const t1 = setTimeout(() => setExiting(true), hold);
    const t2 = setTimeout(() => setGone(true), hold + EXIT_MS);

    const skip = () => setExiting(true);
    const onKey = (e) => e.key === 'Escape' && skip();
    window.addEventListener('keydown', onKey);

    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  // Re-enable scroll + finish unmount once the exit transition ends
  useEffect(() => {
    if (!exiting) return;
    document.body.style.overflow = '';
    const t = setTimeout(() => setGone(true), EXIT_MS);
    return () => clearTimeout(t);
  }, [exiting]);

  if (gone) return null;

  let letterIndex = 0;

  return (
    <div
      onClick={() => setExiting(true)}
      className={`fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes pl-rise {
          0% { opacity: 0; transform: translateY(120%); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pl-sweep {
          0% { transform: scaleX(0); transform-origin: left; }
          100% { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes pl-fade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* Subtle brand glow behind the name */}
      <div className="absolute w-[560px] h-[560px] rounded-full bg-gradient-to-tr from-blue-600/15 via-purple-600/10 to-pink-600/15 blur-3xl" />

      {/* Kicker */}
      <p
        className="relative text-[10px] md:text-xs font-medium tracking-[0.5em] uppercase text-white/40 mb-5"
        style={{ animation: 'pl-fade 0.8s ease 0.15s both' }}
      >
        Portfolio · 2026
      </p>

      {/* Name — letters rise in with a stagger */}
      <h1 className="relative flex flex-wrap justify-center gap-x-4 md:gap-x-6 px-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
        {NAME.split(' ').map((word, w) => (
          <span key={w} className="inline-flex overflow-hidden pb-1">
            {word.split('').map((ch, c) => {
              const delay = 0.25 + letterIndex++ * 0.035;
              return (
                <span
                  key={c}
                  className={w === 1 ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent' : ''}
                  style={{ display: 'inline-block', animation: `pl-rise 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s both` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        ))}
      </h1>

      {/* Sweep line */}
      <div
        className="relative mt-6 h-px w-48 md:w-64 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{ animation: 'pl-sweep 1.1s cubic-bezier(0.76,0,0.24,1) 0.5s both' }}
      />

      {/* Subline */}
      <p
        className="relative mt-5 text-[11px] md:text-sm font-semibold tracking-[0.35em] uppercase text-white/50"
        style={{ animation: 'pl-fade 0.8s ease 1.05s both' }}
      >
        AI Engineer · Full-Stack Developer
      </p>

      <p
        className="absolute bottom-8 text-[10px] tracking-[0.3em] uppercase text-white/25"
        style={{ animation: 'pl-fade 0.8s ease 1.5s both' }}
      >
        Click to enter
      </p>
    </div>
  );
}
