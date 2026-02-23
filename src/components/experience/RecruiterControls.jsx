import { Filter, SortAsc, LayoutList, ChevronDown, Zap } from 'lucide-react';
import { useState } from 'react';

export const RecruiterControls = ({
    filters,
    activeFilter,
    onFilterChange,
    onSortChange,
    onJump,
    mode,
    onToggleMode,
    experiences
}) => {
    const [isJumpOpen, setIsJumpOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 py-8 border-y border-border/50 mb-12 animate-fade-in">
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

            <div className="h-[1px] md:h-8 w-24 md:w-[1px] bg-border/50" />

            {/* Filters */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide max-w-full">
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

            <div className="h-[1px] md:h-8 w-24 md:w-[1px] bg-border/50 hidden md:block" />

            {/* Quick Jump */}
            <div className="relative ml-auto w-full md:w-auto">
                <button
                    onClick={() => setIsJumpOpen(!isJumpOpen)}
                    className="w-full md:w-64 flex items-center justify-between px-6 py-3 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all group"
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
                                <span className="text-xl group-hover/jump:scale-125 transition-transform">{exp.heroMotif.emoji}</span>
                                <div className="text-left">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-foreground">{exp.company}</div>
                                    <div className="text-[9px] text-muted-foreground">{exp.heroMotif.title}</div>
                                </div>
                                <Zap className="w-3 h-3 ml-auto text-primary opacity-0 group-hover/jump:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
