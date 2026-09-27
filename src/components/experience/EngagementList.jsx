import { Briefcase } from 'lucide-react';
import { yearSpan } from '../../lib/dates';

// Client projects / teams worked with inside a single tenure (e.g. SRM IST).
// Makes it obvious they were engagements under one employer, not separate jobs.
export const EngagementList = ({ engagements, roleTheme }) => (
    <div className="space-y-4">
        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Engagements within this role
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {engagements.map((e) => (
                <li key={e.id} className="min-w-0 flex gap-3 p-4 rounded-2xl bg-secondary/10 border border-border/60">
                    <span
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card"
                        style={{ color: roleTheme.accent }}
                        aria-hidden="true"
                    >
                        <Briefcase className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-foreground leading-tight break-words">{e.client}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {e.kind} · {yearSpan(e.dateRange)}
                        </p>
                        <p className="text-xs text-foreground/80 mt-1 break-words">{e.focus}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);
