import { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, PlayCircle, ChevronRight, Copy, CheckCircle2, AlertTriangle, Lightbulb, Target } from 'lucide-react';

export const DetailsDrawer = ({ item, isOpen, onClose }) => {
    const drawerRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
            if (drawerRef.current) {
                const closeBtn = drawerRef.current.querySelector('button');
                if (closeBtn) closeBtn.focus();
            }
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    const handleCopySummary = () => {
        if (!item || !item.details) return;

        const summary = `
\${item.title} — \${item.category}
Impact: \${item.impactHeadline}
Role: \${item.details.role}
Proof: \${item.details.proof}
Skills: \${item.skills ? item.skills.slice(0, 6).join(' · ') : 'N/A'}
    `.trim();

        navigator.clipboard.writeText(summary).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (!isOpen || !item) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div
                ref={drawerRef}
                className="fixed inset-y-0 right-0 z-[110] w-full max-w-2xl bg-card border-l border-border/50 shadow-2xl animate-in slide-in-from-right duration-500 ease-out flex flex-col"
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
            >
                {/* Header (Title + Impact Headline) */}
                <header className="px-8 py-6 flex items-start justify-between border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-10 shrink-0">
                    <div className="space-y-3 max-w-lg">
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded bg-secondary/50 text-muted-foreground text-[9px] font-black uppercase tracking-widest border border-border/50">
                                {item.category}
                            </span>
                            {item.media && item.media[0] && item.media[0].type === 'video' && (
                                <span className="px-2.5 py-1 rounded bg-red-500/10 text-red-500 text-[9px] font-black uppercase tracking-widest border border-red-500/20 flex items-center gap-1">
                                    <PlayCircle className="w-3 h-3" /> Video
                                </span>
                            )}
                        </div>
                        <h2 id="drawer-title" className="text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 leading-tight">
                            {item.title}
                        </h2>
                        <p className="text-lg font-bold text-primary leading-snug">
                            {item.impactHeadline}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-secondary/30 hover:bg-secondary flex items-center justify-center transition-colors shrink-0"
                        aria-label="Close drawer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-8 py-8 space-y-12 custom-scrollbar">

                    {/* Main 5-Line Explanation */}
                    {item.details && typeof item.details === 'object' && (
                        <section className="space-y-5">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">The Details</h3>
                            <div className="space-y-4">
                                <p className="text-base text-foreground/90 font-medium leading-relaxed">
                                    <span className="font-bold text-foreground">Role:</span> {item.details.role}
                                </p>
                                <p className="text-base text-foreground/90 font-medium leading-relaxed">
                                    <span className="font-bold text-foreground">What I did:</span> {item.details.whatIDid}
                                </p>
                                <p className="text-base text-foreground/90 font-medium leading-relaxed">
                                    <span className="font-bold text-foreground">Why it mattered:</span> {item.details.whyItMattered}
                                </p>
                                <p className="text-base text-foreground/90 font-medium leading-relaxed">
                                    <span className="font-bold text-foreground">Proof:</span> {item.details.proof}
                                </p>
                                {item.details.linkUrl && item.details.linkUrl !== "N/A" && (
                                    <p className="text-base text-foreground/90 font-medium leading-relaxed">
                                        <span className="font-bold text-foreground">Link:</span> <a href={item.details.linkUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{item.details.linkUrl}</a>
                                    </p>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Highlights (3 Bullets) */}
                    {item.highlights && item.highlights.length > 0 && (
                        <section className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Highlights</h3>
                            <div className="space-y-3">
                                {item.highlights.slice(0, 3).map((bullet, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/10 border border-border/30 hover:border-primary/30 transition-colors">
                                        <ChevronRight className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-sm font-medium text-foreground">{bullet}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Extended Deep-Dive (e.g. Eagle Eye AI hackathon) */}
                    {item.extendedDescription && (
                        <section className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">🏆 Hackathon Deep-Dive</h3>

                            {item.extendedDescription.problemStatement && (
                                <div className="space-y-2 p-5 rounded-xl bg-red-500/5 border border-red-500/15">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                                        <h4 className="text-xs font-black uppercase tracking-widest text-red-500">Problem Statement</h4>
                                    </div>
                                    <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                                        {item.extendedDescription.problemStatement}
                                    </p>
                                </div>
                            )}

                            {item.extendedDescription.proposedSolution && (
                                <div className="space-y-2 p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                                    <div className="flex items-center gap-2">
                                        <Lightbulb className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500">Proposed Solution</h4>
                                    </div>
                                    <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                                        {item.extendedDescription.proposedSolution}
                                    </p>
                                </div>
                            )}

                            {item.extendedDescription.realWorldScenario && (
                                <div className="space-y-2 p-5 rounded-xl bg-amber-500/5 border border-amber-500/15">
                                    <div className="flex items-center gap-2">
                                        <Target className="w-4 h-4 text-amber-500 shrink-0" />
                                        <h4 className="text-xs font-black uppercase tracking-widest text-amber-500">Real-World Scenario</h4>
                                    </div>
                                    <p className="text-sm text-foreground/80 font-medium leading-relaxed italic">
                                        "{item.extendedDescription.realWorldScenario}"
                                    </p>
                                </div>
                            )}

                            {item.extendedDescription.technicalHighlights?.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Technical Highlights</h4>
                                    <ul className="space-y-2">
                                        {item.extendedDescription.technicalHighlights.map((h, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 font-medium p-3 rounded-lg bg-secondary/10 border border-border/30">
                                                <span className="text-primary mt-0.5 shrink-0 font-bold">▸</span>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Platforms Grid (for full-stack showcase) */}
                    {item.extendedDescription?.platforms?.length > 0 && (
                        <section className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">🚀 Platforms Built — Pain Point → Solution</h3>
                            <div className="space-y-3">
                                {item.extendedDescription.platforms.map((p, i) => (
                                    <a
                                        key={i}
                                        href={`https://github.com/ghantapavan93/${p.repo}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 rounded-xl bg-secondary/5 border border-border/40 hover:border-primary/40 hover:bg-secondary/15 transition-all space-y-1.5"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h5 className="text-sm font-black text-foreground leading-tight">{p.name}</h5>
                                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-0.5">{p.tagline}</p>
                                            </div>
                                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                                        </div>
                                        <p className="text-xs text-red-500/80 font-medium">
                                            <span className="font-bold text-red-500">Pain:</span> {p.painPoint}
                                        </p>
                                        <p className="text-xs text-emerald-600/80 font-medium">
                                            <span className="font-bold text-emerald-600">Fix:</span> {p.solution}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Full Proof / Media Gallery */}
                    {item.media && item.media.length > 0 && (
                        <section className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Visual RECEIPTS</h3>
                            <div className="flex flex-col gap-6">
                                {item.media.map((media, i) => (
                                    <div key={i} className="w-full rounded-2xl overflow-hidden border border-border/50 bg-secondary/10 shadow-lg group relative">
                                        {media.type === 'video' ? (
                                            <video
                                                controls
                                                className="w-full object-contain max-h-[400px]"
                                                poster={media.thumbnail}
                                            >
                                                <source src={media.url} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <div className="w-full relative flex justify-center bg-black/5">
                                                <img
                                                    src={media.url}
                                                    alt={`${item.title} proof \${i+1}`}
                                                    className="w-full max-h-[500px] object-contain hover:scale-[1.02] transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Grouped Skills Tags (6-8 max) */}
                    {item.skills && item.skills.length > 0 && (
                        <section className="space-y-4 pt-4 border-t border-border/30">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Skills used</h3>
                            <p className="text-sm font-bold text-foreground leading-relaxed">
                                {item.skills.slice(0, 8).join(' · ')}
                            </p>
                        </section>
                    )}
                </div>

                {/* Action Footer */}
                <footer className="px-8 py-5 border-t border-border/50 bg-background/50 backdrop-blur-md mt-auto shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Footer Microcopy */}
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center sm:text-left">
                        Want the short version?
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={handleCopySummary}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-secondary/50 hover:bg-secondary text-foreground text-xs font-bold transition-all border border-border/50"
                        >
                            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied ? 'Copied' : 'Copy summary'}
                        </button>

                        {item.details?.linkUrl && item.details.linkUrl !== "N/A" && (
                            <a
                                href={item.details.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold transition-all shadow-md hover:shadow-primary/20 hover:-translate-y-0.5"
                            >
                                Open link <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                </footer>
            </div>
        </>
    );
};
