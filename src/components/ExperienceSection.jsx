import { useState, useEffect, useRef } from 'react';
import { experiences } from '../data/experiences';
import { RolePanel } from './experience/RolePanel';
import { RecruiterControls } from './experience/RecruiterControls';
import { ExperienceCaseStudy } from './ExperienceCaseStudy';

export function ExperienceSection() {
  const [activeRole, setActiveRole] = useState(experiences[0].id);
  const [filter, setFilter] = useState('All');
  const [mode, setMode] = useState('cinematic'); // 'cinematic' | 'recruiter'
  const [openCaseStudyId, setOpenCaseStudyId] = useState(null);

  const sectionRefs = useRef({});
  const containerRef = useRef(null);

  // Filter logic
  const domainFilters = ['All', 'AI/ML', 'Full-Stack', 'Infra/MLOps', 'Research', 'Real-time'];
  const filteredExperiences = filter === 'All'
    ? experiences
    : experiences.filter(exp => exp.domainTags.includes(filter));

  // Intersection Observer for active role tracking (Center-band detection)
  useEffect(() => {
    if (mode === 'recruiter') return;

    const options = {
      threshold: 0,
      rootMargin: '-45% 0px -45% 0px' // Only triggers when element crosses the center 10% band
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveRole(entry.target.id);
          window.history.replaceState(null, null, `#experience/${entry.target.id}`);
        }
      });
    }, options);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [mode, filteredExperiences]);

  // Smooth Timeline Progress Tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    if (mode !== 'cinematic') return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how far we've scrolled through the section
      // 0 at top of section, 1 at bottom
      const totalHeight = rect.height;
      const scrolled = Math.max(0, Math.min(1, (viewportHeight / 2 - rect.top) / totalHeight));
      setScrollProgress(scrolled * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mode, filteredExperiences]);

  // Handle hash routing on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#experience/')) {
      const id = hash.split('/')[1].split('#')[0];
      const targetExp = experiences.find(e => e.id === id);
      if (targetExp) {
        setOpenCaseStudyId(id);
      }
    }
  }, []);

  const handleJump = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveRole(id); // Force update state immediately
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="experience" className="relative pb-32 bg-background" ref={containerRef}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-background via-background to-background" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="pt-32 mb-20 lg:pl-36">
          <span className="text-primary text-sm font-black uppercase tracking-[0.5em] mb-4 block animate-fade-in">Experience OS</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.8] mb-8">
            <span className="block italic opacity-50 uppercase">Professional</span>
            <span className="block text-primary">JOURNEY.</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl leading-snug animate-fade-up">
            Building intelligent automation and mission-critical systems since 2019.
          </p>
        </div>

        <div className="lg:pl-36">
          <RecruiterControls
            filters={domainFilters}
            activeFilter={filter}
            onFilterChange={setFilter}
            onJump={handleJump}
            mode={mode}
            onToggleMode={setMode}
            experiences={experiences}
          />
        </div>

        <div className="relative flex">
          {/* Timeline Rail */}
          {mode === 'cinematic' && (
            <div className="hidden lg:block sticky top-[40vh] w-24 h-fit mr-12 shrink-0">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-border/20 rounded-full h-[70vh]">
                {/* Active Progress Line Tracking Marker */}
                <div
                  className="absolute top-0 left-0 w-full bg-primary transition-all duration-500 rounded-full"
                  style={{
                    height: `${(experiences.findIndex(e => e.id === activeRole) / (experiences.length - 1)) * 100}%`
                  }}
                />
              </div>

              {/* Nodes */}
              <div className="relative flex flex-col items-center justify-between h-[70vh] py-0">
                {experiences.map((exp) => {
                  const isActive = activeRole === exp.id;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => handleJump(exp.id)}
                      className={`group relative w-12 h-12 rounded-2xl bg-card border-2 flex items-center justify-center text-xl transition-all duration-500 z-10 
                                 ${isActive
                          ? 'border-primary scale-125 shadow-[0_0_30px_rgba(66,133,244,0.4)] z-20'
                          : 'border-border/50 grayscale opacity-30 hover:opacity-100 hover:grayscale-0 hover:scale-110'}`}
                    >
                      <span className={`${isActive ? 'animate-pulse-subtle' : ''}`}>{exp.heroMotif.emoji}</span>

                      {/* Traveling Glow Marker */}
                      {isActive && (
                        <div className="absolute inset-[-4px] rounded-2xl border-2 border-primary animate-ping opacity-20 pointer-events-none" />
                      )}

                      {/* Tooltip on Hover */}
                      <div className="absolute left-full ml-4 px-3 py-1 bg-card border border-border rounded-lg text-[10px] font-black uppercase tracking-widest text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {exp.company}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Role Panels */}
          <div className="flex-1 space-y-32">
            {filteredExperiences.map((exp) => (
              <div
                key={exp.id}
                id={exp.id}
                ref={(el) => (sectionRefs.current[exp.id] = el)}
                className="scroll-mt-[30vh]"
              >
                <RolePanel
                  experience={exp}
                  isActive={activeRole === exp.id}
                  onEnter={setOpenCaseStudyId}
                  mode={mode}
                />
              </div>
            ))}
          </div>
        </div>
      </div >

      {/* Case Study Window */}
      {
        openCaseStudyId && (
          <ExperienceCaseStudy
            id={openCaseStudyId}
            onClose={() => {
              setOpenCaseStudyId(null);
              // Clear role hash but keep experience section
              window.history.replaceState(null, null, '#experience');
            }}
          />
        )
      }
    </section >
  );
}