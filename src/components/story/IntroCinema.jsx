import { useRef } from 'react';
import { Plus, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────────────────────────────────────────────────────────────────────────
// INTRO CINEMA v5 — one pinned section, one continuous storyline. Each beat gets
// its own signature text effect (all recreated natively in GSAP, no new deps):
//   0  kicker + framed animated-gradient roles + big spring headline (STUNNING)
//   1  intro statement — HERO-SHUTTER reveal (each line opens like a shutter)
//   2  impact metrics — clip-path panels wipe in, numbers count up
//   3  systems shipped — TYPEWRITER (types line-by-line with a blinking caret)
//   4  closing line — TEXT-ANIMATION (per-word blur-in), then CTAs
// Background is alive with zero scrolling (drifting badges, breathing ghost
// portrait, wandering glow blobs, cycling role gradients).
// Mobile / reduced-motion: natural stacked reveals, effects settled to final.
// ─────────────────────────────────────────────────────────────────────────────

// Roles — Vercel "Develop. Preview. Ship." style animated cycling gradients.
const ROLES = [
  { t: 'AI Engineer', grad: 'from-[#007cf0] to-[#00dfd8]', delay: '0s' },
  { t: 'Full-Stack Developer', grad: 'from-[#7928ca] to-[#ff0080]', delay: '3s' },
  { t: 'Product Builder', grad: 'from-[#ff4d4d] to-[#f9cb28]', delay: '6s' },
];

const HEADLINE_TEXT = 'Turning real-world problems into deployed AI products and full-stack platforms across real-world domains.';
const HEADLINE_GRADIENT_WORDS = [4, 5, 6]; // "deployed AI products"
const HEADLINE_GRADIENT_CLASSES = ['bg-gradient-to-r', 'from-blue-500', 'via-purple-500', 'to-pink-500', 'bg-clip-text', 'text-transparent'];

// Intro statement, broken into shutter lines (his exact wording, key lines lit).
const INTRO_LINES = [
  { t: "I'm an AI Engineer & Full-Stack Developer", hl: 'from-blue-500 via-purple-500 to-pink-500' },
  { t: 'focused on taking real problems people face' },
  { t: 'and turning them into deployed products.' },
  { t: 'My motivation is simple — use technology' },
  { t: 'to quietly reduce everyday friction.', hl: 'from-emerald-500 to-cyan-500' },
];

const STATS = [
  { end: 15, fmt: (v) => `${Math.round(v)}+`, label: 'AI & full-stack systems deployed to production', grad: 'from-blue-500 to-cyan-500' },
  { end: 200, fmt: (v) => `${Math.round(v)}+`, label: 'Students mentored in AI & software engineering', grad: 'from-purple-500 to-pink-500' },
  { end: 10000, fmt: (v) => `${Math.round(v).toLocaleString()}+`, label: 'People using my live safety & health systems', grad: 'from-emerald-500 to-lime-500' },
];

const SYS_HEADING = "Systems I've shipped to production";
const RECEIPTS = [
  'Medical AI copilot — turns dense diagnoses into plain English',
  'Real-time crowd-safety platform — live for 20,000+ at AfroTech',
  'HR automation suite — hands 10+ hours a week back to teams',
  'RAG knowledge engines — answering at 95%+ accuracy in prod',
];
const SYS_TOTAL = RECEIPTS.reduce((n, r) => n + r.length, 0);

const CLOSING_PARAGRAPH =
  'Most of what I build starts as a personal or observed pain point—confusing medical information, unsafe public spaces, overwhelming admin work—and ends as a working product with real users. I enjoy the full lifecycle: listening to problems, shaping them into clear product ideas, designing data and AI workflows, building the backend and UI, wiring in observability, and iterating until the solution genuinely helps people and the teams who run it.';

const DOMAIN_BADGES = [
  { emoji: '❤️', top: '12%', left: '8%' },
  { emoji: '🔐', top: '18%', left: '88%' },
  { emoji: '👥', top: '78%', left: '6%' },
  { emoji: '📚', top: '82%', left: '90%' },
  { emoji: '♿', top: '6%', left: '48%' },
  { emoji: '✈️', top: '92%', left: '52%' },
];

const RESUME_URL = 'https://drive.google.com/file/d/1ZzsEtDdGER8rRoCCX9zFI3qQSAgfj50z/view?usp=sharing';

// Wrap each word of an element in a span for the spring pop. Spaces stay as text
// nodes (an inline-block span holding only a space collapses to zero width and
// glues words together). Gradient styling is applied here — NOT as JSX children,
// because this rebuilds the element from textContent and would wipe pre-rendered
// child spans.
function splitWords(el, gradientWords = [], gradientClasses = []) {
  const text = el.textContent.trim();
  el.textContent = '';
  const frag = document.createDocumentFragment();
  const words = text.split(/\s+/);
  words.forEach((w, i) => {
    if (w === '') return;
    const s = document.createElement('span');
    s.textContent = w;
    s.dataset.piece = '';
    s.className = 'inline-block will-change-transform';
    if (gradientWords.includes(i)) s.classList.add(...gradientClasses);
    frag.appendChild(s);
    if (i < words.length - 1) frag.appendChild(document.createTextNode(' '));
  });
  el.appendChild(frag);
}

export function IntroCinema() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Ambient background — always alive, scroll or no scroll.
      if (!reduced) {
        q('[data-badge]').forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -26 : 26,
            x: i % 3 === 0 ? 14 : -12,
            rotate: i % 2 === 0 ? 10 : -10,
            duration: 3.2 + i * 0.55,
            delay: i * 0.3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
        gsap.to(q('[data-ghost]'), { scale: 1.1, duration: 14, ease: 'sine.inOut', repeat: -1, yoyo: true });
        gsap.to(q('[data-glow-a]'), { x: -44, y: 32, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true });
        gsap.to(q('[data-glow-b]'), { x: 38, y: -26, duration: 11, ease: 'sine.inOut', repeat: -1, yoyo: true });
      }

      // Headline → per-word spring reveal (the "STUNNING" effect).
      splitWords(q('[data-headline]')[0], HEADLINE_GRADIENT_WORDS, HEADLINE_GRADIENT_CLASSES);

      // Shared refs for the typewriter beat.
      const heading = q('[data-tw-heading]')[0];
      const twEls = q('[data-tw]');
      const twLines = q('[data-tw-line]');
      const caret = q('[data-tw-caret]')[0];

      const typeHeading = (state) => {
        heading.textContent = SYS_HEADING.slice(0, Math.round(state.n));
        heading.appendChild(caret);
      };
      const typeStream = (state) => {
        let remaining = Math.round(state.typed);
        let active = -1;
        RECEIPTS.forEach((full, i) => {
          const take = Math.max(0, Math.min(remaining, full.length));
          twEls[i].textContent = full.slice(0, take);
          twLines[i].style.opacity = take > 0 ? '1' : '0';
          if (take > 0 && take < full.length && active === -1) active = i;
          remaining -= take;
        });
        if (active === -1) active = Math.round(state.typed) >= SYS_TOTAL ? RECEIPTS.length - 1 : 0;
        twEls[active].appendChild(caret);
      };

      const mm = gsap.matchMedia();

      // ── Desktop: pinned storyline, one beat + one effect at a time ────────
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(q('[data-kicker-avail]'), { autoAlpha: 0, y: 10 });
        gsap.set(q('[data-roles-frame]'), { autoAlpha: 0, y: 14 });
        gsap.set(q('[data-role]'), { scale: 0.4, autoAlpha: 0 });
        gsap.set(q('[data-piece]'), { scale: 0, autoAlpha: 0 });

        // Every beat (hero included) is an absolute, full-stage layer; only one
        // is lit at a time so each idea owns the whole centred screen.
        gsap.set(q('[data-beat]'), { autoAlpha: 0 });
        gsap.set(q('[data-beat-hero]'), { autoAlpha: 1 });
        // shutter: each line clipped to a centre slit, blurred, ready to open
        gsap.set(q('[data-iline]'), { clipPath: 'inset(50% 0 50% 0)', filter: 'blur(6px)', yPercent: 10 });
        gsap.set(q('[data-panel]'), { clipPath: 'inset(0 100% 0 0 round 20px)' });
        twEls.forEach((el) => (el.textContent = ''));
        twLines.forEach((el) => (el.style.opacity = '0'));
        heading.textContent = '';
        gsap.set(q('[data-cline]'), { autoAlpha: 0, y: 18 });
        gsap.set(q('[data-ctas]'), { autoAlpha: 0, y: 18 });

        // Letter/roles spring reveal fires as a one-shot burst when the section
        // pins (NOT scrub-linked — scale-pop overshoot freezes ugly mid-scrub).
        let burst;
        const playBurst = () => {
          burst?.kill();
          burst = gsap
            .timeline()
            .to(q('[data-kicker-avail]'), { autoAlpha: 1, y: 0, duration: 0.3 })
            .to(q('[data-roles-frame]'), { autoAlpha: 1, y: 0, duration: 0.35 }, '<+=0.05')
            .to(q('[data-role]'), { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.14 }, '<+=0.1')
            .to(q('h2 [data-piece]'), { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(1.8)', stagger: 0.03 }, '-=0.15');
        };

        const stage = q('[data-stage]')[0];
        const hState = { n: 0 };
        const sState = { typed: 0 };
        const counts = STATS.map(() => ({ v: 0 }));

        gsap
          .timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              // Pin ONLY the cinematic stage — so when it releases, the resolved
              // view below scrolls in normally as one complete section.
              trigger: stage,
              start: 'top top',
              end: '+=480%',
              pin: stage,
              scrub: 0.6,
              anticipatePin: 1,
              onEnter: playBurst,
              onEnterBack: playBurst,
            },
          })
          // BEAT 0 — hero (kicker + roles + headline); burst reveals it on enter
          .to({}, { duration: 1.0 }) // hold the headline while the burst settles + reads
          .to(q('[data-beat-hero]'), { autoAlpha: 0, y: -24, duration: 0.5 })
          // BEAT 1 — HERO-SHUTTER: lines open from a centre slit
          .set(q('[data-beat-intro]'), { autoAlpha: 1 })
          .to(q('[data-iline]'), { clipPath: 'inset(0% 0 0% 0)', filter: 'blur(0px)', yPercent: 0, stagger: 0.22, duration: 0.6 })
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
          // BEAT 3 — TYPEWRITER: heading types, then each line types with a caret
          .set(q('[data-beat-systems]'), { autoAlpha: 1 })
          .to(hState, { n: SYS_HEADING.length, duration: 0.7, ease: 'none', onUpdate: () => typeHeading(hState) })
          .to(sState, { typed: SYS_TOTAL, duration: 2.0, ease: 'none', onUpdate: () => typeStream(sState) })
          .to({}, { duration: 0.7 })
          .to(q('[data-beat-systems]'), { autoAlpha: 0, y: -24, duration: 0.5 })
          // BEAT 4 — TEXT-ANIMATION: closing lines rise in, punchline shadow lands
          .set(q('[data-beat-closing]'), { autoAlpha: 1 })
          .to(q('[data-cline]'), { autoAlpha: 1, y: 0, stagger: 0.18, duration: 0.55, ease: 'power2.out' })
          .to(q('[data-ctas]'), { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.1')
          .to({}, { duration: 0.7 });

        // Resolved view — the whole section shown as one, normally, once the
        // cinematic has released the pin. Each block fades up as it enters.
        gsap.utils.toArray(q('[data-areveal]')).forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 28,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });
      });

      // ── Mobile / reduced-motion: everything settled, natural stacked flow ──
      mm.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-beat]'), { autoAlpha: 1 });
        gsap.set(q('[data-piece],[data-kicker-avail],[data-role],[data-roles-frame]'), { autoAlpha: 1, scale: 1, y: 0 });
        gsap.set(q('[data-iline]'), { clipPath: 'inset(0 0 0 0)', filter: 'blur(0px)', yPercent: 0, autoAlpha: 1 });
        gsap.set(q('[data-cline]'), { autoAlpha: 1, y: 0 });
        gsap.set(caret, { display: 'none' });
        heading.textContent = SYS_HEADING;
        twEls.forEach((el, i) => (el.textContent = RECEIPTS[i]));
        twLines.forEach((el) => (el.style.opacity = '1'));
        q('[data-count]').forEach((el, i) => (el.textContent = STATS[i].fmt(STATS[i].end)));

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
    <section ref={root} className="relative w-full overflow-hidden bg-background text-foreground">
      {/* ═══ PINNED cinematic stage — plays the five beats one at a time ═══ */}
      <div data-stage className="relative overflow-hidden">
        {/* Ambient background — inside the stage so it stays put during the pin */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-30 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.13) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div
          data-ghost
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: "url('/avatar-hero.webp')", backgroundPosition: '62% 30%', opacity: 0.05, filter: 'grayscale(1) blur(6px)' }}
        />
        {DOMAIN_BADGES.map((b, i) => (
          <span key={i} data-badge className="absolute text-3xl md:text-5xl select-none hidden sm:block" style={{ top: b.top, left: b.left, opacity: 0.16, filter: 'grayscale(0.35)' }}>
            {b.emoji}
          </span>
        ))}
        <div data-glow-a className="absolute -top-24 right-[8%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-500/12 to-purple-500/12 blur-3xl" />
        <div data-glow-b className="absolute bottom-0 left-[4%] w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-pink-500/10 to-cyan-500/10 blur-3xl" />
        {/* Spotlight — keeps the centre text readable over the art */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 62% 66% at center, var(--background) 45%, transparent 80%)' }} />
      </div>

        {/* Content holder — h-screen & centred on desktop; normal flow on mobile.
            The five beats stack absolutely; only one is lit at a time. */}
        <div className="relative mx-auto max-w-5xl px-6 md:px-8 py-20 md:py-0 md:h-screen md:flex md:items-center md:justify-center">
          {/* BEAT 0 — HERO: kicker + framed roles + big spring headline */}
          <div data-beat data-beat-hero className="md:absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center mb-16 md:mb-0">
            <p data-kicker-avail data-mreveal className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              Available for hire
            </p>

            {/* Roles — framed, Plus corners, animated cycling gradients */}
            <div data-roles-frame data-mreveal className="relative mx-auto mb-7 md:mb-9 w-fit max-w-full border border-border/70 px-5 py-3 md:px-9 md:py-4 [mask-image:radial-gradient(120rem_22rem_at_center,white,transparent)]">
              <Plus className="absolute -left-3 -top-3 h-5 w-5 md:h-6 md:w-6 text-primary" aria-hidden="true" />
              <Plus className="absolute -bottom-3 -left-3 h-5 w-5 md:h-6 md:w-6 text-primary" aria-hidden="true" />
              <Plus className="absolute -right-3 -top-3 h-5 w-5 md:h-6 md:w-6 text-primary" aria-hidden="true" />
              <Plus className="absolute -bottom-3 -right-3 h-5 w-5 md:h-6 md:w-6 text-primary" aria-hidden="true" />
              <div className="flex flex-col items-center justify-center text-center text-xl md:flex-row md:gap-1 md:text-2xl lg:text-3xl font-extrabold tracking-tighter leading-tight select-none">
                {ROLES.map((r) => (
                  <span key={r.t} data-role className="relative inline-block px-1.5">
                    <span className="text-foreground/90">{r.t}.</span>
                    <span aria-hidden="true" className={`gpk-role-grad pointer-events-none absolute inset-0 px-1.5 bg-gradient-to-r ${r.grad} bg-clip-text text-transparent`} style={{ animationDelay: r.delay }}>
                      {r.t}.
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Headline — big spring reveal */}
            <h2 data-headline data-mreveal className="text-center text-3xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-black tracking-tighter leading-[0.98]">
              {HEADLINE_TEXT}
            </h2>
          </div>

          {/* BEAT 1 — HERO-SHUTTER intro statement */}
          <div data-beat data-beat-intro className="md:absolute md:inset-0 md:flex md:items-center md:justify-center mb-16 md:mb-0">
            <div className="w-full">
              {INTRO_LINES.map((l, i) => (
                <span
                  key={i}
                  data-iline
                  data-mreveal
                  className={`block text-center text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-snug ${l.hl ? `bg-gradient-to-r ${l.hl} bg-clip-text text-transparent` : 'text-foreground/90'}`}
                >
                  {l.t}
                </span>
              ))}
            </div>
          </div>

          {/* BEAT 2 — impact metrics */}
          <div data-beat data-beat-metrics className="md:absolute md:inset-0 md:flex md:items-center md:justify-center mb-12 md:mb-0">
            <div className="mx-auto max-w-3xl w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STATS.map((s, i) => (
                <div key={i} data-panel data-mreveal className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 text-center">
                  <div data-count className={`text-3xl md:text-4xl font-black tabular-nums bg-gradient-to-r ${s.grad} bg-clip-text text-transparent`}>0</div>
                  <p className="mt-2 text-[11px] md:text-xs font-medium text-muted-foreground leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BEAT 3 — TYPEWRITER systems list */}
          <div data-beat data-beat-systems className="md:absolute md:inset-0 md:flex md:items-center md:justify-center mb-12 md:mb-0">
            <div className="w-full max-w-2xl mx-auto">
              <p data-mreveal className="text-center text-[11px] md:text-xs font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5">
                <span aria-hidden="true">🚀 </span>
                <span data-tw-heading />
              </p>
              <ul className="space-y-3 font-mono">
                {RECEIPTS.map((r, i) => (
                  <li key={i} data-tw-line data-mreveal className="flex items-start gap-3 text-sm md:text-[15px] font-semibold text-foreground/90">
                    <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    <span data-tw className="min-h-[1.25em]" />
                  </li>
                ))}
              </ul>
              <span data-tw-caret className="gpk-caret ml-0.5 inline-block font-mono text-primary">▋</span>
            </div>
          </div>

          {/* BEAT 4 — closing: heading + TEXT-SHIMMER paragraph + CTAs.
              The paragraph is one plain <p> (real spaces → copyable, crawler &
              screen-reader friendly) styled with .gpk-shimmer: an indigo base
              with a lighter indigo band sweeping across it. */}
          <div data-beat data-beat-closing className="md:absolute md:inset-0 md:flex md:items-center md:justify-center">
            <div className="w-full max-w-2xl mx-auto text-center">
              <h3 data-cline data-mreveal className="text-xl md:text-2xl font-bold tracking-tight mb-5">
                How I turn problems into products,{' '}
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">end-to-end</span>
              </h3>
              <p data-cline data-mreveal className="gpk-shimmer text-[15px] md:text-lg font-medium leading-relaxed md:leading-loose">
                {CLOSING_PARAGRAPH}
              </p>
              <div data-ctas data-mreveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
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

      {/* ═══ RESOLVED VIEW — after the cinematic, the whole section resolves into
          ONE polished "at a glance" card: header + a glass panel grouping the
          metrics & shipped systems + the closing. Desktop only (mobile's stacked
          beats already serve this). All plain text → fully crawlable. ═══ */}
      <div className="hidden md:block relative border-t border-border/40 py-28 overflow-hidden">
        {/* backdrop — dot grid + a soft centred gradient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 opacity-25 dark:opacity-15" style={{ backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute left-1/2 top-8 -translate-x-1/2 w-[760px] h-[420px] rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-8">
          {/* header — pill + dual-gradient headline + intro */}
          <div data-areveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 backdrop-blur px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-foreground/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for hire · AI Engineer · Full-Stack · Product
            </span>
            <h2 className="mt-6 text-4xl lg:text-[3.25rem] font-black tracking-tighter leading-[1.08] text-foreground">
              Turning real-world problems into{' '}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">deployed AI products</span>{' '}
              and{' '}
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">full-stack platforms</span>{' '}
              across real-world domains.
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-foreground/70 leading-relaxed">
              {INTRO_LINES.map((l) => l.t).join(' ')}
            </p>
          </div>

          {/* grouped glass card — metrics on top, shipped systems below */}
          <div data-areveal className="mt-12 rounded-[2rem] border border-border/60 bg-card/50 backdrop-blur-xl shadow-2xl shadow-primary/[0.06] overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-border/50">
              {STATS.map((s, i) => (
                <div key={i} className="px-6 py-8 text-center">
                  <div className={`text-4xl lg:text-5xl font-black tabular-nums bg-gradient-to-r ${s.grad} bg-clip-text text-transparent`}>{s.fmt(s.end)}</div>
                  <p className="mt-2 text-xs font-medium text-muted-foreground leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border/50 bg-muted/20 px-8 py-8">
              <p className="text-center text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-6">
                <span aria-hidden="true">🚀 </span>{SYS_HEADING}
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {RECEIPTS.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 text-[15px] font-semibold text-foreground/90 text-left">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-sm">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* closing — heading + shimmer + CTAs */}
          <div data-areveal className="mt-12 text-center">
            <h3 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
              How I turn problems into products,{' '}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">end-to-end</span>
            </h3>
            <p className="gpk-shimmer mx-auto max-w-2xl text-lg font-medium leading-relaxed">{CLOSING_PARAGRAPH}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
    </section>
  );
}
