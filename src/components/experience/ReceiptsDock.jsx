import { Badge } from '../ui/badge';
import { Database, Zap, Cpu, Activity, Info, ShieldCheck, Cloud, Server, Maximize2, Layers } from 'lucide-react';

const icons = {
    "🧠 ML & Accel": Cpu,
    "🛰️ Serving": Server,
    "📊 Data & Retrieval": Database,
    "⚙️ Infra & Ops": Cloud,
    "🔭 Observability": Activity,
    "🔐 Security & Access": ShieldCheck
};

export const ReceiptsDock = ({ activeReceipt, roleTheme, experience }) => {
    // 1. SNAPSHOT MODE (Default when no bullet selected)
    if (!activeReceipt) {
        return (
            <div className="sticky top-32 w-full space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
                {/* Section A: Proof Snapshot */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Technical Receipts: Snapshot
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                        {experience.snapshotProof?.map((proof, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/10 border border-white/5 group hover:border-primary/30 transition-all duration-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:scale-150 transition-transform" style={{ backgroundColor: roleTheme.accent }} />
                                <span className="text-[11px] font-bold text-foreground/90">{proof}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section B: Grouped Tech Stack */}
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                        <Layers className="w-3 h-3" /> System Architecture Dock
                    </h4>
                    <div className="space-y-6">
                        {Object.entries(experience.groupedTechStack || {}).map(([category, tools]) => {
                            const Icon = icons[category] || Database;
                            return (
                                <div key={category} className="space-y-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon className="w-3 h-3 text-muted-foreground/60" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{category}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tools.map(tool => (
                                            <Badge
                                                key={tool}
                                                variant="secondary"
                                                className="bg-card/50 border-white/5 text-[9px] px-2 py-0.5 hover:border-primary/30 transition-colors"
                                            >
                                                {tool}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // 2. RECEIPT MODE (When a bullet is selected)
    const { metric, layerTags, src, label, proofs, tech, artifacts } = activeReceipt;

    return (
        <div className="sticky top-32 w-full space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
            {/* Visual Artifact Header */}
            <div className="p-1 rounded-3xl bg-secondary/30 border border-border/50 overflow-hidden group shadow-2xl shadow-primary/5">
                <div className="relative aspect-video rounded-[1.25rem] overflow-hidden bg-black/20">
                    <div className="absolute inset-0 flex items-center justify-center bg-card/50">
                        <Database className="w-12 h-12 text-primary/20" />
                    </div>
                    {src && (
                        <img
                            src={src}
                            alt={label}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                        />
                    )}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white border border-white/20 z-10">
                        Verified Receipt
                    </div>
                </div>
            </div>

            {/* Metric & Detailed Proofs */}
            <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-card border border-border/50 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" style={{ backgroundColor: roleTheme.accent }} />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Contribution Proof</h4>
                    <div className="text-3xl font-black tracking-tighter text-foreground mb-4">{metric}</div>

                    <div className="space-y-3 border-t border-border/50 pt-4 mt-4">
                        {proofs?.map((p, i) => (
                            <div key={i} className="flex gap-3">
                                <Zap className="w-3 h-3 text-primary mt-0.5 shrink-0" style={{ color: roleTheme.accent }} />
                                <p className="text-xs text-muted-foreground leading-relaxed font-medium">{p}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Specific Tech for this Bullet */}
                <div className="space-y-3">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tech Highlight</h5>
                    <div className="flex flex-wrap gap-1.5">
                        {tech?.map(t => (
                            <Badge key={t} variant="outline" className="bg-primary/5 border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest py-1" style={{ color: roleTheme.accent, borderColor: `${roleTheme.accent}30` }}>
                                {t}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
