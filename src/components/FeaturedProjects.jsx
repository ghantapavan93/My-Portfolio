import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { FEATURED } from '../hire/data/projects';

// Top three projects, each linking to a full case study at /work/:slug.
// Content comes from src/hire/data/projects.js (checked against each repo).

export function StatusBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
      {children}
    </span>
  );
}

function FeaturedCard({ project }) {
  const { live, code } = project.links;
  return (
    <article
      aria-labelledby={`featured-${project.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <Link to={`/work/${project.slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden bg-secondary/30">
        <img
          src={project.image}
          alt=""
          width="1280"
          height="800"
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.badge && <StatusBadge>{project.badge}</StatusBadge>}
          {project.categories.map((c) => (
            <span key={c} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              {c}
            </span>
          ))}
        </div>
        <h3 id={`featured-${project.slug}`} className="mt-3 text-xl md:text-2xl font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{project.summary}</p>
        <ul className="mt-4 space-y-1.5">
          {project.proof.map((item) => (
            <li key={item} className="flex gap-2 text-sm">
              <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">{project.stack.join(' · ')}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Read the case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              Live <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {code && (
            <a
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" /> Code
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function FeaturedProjects() {
  return (
    <section aria-labelledby="featured-heading" className="relative py-12 md:py-16 border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-10 text-center">
          <p className="text-primary font-medium uppercase tracking-wider text-sm mb-2">Top 3</p>
          <h2 id="featured-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Flagship{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">projects</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            A backend that refuses to guess, an applied computer-vision system, and a product with real users — each with a full case study.
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((p) => (
            <li key={p.slug}>
              <FeaturedCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
