import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { CinematicHero } from './components/CinematicHero'
import { IntroCinema } from './components/story/IntroCinema'
import { CapabilitiesSection } from './components/CapabilitiesSection'
import { Incident } from './components/story/Incident'
import { CommandPalette } from './components/CommandPalette'
import { ProjectShowcase } from './components/ProjectShowcase'
import { YoutubeShowcase } from './components/YoutubeShowcase'
import { ProjectsSection } from './components/ProjectsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { SkillsSection } from './components/SkillsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { ThemeProvider } from './components/ThemeProvider'
import { ContributionsSection } from './components/ContributionsSection'
import { AIAgent } from './components/AIAgent'
import { Preloader } from './components/Preloader'

// Case-study pages are separate routes — load them only when visited.
const PosterA11yCaseStudy = lazy(() =>
  import('./pages/case-studies/PosterA11yCaseStudy').then(m => ({ default: m.PosterA11yCaseStudy })))
const SpeechQuestCaseStudy = lazy(() =>
  import('./pages/case-studies/SpeechQuestCaseStudy').then(m => ({ default: m.SpeechQuestCaseStudy })))
const A11yGameCaseStudy = lazy(() =>
  import('./pages/case-studies/A11yGameCaseStudy').then(m => ({ default: m.A11yGameCaseStudy })))

function MainContent() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <CinematicHero />
        <IntroCinema />
        <CapabilitiesSection />
        <Incident />

        {/* #projects wraps the showcase + the full grid so "Projects" lands at the top. */}
        <section id="projects">
          <ProjectShowcase />
          <ProjectsSection />
        </section>

        {/* These sections carry their own ids (#contributions, #experience). */}
        <ContributionsSection />
        <ExperienceSection />

        {/* ✅ Other Sections (Optional but kept for completeness) */}
        <SkillsSection />
        <YoutubeShowcase />

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/case-studies/poster-accessibility-eval" element={<PosterA11yCaseStudy />} />
            <Route path="/case-studies/speech-quest" element={<SpeechQuestCaseStudy />} />
            <Route path="/case-studies/a11y-game" element={<A11yGameCaseStudy />} />
          </Routes>
        </Suspense>
        <AIAgent />
        <CommandPalette />
      </div>
    </ThemeProvider>
  )
}

export default App
