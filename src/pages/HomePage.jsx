import { Header } from '../components/Header'
import { HeroSection } from '../components/HeroSection'
import { ProjectShowcase } from '../components/ProjectShowcase'
import { YoutubeShowcase } from '../components/YoutubeShowcase'
import { ProjectsSection } from '../components/ProjectsSection'
import { ExperienceSection } from '../components/ExperienceSection'
import { SkillsSection } from '../components/SkillsSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'
import { ContributionsSection } from '../components/ContributionsSection'

export function HomePage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
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
        </div>
    )
}
