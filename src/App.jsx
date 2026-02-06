import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ProjectShowcase } from './components/ProjectShowcase'
import { YoutubeShowcase } from './components/YoutubeShowcase'
import { ProjectsSection } from './components/ProjectsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { SkillsSection } from './components/SkillsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { ThemeProvider } from './components/ThemeProvider'
import { ContributionsSection } from './components/ContributionsSection'
import { PosterA11yCaseStudy } from './pages/case-studies/PosterA11yCaseStudy'

function MainContent() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />

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
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
