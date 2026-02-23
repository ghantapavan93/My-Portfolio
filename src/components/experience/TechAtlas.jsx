import { Badge } from '../ui/badge';
import { Database, Server, Cpu, Cloud, Activity, Maximize2 } from 'lucide-react';

const icons = {
    Backend: Server,
    "ML & Inference": Cpu,
    Data: Database,
    Infra: Cloud,
    Observability: Activity
};

export const TechAtlas = ({ atlas, activeTech = [], roleTheme, onOpenFullStack }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Core Tech Stack Atlas</h4>
                <button
                    onClick={onOpenFullStack}
                    className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
                    style={{ color: roleTheme.accent }}
                >
                    <Maximize2 className="w-3 h-3" />
                    Explorer Deep Dive
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(atlas).map(([category, tech]) => {
                    const Icon = icons[category] || Server;
                    return (
                        <div
                            key={category}
                            className="p-4 rounded-2xl bg-secondary/5 border border-white/5 transition-all duration-500"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Icon className="w-3 h-3 text-muted-foreground/60" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">{category}</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {tech.map(t => {
                                    const isActive = activeTech.includes(t);
                                    return (
                                        <Badge
                                            key={t}
                                            variant="secondary"
                                            className={`text-[8px] px-1.5 py-0 border transition-all duration-300 ${isActive ? 'bg-primary border-primary text-white shadow-[0_0_10px_rgba(66,133,244,0.3)]' : 'bg-card/50 border-white/5 text-muted-foreground'}`}
                                            style={isActive ? { backgroundColor: roleTheme.accent, borderColor: roleTheme.accent } : {}}
                                        >
                                            {t}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
