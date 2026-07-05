import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────────────────────────────────────────────────────────────────────────
// INTRO CINEMA v3 — one pinned section, one continuous storyline, sized close
// to the original hero (no oversized cinema type). No foreground photo card —
// his photo lives as a soft ghost in the background alongside the floating
// domain-emoji badges, all animating gently throughout. Content order matches
// the original page copy exactly, just told beat-by-beat:
//   0  kicker (fade) + headline (per-letter spring "STUNNING"-style reveal)
//   1  intro paragraph — real typewriter (scrub-driven, reversible)
//   2  impact metrics — 3 panels wipe in via clip-path, numbers count up
//   3  "shipped to production" list — reveals one line at a time
//   4  closing line ("how I turn problems into products") + CTAs, pin releases
// Mobile / reduced-motion: natural stacked reveals, no pin, typewriter skipped
// in favor of an instant readable paragraph.
// ─────────────────────────────────────────────────────────────────────────────

const KICKER = 'AI Engineer · Full-Stack Developer · Product Builder';

const HEADLINE_WORDS = 'Turning real-world problems into deployed AI products and full-stack platforms across real-world domains.'.split(' ');
const HEADLINE_GRADIENT_FROM = 6; // "deployed" — index where the gradient begins
const HEADLINE_GRADIENT_TO = 9; // "products" — index where it ends (inclusive)

const INTRO_PARAGRAPH =
  "I'm an AI Engineer and Full-Stack Developer focused on taking real problems people face and turning them into deployed products. My motivation is simple: use technology to quietly reduce everyday friction.";

const STATS = [
  { end: 15, fmt: (v) => `${Math.round(v)}+`, label: 'AI & full-stack systems deployed to production', grad: 'from-blue-500 to-cyan-500' },
  { end: 200, fmt: (v) => `${Math.round(v)}+`, label: 'Students mentored in AI & software engineering', grad: 'from-purple-500 to-pink-500' },
  { end: 10000, fmt: (v) => `${Math.round(v).toLocaleString()}+`, label: 'People using my live safety & health systems', grad: 'from-emerald-500 to-lime-500' },
];

const RECEIPTS = [
  'Medical AI copilot decoding diagnoses into plain language',
  'Real-time crowd safety — live for 20,000+ at AfroTech',
  'HR automation tools saving teams 10+ hours weekly',
  'RAG knowledge engines running at 95%+ accuracy',
];

const CLOSING_LINES = [
  "Most of what I build starts as a pain point I've seen firsthand —",
  'confusing medical info, unsafe public spaces, overwhelming admin work —',
  'and ends as a product real teams actually rely on.',
];

const DOMAIN_BADGES = [
  { emoji: '❤️', top: '12%', left: '8%' },
  { emoji: '🔐', top: '18%', left: '88%' },
  { emoji: '👥', top: '78%', left: '6%' },
  { emoji: '📚', top: '82%', left: '90%' },
  { emoji: '♿', top: '6%', left: '48%' },
  { emoji: '✈️', top: '92%', left: '52%' },
];

const RESUME_URL = 'https://drive.google.com/file/d/1ZzsEtDdGER8rRoCCX9zFI3qQSAgfj50z/view?usp=sharing';

// Wrap words (or chars) of an element in spans for a spring pop-in. Real space
// characters are appended as plain text nodes — an inline-block span whose
// entire content is a single space collapses to zero width in most browsers,
// which was gluing words together ("AI Engineer" -> "AIEngineer").
function splitInto(el, unit) {
  const text = el.textContent;
  el.textContent = '';
  const frag = document.createDocumentFragment();
  const pieces = unit === 'word' ? text.split(' ') : [...text];
  pieces.forEach((p, i) => {
    if (unit === 'char' && p === ' ') {
      frag.appendChild(document.createTextNode(' '));
      return;
    }
    const s = document.createElement('span');
    s.textContent = p;
    s.dataset.piece = '';
    s.className = 'inline-block will-change-transform';
    frag.appendChild(s);
    if (unit === 'word' && i < pieces.length - 1) frag.appendChild(document.createTextNode(' '));
  });
  el.appendChild(frag);
}

