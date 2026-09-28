import { lazy, Suspense, useState, useEffect, useMemo, useRef } from 'react';
import { experiences } from '../data/experiences';
import { RolePanel } from './experience/RolePanel';
import { RecruiterControls } from './experience/RecruiterControls';
import { yearSpan } from '../lib/dates';

// The full-screen case study is heavy and only opens on click — load it on demand.
const ExperienceCaseStudy = lazy(() =>
  import('./ExperienceCaseStudy').then(m => ({ default: m.ExperienceCaseStudy })));

export function ExperienceSection() {
  const [activeRole, setActiveRole] = useState(experiences[0].id);
  const [filter, setFilter] = useState('All');
  const [mode, setMode] = useState('cinematic'); // 'cinematic' | 'recruiter'
  const [openCaseStudyId, setOpenCaseStudyId] = useState(null);

  const sectionRefs = useRef({});
  const containerRef = useRef(null);

  // Filter logic
  const domainFilters = ['All', 'AI/ML', 'Full-Stack', 'Infra/MLOps', 'Research', 'Real-time'];
  const filteredExperiences = useMemo(
    () => (filter === 'All' ? experiences : experiences.filter(exp => exp.domainTags.includes(filter))),
    [filter]
  );

  // Intersection Observer for active role tracking (Center-band detection)
  useEffect(() => {
    if (mode === 'recruiter') return;

    const options = {
      threshold: 0,
      rootMargin: '-45% 0px -45% 0px' // Only triggers when element crosses the center 10% band
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveRole(entry.target.id);
      });
    }, options);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
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

  // Keep the active role valid when a filter hides it.
  useEffect(() => {
    if (filteredExperiences.length && !filteredExperiences.some(e => e.id === activeRole)) {
      setActiveRole(filteredExperiences[0].id);
    }
  }, [filteredExperiences, activeRole]);

  const activeIndex = Math.max(0, filteredExperiences.findIndex(e => e.id === activeRole));
  const progress = filteredExperiences.length > 1
    ? (activeIndex / (filteredExperiences.length - 1)) * 100
    : 100;

  const handleJump = (id) => {
    setActiveRole(id); // Force update state immediately

    // Use a small timeout to allow state changes to render before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Calculate a slight offset for the aesthetic header in cinematic mode
        const yOffset = mode === 'cinematic' ? -120 : -80;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <section id="experience" className="relative pb-32 bg-background" ref={containerRef}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-background via-background to-background" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="pt-32 mb-20 lg:pl-[13.5rem]">
          <span className="text-primary text-sm font-black uppercase tracking-[0.5em] mb-4 block animate-fade-in">Experience OS</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.8] mb-8">
            <span className="block italic opacity-50 uppercase">Work</span>
            <span className="block text-primary">EXPERIENCE.</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl leading-snug animate-fade-up">
            Building software with expertise in AI, ML, and Full Stack Development.
          </p>
        </div>

        <div className="lg:pl-[13.5rem]">
          <RecruiterControls
            filters={domainFilters}
            activeFilter={filter}
            onFilterChange={setFilter}
            onJump={handleJump}
            mode={mode}
            onToggleMode={setMode}
            experiences={filteredExperiences}
          />
        </div>

        <div className="relative flex">
          {/* Timeline rail: company + years, readable at a glance. Sticky within the
              viewport and scrollable on short screens so nothing hangs off-screen. */}
          {mode === 'cinematic' && filteredExperiences.length > 0 && (
            <nav
              aria-label="Experience timeline"
              className="hidden lg:block sticky top-28 self-start w-44 mr-10 shrink-0 max-h-[calc(100vh-8rem)] overflow-y-auto"
            >
              <ol className="relative ml-[5px] border-l-2 border-border/60">
                <div
                  aria-hidden="true"
                  className="absolute -left-[2px] top-0 w-[2px] bg-primary rounded-full transition-all duration-500"
                  style={{ height: `${progress}%` }}
                />
                {filteredExperiences.map((exp) => {
                  const isActive = activeRole === exp.id;
                  return (
                    <li key={exp.id}>
                      <button
                        onClick={() => handleJump(exp.id)}
                        aria-current={isActive ? 'step' : undefined}
                        title={exp.company}
                        className="group relative block w-full text-left pl-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-r-lg"
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute -left-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${isActive ? 'bg-primary border-primary' : 'bg-background border-border group-hover:border-primary/60'}`}
                        />
                        <span className={`block text-sm leading-tight truncate transition-colors duration-300 ${isActive ? 'font-bold text-foreground' : 'font-medium text-muted-foreground group-hover:text-foreground'}`}>
                          {exp.shortName || exp.company}
                        </span>
                        <span className={`block text-[11px] mt-0.5 tabular-nums ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground/80'}`}>
                          {yearSpan(exp.dateRange)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {/* Role Panels */}
          <div className="flex-1 min-w-0 space-y-32">
            {filteredExperiences.length === 0 && (
              <p className="py-16 text-center text-muted-foreground">
                No roles match this filter.{' '}
                <button onClick={() => setFilter('All')} className="font-semibold text-primary underline-offset-4 hover:underline">
                  Show all
                </button>
              </p>
            )}
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
      </div>

      {/* Case Study Window */}
      {openCaseStudyId && (
        <Suspense fallback={null}>
          <ExperienceCaseStudy
            id={openCaseStudyId}
            onClose={() => {
              setOpenCaseStudyId(null);
              // Clear role hash but keep experience section
              window.history.replaceState(null, null, '#experience');
            }}
          />
        </Suspense>
      )}
    </section>
  );
}