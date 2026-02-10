import { CaseStudyShell } from '../../components/case-studies/CaseStudyShell'
import { Mic, Zap, Layout, CheckCircle2, Globe, Sparkles, MessageSquare, Code2 } from 'lucide-react'

export function SpeechQuestCaseStudy() {
    const project = {
        title: "Speech Quest",
        tagline: "Bilingual speech therapy through interactive play",
        url: "/case-studies/speech-quest",
        githubUrl: "https://github.com/ghantapavan93/speech-app",
        liveUrl: "https://speechquest.vercel.app"
    };

    return (
        <CaseStudyShell {...project}>
            {/* Hero / Overview */}
            <section className="space-y-6 mb-20 text-center sm:text-left">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                    Speech <span className="text-primary italic">Quest</span>
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                    A bilingual speech learning platform built with <span className="text-foreground font-semibold">Angular</span> and <span className="text-foreground font-semibold">Firebase</span>, gamifying speech therapy for children through 7+ interactive modules.
                </p>
            </section>

            {/* The Vision */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider">
                        The Vision
                    </div>
                    <h2 className="text-3xl font-bold">Making Therapy Feel Like Play</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Speech therapy is often repetitive and can be discouraging for young learners. Speech Quest transforms this process into a "Quest"—where every correct pronunciation unlocks progress.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Bilingual Support: Seamless switching between English and Spanish.",
                            "Real-Time Feedback: Instant visual and audio cues on pronunciation.",
                            "Gamified Rewards: Progress tracking that keeps kids motivated."
                        ].map((text, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <Sparkles className="h-5 w-5 text-yellow-500 shrink-0 mt-1" />
                                <span className="text-sm sm:text-base font-medium">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-2xl border border-border/50 bg-secondary/30 p-8 shadow-inner">
                    <div className="aspect-video bg-background/50 rounded-lg flex items-center justify-center border border-dashed border-border text-center p-4">
                        <span className="text-muted-foreground text-sm italic">Interactive Dashboard showing bilingual modules and quest progress.</span>
                    </div>
                </div>
            </section>

            {/* The Tech Stack */}
            <section className="space-y-12 mb-32">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        The Tech Stack
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold">Leveraging Modern Web APIs</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Combining robust frontend architecture with specialized cloud services for a seamless therapeutic experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-secondary/20 border border-primary/10 space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                            <Mic className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Web Speech API</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Used for high-fidelity speech-to-text conversion, allowing the app to "listen" and validate user input in real-time.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-secondary/20 border border-primary/10 space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">ElevenLabs API</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Integrated for premium text-to-speech audio feedback, providing clear, natural-sounding models for imitation.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-secondary/20 border border-primary/10 space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500">
                            <Globe className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Bilingual Engine</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            A custom mapping system that handles localized content and cross-language phonetic validation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Architecture Section */}
            <section className="mb-32">
                <div className="bg-foreground text-background rounded-3xl p-8 sm:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-4">
                            <Code2 className="h-6 w-6 text-primary" />
                            <h2 className="text-3xl font-bold">The Architecture</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-primary">Angular & Firebase</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    The app utilizes Angular's modular structure to manage independent "Quest" games, with Firebase handling real-time synchronization of user profiles and progress benchmarks.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-primary">Real-time Recognition</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    A multi-threaded approach ensures the microphone remains active while the UI updates, providing a low-latency feedback loop critical for speech practice.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Games Showcase */}
            <section className="text-center space-y-12">
                <h2 className="text-3xl font-bold italic">7+ Interactive Modules</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                    {[
                        { label: "Bilingual Toggle", desc: "EN/ES Switch" },
                        { label: "Word Match", desc: "Phonetic Matching" },
                        { label: "Sound Lab", desc: "Frequency Viz" },
                        { label: "Daily Quest", desc: "Progression Map" }
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