export function IntroCinema() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Ambient background — floating badges + ghosted photo, always alive
      if (!reduced) {
        q('[data-badge]').forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -16 : 16,
            rotate: i % 2 === 0 ? 6 : -6,
            duration: 3.4 + i * 0.4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
        gsap.to(q('[data-ghost]'), {
          scale: 1.08,
          duration: 12,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      // Per-letter / per-word spring reveal — the "STUNNING" effect
      splitInto(q('[data-kicker-text]')[0], 'char');
      splitInto(q('[data-headline]')[0], 'word');

      const mm = gsap.matchMedia();

      // ── Desktop: pinned storyline, one idea on screen at a time ──────────
      // The letter-spring reveal fires as a quick ONE-SHOT burst the instant the
      // section pins (onEnter/onEnterBack) — NOT inside the scrubbed timeline.
      // Reason: scale-pop with back-easing overshoots visually, so if it were
      // scrub-linked, pausing mid-scroll freezes words mid-overshoot, overlapping
      // their neighbors ("deployed AI products" collides into itself). A short
      // real-time burst plays cleanly to completion, exactly like the reference
      // "STUNNING" demo (which isn't scroll-scrubbed either) — then scrolling
      // drives the rest (typewriter → metrics → systems → closing).
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(q('[data-kicker-avail]'), { autoAlpha: 0, y: 10 });
        gsap.set(q('[data-piece]'), { scale: 0, autoAlpha: 0 });
        gsap.set(q('[data-beat]'), { position: 'absolute', left: 0, right: 0, top: 0, autoAlpha: 0 });
        gsap.set(q('[data-beat-intro]'), { autoAlpha: 1 });
        gsap.set(q('[data-panel]'), { clipPath: 'inset(0 100% 0 0 round 20px)' });
        gsap.set(q('[data-receipt]'), { autoAlpha: 0, y: 18 });
        gsap.set(q('[data-closing-line]'), { yPercent: 115 });
        gsap.set(q('[data-ctas]'), { autoAlpha: 0, y: 18 });
        gsap.set(q('[data-typewriter]'), { autoAlpha: 1 });

        let burst;
        const playBurst = () => {
          burst?.kill();
          burst = gsap
            .timeline()
            .to(q('[data-kicker-avail]'), { autoAlpha: 1, y: 0, duration: 0.35 })
            .to(q('[data-kicker-text] [data-piece]'), { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2.2)', stagger: 0.016 }, '<')
            .to(q('h2 [data-piece]'), { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(1.8)', stagger: 0.03 }, '-=0.15');
        };

        const typeState = { n: 0 };
        const counts = STATS.map(() => ({ v: 0 }));
        const typeEl = q('[data-typewriter]')[0];

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=380%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onEnter: playBurst,
            onEnterBack: playBurst,
          },
        });

        tl
          .to({}, { duration: 0.3 }) // buffer so the burst has time to settle
          // BEAT 1 — typewriter intro paragraph
          .to(typeState, {
            n: INTRO_PARAGRAPH.length,
            duration: 1.8,
            ease: 'none',
            onUpdate: () => (typeEl.textContent = INTRO_PARAGRAPH.slice(0, Math.round(typeState.n))),
          })
          .to({}, { duration: 0.7 })
          .to(q('[data-beat-intro]'), { autoAlpha: 0, y: -24, duration: 0.5 })
          // BEAT 2 — impact metrics
          .set(q('[data-beat-metrics]'), { autoAlpha: 1 })
          .to(q('[data-panel]'), { clipPath: 'inset(0 0% 0 0 round 20px)', stagger: 0.25, duration: 0.85 })
          .to(
            counts,
            {
              v: (i) => STATS[i].end,
              duration: 1.3,
              ease: 'power1.out',
              onUpdate: function () {
                q('[data-count]').forEach((el, i) => (el.textContent = STATS[i].fmt(counts[i].v)));
              },
            },
            '<+=0.15'
          )
          .to({}, { duration: 0.6 })
          .to(q('[data-beat-metrics]'), { autoAlpha: 0, y: -24, duration: 0.5 })
          // BEAT 3 — production systems, one line at a time
          .set(q('[data-beat-systems]'), { autoAlpha: 1 })
          .to(q('[data-receipt]'), { autoAlpha: 1, y: 0, stagger: 0.28, duration: 0.5 })
          .to({}, { duration: 0.6 })
          .to(q('[data-beat-systems]'), { autoAlpha: 0, y: -24, duration: 0.5 })
          // BEAT 4 — closing line + CTAs
          .set(q('[data-beat-closing]'), { autoAlpha: 1 })
          .to(q('[data-closing-line]'), { yPercent: 0, stagger: 0.3, duration: 0.6 })
          .to(q('[data-ctas]'), { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.1')
          .to({}, { duration: 0.6 });
      });

      // ── Mobile / reduced-motion: natural stacked flow ─────────────────────
      mm.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-piece],[data-kicker-avail]'), { autoAlpha: 1, scale: 1, y: 0 });
        const typeEl = q('[data-typewriter]')[0];
        typeEl.textContent = INTRO_PARAGRAPH;
        q('[data-count]').forEach((el, i) => (el.textContent = STATS[i].fmt(STATS[i].end)));
        q('[data-closing-line]').forEach((el) => (el.style.transform = 'none'));

        if (reduced) return;
        gsap.utils.toArray(q('[data-mreveal]')).forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 22,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative w-full overflow-hidden bg-background text-foreground py-20 md:py-0">
      {/* Ambient background — ghosted photo + floating domain badges, kept subtle */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-30 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.13) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div
          data-ghost
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: "url('/avatar-hero.webp')",
            backgroundPosition: '62% 30%',
            opacity: 0.035,
            filter: 'grayscale(1) blur(6px)',
          }}
        />
        {DOMAIN_BADGES.map((b, i) => (
          <span
            key={i}
            data-badge
            className="absolute text-3xl md:text-5xl select-none hidden sm:block"
            style={{ top: b.top, left: b.left, opacity: 0.07, filter: 'grayscale(0.6)' }}
          >
            {b.emoji}
          </span>
        ))}
        <div className="absolute -top-24 right-[8%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-500/8 to-purple-500/8 blur-3xl" />
        <div className="absolute bottom-0 left-[4%] w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-pink-500/6 to-cyan-500/6 blur-3xl" />
        {/* Spotlight — guarantees the text column stays readable over the art */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 65% at center, var(--background) 45%, transparent 78%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 md:px-8 md:min-h-screen md:flex md:flex-col md:justify-center">
        {/* Kicker + headline — always visible, never part of a beat */}
        <p data-mreveal className="flex items-center justify-center gap-2.5 text-xs md:text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-5 text-center">
          <span data-kicker-avail className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Available for hire ·
          </span>
          <span data-kicker-text className="text-primary">{KICKER}</span>
        </p>

        <h2 data-headline data-mreveal className="text-center text-2xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.15] mb-10 md:mb-14">
          {HEADLINE_WORDS.map((w, i) => (
            <span key={i} className={i >= HEADLINE_GRADIENT_FROM && i <= HEADLINE_GRADIENT_TO ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent' : ''}>
              {w}{' '}
            </span>
          ))}
        </h2>

        {/* Storyline stage — beats stack on desktop (absolute), flow on mobile */}
        <div className="relative md:min-h-[210px]">
          {/* BEAT 1 — typewriter intro */}
          <div data-beat data-beat-intro data-mreveal className="md:absolute md:inset-0 mb-10 md:mb-0">
            <p className="text-center text-base md:text-lg lg:text-xl font-medium text-muted-foreground leading-relaxed">
              <span data-typewriter />
              <span className="inline-block w-[2px] h-[1em] bg-primary/70 ml-0.5 align-middle animate-pulse md:hidden" />
            </p>
          </div>

          {/* BEAT 2 — impact metrics */}
          <div data-beat data-beat-metrics className="md:absolute md:inset-0 mb-10 md:mb-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STATS.map((s, i) => (
                <div key={i} data-panel data-mreveal className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 text-center">
                  <div data-count className={`text-3xl md:text-4xl font-black tabular-nums bg-gradient-to-r ${s.grad} bg-clip-text text-transparent`}>0</div>
                  <p className="mt-2 text-[11px] md:text-xs font-medium text-muted-foreground leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BEAT 3 — shipped-to-production receipts */}
          <div data-beat data-beat-systems className="md:absolute md:inset-0 mb-10 md:mb-0">
            <p data-mreveal className="text-center text-[11px] md:text-xs font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-4">
              🚀 Production systems I've shipped
            </p>
            <ul className="space-y-2.5 max-w-xl mx-auto">
              {RECEIPTS.map((r) => (
                <li key={r} data-receipt data-mreveal className="flex items-start gap-3 text-sm md:text-base font-semibold">
                  <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* BEAT 4 — closing line + CTAs */}
          <div data-beat data-beat-closing className="md:absolute md:inset-0">
            <div className="text-center">
              {CLOSING_LINES.map((l) => (
                <span key={l} className="block overflow-hidden">
                  <span data-closing-line data-mreveal className="block text-sm md:text-base italic text-muted-foreground leading-relaxed">
                    {l}
                  </span>
                </span>
              ))}
              <div data-ctas data-mreveal className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:scale-[1.03] transition-transform">
                  Explore Projects
                </a>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-2.5 text-sm font-semibold hover:border-primary/50 hover:bg-primary/10 transition-colors">
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
