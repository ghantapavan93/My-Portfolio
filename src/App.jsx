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

/** On navigation: jump to the #hash target if there is one, otherwise to the top. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView({ behavior: 'instant' })
        return
      }
    }
    // Instant: the global smooth-scroll CSS would otherwise animate across the old page.
    window.scrollTo({ top: 0, behavior: 'instant' })
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
