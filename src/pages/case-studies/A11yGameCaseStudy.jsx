import { CaseStudyShell } from '../../components/case-studies/CaseStudyShell'
import { Gamepad2, Zap, Layout, CheckCircle2, Users, Sparkles, Accessibility, Code2 } from 'lucide-react'

export function A11yGameCaseStudy() {
    const project = {
        title: "A11yGame",
        tagline: "Learning accessibility through gamified challenges",
        url: "/case-studies/a11y-game",
        githubUrl: "https://github.com/ghantapavan93/A11yPDF", // Note: The repo name in project section was A11yPDF
        liveUrl: "https://a11ygamification.vercel.app"
    };

    return (
        <CaseStudyShell {...project}>
            {/* Hero / Overview */}
            <section className="space-y-6 mb-20 text-center sm:text-left">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                    A11y<span className="text-primary italic">Game</span>
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                    An interactive portal designed to teach web accessibility concepts to university students. Built with <span className="text-foreground font-semibold">React</span> and <span className="text-foreground font-semibold">Firebase</span>, it has empowered <span className="text-foreground font-semibold font-mono text-primary">200+ UNT students</span> to master inclusive design.
                </p>
            </section>

            {/* The Challenge */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-bold uppercase tracking-wider">
                        The Challenge
                    </div>
                    <h2 className="text-3xl font-bold">Bridging the Empathy Gap</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Accessibility is often taught through dry documentation. A11yGame transforms these standards into interactive "mini-games" that simulate the experiences of users with various impairments.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Interactive Challenges: Gamified WCAG standards (Color Contrast, Alt-Text).",
                            "Real-world Scaling: Successfully integrated into university curriculum.",
                            "Firebase Integration: Real-time leaderboard and student progress tracking."
                        ].map((text, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <Sparkles className="h-5 w-5 text-purple-500 shrink-0 mt-1" />
                                <span className="text-sm sm:text-base font-medium">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-2xl border border-border/50 bg-secondary/30 p-8 shadow-inner">
                    <div className="aspect-video bg-background/50 rounded-lg flex items-center justify-center border border-dashed border-border text-center p-4">
                        <span className="text-muted-foreground text-sm italic">Screen capture of the 'Color Blindness Simulator' mini-game.</span>
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section className="space-y-12 mb-32">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        Curriculum Modules
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold">Deep Dives into Inclusive Tech</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Each module is a standalone React application that targets a specific area of digital accessibility.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-secondary/20 border border-primary/10 space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-500">
                            <Layout className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Semantic Structure</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            A puzzle game where students must rebuild a broken website using proper HTML5 semantic elements to help a screen reader navigate.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-secondary/20 border border-primary/10 space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                            <Accessibility className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Contrast Lab</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            A real-time color mixer that challenges students to find AA and AAA compliant combinations for various background types.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-secondary/20 border border-primary/10 space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                            <Users className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Peer Review</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Built with Firebase, students can submit their "accessible designs" and receive peer feedback based on accessibility rubrics.
                        </p>
                    </div>
                </div>
            </section>

            {/* Engineering Perspective */}
            <section className="mb-32">
                <div className="bg-foreground text-background rounded-3xl p-8 sm:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-4">
                            <Code2 className="h-6 w-6 text-primary" />
                            <h2 className="text-3xl font-bold">The Engineering</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-primary">State Persistence</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    React + Redux managed the complex state of individual mini-games, ensuring student progress was saved locally and synced with Firebase for instructor review.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-primary">Inclusive Components</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    The portal itself was built to be a gold standard of accessibility, featuring focus-visible overlays, ARIA-live regions for game status, and full keyboard navigation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Showcase */}
            <section className="text-center space-y-12">
                <h2 className="text-3xl font-bold italic">Piloted at UNT</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                    {[
                        { label: "Students Engaged", desc: "200+ Graduates" },
                        { label: "Mini-Games", desc: "5 Targeted Modules" },
                        { label: "Accessibility Score", desc: "Perfect 100/100" },
                        { label: "Backend", desc: "Firebase Core" }
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-xl border border-border/50 bg-secondary/10 space-y-2 group hover:border-primary/50 transition-colors">
                            <div className="text-primary font-bold">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </section>
        </CaseStudyShell>
    );
}
