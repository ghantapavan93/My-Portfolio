import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5 — THE ARSENAL. Two infinite marquee rows drifting in opposite
// directions; scroll fast and they whoosh with you (velocity-reactive).
// ─────────────────────────────────────────────────────────────────────────────

const ROW_A = ['React', 'Next.js', 'TypeScript', 'React Native', 'Tailwind CSS', 'Node.js', 'FastAPI', 'Flask', 'GraphQL', 'gRPC', 'PostgreSQL', 'MongoDB'];
const ROW_B = ['LangChain', 'LangGraph', 'RAG', 'PyTorch', 'Gemini', 'OpenAI', 'FAISS', 'Pinecone', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'MLflow'];

function Row({ items, dataAttr, dim }) {
  return (
    <div className="overflow-hidden py-3">
      <div {...{ [dataAttr]: true }} className="flex w-max whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center">
            {items.map((t) => (
              <span key={`${dup}-${t}`} className={`mx-5 md:mx-8 text-2xl md:text-5xl font-black tracking-tight ${dim ? 'text-white/15' : 'text-white/70'} hover:text-white transition-colors duration-300`}>
                {t}
                <span className="mx-5 md:mx-8 text-white/10 text-xl md:text-3xl align-middle">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const a = gsap.to('[data-row-a]', { xPercent: -50, duration: 34, ease: 'none', repeat: -1 });
      const b = gsap.fromTo('[data-row-b]', { xPercent: -50 }, { xPercent: 0, duration: 38, ease: 'none', repeat: -1 });

      // Scroll velocity → marquee speed boost, decaying back to cruise
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(1, 7, Math.abs(self.getVelocity()) / 250);
          gsap.to([a, b], {
            timeScale: boost,
            duration: 0.2,
            overwrite: true,
            onComplete: () => gsap.to([a, b], { timeScale: 1, duration: 1.2, ease: 'power2.out' }),
          });
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative w-full bg-zinc-950 text-white py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-12 mb-10">
        <p className="text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase text-white/35 mb-3">Chapter 03 · The arsenal</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          Tools I <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">ship with</span>
          <span className="ml-4 text-sm md:text-base font-semibold text-white/30 align-middle">(scroll fast — they feel it)</span>
        </h2>
      </div>
      <div className="-rotate-1">
        <Row items={ROW_A} dataAttr="data-row-a" />
        <Row items={ROW_B} dataAttr="data-row-b" dim />
      </div>
    </section>
  );
}
