import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────────────────────────────────────────────────────────────────────────
// INTRO CINEMA — one pin, four beats. A single scrubbed timeline; the screen
// holds ONE idea at a time (the fix vs. the rejected wall-of-text version):
//   1 Reveal   — kicker + two masked headline lines
//   2 Clip     — portrait wipes in via clip-path circle; paragraph lines reveal
//   3 Numbers  — three stat panels wipe in and count up
//   4 Receipts — shipped-list reveals; CTAs; pin releases
// Desktop: pinned cinema. Mobile / reduced-motion: clean stacked reveals.
// ─────────────────────────────────────────────────────────────────────────────

const PARA_LINES = [
  'I take problems people actually face',
  'and turn them into shipped products —',
  'APIs, copilots, and full-stack platforms',
  'reliable in production, not just in demos.',
];

const STATS = [
  { end: 15, fmt: (v) => `${Math.round(v)}+`, label: 'systems live in production', grad: 'from-blue-400 to-cyan-400' },
  { end: 270, fmt: (v) => `${Math.round(v)}K+`, label: 'users on platforms I build', grad: 'from-purple-400 to-pink-400' },
  { end: 200, fmt: (v) => `${Math.round(v)}+`, label: 'engineers mentored in AI', grad: 'from-emerald-400 to-lime-400' },
];

const RECEIPTS = [
  'Medical AI copilot — diagnoses in plain language',
  'Crowd safety, live for 20,000+ at AfroTech',
  'HR automation — 10+ hours saved weekly',
  'RAG knowledge engines — 95%+ accuracy',
];

function openAgent() {
  window.dispatchEvent(new Event('open-ai-agent'));
}

