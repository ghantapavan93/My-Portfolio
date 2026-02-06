import { CaseStudyShell } from '../../components/case-studies/CaseStudyShell'
import { Shield, Zap, Layout, CheckCircle2, AlertTriangle, Eye, Brain, Code2 } from 'lucide-react'

export function PosterA11yCaseStudy() {
    const project = {
        title: "Poster Accessibility Evaluation Tool",
        tagline: "WCAG-style reports in seconds for academic posters",
        url: "/case-studies/poster-accessibility-eval",
        githubUrl: "https://github.com/ghantapavan93/poster-evaluation-a11y",
        liveUrl: "https://poster-a11y.vercel.app"
    };

    return (
        <CaseStudyShell {...project}>
            {/* Hero / Overview */}
            <section className="space-y-6 mb-20 text-center sm:text-left">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                    Poster Accessibility <span className="text-primary italic">Evaluation Tool</span>
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                    Automating WCAG compliance for static academic media using a dual-model pipeline: <span className="text-foreground font-semibold">YOLOv10</span> for layout recognition and <span className="text-foreground font-semibold">Gemini 1.5 Flash</span> for semantic evaluation.
                </p>
            </section>

            {/* The Problem */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-wider">
                        The Problem
                    </div>
                    <h2 className="text-3xl font-bold">Manual Audits are the Bottleneck</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Academic posters are a staple of research, yet they are frequently inaccessible to individuals with visual impairments. Traditional accessibility audits are:
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Highly Manual: Reviewing hundreds of posters takes weeks of staff time.",
                            "Subjective: Different reviewers have different interpretations of 'sufficient contrast'.",
                            "Slow: Feedback often reaches researchers *after* the conference is over."
                        ].map((text, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                                <span className="text-sm sm:text-base font-medium">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-2xl border border-border/50 bg-secondary/30 p-8 shadow-inner">
                    <div className="aspect-video bg-background/50 rounded-lg flex items-center justify-center border border-dashed border-border">
                        <span className="text-muted-foreground text-sm italic">[Image Placeholder: Complex academic poster with many overlaying elements]</span>
                    </div>
                </div>
            </section>

            {/* The Approach */}
            <section className="space-y-12 mb-32">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        The Approach
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold">The Dual-Model Intelligence Pipeline</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Instead of a simple OCR-based approach, I built a modular pipeline that treats accessibility as a spatial and semantic challenge.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-2xl bg-secondary/20 border border-primary/10 space-y-6">
                        <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                            <Eye className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold">Phase 1: Spatial Detection</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We use <span className="text-foreground font-semibold">YOLOv10</span> to identify regions of interest. By fine-tuning the model on academic layouts, it precisely locates:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['Titles', 'Abstracts', 'Graphs', 'Photos', 'QR Codes', 'Logos'].map(tag => (
                                <span key={tag} className="px-2 py-1 bg-background border border-border/50 rounded text-xs font-mono">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-secondary/20 border border-primary/10 space-y-6">
                        <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                            <Brain className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold">Phase 2: Semantic Analysis</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            The detected regions are passed to <span className="text-foreground font-semibold">Gemini 1.5 Flash</span>. Large context windows allow the model to evaluate the *meaning* and *intent* behind the design.
                        </p>
                        <ul className="space-y-2">
                            <li className="text-sm flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Color Contrast Evaluation</li>
                            <li className="text-sm flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Alt-Text Generation for Charts</li>
                            <li className="text-sm flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Reading Order Optimization</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Engineering Details */}
            <section className="mb-32">
                <div className="bg-foreground text-background rounded-3xl p-8 sm:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-4">
                            <Code2 className="h-6 w-6 text-primary" />
                            <h2 className="text-3xl font-bold">Under the Hood</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <h4 className="font-bold text-primary">Latency Optimization</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Dual-model inference is optimized using async processing, returning a full audit report in under 12 seconds.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-primary">Confidence Thresholds</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Deterministic thresholds reject low-confidence YOLO boxes, ensuring researchers only receive high-quality feedback.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-primary">Data Privacy</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Images are processed ephemerally; no research data is retained in our vector stores post-analysis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact */}
            <section className="text-center space-y-12">
                <h2 className="text-3xl font-bold italic">The Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Audit Time", value: "95%", sub: "Reduction" },
                        { label: "Accuracy", value: "92%", sub: "on WCAG AA" },
                        { label: "Posters Audited", value: "500+", sub: "during pilot" },
                        { label: "Remediation", value: "Instant", sub: "Advice" }
                    ].map((stat, i) => (
                        <div key={i} className="space-y-1 font-mono">
                            <div className="text-4xl sm:text-5xl font-extrabold text-primary">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                            <div className="text-[10px] text-muted-foreground opacity-60 italic">{stat.sub}</div>
                        </div>
                    ))}
                </div>
            </section>
        </CaseStudyShell>
    );
}
