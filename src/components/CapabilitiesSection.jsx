import { useEffect, useRef, useState } from 'react';
import { Globe, Server, BrainCircuit, Container } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Capabilities snapshot + tech stack — extracted verbatim from the original
// HeroSection (which is retired from render). Same glassmorphism cards, same
// animated counters and chip stagger; only the photo-constellation hover
// coupling (activeEmoji) was removed with the photo.
// ─────────────────────────────────────────────────────────────────────────────

const buildingAcrossChips = [
  { id: 'healthtech', icon: '❤️', label: 'HealthTech & Wellness' },
  { id: 'healthcare', icon: '🏥', label: 'Healthcare & Clinical AI' },
  { id: 'cybersecurity', icon: '🔐', label: 'Cybersecurity & Threat Intelligence' },
  { id: 'hrtech', icon: '👥', label: 'HR Tech & People Ops' },
  { id: 'edtech', icon: '📚', label: 'EdTech & Learning Platforms' },
  { id: 'accessibility', icon: '♿', label: 'Accessibility & Inclusive Design' },
  { id: 'travel', icon: '✈️', label: 'Travel, Transit & Events' },
  { id: 'finance', icon: '💳', label: 'Finance, Payments & Pricing Systems' },
  { id: 'realestate', icon: '🗺️', label: 'Real Estate & Location Intelligence' },
  { id: 'devtools', icon: '🛠️', label: 'Developer Platforms & Internal Tools' },
  { id: 'engineering', icon: '🏗️', label: 'Engineering & Infrastructure' },
  { id: 'openai', icon: '🌍', label: 'Open to Applied AI Across New Domains' },
];

const whatIBuildChips = [
  { icon: '🤖', label: 'AI Copilots & Assistants' },
  { icon: '📚', label: 'RAG Systems & Knowledge Engines' },
  { icon: '📊', label: 'Real-Time Dashboards & Analytics' },
  { icon: '🧩', label: 'Internal Tools & Admin Portals' },
  { icon: '🧠', label: 'ML/LLM-Powered APIs & Services' },
  { icon: '🚀', label: 'Full-Stack MVPs & Platforms' },
  { icon: '🌉', label: 'API & Data Integrations' },
];

const howIWorkChips = [
  { icon: '🧑‍🤝‍🧑', label: 'Human-Centered & Empathy-Driven' },
  { icon: '✅', label: 'Production-Ready & Tested' },
  { icon: '🛰️', label: 'Observability-First' },
  { icon: '🔐', label: 'Privacy & Security Conscious' },
  { icon: '📏', label: 'Data-Driven & Metric-Focused' },
  { icon: '🔁', label: 'Iterate Fast, Learn From Users' },
];

const techStackGroups = [
  {
    label: 'Frontend',
    icon: <Globe className="w-3 h-3" />,
    gradient: 'from-cyan-500 to-blue-500',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    icon: <Server className="w-3 h-3" />,
    gradient: 'from-emerald-500 to-teal-500',
    techs: ['Node.js', 'FastAPI', 'PostgreSQL', 'GraphQL'],
  },
  {
    label: 'AI / ML',
    icon: <BrainCircuit className="w-3 h-3" />,
    gradient: 'from-purple-500 to-pink-500',
    techs: ['TensorFlow', 'LangChain', 'OpenAI', 'Python'],
  },
  {
    label: 'DevOps',
    icon: <Container className="w-3 h-3" />,
    gradient: 'from-orange-500 to-red-500',
    techs: ['AWS', 'Docker', 'GitHub Actions', 'Terraform'],
  },
];

const easeOutQuad = (t) => t * (2 - t);

