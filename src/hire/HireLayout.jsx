import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { CONTAINER, buttonClass, resumeLinkProps } from './shared';
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from '../lib/links';

// Case-study pages link back into the main portfolio's sections.
const NAV = [
  { label: 'Projects', hash: 'projects' },
  { label: 'Experience', hash: 'experience' },
  { label: 'Skills', hash: 'skills' },
  { label: 'Contact', hash: 'contact' },
];

function SiteHeader({ onHome }) {
  const anchor = (hash) => (onHome ? `#${hash}` : `/#${hash}`);
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className={`${CONTAINER} flex h-16 items-center justify-between gap-4`}>
        <Link to="/" className="text-base font-semibold tracking-tight text-zinc-900">
          Pavan Kalyan Ghanta
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.hash}>
                <a href={anchor(item.hash)} className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a {...resumeLinkProps} className={`${buttonClass.primary} px-3.5 py-2`}>
            <FileText className="h-4 w-4" aria-hidden="true" /> Résumé
          </a>
          {/* No-JS disclosure: works before hydration and in the prerendered HTML. */}
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-900 [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <ul className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
              {NAV.map((item) => (
                <li key={item.hash}>
                  <a href={anchor(item.hash)} className="block rounded-lg px-3 py-2.5 text-sm text-zinc-800 hover:bg-zinc-100">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 py-10">
      <div className={`${CONTAINER} flex flex-col gap-4 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between`}>
        <p>© 2026 Pavan Kalyan Ghanta</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li><a href={`mailto:${EMAIL}`} className="hover:text-zinc-900">Email</a></li>
          <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900">LinkedIn</a></li>
          <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900">GitHub</a></li>
        </ul>
      </div>
    </footer>
  );
}

export function HireLayout({ children, onHome = false }) {
  return (
    <div className="min-h-screen bg-white font-hire text-zinc-900 antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader onHome={onHome} />
      <div aria-hidden="true" className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
