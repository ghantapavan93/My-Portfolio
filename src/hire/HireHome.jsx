import { useMemo, useState } from 'react';
import { Mail, Linkedin, Github, FileText, Copy, Check, MessageSquare } from 'lucide-react';
import { HireLayout } from './HireLayout';
import { Section, Tag, ProjectLinks, ProofList, Flow, ExternalLink } from './ui';
import { CONTAINER, buttonClass, useDocumentMeta, resumeLinkProps, HOME_TITLE, HOME_DESCRIPTION } from './shared';
import { CATEGORIES, FEATURED, SYSTEMS, PROJECTS } from './data/projects';
import { PROFILE, STATS, EXPERIENCE, PRINCIPLES, SKILLS } from './data/profile';
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from '../lib/links';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-zinc-200">
      <div className={`${CONTAINER} grid gap-10 py-16 sm:py-24 md:grid-cols-[1fr_auto] md:items-center`}>
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-zinc-600">
            {PROFILE.name} · {PROFILE.role}
          </p>
          <h1 id="hero-title" className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 leading-[1.1]">
            {PROFILE.statement}
          </h1>
          <p className="mt-6 text-lg text-zinc-700 leading-relaxed">{PROFILE.intro}</p>
          <ul className="mt-6 space-y-1.5 text-sm text-zinc-600">
            {PROFILE.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a {...resumeLinkProps} className={buttonClass.primary}>
              <FileText className="h-4 w-4" aria-hidden="true" /> Download résumé
            </a>
            <a href={`mailto:${EMAIL}`} className={buttonClass.secondary}>
              <Mail className="h-4 w-4" aria-hidden="true" /> Email me
            </a>
            <a href="#work" className={buttonClass.secondary}>
              See the work
            </a>
          </div>
        </div>
        <img
          src="/pavan-portrait.webp"
          alt="Pavan Kalyan Ghanta"
          width="280"
          height="280"
          className="h-40 w-40 rounded-2xl border border-zinc-200 object-cover sm:h-56 sm:w-56 md:h-64 md:w-64"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section aria-label="Results at a glance" className="border-b border-zinc-200 bg-zinc-50">
      <dl className={`${CONTAINER} grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4`}>
        {STATS.map((s) => (
          <div key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">{s.value}</dd>
            <dd className="mt-1 text-sm text-zinc-600 leading-snug">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function FeaturedProject({ project, index }) {
  const imageFirst = index % 2 === 1;
  return (
    <article className="grid gap-8 md:grid-cols-2 md:items-center" aria-labelledby={`${project.slug}-title`}>
      <Link
        to={`/work/${project.slug}`}
        className={`block overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 ${imageFirst ? '' : 'md:order-2'}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={project.image}
          alt=""
          width="1280"
          height="800"
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
        />
      </Link>
      <div>
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
        <h3 id={`${project.slug}-title`} className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">
          {project.title}
        </h3>
        <p className="mt-3 text-base text-zinc-700 leading-relaxed">{project.summary}</p>
        <div className="mt-5">
          <ProofList items={project.proof} />
        </div>
        <p className="mt-4 text-sm text-zinc-500">{project.stack.join(' · ')}</p>
        <p className="mt-1 text-xs text-zinc-500">{project.status}</p>
        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function CompactProject({ project, headingLevel = 'h3' }) {
  const Heading = headingLevel;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <img
        src={project.image}
        alt={project.imageAlt}
        width="640"
        height="400"
        loading="lazy"
        className="aspect-[16/10] w-full border-b border-zinc-200 bg-zinc-100 object-cover object-top"
      />
      <div className="flex flex-1 flex-col p-5">
        <Heading className="text-base font-semibold text-zinc-900">{project.title}</Heading>
        <p className="mt-2 text-sm text-zinc-700 leading-relaxed">{project.summary}</p>
        {project.proof.length > 0 && (
          <div className="mt-4">
            <ProofList items={project.proof} />
          </div>
        )}
        <p className="mt-4 text-xs text-zinc-500">{project.stack.join(' · ')}</p>
        <p className="mt-1 text-xs text-zinc-500">{project.status}</p>
        <div className="mt-auto pt-4">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

const INDEX = PROJECTS.filter((p) => !p.featured && p.group !== 'systems');

const COLLAPSED_COUNT = 6;

function ProjectIndex() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(false);
  const counts = useMemo(
    () => Object.fromEntries(CATEGORIES.map((c) => [c, INDEX.filter((p) => p.categories.includes(c)).length])),
    []
  );
  const shown = filter === 'All' ? INDEX : INDEX.filter((p) => p.categories.includes(filter));
  // Collapsed cards stay in the HTML (crawlable) and are only hidden visually.
  const collapsed = filter === 'All' && !expanded;

  return (
    <>
      <div role="group" aria-label="Filter projects by area" className="flex flex-wrap gap-2">
        {['All', ...CATEGORIES].map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={active}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                active ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-900'
              }`}
            >
              {c} <span className={active ? 'text-zinc-300' : 'text-zinc-400'}>{c === 'All' ? INDEX.length : counts[c]}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} projects
      </p>
      <ul id="project-index" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li key={p.slug} className={collapsed && i >= COLLAPSED_COUNT ? 'hidden' : undefined}>
            <CompactProject project={p} />
          </li>
        ))}
      </ul>
      {collapsed && shown.length > COLLAPSED_COUNT && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-controls="project-index"
          aria-expanded="false"
          className={`${buttonClass.secondary} mt-8`}
        >
          Show all {shown.length} projects
        </button>
      )}
    </>
  );
}

