import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { init } from '@emailjs/browser'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

init('nob1s8-BQqigGWF4S');

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Pages prerendered at build time (scripts/prerender.mjs) mark #root with the
// path they were rendered for. Hydrate only when that matches the URL being
// viewed — the SPA fallback serves the home page's HTML for every other route.
const prerenderedFor = container.getAttribute('data-prerendered')
if (prerenderedFor && prerenderedFor === window.location.pathname) {
  hydrateRoot(container, app)
} else {
  container.textContent = ''
  createRoot(container).render(app)
}
