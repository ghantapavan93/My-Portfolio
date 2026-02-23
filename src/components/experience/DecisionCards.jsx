import { ChevronRight, Target, Zap, ShieldAlert } from 'lucide-react';

export const DecisionCards = ({ decisions, roleTheme }) => {
    if (!decisions || decisions.length === 0) return null;

    return (
        <div className="py-20">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-12 text-center">
                Strategic Technical Decisions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {decisions.map((d, i) => (
                    <div
                        key={i}
                        className="group relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                    >
                        <div
                            className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity"
                            style={{ color: roleTheme.accent }}
                        >
                            <Target className="w-12 h-12" />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-primary mb-2 block" style={{ color: roleTheme.accent }}>
                                    0{i + 1} // Decision
                                </span>
                                <h5 className="text-lg font-bold text-foreground leading-tight">
                                    {d.decision}
                                </h5>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <Zap className="w-4 h-4 text-primary shrink-0" style={{ color: roleTheme.accent }} />
                                    <div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block mb-1">Rational</span>
                                        <p className="text-xs text-foreground/80 leading-relaxed">{d.why}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 border-t border-border/30 pt-4">
                                    <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                                    <div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block mb-1">Tradeoff</span>
                                        <p className="text-xs text-foreground/80 leading-relaxed">{d.tradeoff}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
