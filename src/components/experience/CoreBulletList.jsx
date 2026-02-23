import { Layers, Zap, ShieldCheck, Brain, UserCheck, Cloud, BarChart3 } from 'lucide-react';

const icons = {
    Layers, Zap, ShieldCheck, Brain, UserCheck, Cloud, BarChart3
};

export const CoreBulletList = ({ bullets, roleTheme }) => {
    return (
        <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Key Contributions</h4>
            <div className="grid grid-cols-1 gap-4">
                {bullets.map((bullet, i) => {
                    const Icon = icons[bullet.icon] || Layers;
                    return (
                        <div
                            key={i}
                            className="group flex gap-4 p-4 rounded-2xl bg-secondary/5 border border-white/5 hover:border-white/10 transition-all duration-300"
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-card shrink-0 group-hover:scale-110 transition-transform duration-500"
                                style={{ color: roleTheme.accent }}
                            >
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h5 className="text-sm font-black text-foreground tracking-tight">{bullet.headline}</h5>
                                    {bullet.metric && (
                                        <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20" style={{ backgroundColor: `${roleTheme.accent}15`, color: roleTheme.accent, borderColor: `${roleTheme.accent}30` }}>
                                            {bullet.metric}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                    {bullet.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
