import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CaseStudyPage } from './hire/CaseStudyPage'
import { ThemeProvider } from './components/ThemeProvider'
import { AIAgent } from './components/AIAgent'

// The main portfolio is code-split so case-study pages load without it.
const CreativePortfolio = lazy(() => import('./creative/CreativePortfolio'))
const PosterA11yCaseStudy = lazy(() =>
  import('./pages/case-studies/PosterA11yCaseStudy').then(m => ({ default: m.PosterA11yCaseStudy })))
const SpeechQuestCaseStudy = lazy(() =>
  import('./pages/case-studies/SpeechQuestCaseStudy').then(m => ({ default: m.SpeechQuestCaseStudy })))
const A11yGameCaseStudy = lazy(() =>
  import('./pages/case-studies/A11yGameCaseStudy').then(m => ({ default: m.A11yGameCaseStudy })))

// Moments after arrival when layout can still shift (lazy chunk, images, GSAP
// pin spacers, and ScrollTrigger restoring its own scroll position on refresh).
const SETTLE_MS = [0, 300, 900, 1800, 3000]

/**
 * On navigation: jump to the #hash target if there is one, otherwise to the top.
 * The main portfolio is lazy-loaded and re-lays itself out while it settles, so a
 * deep link like /#projects re-applies the jump a few times — and stops as soon
 * as the visitor scrolls on their own.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // Instant: the global smooth-scroll CSS would otherwise animate across the old page.
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let cancelled = false
    const cancel = () => { cancelled = true }
    const userInput = ['wheel', 'touchstart', 'keydown', 'mousedown']
    userInput.forEach((e) => window.addEventListener(e, cancel, { passive: true, once: true }))

    const timers = SETTLE_MS.map((ms) =>
      setTimeout(() => {
        const el = document.getElementById(id)
        if (!cancelled && el && Math.abs(el.getBoundingClientRect().top) > 2) {
          el.scrollIntoView({ behavior: 'instant' })
        }
      }, ms)
    )
    return () => {
      timers.forEach(clearTimeout)
      userInput.forEach((e) => window.removeEventListener(e, cancel))
    }
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<CreativePortfolio />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/case-studies/poster-accessibility-eval" element={<ThemeProvider><PosterA11yCaseStudy /></ThemeProvider>} />
          <Route path="/case-studies/speech-quest" element={<ThemeProvider><SpeechQuestCaseStudy /></ThemeProvider>} />
          <Route path="/case-studies/a11y-game" element={<ThemeProvider><A11yGameCaseStudy /></ThemeProvider>} />
          <Route path="*" element={<CreativePortfolio />} />
        </Routes>
      </Suspense>
      <AIAgent />
    </>
  )
}

export default App
