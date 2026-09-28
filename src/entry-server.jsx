// Build-time renderer for the hiring portfolio (see scripts/prerender.mjs).
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import { HOME_TITLE, HOME_DESCRIPTION, caseStudyTitle } from './hire/shared'
import { FEATURED } from './hire/data/projects'

/** Every route written to static HTML, with its <title> and description. */
export const ROUTES = [
  { path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION },
  ...FEATURED.map((p) => ({ path: `/work/${p.slug}`, title: caseStudyTitle(p), description: p.summary })),
]

export function render(path) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>
  )
}
