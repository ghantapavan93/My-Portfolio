import { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Copy, Share2, Check, ChevronDown, ListTree, ArrowDown } from 'lucide-react';
import { experiences } from '../data/experiences';
import { ReceiptsDock } from './experience/ReceiptsDock';
import { StackMap } from './experience/StackMap';
import { DecisionCards } from './experience/DecisionCards';
import { ImpactSlider } from './experience/ImpactSlider';
import { InteractiveBulletList } from './experience/InteractiveBulletList';
import { ThematicBackground } from './experience/ThematicBackground';
import { VosynLatencyDial, KrowdOpsPlayback } from './experience/SignatureScenes';

export const ExperienceCaseStudy = ({ id, onClose }) => {
    const exp = experiences.find(e => e.id === id);
    const [activeChapter, setActiveChapter] = useState('overview');
    const [activeReceipt, setActiveReceipt] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isReceiptsExpanded, setIsReceiptsExpanded] = useState(false); // Mobile only

    const scrollContainerRef = useRef(null);
    const chapterRefs = useRef({});

    useEffect(() => {
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    // Scrollspy logic
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveChapter(entry.target.id);
                }
            });
        }, {
            threshold: 0.2,
            root: scrollContainerRef.current
        });

        Object.values(chapterRefs.current).forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    // Deep Link Handling
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const parts = hash.split('?');
            const mainPart = parts[0]; // e.g., #experience/vosyn#inference
            const queryPart = parts[1]; // e.g., bullet=concurrency

            const chapterId = mainPart.split('#').pop();
            if (chapterId && chapterRefs.current[chapterId]) {
                setTimeout(() => {
                    document.getElementById(chapterId)?.scrollIntoView({ behavior: 'smooth' });
                    setActiveChapter(chapterId);
                }, 500);
            }

            if (queryPart) {
                const bulletParam = new URLSearchParams(queryPart).get('bullet');
                if (bulletParam && exp.narrativeSections[chapterId]?.bullets) {
                    const bullet = exp.narrativeSections[chapterId].bullets.find(b => b.id === bulletParam);
                    if (bullet) {
                        handleBulletSelect(bullet);
                    }
                }
            }
        }
    }, [id]);

    const copySummary = () => {
        const summary = `${exp.company} | ${exp.role}\nImpact: ${exp.hookLine}\nKey Metrics: ${exp.proofMetrics.map(m => `${m.label}: ${m.value}`).join(', ')}`;
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBulletSelect = (bullet) => {
        setActiveReceipt({
            ...bullet.receipts,
            label: bullet.label
        });
        // On mobile, expand receipts dock automatically
        if (window.innerWidth < 1024) {
            setIsReceiptsExpanded(true);
        }
    };

    if (!exp) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-background animate-in fade-in duration-500 overflow-hidden flex flex-col">
            {/* Cinematic Background Motif */}
            <ThematicBackground motif={exp.theme.motif} color={exp.theme.accent} />

            {/* Sticky Header */}
            <header className="h-20 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-50">
                <div className="flex items-center gap-6">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="hidden md:block h-8 w-[1px] bg-border/50" />
                    <div className="flex flex-col">
                        <h3 className="text-sm font-black uppercase tracking-widest text-foreground">{exp.company}</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">
                            Case Study / {exp.id}
                        </p>
                    </div>
                </div>

                {/* Progress Timeline */}
                <nav className="hidden lg:flex items-center gap-6">
                    {exp.chapters.map((chapter, idx) => (
                        <button
                            key={chapter.id}
                            onClick={() => document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' })}
                            className={`flex items-center gap-2 group transition-all ${activeChapter === chapter.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                        >
                            <span className="text-[10px] font-black text-primary" style={{ color: exp.theme.accent }}>0{idx + 1}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{chapter.title}</span>
                            {idx < exp.chapters.length - 1 && (
                                <div className="w-8 h-[1px] bg-border/50 ml-2" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={copySummary}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border/50 hover:bg-secondary transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied' : 'Copy Summary'}
                    </button>
                    {exp.links.live && (
                        <a
                            href={exp.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                            style={{ backgroundColor: exp.theme.accent }}
                        >
                            <ExternalLink className="w-4 h-4" />
                            Live Site
                        </a>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Chapter Rail (Desktop Only) */}
                <aside className="hidden lg:flex flex-col w-64 border-r border-border/50 p-8 space-y-12 shrink-0">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Chapters</h4>
                        <div className="flex flex-col gap-2">
                            {exp.chapters.map(chapter => (
                                <button
                                    key={chapter.id}
                                    onClick={() => document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors text-left ${activeChapter === chapter.id ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50 text-muted-foreground'}`}
                                    style={activeChapter === chapter.id ? { color: exp.theme.accent, backgroundColor: `${exp.theme.accent}10` } : {}}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeChapter === chapter.id ? 'scale-150 rotate-45' : 'bg-muted-foreground/30'}`} style={activeChapter === chapter.id ? { backgroundColor: exp.theme.accent } : {}} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{chapter.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto p-4 rounded-2xl bg-secondary/20 border border-border/50 space-y-2">
                        <Share2 className="w-4 h-4 text-primary" style={{ color: exp.theme.accent }} />
                        <p className="text-[10px] font-bold text-foreground">Share this case study</p>
                        <button
                            className="text-[10px] text-muted-foreground hover:text-primary transition-colors truncate w-full text-left"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.origin + window.location.pathname + `#experience/${exp.id}`);
                            }}
                        >
                            {window.location.origin}.../{exp.id}
                        </button>
                    </div>
                </aside>

                {/* Center: Scrollable Narrative */}
                <main
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-24 py-12 scroll-smooth custom-scrollbar"
                >
                    <div className="max-w-4xl mx-auto space-y-16">
                        {/* Dynamic Narrative Chapters */}
                        {exp.chapters.map((chapter) => {
                            const sectionData = exp.narrativeSections[chapter.id];
                            if (!sectionData) return null;

                            return (
                                <section
                                    key={chapter.id}
                                    id={chapter.id}
                                    ref={el => chapterRefs.current[chapter.id] = el}
                                    className="space-y-8 pt-10 first:pt-0"
                                >
                                    {/* Overview Special Case */}
                                    {chapter.id === 'overview' ? (
                                        <>
                                            <div className="space-y-6">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary" style={{ color: exp.theme.accent }}>System Overview</span>
                                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
                                                    Building the <br />
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600" style={{ backgroundImage: `linear-gradient(to right, ${exp.theme.accent}, #6366f1)` }}>
                                                        {exp.heroMotif.title}
                                                    </span>
                                                </h1>
                                                <div className="flex flex-wrap gap-4 pt-4">
                                                    {exp.domainTags.map(tag => (
                                                        <span key={tag} className="px-4 py-1 rounded-full bg-card border border-border/50 text-[10px] font-black uppercase tracking-widest">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-border/50">
                                                <div className="space-y-6">
                                                    {sectionData.paragraphs?.map((p, i) => (
                                                        <p key={i} className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
                                                            {p}
                                                        </p>
                                                    ))}
                                                </div>
                                                <div className="space-y-6">
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">What I Owned</h4>
                                                    {(sectionData.ownership || sectionData.bullets)?.map((o, i) => (
                                                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-secondary/20 border border-white/5">
                                                            <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-primary" style={{ backgroundColor: exp.theme.accent }} />
                                                            <p className="text-sm text-foreground font-bold leading-tight">{typeof o === 'string' ? o : (o.content || o.label)}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        /* High-Depth Engineering Sections */
                                        <div className="space-y-12">
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    {sectionData.title && <h2 className="text-4xl font-black tracking-tighter text-foreground">{sectionData.title}</h2>}
                                                    {sectionData.problem && (
                                                        <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 space-y-2">
                                                            <h5 className="text-[10px] font-black uppercase tracking-widest text-red-500">The Problem</h5>
                                                            <p className="text-lg text-foreground/90 font-medium leading-relaxed">{sectionData.problem}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 gap-12">
                                                    {sectionData.built && (
                                                        <div className="space-y-6">
                                                            <h5 className="text-[10px] font-black uppercase tracking-widest text-primary" style={{ color: exp.theme.accent }}>What I Built</h5>
                                                            <div className="grid grid-cols-1 gap-4">
                                                                {sectionData.built.map((item, i) => (
                                                                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-secondary/5 border border-white/5">
                                                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-card text-xs font-black" style={{ color: exp.theme.accent }}>0{i + 1}</div>
                                                                        <p className="text-base text-muted-foreground font-medium leading-relaxed">{item}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {sectionData.how && (
                                                        <div className="space-y-6">
                                                            <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">How it worked (Deep Dive)</h5>
                                                            <div className="space-y-4 border-l border-border/50 pl-8 ml-4">
                                                                {sectionData.how.map((step, i) => (
                                                                    <div key={step} className="relative">
                                                                        <div className="absolute -left-[37px] top-2 w-2 h-2 rounded-full border border-primary bg-background" style={{ borderColor: exp.theme.accent }} />
                                                                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">{step}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {sectionData.bullets && (
                                                    <div className="pt-12 border-t border-border/50">
                                                        <InteractiveBulletList
                                                            heading="Technical Receipts"
                                                            bullets={sectionData.bullets}
                                                            onBulletSelect={handleBulletSelect}
                                                            activeBulletId={activeReceipt?.id}
                                                            roleTheme={exp.theme}
                                                        />
                                                    </div>
                                                )}

                                                {/* Decisions Injection for Overview (if no Ops chapter) */}
                                                {chapter.id === 'overview' && exp.keyDecisions && !exp.chapters.some(c => c.id === 'ops') && (
                                                    <div className="pt-12 border-t border-border/50">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8">Strategic Decisions</h4>
                                                        <DecisionCards decisions={exp.keyDecisions} roleTheme={exp.theme} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Specialized Component Injections */}
                                            {chapter.id === 'ops' && (
                                                <div className="space-y-12">
                                                    <DecisionCards decisions={exp.keyDecisions} roleTheme={exp.theme} />
                                                </div>
                                            )}
                                            {chapter.id === 'ablations' && exp.impactSlider && (
                                                <ImpactSlider data={exp.impactSlider} roleTheme={exp.theme} />
                                            )}
                                        </div>
                                    )}
                                </section>
                            );
                        })}

                        {/* Visuals Chapter - Conditional Guard */}
                        {exp.narrativeSections.visuals?.images && (
                            <section
                                id="visuals"
                                ref={el => chapterRefs.current.visuals = el}
                                className="pb-16 space-y-8 pt-10"
                            >
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border/50 pb-2">Technical Artifacts</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {exp.narrativeSections.visuals.images.map((img, i) => (
                                        <div key={i} className="group space-y-4">
                                            <div className="aspect-video rounded-3xl overflow-hidden border border-border/50 bg-card group-hover:border-primary/50 transition-all duration-700">
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground italic pl-4 border-l border-primary/30">{img.caption}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </main>

                {/* Right: Receipts Dock (Desktop) */}
                <aside className="hidden lg:flex flex-col w-[400px] border-l border-border/50 p-8 shrink-0 relative overflow-y-auto">
                    <ReceiptsDock activeReceipt={activeReceipt} roleTheme={exp.theme} experience={exp} />
                </aside>

                {/* Mobile: Bottom Receipts Sheet */}
                <div className={`lg:hidden fixed inset-x-0 bottom-0 z-[60] bg-card border-t border-border/50 rounded-t-[2.5rem] shadow-2xl transition-all duration-500 ease-out transform ${isReceiptsExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}`}>
                    <button
                        onClick={() => setIsReceiptsExpanded(!isReceiptsExpanded)}
                        className="w-full h-20 flex items-center justify-between px-8 border-b border-border/20"
                    >
                        <div className="flex items-center gap-3">
                            <ListTree className="w-5 h-5 text-primary" style={{ color: exp.theme.accent }} />
                            <span className="text-xs font-black uppercase tracking-widest">Active Receipt</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isReceiptsExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="p-8 h-[60vh] overflow-y-auto">
                        <ReceiptsDock activeReceipt={activeReceipt} roleTheme={exp.theme} experience={exp} />
                    </div>
                </div>
            </div>
        </div>
    );
};
