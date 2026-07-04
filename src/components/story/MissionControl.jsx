import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 3 — MISSION CONTROL. His numbers presented the way he builds:
// a boot sequence, instrument dials counting up, and a receipts ticker.
// "Receipts, not promises" — made visual.
// ─────────────────────────────────────────────────────────────────────────────

const BOOT_LINES = [
  '▸ boot .. pavan/portfolio v2026.07',
  '▸ loading deployments ......... ✓ 15+ systems live',
  '▸ syncing wearable pipeline ... ✓ 99% sync success',
  '▸ eval gates .................. ✓ groundedness 97%',
  '▸ status: ALL SYSTEMS OPERATIONAL',
];

const METRICS = [
  { end: 270, format: (v) => `${Math.round(v)}K+`, label: 'users on platforms he builds', accent: 'from-blue-500 to-cyan-500' },
  { end: 99.95, format: (v) => `${v.toFixed(2)}%`, label: 'uptime — Krowd Guide live pilot', accent: 'from-emerald-500 to-lime-500' },
  { end: 274, format: (v) => `${Math.round(v)}ms`, label: 'p95 @ 1,200+ concurrent (Vosyn)', accent: 'from-purple-500 to-pink-500' },
  { end: 2, format: (v) => `${Math.round(v)}%`, label: 'hallucination rate — down from 8%', accent: 'from-orange-500 to-red-500' },
  { end: 20, format: (v) => `${Math.round(v)}K`, label: 'people protected at AfroTech', accent: 'from-cyan-500 to-blue-500' },
  { end: 200, format: (v) => `${Math.round(v)}+`, label: 'students mentored in AI', accent: 'from-pink-500 to-purple-500' },
];

const RECEIPTS = [
  '270K+ USERS SERVED', '99.95% UPTIME', '274MS P95', 'HALLUCINATIONS 8% → 2%',
  '20,000 PROTECTED AT AFROTECH', '15+ SYSTEMS IN PRODUCTION', '+53% AI SUBMISSIONS',
  '200+ ENGINEERS MENTORED', 'STEM OPT THROUGH 2028', 'RECEIPTS, NOT PROMISES',
];

export function MissionControl() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Receipts ticker — endless drift (slow, dignified)
      if (!reduced) {
        gsap.to('[data-ticker]', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
      }

      if (reduced) {
        gsap.utils.toArray('[data-metric-num]', root.current).forEach((el, i) => {
          el.textContent = METRICS[i].format(METRICS[i].end);
        });
        return;
      }

      // Boot lines type in
      gsap.from('[data-boot-line]', {
        opacity: 0,
        y: 8,
        stagger: 0.28,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-boot]', start: 'top 75%', once: true },
      });

      // Instruments count up
      gsap.utils.toArray('[data-metric-num]', root.current).forEach((el, i) => {
        const m = METRICS[i];
        const state = { v: 0 };
        gsap.to(state, {
          v: m.end,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => (el.textContent = m.format(state.v)),
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // Section sweeps in via clip-path
      gsap.from('[data-console]', {
        clipPath: 'inset(12% 6% 12% 6% round 32px)',
        opacity: 0.4,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative w-full bg-zinc-950 text-white py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <p className="text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase text-white/35 mb-3">Chapter 02 · Proof over promises</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">
          Mission <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Control</span>
        </h2>

        <div data-console className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          {/* Boot terminal */}
          <div data-boot className="px-6 md:px-8 py-6 border-b border-white/10 font-mono text-[11px] md:text-sm text-emerald-400/90 space-y-1.5">
            {BOOT_LINES.map((l) => (
              <p key={l} data-boot-line className={l.includes('OPERATIONAL') ? 'text-emerald-300 font-bold' : ''}>
                {l}
              </p>
            ))}
          </div>

          {/* Instruments */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
            {METRICS.map((m, i) => (
              <div key={i} className="bg-zinc-950/90 p-6 md:p-8">
                <div data-metric-num className={`text-3xl md:text-5xl font-black bg-gradient-to-r ${m.accent} bg-clip-text text-transparent tabular-nums`}>
                  0
                </div>
                <p className="mt-2 text-[11px] md:text-xs text-white/45 font-medium uppercase tracking-wider">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Receipts ticker */}
      <div className="mt-14 border-y border-white/10 bg-white/[0.02] py-3 overflow-hidden" aria-hidden="true">
        <div data-ticker className="flex whitespace-nowrap w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex">
              {RECEIPTS.map((r) => (
                <span key={`${dup}-${r}`} className="mx-6 text-[11px] md:text-xs font-bold tracking-[0.25em] text-white/40">
                  {r} <span className="mx-3 text-white/15">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
