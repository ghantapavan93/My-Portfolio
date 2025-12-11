import { Button } from './ui/button'
import { useEffect, useRef, useState } from 'react'
import { ImageOff, Github, Linkedin, ChevronDown, Compass } from 'lucide-react'

export function HeroSection() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const cursorGlowRef = useRef(null);

  const [imageError, setImageError] = useState(false);
  const [expandedProcess, setExpandedProcess] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stats, setStats] = useState({ projects: 0, students: 0, hackathons: 0 });
  const [konamiSequence, setKonamiSequence] = useState([]);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const resumeLink = "https://drive.google.com/file/d/1ZzsEtDdGER8rRoCCX9zFI3qQSAgfj50z/view?usp=sharing";

  // Konami code
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Domain emojis with positions
  const domainEmojis = [
    { emoji: '❤️', label: 'Health', position: 'top-left', chipId: 'healthtech' },
    { emoji: '🔐', label: 'Cyber', position: 'top-right', chipId: 'cybersecurity' },
    { emoji: '👥', label: 'HR', position: 'bottom-left', chipId: 'hrtech' },
    { emoji: '📚', label: 'EdTech', position: 'bottom-right', chipId: 'edtech' },
    { emoji: '♿', label: 'Accessibility', position: 'top', chipId: 'accessibility' },
    { emoji: '✈️', label: 'Travel', position: 'right', chipId: 'travel' },
  ];

  // Chip groups
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

  const techStack = [
    'React', 'TypeScript', 'Python', 'TensorFlow', 'Next.js', 'FastAPI',
    'PostgreSQL', 'AWS', 'Docker', 'LangChain', 'OpenAI', 'Node.js'
  ];

  // Helper functions
  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  const easeOutQuad = (t) => t * (2 - t);

  const getEmojiPositionClass = (position) => {
    const positions = {
      'top-left': '-top-8 -left-8',
      'top-right': '-top-8 -right-8',
      'bottom-left': '-bottom-8 -left-8',
      'bottom-right': '-bottom-8 -right-8',
      'top': '-top-12 left-1/2 -translate-x-1/2',
      'right': 'top-1/2 -right-12 -translate-y-1/2',
    };
    return positions[position] || '';
  };

  const animateValue = (key, start, end, duration) => {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (end - start) * easeOutQuad(progress));

      setStats(prev => ({ ...prev, [key]: value }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  // Effects
  useEffect(() => {
    const handleKeyPress = (e) => {
      const newSequence = [...konamiSequence, e.key].slice(-10);
      setKonamiSequence(newSequence);

      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        setEasterEggActive(true);
        setTimeout(() => setEasterEggActive(false), 3000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiSequence]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cursorGlowRef.current || !heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        cursorGlowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.15), transparent 40%)`;
      }
    };

    const throttledMouseMove = throttle(handleMouseMove, 50);
    window.addEventListener('mousemove', throttledMouseMove);
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateValue('projects', 0, 15, 2000);
          animateValue('students', 0, 200, 2500);
          animateValue('hackathons', 0, 5, 1500);
        }
      });
    }, { threshold: 0.5 });

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="pt-24 md:pt-28 pb-12 relative overflow-hidden"
    >
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Cursor Glow */}
      <div
        ref={cursorGlowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 hidden md:block"
        style={{ opacity: 0.6 }}
      />

      {/* Grid Dot Pattern */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-mesh-1" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-mesh-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/15 via-pink-500/15 to-orange-500/15 rounded-full blur-3xl animate-mesh-3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">

          {/* LEFT: Content */}
          <div ref={contentRef} className="order-1">
            <div className="animate-fade-down">
              <p className="text-sm font-medium text-primary mb-3 tracking-wide">
                AI Engineer · Full-Stack Developer · Product Builder
              </p>
            </div>

            <div className="animate-fade-up animation-delay-100">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-5 max-w-2xl">
                Turning real-world problems into <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">deployed AI products</span>
                  <span className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg -z-10"></span>
                </span> and full-stack platforms across real-world domains.
              </h1>
            </div>

            <div className="animate-fade-up animation-delay-200 mb-5">
              <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
                I'm an AI Engineer and Full-Stack Developer focused on taking real problems people face and turning them into deployed products. My motivation is simple: use technology to quietly reduce everyday friction—help someone manage their health, feel safer in a crowd, get faster answers at work, or access information more easily. I build systems that fit how companies already operate: APIs, internal tools, AI copilots, and full-stack platforms that are reliable in production, not just impressive in demos.
              </p>
            </div>

            <div className="animate-fade-up animation-delay-300 mb-8">
              <button
                onClick={() => setExpandedProcess(!expandedProcess)}
                className="flex items-center gap-2 text-primary font-medium mb-3 hover:gap-3 transition-all group"
              >
                <span>→ How I turn problems into products, end-to-end</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedProcess ? 'rotate-180' : ''}`} />
              </button>

              {expandedProcess && (
                <p className="text-lg leading-relaxed text-muted-foreground mb-4 animate-fade-down bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  Most of what I build starts as a personal or observed pain point—confusing medical information, unsafe public spaces, overwhelming admin work—and ends as a working product with real users. I enjoy the full lifecycle: listening to problems, shaping them into clear product ideas, designing data and AI workflows, building the backend and UI, wiring in observability, and iterating until the solution genuinely helps people and the teams who run it.
                </p>
              )}
            </div>

            {/* Chip Groups - Horizontal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">

              <div className="animate-fade-up animation-delay-400">
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wide uppercase">Building across</h3>
                <div className="flex flex-wrap gap-2">
                  {buildingAcrossChips.map((chip, idx) => (
                    <span
                      key={chip.id}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium bg-white/5 dark:bg-black/10 backdrop-blur-sm border transition-all duration-300 cursor-default ${activeEmoji === chip.id
                        ? 'border-primary bg-primary/20 shadow-lg shadow-primary/30 scale-105'
                        : 'border-white/10 hover:border-primary/50 hover:bg-white/10'
                        }`}
                    >
                      <span className="mr-1.5">{chip.icon}</span>
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="animate-fade-up animation-delay-600">
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wide uppercase">What I build</h3>
                <div className="flex flex-wrap gap-2">
                  {whatIBuildChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
                    >
                      <span className="mr-1.5">{chip.icon}</span>
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="animate-fade-up animation-delay-800">
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wide uppercase">How I work</h3>
                <div className="flex flex-wrap gap-2">
                  {howIWorkChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
                    >
                      <span className="mr-1.5">{chip.icon}</span>
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Ticker */}
            <div className="animate-fade-up animation-delay-1000 my-6 overflow-hidden">
              <div className="flex gap-4 animate-scroll-infinite whitespace-nowrap">
                {[...techStack, ...techStack].map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 animate-fade-up animation-delay-1200">
              <div className="p-4 rounded-xl bg-white/5 dark:bg-black/10 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {stats.projects}+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  📈 AI & Full-Stack Projects Deployed
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 dark:bg-black/10 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stats.students}+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  👥 Students Mentored in AI & Software
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 dark:bg-black/10 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {stats.hackathons}+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  🏆 Hackathon Wins & Recognitions
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-6 animate-fade-up animation-delay-1400">
              <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-primary/20 group" asChild>
                <a href="#projects" className="flex items-center gap-2">
                  <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                  Explore Projects
                </a>
              </Button>

              <Button variant="outline" className="border-primary/30 hover:bg-primary/10" asChild>
                <a href={resumeLink} target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Social */}
            <div className="mt-8 pt-6 border-t border-border/40 animate-fade-up animation-delay-1600">
              <div className="flex items-center gap-4">
                <a href="https://github.com/ghantapavan93" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full text-white bg-[#24292e] hover:bg-[#24292e]/90 transition-all hover:scale-110" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/pavankalyan-ghanta-b20115200/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full text-white bg-[#0077b5] hover:bg-[#0077b5]/90 transition-all hover:scale-110" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.youtube.com/@pavankalyanghanta2737" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full text-white bg-[#FF0000] hover:bg-[#FF0000]/90 transition-all hover:scale-110" aria-label="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Photo */}
          <div className="order-2 lg:sticky lg:top-28">
            <div className="relative w-full max-w-[380px] mx-auto animate-fade-up animation-delay-200">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-700 animate-float" />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-tl from-cyan-500/30 to-transparent rounded-full blur-2xl animate-pulse-slow" />

              <div className="relative bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl p-1 shadow-2xl border border-white/20 dark:border-white/10 hover:shadow-primary/20 hover:border-primary/40 transition-all duration-500 animate-breathing group">
                <div className="absolute -top-3 -right-3 z-20 px-3 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full flex items-center gap-1.5 shadow-lg animate-fade-down animation-delay-400">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                  <span className="text-white text-xs font-medium">Available for hire</span>
                </div>

                <div className="overflow-hidden rounded-xl">
                  {imageError ? (
                    <div className="w-full aspect-[3/4] flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
                      <ImageOff className="h-12 w-12 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Image not available</p>
                      <Button variant="outline" size="sm" className="mt-3" onClick={() => setImageError(false)}>
                        Try again
                      </Button>
                    </div>
                  ) : (
                    <img
                      src="/Pavan_Profile_Pic.jpg"
                      alt="Pavankalyan Ghanta"
                      className={`w-full h-auto object-cover aspect-[3/4] transition-all duration-700 ${easterEggActive ? 'animate-spin-once hue-rotate-180' : 'hover:scale-105'}`}
                      onError={() => setImageError(true)}
                      loading="eager"
                    />
                  )}
                </div>
              </div>

              {/* Constellation Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {domainEmojis.map((item, idx) => (
                  domainEmojis.slice(idx + 1).map((target, targetIdx) => (
                    <line
                      key={`${idx}-${targetIdx}`}
                      x1="50%"
                      y1="50%"
                      x2="50%"
                      y2="50%"
                      stroke={activeEmoji === item.chipId || activeEmoji === target.chipId ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.1)'}
                      strokeWidth="1"
                      className="transition-all duration-300"
                      filter="url(#glow)"
                    />
                  ))
                ))}
              </svg>

              {/* Floating Emojis */}
              {domainEmojis.map((item, idx) => (
                <div
                  key={idx}
                  className={`absolute ${getEmojiPositionClass(item.position)} z-10 animate-fade-in`}
                  style={{ animationDelay: `${600 + idx * 100}ms` }}
                  onMouseEnter={() => setActiveEmoji(item.chipId)}
                  onMouseLeave={() => setActiveEmoji(null)}
                >
                  <div className={`px-3 py-2 rounded-full backdrop-blur-md shadow-lg cursor-pointer transition-all duration-300 border ${activeEmoji === item.chipId
                    ? 'bg-primary/30 border-primary scale-110 shadow-primary/50'
                    : 'bg-white/10 dark:bg-black/20 border-white/20 hover:scale-110 hover:bg-white/20'
                    } ${easterEggActive ? 'animate-bounce' : 'animate-float-subtle'}`}>
                    <span className="text-2xl" role="img" aria-label={item.label}>{item.emoji}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Easter Egg */}
      {easterEggActive && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl animate-bounce">
          🎮 Konami Code Activated! You found the secret! 🎉
        </div>
      )}
    </section>
  )
}
