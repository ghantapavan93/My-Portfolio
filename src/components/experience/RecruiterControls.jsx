import { Filter, LayoutList, ChevronDown, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { yearSpan } from '../../lib/dates';

export const RecruiterControls = ({
    filters,
    activeFilter,
    onFilterChange,
    onJump,
    mode,
    onToggleMode,
    experiences
}) => {
    const [isJumpOpen, setIsJumpOpen] = useState(false);
    const jumpRef = useRef(null);

    // Close the Quick Jump menu on outside click or Escape.
    useEffect(() => {
        if (!isJumpOpen) return;
        const onPointer = (e) => { if (!jumpRef.current?.contains(e.target)) setIsJumpOpen(false); };
        const onKey = (e) => { if (e.key === 'Escape') setIsJumpOpen(false); };
        document.addEventListener('pointerdown', onPointer);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, [isJumpOpen]);

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 py-8 border-y border-border/50 mb-12 animate-fade-in">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2 p-1 bg-secondary/50 rounded-xl border border-border/50">
                <button
                    onClick={() => onToggleMode('cinematic')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'cinematic' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Cinematic
                </button>
                <button
                    onClick={() => onToggleMode('recruiter')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'recruiter' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Recruiter
                </button>
            </div>

            <div className="hidden lg:block h-8 w-[1px] bg-border/50" />

            {/* Filters */}
            <div className="flex flex-1 flex-wrap items-center gap-2 min-w-0">
                <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => onFilterChange(f)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${activeFilter === f ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-border/50 text-muted-foreground hover:border-primary/30'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="hidden lg:block h-8 w-[1px] bg-border/50" />

            {/* Quick Jump */}
            <div ref={jumpRef} className="relative lg:ml-auto w-full lg:w-64 shrink-0">
                <button
                    onClick={() => setIsJumpOpen(!isJumpOpen)}
                    aria-expanded={isJumpOpen}
                    aria-haspopup="true"
                    className="w-full flex items-center justify-between px-6 py-3 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all group"
                >
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                        <LayoutList className="w-4 h-4" />
                        Quick Jump
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-500 ${isJumpOpen ? 'rotate-180' : ''}`} />
                </button>

                {isJumpOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-card border border-border shadow-2xl rounded-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                        {experiences.map(exp => (
                            <button
                                key={exp.id}
                                onClick={() => {
                                    onJump(exp.id);
                                    setIsJumpOpen(false);
                                }}
                                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/5 group/jump transition-colors"
                            >
                                <div className="text-left min-w-0">
                                    <div className="text-[11px] font-black uppercase tracking-widest text-foreground truncate">{exp.company}</div>
                                    <div className="text-[10px] text-muted-foreground">{exp.role} · {yearSpan(exp.dateRange)}</div>
                                </div>
                                <Zap className="w-3 h-3 ml-auto shrink-0 text-primary opacity-0 group-hover/jump:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
