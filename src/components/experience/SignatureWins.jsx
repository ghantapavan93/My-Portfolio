import { useId, useState } from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';

// Signature wins: a role's biggest results as one-line headlines. The metrics
// stay visible at a glance; clicking a headline opens the story behind it —
// the problem, how it was built, and what Pavan owned. One open at a time.
export function SignatureWins({ wins, accent }) {
    const [openIndex, setOpenIndex] = useState(null);
    const baseId = useId();

    return (
        <section aria-labelledby={`${baseId}-title`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <h4
                    id={`${baseId}-title`}
                    className="text-[11px] font-black uppercase tracking-[0.3em]"
                    style={{ color: accent }}
                >
                    Signature wins
                </h4>
                <span className="text-xs font-medium text-muted-foreground">
                    Click a win for the story behind it
                </span>
            </div>

            <ol className="space-y-3">
                {wins.map((win, i) => {
                    const isOpen = openIndex === i;
                    const panelId = `${baseId}-panel-${i}`;
                    return (
                        <li
                            key={win.headline}
                            className={`relative overflow-hidden rounded-2xl border bg-card/40 backdrop-blur-sm transition-colors duration-300 ${isOpen ? 'border-border' : 'border-border/50 hover:border-border'}`}
                        >
                            {/* Accent rail: thin at rest, full height and brighter when open */}
                            <span
                                aria-hidden="true"
                                className={`absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-40'}`}
                                style={{ background: accent }}
                            />

                            <button
                                type="button"
                                onClick={() => setOpenIndex(isOpen ? null : i)}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                className="group/win w-full text-left pl-6 pr-4 md:pr-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded-2xl"
                            >
                                <div className="flex items-start gap-4">
                                    <span
                                        className="shrink-0 pt-0.5 text-xs font-black tabular-nums tracking-widest"
                                        style={{ color: accent }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="flex-1 min-w-0">
                                        <span className="block text-base md:text-lg font-bold leading-snug text-foreground">
                                            {win.headline}
                                        </span>
                                        {win.metrics?.length > 0 && (
                                            <span className="mt-3 flex flex-wrap gap-2">
                                                {win.metrics.map((m) => (
                                                    <span
                                                        key={m.label}
                                                        className="inline-flex items-baseline gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1"
                                                    >
                                                        <span className="text-sm font-black tracking-tight" style={{ color: accent }}>
                                                            {m.value}
                                                        </span>
                                                        <span className="text-[11px] font-medium text-muted-foreground">
                                                            {m.label}
                                                        </span>
                                                    </span>
                                                ))}
                                            </span>
                                        )}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className={`shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 group-hover/win:text-foreground ${isOpen ? 'rotate-45 text-foreground' : ''}`}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </span>
                                </div>
                            </button>

                            {/* Story panel: animates open with a grid-rows transition */}
                            <div
                                id={panelId}
                                role="region"
                                aria-label={`Story behind win ${i + 1}`}
                                inert={!isOpen}
                                className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                            >
                                <div className="overflow-hidden">
                                    <div className="pl-6 md:pl-[3.75rem] pr-5 pb-6 grid gap-6 md:grid-cols-2">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-2">
                                                The story
                                            </p>
                                            <div className="space-y-3">
                                                {win.story.map((para) => (
                                                    <p key={para} className="text-sm leading-relaxed text-foreground/85">
                                                        {para}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-2">
                                                How I did it
                                            </p>
                                            <ul className="space-y-2">
                                                {win.how.map((step) => (
                                                    <li key={step} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                                                        <span
                                                            aria-hidden="true"
                                                            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full"
                                                            style={{ background: accent }}
                                                        />
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {(win.owned || win.link) && (
                                            <div className="md:col-span-2 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/40 pt-4">
                                                {win.owned && (
                                                    <p className="text-sm text-foreground/85">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mr-2">
                                                            I owned
                                                        </span>
                                                        {win.owned}
                                                    </p>
                                                )}
                                                {win.link && (
                                                    <a
                                                        href={win.link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="sm:ml-auto inline-flex items-center gap-1.5 text-sm font-bold hover:underline underline-offset-4"
                                                        style={{ color: accent }}
                                                    >
                                                        {win.link.label}
                                                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                                        <span className="sr-only">(opens in a new tab)</span>
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}