export function IntroCinema() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // ── Desktop cinema ────────────────────────────────────────────────────
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        // Stage the scenes on top of each other (JS-only, so mobile keeps flow)
        gsap.set(q('[data-stage]'), { minHeight: '100vh' });
        gsap.set(q('[data-scene]'), { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' });

        gsap.set(q('[data-kicker]'), { autoAlpha: 0, y: 18 });
        gsap.set(q('[data-line]'), { yPercent: 115 });
        gsap.set(q('[data-para]'), { yPercent: 115 });
        gsap.set(q('[data-portrait]'), { clipPath: 'circle(0% at 68% 42%)' });
        gsap.set(q('[data-scene3],[data-scene4]'), { autoAlpha: 0 });
        gsap.set(q('[data-panel]'), { clipPath: 'inset(0 100% 0 0 round 24px)' });
        gsap.set(q('[data-receipt],[data-r-head],[data-ctas]'), { autoAlpha: 0, y: 24 });

        const counts = STATS.map(() => ({ v: 0 }));

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        tl
          // BEAT 1 — the reveal
          .to(q('[data-kicker]'), { autoAlpha: 1, y: 0, duration: 0.5 })
          .to(q('[data-line]'), { yPercent: 0, stagger: 0.25, duration: 0.8 }, '<+=0.2')
          .to({}, { duration: 0.5 })
          // BEAT 2 — clip-path portrait + paragraph
          .to(q('[data-portrait]'), { clipPath: 'circle(70% at 55% 45%)', duration: 1.4, ease: 'power2.inOut' })
          .to(q('[data-para]'), { yPercent: 0, stagger: 0.35, duration: 0.7 }, '<+=0.3')
          .to({}, { duration: 0.7 })
          // exit scene 1+2
          .to(q('[data-scene12]'), { autoAlpha: 0, y: -70, duration: 0.8, ease: 'power2.in' })
          // BEAT 3 — the numbers
          .set(q('[data-scene3]'), { autoAlpha: 1 })
          .to(q('[data-panel]'), { clipPath: 'inset(0 0% 0 0 round 24px)', stagger: 0.3, duration: 0.9 })
          .add(() => {}, '<')
          .to(
            counts,
            {
              v: (i) => STATS[i].end,
              duration: 1.4,
              ease: 'power1.out',
              onUpdate: function () {
                q('[data-count]').forEach((el, i) => (el.textContent = STATS[i].fmt(counts[i].v)));
              },
            },
            '<'
          )
          .to({}, { duration: 0.7 })
          // exit scene 3
          .to(q('[data-scene3]'), { autoAlpha: 0, scale: 0.96, duration: 0.7, ease: 'power2.in' })
          // BEAT 4 — receipts + CTAs
          .set(q('[data-scene4]'), { autoAlpha: 1 })
          .to(q('[data-r-head]'), { autoAlpha: 1, y: 0, duration: 0.5 })
          .to(q('[data-receipt]'), { autoAlpha: 1, y: 0, stagger: 0.25, duration: 0.6 }, '<+=0.2')
          .to(q('[data-ctas]'), { autoAlpha: 1, y: 0, duration: 0.6 })
          .to({}, { duration: 0.6 });

        // Parallax dust behind everything
        gsap.to(q('[data-glow-a]'), { yPercent: -25, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: '+=300%', scrub: true } });
        gsap.to(q('[data-glow-b]'), { yPercent: 20, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: '+=300%', scrub: true } });
      });

      // ── Mobile / reduced-motion: stacked, gentle once-reveals ─────────────
      mm.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        q('[data-count]').forEach((el, i) => (el.textContent = STATS[i].fmt(STATS[i].end)));
        if (reduced) return;
        gsap.utils.toArray(q('[data-mreveal]')).forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 26,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative w-full overflow-hidden bg-background text-foreground">
      {/* Parallax backdrop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-40 dark:opacity-25" style={{ backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.14) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div data-glow-a className="absolute -top-24 right-[8%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-500/15 to-purple-500/15 blur-3xl" />
        <div data-glow-b className="absolute bottom-0 left-[4%] w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-pink-500/10 to-cyan-500/10 blur-3xl" />
      </div>

      <div data-stage className="relative mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-0">
        {/* SCENES 1+2 */}
        <div data-scene data-scene12 className="relative">
          <div className="grid md:grid-cols-[1.25fr_1fr] gap-10 items-center w-full">
            <div data-mreveal>
              <p data-kicker className="flex items-center gap-2.5 text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                Available · AI Engineer · Full-Stack · Product
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02]">
                <span className="block overflow-hidden pb-1">
                  <span data-line className="block">Turning real problems</span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span data-line className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    into deployed AI products.
                  </span>
                </span>
              </h2>
              <div className="mt-7 space-y-1 text-base md:text-xl font-medium text-muted-foreground">
                {PARA_LINES.map((l) => (
                  <span key={l} className="block overflow-hidden">
                    <span data-para className="block">{l}</span>
                  </span>
                ))}
              </div>
            </div>
            <div data-mreveal className="hidden md:block">
              <div
                data-portrait
                className="aspect-[4/5] w-full max-w-[380px] ml-auto rounded-3xl border border-white/10 shadow-2xl shadow-primary/10 bg-cover bg-center"
                style={{ backgroundImage: 'url(/avatar-hero.webp)', backgroundPosition: '62% 30%' }}
                role="img"
                aria-label="Pavan at his desk"
              />
            </div>
          </div>
        </div>

        {/* SCENE 3 — the numbers */}
        <div data-scene data-scene3 className="relative mt-16 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {STATS.map((s, i) => (
              <div key={i} data-panel data-mreveal className="rounded-3xl border border-border/60 bg-card/60 backdrop-blur-sm p-8 md:p-10">
                <div data-count className={`text-5xl md:text-7xl font-black tabular-nums bg-gradient-to-r ${s.grad} bg-clip-text text-transparent`}>0</div>
                <p className="mt-3 text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SCENE 4 — receipts + CTAs */}
        <div data-scene data-scene4 className="relative mt-16 md:mt-0">
          <div className="max-w-3xl">
            <p data-r-head data-mreveal className="text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Shipped to production
            </p>
            <ul className="space-y-4">
              {RECEIPTS.map((r) => (
                <li key={r} data-receipt data-mreveal className="flex items-start gap-3 text-lg md:text-2xl font-bold tracking-tight">
                  <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  {r}
                </li>
              ))}
            </ul>
            <div data-ctas data-mreveal className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:scale-[1.03] transition-transform"
              >
                Explore the projects
              </a>
              <button
                onClick={openAgent}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold hover:border-primary/50 hover:bg-primary/10 transition-colors"
              >
                Ask GPK anything
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
