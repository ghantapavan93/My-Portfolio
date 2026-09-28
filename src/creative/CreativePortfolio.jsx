// The original cinematic portfolio, kept intact at /creative for clients who
// value visual experimentation. The hiring portfolio lives at / (src/hire).
import { Header } from '../components/Header'
import { CinematicHero } from '../components/CinematicHero'
import { IntroCinema } from '../components/story/IntroCinema'
import { CapabilitiesSection } from '../components/CapabilitiesSection'
import { Incident } from '../components/story/Incident'
import { ProjectShowcase } from '../components/ProjectShowcase'
import { ProjectsSection } from '../components/ProjectsSection'
import { ExperienceSection } from '../components/ExperienceSection'
import { SkillsSection } from '../components/SkillsSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'
import { ContributionsSection } from '../components/ContributionsSection'
import { Preloader } from '../components/Preloader'
import { CommandPalette } from '../components/CommandPalette'
import { ThemeProvider } from '../components/ThemeProvider'

export default function CreativePortfolio() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
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
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
        <CommandPalette />
      </div>
    </ThemeProvider>
  )
}
