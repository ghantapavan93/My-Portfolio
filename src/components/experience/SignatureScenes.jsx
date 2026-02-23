import { useState, useEffect, useRef } from 'react';
import { Activity, ShieldCheck, AlertCircle, Clock, Zap } from 'lucide-react';

export const VosynLatencyDial = ({ active }) => {
    const [value, setValue] = useState(823);

    useEffect(() => {
        if (active) {
            const start = 823;
            const end = 447;
            const duration = 2000;
            let startTime = null;

            const animate = (time) => {
                if (!startTime) startTime = time;
                const progress = Math.min((time - startTime) / duration, 1);
                const current = Math.floor(start - (start - end) * progress);
                setValue(current);
                if (progress < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
        }
    }, [active]);

    return (
        <div className="flex flex-col items-center justify-center p-8 rounded-full border-4 border-primary/20 bg-primary/5 w-64 h-64 relative overflow-hidden group">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">p95 Latency</div>
            <div className="text-5xl font-black tracking-tighter text-foreground">{value}<span className="text-xl text-primary font-bold ml-1">ms</span></div>
            <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[9px] font-black uppercase">
                <Zap className="w-3 h-3" /> -45.6% Latency
            </div>

            {/* Decorative dial arc */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 p-4">
                <circle
                    cx="50%" cy="50%" r="48%"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="300"
                    strokeDashoffset={300 - (300 * (1 - (value - 447) / (823 - 447)))}
                    className="text-primary transition-all duration-100"
                />
            </svg>
        </div>
    );
};

export const KrowdOpsPlayback = ({ active }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (active) {
            const interval = setInterval(() => {
                setStep(s => (s + 1) % 4);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [active]);

    const steps = [
        { icon: <AlertCircle className="text-amber-500" />, label: "Incident Detected", sub: "Crowd surge at Zone B" },
        { icon: <Zap className="text-blue-500" />, label: "AI Triage", sub: "Priority 1: Urgent Response" },
        { icon: <ShieldCheck className="text-green-500" />, label: "Operator Approved", sub: "Dispatching team 4" },
        { icon: <Activity className="text-primary" />, label: "Pulse Stabilized", sub: "Area cleared in 4.2m" }
    ];

    return (
        <div className="w-full max-w-md space-y-4">
            {steps.map((s, i) => (
                <div
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 ${step === i ? 'bg-card border-primary translate-x-4 shadow-lg' : 'bg-secondary/20 border-transparent opacity-40 scale-95'}`}
                >
                    <div className="p-2 rounded-xl bg-background border border-border">
                        {s.icon}
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-foreground">{s.label}</div>
                        <div className="text-xs text-muted-foreground">{s.sub}</div>
                    </div>
                    {step === i && <Zap className="w-4 h-4 ml-auto text-primary animate-pulse" />}
                </div>
            ))}
        </div>
    );
};
