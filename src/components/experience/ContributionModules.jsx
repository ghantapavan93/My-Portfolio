import { useState } from 'react';
import { Zap, Ship, ShieldCheck, Brain, UserCheck, Activity, ChevronRight, BarChart3, Binary, Layout, Cpu } from 'lucide-react';

const icons = {
    Zap, Ship, ShieldCheck, Brain, UserCheck, Activity
};

const receiptIcons = {
    "GPU Inference Architecture": Cpu,
    "Automated Model Release": Ship,
    "Regression Suite Engine": Binary,
    "High-Fidelity RAG": Layout,
    "Safe AI Orchestration": UserCheck,
    "Deep-Stack Observability": BarChart3
};

export const ContributionModules = ({ modules, roleTheme, onActiveTechChange }) => {
    const [selectedId, setSelectedId] = useState(modules[0]?.id);

    const activeModule = modules.find(m => m.id === selectedId);

    const handleSelect = (id, tech) => {
        setSelectedId(id);
        onActiveTechChange(tech);
    };

    return (
        <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Key Contributions (Selected)</h4>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Interactive Bullets */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modules.map((module) => {
                        const Icon = icons[module.icon] || Zap;
                        const isSelected = selectedId === module.id;

                        return (
                            <button
                                key={module.id}
                                onClick={() => handleSelect(module.id, module.receipt.tech)}
                                className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-500 group relative overflow-hidden ${isSelected ? 'bg-primary/5 border-primary/50' : 'bg-secondary/5 border-white/5 hover:border-white/20'}`}
                                style={isSelected ? { borderColor: `${roleTheme.accent}80`, backgroundColor: `${roleTheme.accent}10` } : {}}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${isSelected ? 'bg-primary text-white shadow-lg' : 'bg-card border-white/5 text-muted-foreground group-hover:text-foreground'}`}
                                    style={isSelected ? { backgroundColor: roleTheme.accent, borderColor: roleTheme.accent } : {}}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-primary" style={{ color: roleTheme.accent }}>{module.metricTag}</span>
                                        {isSelected && <ChevronRight className="w-3 h-3 text-primary animate-pulse" style={{ color: roleTheme.accent }} />}
                                    </div>
                                    <h5 className="text-sm font-bold text-foreground truncate">{module.headline}</h5>
                                </div>
                                {isSelected && (
                                    <div className="absolute inset-0 bg-primary/10 animate-pulse pointer-events-none" style={{ backgroundColor: `${roleTheme.accent}05` }} />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Right: Receipt Preview Panel */}
                <div className="lg:w-80 shrink-0">
                    {activeModule && (
                        <div className="p-6 rounded-3xl bg-secondary/20 border border-white/5 h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="aspect-video rounded-2xl bg-card border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden group/receipt">
                                {receiptIcons[activeModule.receipt.title] ? (
                                    (() => {
                                        const ReceiptIcon = receiptIcons[activeModule.receipt.title];
                                        return <ReceiptIcon className="w-12 h-12 text-muted-foreground/20 group-hover/receipt:scale-110 transition-transform duration-700" />;
                                    })()
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent" style={{ backgroundImage: `linear-gradient(to bottom right, ${roleTheme.accent}20, transparent)` }} />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                        <span className="text-[8px] font-black uppercase tracking-widest">Receipt: {activeModule.id}</span>
                                    </div>
                                </div>
                            </div>

                            <h6 className="text-xs font-black uppercase tracking-[0.1em] text-foreground mb-2">{activeModule.receipt.title}</h6>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-medium">
                                {activeModule.receipt.explanation}
                            </p>

                            <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Proof</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-muted-foreground">{activeModule.receipt.proofLabel}</span>
                                        <span className="px-2 py-0.5 rounded-md bg-primary/20 text-primary text-[10px] font-black" style={{ backgroundColor: `${roleTheme.accent}20`, color: roleTheme.accent }}>
                                            {activeModule.receipt.proofValue}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {activeModule.receipt.tech.map(t => (
                                        <span key={t} className="text-[8px] font-black uppercase tracking-widest opacity-40">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
