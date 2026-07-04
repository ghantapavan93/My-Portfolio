import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 2 — THE MANIFESTO. The section pins; the statement sits dimmed and
// lights up word by word as you scroll, highlighter-style. Gradient flares on
// the load-bearing phrases. Reduced-motion → fully lit, no pin.
// ─────────────────────────────────────────────────────────────────────────────

const SEGMENTS = [
  { t: 'I turn real problems into ' },
  { t: 'deployed AI products', hl: 'from-blue-400 via-purple-400 to-pink-400' },
  { t: '. Not demos that impress in slides — ' },
  { t: 'systems that survive real users', hl: 'from-emerald-400 to-cyan-400' },
  { t: ". I've shipped health coaching to " },
  { t: '270,000+ people', hl: 'from-blue-400 to-cyan-400' },
  { t: ', protected ' },
  { t: '20,000 at a live event', hl: 'from-purple-400 to-pink-400' },
  { t: ', and taught AI to hundreds. My rule is simple: ' },
  { t: "it's not done until real people rely on it.", hl: 'from-orange-400 to-pink-500' },
];

export function Manifesto() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const segs = gsap.utils.toArray('[data-seg]', root.current);
      const words = [];
      segs.forEach((el) => {
        const split = new SplitText(el, { type: 'words' });
        // bg-clip-text doesn't survive SplitText's wrappers — re-apply the
        // gradient onto each word so highlighted phrases stay visible.
        if (el.dataset.hl) {
          split.words.forEach((w) =>
            w.classList.add('bg-gradient-to-r', ...el.dataset.hl.split(' '), 'bg-clip-text', 'text-transparent')
          );
        }
        words.push(...split.words);
      });

      gsap.set(words, { opacity: 0.13 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
          },
        })
        .to(words, { opacity: 1, stagger: 0.06, ease: 'none' })
        .to({}, { duration: 0.6 }); // breath at the end while lit
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white flex items-center">
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.14) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-24">
        <p className="text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase text-white/35 mb-8">Chapter 01 · The rule I build by</p>
        <p className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight">
          {SEGMENTS.map((s, i) =>
            s.hl ? (
              <span key={i} data-seg data-hl={s.hl} className={`bg-gradient-to-r ${s.hl} bg-clip-text text-transparent`}>
                {s.t}
              </span>
            ) : (
              <span key={i} data-seg>
                {s.t}
              </span>
            )
          )}
        </p>
      </div>
    </section>
  );
}