export function CapabilitiesSection() {
  const capRef = useRef(null);
  const [capVisible, setCapVisible] = useState(false);
  const [capStats, setCapStats] = useState({ domains: 0, patterns: 0, ways: 0 });
  const [hoveredChip, setHoveredChip] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !capVisible) {
            setCapVisible(true);
            const animateCap = (key, end, duration) => {
              const startTime = performance.now();
              const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(end * easeOutQuad(progress));
                setCapStats((prev) => ({ ...prev, [key]: value }));
                if (progress < 1) requestAnimationFrame(animate);
              };
              requestAnimationFrame(animate);
            };
            animateCap('domains', 12, 1200);
            animateCap('patterns', 7, 1000);
            animateCap('ways', 6, 800);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (capRef.current) observer.observe(capRef.current);
    return () => observer.disconnect();
  }, [capVisible]);

  return (
    <section className="relative py-12">
      <div ref={capRef} className="container mx-auto px-4 mb-14 animate-fade-up">
        <div className="relative bg-white/5 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl shadow-primary/5 hover:shadow-primary/15 hover:border-primary/30 transition-all duration-700 overflow-hidden">
          {/* Decorative corner gradients */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-emerald-500/15 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Header row with animated counters */}
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-base shadow-lg shadow-primary/30 animate-pulse">
                ⚙️
              </span>
              <h2 className="text-base md:text-lg font-bold tracking-[0.25em] uppercase bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Capabilities snapshot
              </h2>
            </div>
            <div className="flex items-center gap-4 text-sm font-semibold">
              <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <span className="text-base font-black">{capStats.domains}</span> domains
              </span>
              <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <span className="text-base font-black">{capStats.patterns}</span> system patterns
              </span>
              <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="text-base font-black">{capStats.ways}</span> ways of working
              </span>
            </div>
          </div>

          {/* 3-column grid of pillars */}
          <div className="grid gap-5 md:grid-cols-3">
            {/* Building Across */}
            <div className="relative group/card rounded-2xl p-5 md:p-6 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h3 className="relative text-xs font-black text-muted-foreground mb-4 tracking-[0.25em] uppercase flex items-center gap-2">
                <span className="inline-block h-6 w-2 rounded-full bg-gradient-to-b from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/50" />
                Building across
              </h3>
              <div className="relative flex flex-wrap gap-2">
                {buildingAcrossChips.map((chip, idx) => (
                  <span
                    key={chip.id}
                    onMouseEnter={() => setHoveredChip(chip.id)}
                    onMouseLeave={() => setHoveredChip(null)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border transition-all duration-300 cursor-default ${
                      capVisible ? 'animate-in fade-in slide-in-from-bottom-2' : 'opacity-0'
                    } ${
                      hoveredChip === chip.id
                        ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/20 scale-105 text-blue-300'
                        : 'bg-white/5 dark:bg-black/10 border-white/10 hover:border-blue-400/50 hover:bg-blue-500/10'
                    }`}
                    style={{ animationDelay: capVisible ? `${idx * 40}ms` : '0ms', animationFillMode: 'both' }}
                  >
                    <span className="mr-1">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            {/* What I Build */}
            <div className="relative group/card rounded-2xl p-5 md:p-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h3 className="relative text-xs font-black text-muted-foreground mb-4 tracking-[0.25em] uppercase flex items-center gap-2">
                <span className="inline-block h-6 w-2 rounded-full bg-gradient-to-b from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50" />
                What I build
              </h3>
              <div className="relative flex flex-wrap gap-2">
                {whatIBuildChips.map((chip, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm border transition-all duration-300 cursor-default ${
                      capVisible ? 'animate-in fade-in slide-in-from-bottom-2' : 'opacity-0'
                    } bg-white/5 dark:bg-black/10 border-white/10 hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-purple-300 hover:scale-105`}
                    style={{ animationDelay: capVisible ? `${200 + idx * 40}ms` : '0ms', animationFillMode: 'both' }}
                  >
                    <span className="mr-1">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            {/* How I Work */}
            <div className="relative group/card rounded-2xl p-5 md:p-6 bg-gradient-to-br from-emerald-500/5 to-lime-500/5 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-emerald-500/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h3 className="relative text-xs font-black text-muted-foreground mb-4 tracking-[0.25em] uppercase flex items-center gap-2">
                <span className="inline-block h-6 w-2 rounded-full bg-gradient-to-b from-emerald-500 to-lime-400 shadow-lg shadow-emerald-500/50" />
                How I work
              </h3>
              <div className="relative flex flex-wrap gap-2">
                {howIWorkChips.map((chip, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border transition-all duration-300 cursor-default ${
                      capVisible ? 'animate-in fade-in slide-in-from-bottom-2' : 'opacity-0'
                    } bg-white/5 dark:bg-black/10 border-white/10 hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-300 hover:scale-105`}
                    style={{ animationDelay: capVisible ? `${400 + idx * 40}ms` : '0ms', animationFillMode: 'both' }}
                  >
                    <span className="mr-1">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack — Grouped by Layer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-xs font-black text-muted-foreground mb-5 tracking-[0.25em] uppercase flex items-center gap-2">
              <span className="inline-block h-6 w-2 rounded-full bg-gradient-to-b from-orange-500 to-red-500 shadow-lg shadow-orange-500/50" />
              Tech stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStackGroups.map((group, gIdx) => (
                <div
                  key={gIdx}
                  className={`rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-500 ${
                    capVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'
                  }`}
                  style={{ animationDelay: capVisible ? `${600 + gIdx * 100}ms` : '0ms', animationFillMode: 'both' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br ${group.gradient} text-white shadow-sm`}>
                      {group.icon}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{group.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.techs.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold border border-white/10 hover:border-white/25 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
