import { useRef, useEffect, useState } from 'react';
import { MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { TechAtlas } from './TechAtlas';
import { CoreBulletList } from './CoreBulletList';

const CountUp = ({ value, label, hint }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    // Simple count up logic for numeric values if possible
                    // For complex values like "+43.27%", we'll just show it with a fade
                }
            },
            { threshold: 0.5 }
        );

        if (nodeRef.current) observer.observe(nodeRef.current);
        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <div
            ref={nodeRef}
            className={`p-4 rounded-2xl bg-secondary/20 border border-white/5 hover:border-primary/30 transition-all duration-700 group/metric ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 group-hover/metric:text-primary transition-colors">
                {label}
            </div>
            <div className="text-xl md:text-2xl font-black tracking-tighter text-foreground">
                {value}
            </div>
            {hint && (
                <div className="absolute inset-x-0 bottom-full mb-2 opacity-0 group-hover/metric:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded border border-border shadow-xl whitespace-nowrap">
                        {hint}
                    </div>
                </div>
            )}
        </div>
    );
};

export const RolePanel = ({ experience, isActive, onEnter, mode }) => {
    const isRecruiterMode = mode === 'recruiter';
    const [activeTech, setActiveTech] = useState([]);

    if (isRecruiterMode) {
        return (
            <div className="py-6 border-b border-border/50 group cursor-pointer" onClick={() => onEnter(experience.id)}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{experience.company}</h3>
                    <span className="text-sm text-muted-foreground font-medium">{experience.dateRange}</span>
                </div>
                <p className="text-base font-semibold text-foreground/90 mb-2">{experience.role}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                    {experience.proofMetrics.map((m, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{m.label}:</span>
                            <span className="text-sm font-bold text-primary">{m.value}</span>
                        </div>
                    ))}
                </div>
                <button className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Case Study <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        );
    }

    return (
        <div
            className={`relative py-20 px-4 md:px-12 transition-all duration-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-[0.98]'}`}
        >
            {/* Background Halo */}
            <div
                className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${isActive ? 'opacity-20' : 'opacity-0'}`}
                style={{
                    background: `radial-gradient(circle at 20% 50%, ${experience.theme.accent}, transparent 70%)`
                }}
            />

            <div className="max-w-4xl">
                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                                {experience.heroMotif.emoji} {experience.heroMotif.title}
                            </span>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9]">
                            {experience.company}<span className="text-primary">.</span>
                        </h3>
                        <p className="text-xl md:text-2xl font-bold text-muted-foreground tracking-tight">
                            {experience.role}
                        </p>
                    </div>

                    <div className="flex flex-col md:items-end gap-1 md:ml-auto text-muted-foreground font-medium text-sm md:text-right">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{experience.dateRange}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{experience.location}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-10">
                    <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed max-w-2xl border-l-2 border-primary/30 pl-6 italic">
                        "{experience.hookLine}"
                    </p>
                    {experience.teamContext && (
                        <div className="pl-6 py-2 border-l-2 border-border/30">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                                {experience.teamContext}
                            </p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    {experience.proofMetrics.map((metric, i) => (
                        <CountUp key={i} {...metric} />
                    ))}
                </div>

                {/* Block B: Tech Atlas - Full Wall of Icons */}
                {experience.stackAtlas && (
                    <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        <TechAtlas
                            atlas={experience.stackAtlas}
                            roleTheme={experience.theme}
                            onOpenFullStack={() => onEnter(experience.id)}
                            activeTech={activeTech}
                        />
                    </div>
                )}

                {/* Block C: Core Bulletins (The 7 Effective Points) */}
                {experience.bulletPoints && (
                    <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <CoreBulletList
                            bullets={experience.bulletPoints}
                            roleTheme={experience.theme}
                        />
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-8 group/footer">
                    <div className="flex flex-wrap gap-2 max-w-md">
                        {experience.topStack.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="bg-card/50 border-border/50 text-[10px] font-bold tracking-wider py-1">
                                {skill}
                            </Badge>
                        ))}
                    </div>

                    <button
                        onClick={() => onEnter(experience.id)}
                        className="ml-auto group/cta relative px-8 py-4 rounded-2xl bg-foreground text-background font-black uppercase tracking-[0.2em] text-xs transition-all hover:scale-105 active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500" style={{ backgroundColor: experience.theme.accent }} />
                        <span className="relative z-10 flex items-center gap-2">
                            Enter Case Study <Sparkles className="w-4 h-4" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};
