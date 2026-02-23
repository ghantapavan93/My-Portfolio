import { useState } from 'react';
import { ArrowLeftRight, TrendingUp, TrendingDown } from 'lucide-react';

export const ImpactSlider = ({ data, roleTheme }) => {
    if (!data) return null;

    return (
        <div className="py-20 max-w-2xl mx-auto">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-12 text-center">
                Before vs After Optimization
            </h4>

            <div className="space-y-6">
                {data.items.map((item, i) => {
                    const isImprovement = item.after.includes('-') || (parseFloat(item.after) < parseFloat(item.before));

                    return (
                        <div key={i} className="group p-6 rounded-3xl bg-secondary/20 border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <span className="text-xs font-black uppercase tracking-widest text-foreground">{item.label}</span>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase" style={{ color: roleTheme.accent, backgroundColor: `${roleTheme.accent}10` }}>
                                    {isImprovement ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                    Optimization Result
                                </div>
                            </div>

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="flex-1 space-y-2">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{data.beforeLabel}</span>
                                    <div className="text-2xl font-black text-muted-foreground/50">{item.before}</div>
                                </div>

                                <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-primary" style={{ color: roleTheme.accent }}>
                                    <ArrowLeftRight className="w-5 h-5" />
                                </div>

                                <div className="flex-1 space-y-2 text-right">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary" style={{ color: roleTheme.accent }}>{data.afterLabel}</span>
                                    <div className="text-3xl font-black text-foreground">{item.after}</div>
                                </div>
                            </div>

                            <div
                                className="absolute bottom-0 left-0 h-1 bg-primary/20 transition-all duration-[2s] ease-out w-0 group-hover:w-full"
                                style={{ backgroundColor: roleTheme.accent }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
