// Non-component helpers shared by the hiring pages (kept out of .jsx component
// files so React Fast Refresh keeps working).
import { useEffect } from 'react';
import { RESUME_URL } from '../lib/links';

export const CONTAINER = 'mx-auto w-full max-w-5xl px-5 sm:px-8';

/** Sets the tab title and description on client-side navigation (prerender sets them statically). */
export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}

const linkBase =
  'inline-flex items-center gap-1.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2';

export const buttonClass = {
  primary: `${linkBase} bg-zinc-900 px-4 py-2.5 text-white hover:bg-zinc-700`,
  secondary: `${linkBase} border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 hover:border-zinc-900`,
  // min-h-11: text links are still 44px tall tap targets on phones.
  text: `${linkBase} min-h-11 text-blue-700 hover:text-blue-900 underline-offset-4 hover:underline`,
};

// A same-origin PDF downloads directly; anything else opens in a new tab.
export const resumeLinkProps = /\.pdf$/i.test(RESUME_URL)
  ? { href: RESUME_URL, download: 'Pavan-Kalyan-Ghanta-Resume.pdf' }
  : { href: RESUME_URL, target: '_blank', rel: 'noopener noreferrer' };

export const caseStudyTitle = (project) => `${project.title} — case study · Pavan Kalyan Ghanta`;
