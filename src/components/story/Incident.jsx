import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 6 — THE INCIDENT. His real 2 a.m. war story, scroll-driven:
// the founder's 10:02 PM message → traffic spikes, alerts flood → his fixes
// deploy one by one → the graph calms → "stable by 2:00 AM."
// Reduced-motion / mobile-short: static composition, still legible.
// ─────────────────────────────────────────────────────────────────────────────

// Traffic curve: calm → violent spike → recovery
const GRAPH_PATH = 'M0,168 L60,164 L110,158 L150,140 L185,96 L215,52 L245,30 L275,44 L305,26 L335,58 L365,38 L400,70 L440,104 L490,136 L540,156 L600,164';

const ALERTS = [
  { id: 'a1', text: '⚠ LATENCY ↑ 4×', cls: 'text-red-400 border-red-500/40 bg-red-500/10' },
  { id: 'a2', text: '⚠ QUEUE BACKLOG', cls: 'text-red-400 border-red-500/40 bg-red-500/10' },
  { id: 'a3', text: '⚠ USERS SURGING', cls: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
];
const FIXES = [
  { id: 'f1', text: '✓ CACHE: ON' },
  { id: 'f2', text: '✓ PODS: SCALING' },
  { id: 'f3', text: '✓ FALLBACKS: LIVE' },
];

export function Incident() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const path = root.current.querySelector('[data-graph]');
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len });

      if (reduced) {
        gsap.set(path, { strokeDashoffset: 0 });
        gsap.set('[data-alert],[data-fix],[data-msg],[data-stable]', { opacity: 1 });
        return;
      }

      gsap.set(path, { strokeDashoffset: len });
      gsap.set('[data-alert],[data-fix],[data-stable]', { opacity: 0, y: 10 });
      gsap.set('[data-msg]', { opacity: 0, y: 16 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        })
        .to('[data-msg]', { opacity: 1, y: 0, duration: 0.6 })
        .to(path, { strokeDashoffset: len * 0.62, duration: 1.4, ease: 'none' }, '+=0.2')
        .to('[data-alert]', { opacity: 1, y: 0, stagger: 0.25, duration: 0.4 }, '<+=0.3')
        .to(path, { strokeDashoffset: len * 0.34, duration: 1.0, ease: 'none' })
        .to('[data-fix]', { opacity: 1, y: 0, stagger: 0.3, duration: 0.4 }, '<')
        .to('[data-alert]', { opacity: 0.25, duration: 0.5 }, '<+=0.4')
        .to(path, { strokeDashoffset: 0, duration: 1.2, ease: 'none' })
        .to('[data-stable]', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .to({}, { duration: 0.5 });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative min-h-screen w-full bg-zinc-950 text-white flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-emerald-950/20 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-24 w-full">
        <p className="text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase text-white/35 mb-3">A true story · 10 PM → 2 AM</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">
          The <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Incident</span>
        </h2>

        <div className="grid md:grid-cols-[300px_1fr] gap-6 md:gap-10 items-start">
          {/* The message */}
          <div className="space-y-4">
            <div data-msg className="rounded-2xl rounded-bl-sm border border-white/15 bg-white/[0.06] backdrop-blur-sm p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1.5">Founder · 10:02 PM</p>
              <p className="text-sm md:text-base font-medium">“Something is breaking.”</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {ALERTS.map((a) => (
                <span key={a.id} data-alert className={`px-3 py-1.5 rounded-full border text-[10px] md:text-xs font-bold tracking-wider ${a.cls}`}>
                  {a.text}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {FIXES.map((f) => (
                <span key={f.id} data-fix className="px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-[10px] md:text-xs font-bold tracking-wider">
                  {f.text}
                </span>
              ))}
            </div>
          </div>

          {/* The graph */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 text-[10px] md:text-xs font-mono text-white/40">
              <span>krowd-guide · live traffic</span>
              <span data-stable className="text-emerald-300 font-bold tracking-widest">STABLE — 2:00 AM ✓</span>
            </div>
            <svg viewBox="0 0 600 200" className="w-full h-40 md:h-56" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="incident-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="35%" stopColor="#f87171" />
                  <stop offset="60%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
              {[40, 80, 120, 160].map((y) => (
                <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              ))}
              <path data-graph d={GRAPH_PATH} fill="none" stroke="url(#incident-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-4 text-xs md:text-sm text-white/50 leading-relaxed max-w-2xl">
              Burst traffic at a live event — real attendees depending on the system. Isolated the failure domain, scaled past
              prototype limits, moved hot paths to cached insights and fallbacks. <span className="text-white/85 font-semibold">Before that night, scale was
              something I planned for. After it, it became something I respect.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
