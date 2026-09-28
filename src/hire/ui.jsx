// Shared building blocks for the hiring portfolio. One visual system:
// Inter, zinc neutrals, a single blue accent, 1px borders, no gradients.
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { CONTAINER, buttonClass } from './shared';

export function Section({ id, title, intro, children, className = '' }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-20 py-16 sm:py-20 ${className}`}>
      <div className={CONTAINER}>
        <h2 id={headingId} className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
          {title}
        </h2>
        {intro && <p className="mt-3 max-w-2xl text-base text-zinc-600 leading-relaxed">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-700">
      {children}
    </span>
  );
}

/** External link that says it opens a new tab. Same-origin paths open in place. */
export function ExternalLink({ href, children, variant = 'text', className = '' }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={`${buttonClass[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

/** Live / Code / Case study links for a project, in a fixed order. */
export function ProjectLinks({ project, size = 'text' }) {
  const { live, code, caseStudy } = project.links;
  return (
    <div className="flex flex-wrap items-center gap-x-5">
      {project.caseStudy && (
        <Link to={`/work/${project.slug}`} className={buttonClass[size === 'text' ? 'text' : 'primary']}>
          Read the case study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
      {caseStudy && (
        <a href={caseStudy} className={buttonClass.text}>
          Case study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
      {live && <ExternalLink href={live}>Live</ExternalLink>}
      {code && <ExternalLink href={code}>Code</ExternalLink>}
    </div>
  );
}

/** A process shown as an ordered sequence of steps (wraps on wide screens, stacks on phones). */
export function Flow({ steps, label, columns = 'sm:grid-cols-2 lg:grid-cols-4' }) {
  return (
    <ol aria-label={label} className={`grid gap-3 ${columns}`}>
      {steps.map((step, i) => (
        <li key={step.name} className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs font-medium text-zinc-500">Step {i + 1}</p>
          <p className="mt-1 text-sm font-semibold text-zinc-900">{step.name}</p>
          <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function ProofList({ items }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-zinc-800">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
