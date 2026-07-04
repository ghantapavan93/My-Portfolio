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
import { PosterA11yCaseStudy } from './pages/case-studies/PosterA11yCaseStudy'
import { SpeechQuestCaseStudy } from './pages/case-studies/SpeechQuestCaseStudy'
import { A11yGameCaseStudy } from './pages/case-studies/A11yGameCaseStudy'

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

        {/* ✅ Projects Section */}
        <section id="projects">
          <ProjectShowcase />
          <ProjectsSection />
        </section>

        {/* ✅ Contributions Section */}
        <section id="contributions">
          <ContributionsSection />
        </section>

        {/* ✅ Experience Section */}
        <section id="experience">
          <ExperienceSection />
        </section>

        {/* ✅ Other Sections (Optional but kept for completeness) */}
        <SkillsSection />
        <YoutubeShowcase />

        {/* ✅ Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/case-studies/poster-accessibility-eval" element={<PosterA11yCaseStudy />} />
          <Route path="/case-studies/speech-quest" element={<SpeechQuestCaseStudy />} />
          <Route path="/case-studies/a11y-game" element={<A11yGameCaseStudy />} />
        </Routes>
        <AIAgent />
        <CommandPalette />
      </div>
    </ThemeProvider>
  )
}

export default App
