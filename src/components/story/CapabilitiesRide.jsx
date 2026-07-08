import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 4 — THE RIDE. The page pins and three full-screen panels slide
// horizontally as you scroll vertically (desktop). Mobile/reduced-motion get a
// clean vertical stack. Content = the old capabilities snapshot, re-staged.
// ─────────────────────────────────────────────────────────────────────────────

const PANELS = [
  {
    no: '01',
    title: 'Building across',
    accent: 'from-blue-400 to-cyan-400',
    bar: 'from-blue-500 to-cyan-400',
    chips: [
      '❤️ HealthTech & Wellness', '🏥 Healthcare & Clinical AI', '🔐 Cybersecurity & Threat Intel',
      '👥 HR Tech & People Ops', '📚 EdTech & Learning', '♿ Accessibility & Inclusive Design',
      '✈️ Travel, Transit & Events', '💳 Finance & Pricing Systems', '🗺️ Real Estate & Location Intel',
      '🛠️ Developer Platforms', '🏗️ Engineering & Infrastructure', '🌍 Open to New Domains',
    ],
  },
  {
    no: '02',
    title: 'What I build',
    accent: 'from-purple-400 to-pink-400',
    bar: 'from-purple-500 to-pink-500',
    chips: [
      '🤖 AI Copilots & Assistants', '📚 RAG Systems & Knowledge Engines', '📊 Real-Time Dashboards',
      '🧩 Internal Tools & Admin Portals', '🧠 ML/LLM-Powered APIs', '🚀 Full-Stack MVPs & Platforms',
      '🌉 API & Data Integrations',
    ],
  },
  {
    no: '03',
    title: 'How I work',
    accent: 'from-emerald-400 to-lime-400',
    bar: 'from-emerald-500 to-lime-400',
    chips: [
      '🧑‍🤝‍🧑 Human-Centered & Empathy-Driven', '✅ Production-Ready & Tested', '🛰️ Observability-First',
      '🔐 Privacy & Security Conscious', '📏 Data-Driven & Metric-Focused', '🔁 Iterate Fast, Learn From Users',
    ],
  },
];

export function CapabilitiesRide() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const track = root.current.querySelector('[data-track]');
        gsap.to(track, {
          xPercent: -66.666,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=220%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        });
      });

      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray('[data-panel]', root.current).forEach((p) => {
          gsap.from(p.querySelectorAll('[data-chip]'), {
            opacity: 0,
            y: 14,
            stagger: 0.03,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: p, start: 'top 75%', once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative w-full bg-zinc-950 text-white overflow-hidden">
      <div data-track className="flex flex-col md:flex-row md:w-[300vw]">
        {PANELS.map((p) => (
          <div key={p.no} data-panel className="w-full md:w-screen md:h-screen flex items-center py-20 md:py-0">
            <div className="mx-auto max-w-4xl px-6 md:px-12 w-full">
              <div className="flex items-baseline gap-4 mb-2">
                <span className={`text-6xl md:text-8xl font-black bg-gradient-to-b ${p.accent} bg-clip-text text-transparent opacity-90`}>{p.no}</span>
                <span className={`inline-block h-10 w-1.5 rounded-full bg-gradient-to-b ${p.bar} translate-y-1`} />
              </div>
              <h3 className="text-3xl md:text-6xl font-black tracking-tight mb-8">{p.title}</h3>
              <div className="flex flex-wrap gap-2.5">
                {p.chips.map((c) => (
                  <span
                    key={c}
                    data-chip
                    className="px-3.5 py-2 rounded-full text-xs md:text-sm font-medium bg-white/[0.05] border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors duration-300 cursor-default"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.35em] uppercase text-white/25">
        Keep scrolling — the page drives
      </p>
    </section>
  );
}
