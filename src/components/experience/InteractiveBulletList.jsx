import { useState } from 'react';
import { ChevronRight, CircleDot } from 'lucide-react';

export const InteractiveBulletList = ({ heading, bullets, onBulletSelect, activeBulletId, roleTheme }) => {
    if (!bullets || bullets.length === 0) return null;

    return (
        <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border/50 pb-2">
                {heading}
            </h4>
            <div className="space-y-4">
                {bullets.map((bullet, i) => {
                    const isInteractive = bullet.id !== undefined;
                    const isActive = activeBulletId === bullet.id;
                    const text = typeof bullet === 'string' ? bullet : bullet.label;

                    return (
                        <div
                            key={bullet.id || i}
                            onClick={isInteractive ? () => onBulletSelect(bullet) : undefined}
                            className={`group relative flex gap-4 p-4 rounded-2xl transition-all duration-300 border ${isInteractive
                                    ? `${isActive ? 'bg-primary/5 border-primary shadow-sm' : 'bg-transparent border-transparent hover:bg-secondary/30 hover:border-border/50 cursor-pointer'}`
                                    : 'bg-transparent border-transparent'
                                }`}
                        >
                            <div className="shrink-0 mt-1">
                                {isInteractive ? (
                                    <CircleDot
                                        className={`w-4 h-4 transition-all duration-500 ${isActive ? 'text-primary scale-125' : 'text-muted-foreground group-hover:text-primary'}`}
                                        style={isActive ? { color: roleTheme.accent } : {}}
                                    />
                                ) : (
                                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-1.5" />
                                )}
                            </div>
                            <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground/80'}`}>
                                {text}
                            </p>

                            {isInteractive && !isActive && (
                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-4 h-4 text-primary" style={{ color: roleTheme.accent }} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