const ASSISTANT_FLOW = [
  { name: 'Retrieve', detail: 'BM25 ranks 55 verified answers and selects the relevant sections of my knowledge base.' },
  { name: 'Generate', detail: 'If a model is configured, a free open model (Qwen, gpt-oss) writes the answer from those sections only.' },
  { name: 'Extract', detail: 'With no model, or if every provider fails, the best verified answer is returned word for word.' },
  { name: 'Refuse', detail: 'If nothing covers the question well enough, it says so and suggests the closest topics.' },
];

function Approach() {
  return (
    <Section
      id="approach"
      title="How I build AI systems"
      intro="Four rules I apply to every AI feature, each backed by code you can open."
      className="border-t border-zinc-200 bg-zinc-50"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {PRINCIPLES.map((p) => (
          <article key={p.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-zinc-900">{p.title}</h3>
            <p className="mt-2 text-sm text-zinc-700 leading-relaxed">{p.body}</p>
            <ul className="mt-4 space-y-2 border-t border-zinc-100 pt-4">
              {p.evidence.map((e) => (
                <li key={e.label} className="text-sm">
                  {e.to ? (
                    <Link to={e.to} className="text-blue-700 underline-offset-4 hover:underline">{e.label}</Link>
                  ) : e.href ? (
                    <a href={e.href} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline-offset-4 hover:underline">
                      {e.label}
                    </a>
                  ) : (
                    <span className="text-zinc-700">{e.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-zinc-900">The assistant on this site</h3>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700 leading-relaxed">
          Ask it about my work. It runs with zero API keys, answers in under 100 ms from verified notes, and is checked by
          an 89-question regression eval (98.9%) that fails the build below 90%.
        </p>
        <div className="mt-6">
          <Flow steps={ASSISTANT_FLOW} label="How the assistant answers a question" />
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-ai-agent'))}
            className={buttonClass.primary}
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" /> Ask it a question
          </button>
          <ExternalLink href="https://github.com/ghantapavan93/My-Portfolio/blob/main/lib/retrieval.js" variant="secondary">
            Read the retrieval code
          </ExternalLink>
        </div>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience" className="border-t border-zinc-200">
      <ol className="space-y-10">
        {EXPERIENCE.map((job) => (
          <li key={job.company} className="grid gap-2 md:grid-cols-[14rem_1fr] md:gap-8">
            <div className="text-sm text-zinc-500">
              <p>{job.dates}</p>
              <p>{job.location}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">{job.company}</h3>
              <p className="text-sm font-medium text-zinc-700">{job.role}</p>
              <ul className="mt-3 space-y-2">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm text-zinc-700 leading-relaxed">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills" className="border-t border-zinc-200">
      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s) => (
          <div key={s.group}>
            <dt className="text-sm font-semibold text-zinc-900">{s.group}</dt>
            <dd className="mt-2 text-sm text-zinc-700 leading-relaxed">{s.items.join(', ')}</dd>
          </div>
        ))}
        <div>
          <dt className="text-sm font-semibold text-zinc-900">Education</dt>
          <dd className="mt-2 text-sm text-zinc-700 leading-relaxed">
            M.S. Computer Science, University of North Texas (2025)
            <br />
            B.Tech Electronics & Communication Engineering, SRM Institute of Science and Technology
          </dd>
        </div>
      </dl>
    </Section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <Section
      id="contact"
      title="Contact"
      intro="The fastest way to reach me is email. I reply within a day."
      className="border-t border-zinc-200 bg-zinc-50"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
        <div className="min-w-0">
          <a href={`mailto:${EMAIL}`} className="break-all text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 hover:text-blue-700">
            {EMAIL}
          </a>
          <p className="mt-2 text-sm text-zinc-600">Dallas–Fort Worth, Texas · open to onsite, hybrid or remote</p>
        </div>
        <button type="button" onClick={copy} className={`${buttonClass.secondary} shrink-0`}>
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy email'}
        </button>
      </div>
      <ul className="mt-6 flex flex-wrap gap-3">
        <li>
          <a {...resumeLinkProps} className={buttonClass.primary}>
            <FileText className="h-4 w-4" aria-hidden="true" /> Download résumé
          </a>
        </li>
        <li>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={buttonClass.secondary}>
            <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
          </a>
        </li>
        <li>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={buttonClass.secondary}>
            <Github className="h-4 w-4" aria-hidden="true" /> GitHub
          </a>
        </li>
      </ul>
    </Section>
  );
}

export function HireHome() {
  useDocumentMeta(HOME_TITLE, HOME_DESCRIPTION);
  return (
    <HireLayout onHome>
      <Hero />
      <StatsStrip />

      <Section
        id="work"
        title="Selected work"
        intro="Three projects that show how I work: a backend that refuses to guess, an applied computer-vision system, and a product with real users."
      >
        <div className="space-y-16 sm:space-y-20">
          {FEATURED.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Section>

      <Section
        id="systems"
        title="Reliability systems"
        intro="Independent prototypes about the unglamorous part of software: making sure the right thing actually happened, and recovering when it didn’t."
        className="border-t border-zinc-200"
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {SYSTEMS.map((p) => (
            <li key={p.slug}>
              <CompactProject project={p} />
            </li>
          ))}
        </ul>
      </Section>

      <Experience />
      <Approach />

      <Section
        id="projects"
        title="More projects"
        intro="Filter by area. Each card says plainly whether it is live, a prototype, or a team project."
        className="border-t border-zinc-200"
      >
        <ProjectIndex />
      </Section>

      <Skills />
      <Contact />
    </HireLayout>
  );
}
