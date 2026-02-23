import { Badge } from '../ui/badge';

export const StackMap = ({ stackByLayer, roleTheme, activeLayers = [] }) => {
    const layers = [
        { id: 'API', label: 'API Layer' },
        { id: 'Data', label: 'Data Layer' },
        { id: 'ML', label: 'Intelligence' },
        { id: 'Infra', label: 'Infrastructure' },
        { id: 'Observability', label: 'Observability' }
    ];

    return (
        <div className="py-12 border-y border-border/50">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-8 text-center underline decoration-primary/20 underline-offset-8">
                Interactive Stack Architecture
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {layers.map(layer => {
                    const isActive = activeLayers.includes(layer.id);
                    const skills = stackByLayer[layer.id] || [];

                    if (skills.length === 0) return null;

                    return (
                        <div
                            key={layer.id}
                            className={`space-y-4 transition-all duration-500 ${isActive ? 'scale-105 opacity-100' : 'opacity-60 grayscale-[0.5]'}`}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 shadow-sm ${isActive ? 'bg-primary border-primary text-white shadow-primary/30' : 'bg-secondary/50 border-border/50 text-muted-foreground'}`}
                                    style={isActive ? { backgroundColor: roleTheme.accent, borderColor: roleTheme.accent } : {}}
                                >
                                    <span className="text-[10px] font-black">{layer.id[0]}</span>
                                </div>
                                <div className="text-[9px] font-black uppercase tracking-widest text-foreground text-center">
                                    {layer.label}
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-1.5">
                                {skills.map(skill => (
                                    <Badge
                                        key={skill}
                                        variant="secondary"
                                        className={`text-[8px] px-2 py-0 border-transparent transition-all duration-500 ${isActive ? 'bg-primary/10 text-primary border-primary/20' : 'bg-secondary/30 text-muted-foreground opacity-50'}`}
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
