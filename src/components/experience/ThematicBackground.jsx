import { useEffect, useRef } from 'react';

export const ThematicBackground = ({ motif, color }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (motif !== 'radar' && motif !== 'waveform') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        let frame = 0;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;

            if (motif === 'radar') {
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;
                const radius = Math.min(cx, cy) * 0.8;

                // Draw circles
                ctx.strokeStyle = `${color}20`;
                ctx.lineWidth = 1;
                for (let i = 1; i <= 3; i++) {
                    ctx.beginPath();
                    ctx.arc(cx, cy, (radius / 3) * i, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Draw sweep
                const angle = (frame * 0.02) % (Math.PI * 2);
                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
                gradient.addColorStop(0, `${color}00`);
                gradient.addColorStop(1, `${color}40`);

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, radius, angle - 0.5, angle);
                ctx.lineTo(cx, cy);
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.restore();

                // Draw "blips"
                const blips = [
                    { x: cx + 100, y: cy - 50, size: 4 },
                    { x: cx - 150, y: cy + 100, size: 3 },
                    { x: cx + 200, y: cy + 150, size: 5 }
                ];

                blips.forEach((blip, i) => {
                    const opacity = Math.max(0, Math.sin((frame + i * 50) * 0.05));
                    ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                    ctx.beginPath();
                    ctx.arc(blip.x, blip.y, blip.size, 0, Math.PI * 2);
                    ctx.fill();
                });

            } else if (motif === 'waveform') {
                const centerY = canvas.height / 2;
                ctx.beginPath();
                ctx.strokeStyle = `${color}40`;
                ctx.lineWidth = 2;

                for (let x = 0; x < canvas.width; x += 5) {
                    const amplitude = 50 + Math.sin(frame * 0.05) * 20;
                    const y = centerY + Math.sin(x * 0.01 + frame * 0.1) * amplitude * Math.sin(frame * 0.02);
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            animationFrameId = window.requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [motif, color]);

    if (motif === 'circuit') {
        return (
            <div className="absolute inset-0 -z-20 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M 10 10 H 90 V 90 H 10 Z" fill="none" stroke={color} strokeWidth="0.5" />
                        <circle cx="10" cy="10" r="2" fill={color} />
                        <circle cx="90" cy="90" r="2" fill={color} />
                        <path d="M 10 50 H 30 V 70 H 50" fill="none" stroke={color} strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>
        );
    }

    if (motif === 'notebook') {
        return (
            <div className="absolute inset-0 -z-20 opacity-5 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-20 opacity-20 pointer-events-none"
        />
    );
};
