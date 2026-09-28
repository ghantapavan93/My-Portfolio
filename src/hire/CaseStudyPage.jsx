import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { HireLayout } from './HireLayout';
import { Tag, ProjectLinks, ProofList, Flow } from './ui';
import { CONTAINER, useDocumentMeta, caseStudyTitle } from './shared';
import { FEATURED, projectBySlug } from './data/projects';
import { CASE_STUDIES } from './data/caseStudies';

function Block({ id, title, children }) {
  return (
    <section aria-labelledby={`${id}-title`} className="border-t border-zinc-200 py-12">
      <div className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-10">
        <h2 id={`${id}-title`} className="text-lg font-semibold text-zinc-900">
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function NotFound() {
  useDocumentMeta('Case study not found · Pavan Kalyan Ghanta');
  return (
    <HireLayout>
      <div className={`${CONTAINER} py-24`}>
        <h1 className="text-3xl font-semibold tracking-tight">That case study doesn’t exist.</h1>
        <Link to="/#projects" className="mt-6 inline-flex items-center gap-1.5 text-blue-700 hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to projects
        </Link>
      </div>
    </HireLayout>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  const study = CASE_STUDIES[slug];
  const title = project ? caseStudyTitle(project) : '';
  useDocumentMeta(title, project?.summary);
  if (!project || !study) return <NotFound />;

  const position = FEATURED.findIndex((p) => p.slug === slug);
  const next = FEATURED[(position + 1) % FEATURED.length];

  return (
    <HireLayout>
      <article className={`${CONTAINER} pb-16`}>
        <nav aria-label="Breadcrumb" className="pt-8">
          <Link to="/#projects" className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
          </Link>
        </nav>

        <header className="py-10">
          <div className="flex flex-wrap gap-1.5">
            {project.categories.map((c) => (
              <Tag key={c}>{c}</Tag>
            ))}
          </div>
          <h1 className="mt-4 pb-1 text-4xl sm:text-5xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-zinc-700 leading-relaxed">{project.summary}</p>
          <dl className="mt-8 grid gap-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-medium text-zinc-500">Role</dt>
              <dd className="mt-1 text-zinc-900">{study.role}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-500">Stack</dt>
              <dd className="mt-1 text-zinc-900">{project.stack.join(', ')}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-500">Status</dt>
              <dd className="mt-1 text-zinc-900">{project.status}</dd>
            </div>
          </dl>
          <div className="mt-8">
            <ProjectLinks project={{ ...project, caseStudy: false }} />
          </div>
        </header>

        <img
          src={project.image}
          alt={project.imageAlt}
          width="1280"
          height="800"
          className="aspect-[16/10] w-full rounded-2xl border border-zinc-200 bg-zinc-100 object-cover object-top"
        />

        <div className="mt-12">
          <Block id="problem" title="Problem">
            <p className="text-base text-zinc-700 leading-relaxed">{study.context}</p>
            {study.problem.map((para) => (
              <p key={para} className="mt-4 text-base text-zinc-700 leading-relaxed">{para}</p>
            ))}
          </Block>

          <Block id="decisions" title="Key decisions">
            <ol className="space-y-6">
              {study.decisions.map((d, i) => (
                <li key={d.title} className="flex gap-4">
                  <span aria-hidden="true" className="mt-0.5 text-sm font-semibold text-zinc-400 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900">{d.title}</h3>
                    <p className="mt-1 text-sm text-zinc-700 leading-relaxed">{d.why}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="architecture" title="Architecture">
            <Flow
              steps={study.architecture}
              label={`${project.title} architecture, in order`}
              columns="sm:grid-cols-2 xl:grid-cols-3"
            />
            {study.next && (
              <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 p-5">
                <h3 className="text-base font-semibold text-zinc-900">{study.next.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">{study.next.note}</p>
                <ul className="mt-3 space-y-2">
                  {study.next.points.map((pt) => (
                    <li key={pt} className="text-sm text-zinc-700 leading-relaxed">{pt}</li>
                  ))}
                </ul>
              </div>
            )}
          </Block>

          <Block id="execution" title="Execution">
            <ul className="space-y-3">
              {study.execution.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-zinc-700 leading-relaxed">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                  <span>{item.split('`').map((part, i) => (i % 2 ? <code key={i} className="rounded bg-zinc-100 px-1 py-0.5 text-[0.85em]">{part}</code> : part))}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="outcome" title="Outcome">
            <ProofList items={study.outcome.proof} />
            <h3 className="mt-8 text-sm font-semibold text-zinc-900">Limitations, stated plainly</h3>
            <ul className="mt-2 space-y-1.5">
              {study.outcome.limitations.map((l) => (
                <li key={l} className="text-sm text-zinc-600 leading-relaxed">{l}</li>
              ))}
            </ul>
          </Block>
        </div>

        {next && next.slug !== slug && (
          <nav aria-label="Next case study" className="mt-8 border-t border-zinc-200 pt-8">
            <Link
              to={`/work/${next.slug}`}
              className="group inline-flex flex-col gap-1"
            >
              <span className="text-sm text-zinc-500">Next case study</span>
              <span className="inline-flex items-center gap-2 text-xl font-semibold text-zinc-900 group-hover:text-blue-700">
                {next.title} <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </Link>
          </nav>
        )}
      </article>
    </HireLayout>
  );
}
