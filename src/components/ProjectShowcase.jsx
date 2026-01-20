import { ArrowUpRight, Users, ExternalLink } from 'lucide-react'
import { useEffect, useRef } from 'react'

export function ProjectShowcase() {
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in', 'fade-in', 'duration-700');
        }
      });
    }, { threshold: 0.1 }); // Added explicit threshold for consistency

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) observer.unobserve(componentRef.current);
    };
  }, []);

  return (
    <section
      className="py-8 relative z-10 overflow-hidden border-b border-border/20"
      aria-labelledby="flagship-project-heading"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div ref={componentRef} className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 md:gap-8 items-center">
          {/* Image gallery - more responsive */}
          <div className="relative h-[220px] sm:h-[240px] md:h-[280px] mx-auto w-full max-w-[320px] md:max-w-none">
            {/* Background images - hidden on smallest screens */}
            <div className="hidden sm:block absolute top-1/2 -left-4 w-[160px] sm:w-[180px] md:w-[200px] h-[110px] sm:h-[130px] md:h-[140px] -translate-y-1/2 transform -rotate-6 rounded-lg overflow-hidden border border-primary/10 shadow-md">
              <img
                src="/projects/project-h/image1.png"
                alt="Project-H Dashboard view showing analytics and health metrics"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="hidden sm:block absolute top-1/2 right-4 w-[140px] sm:w-[160px] md:w-[180px] h-[90px] sm:h-[100px] md:h-[120px] -translate-y-1/2 transform rotate-6 rounded-lg overflow-hidden border border-primary/10 shadow-md">
              <img
                src="/projects/project-h/image2.png"
                alt="Project-H Analytics screen with user health data visualization"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Main/thumbnail image - centered on mobile */}
            <div className="absolute left-1/2 top-1/2 w-[220px] sm:w-[240px] md:w-[260px] h-[160px] sm:h-[180px] md:h-[200px] -translate-x-1/2 -translate-y-1/2 transform z-10 rounded-lg overflow-hidden border border-primary/20 shadow-lg hover:shadow-xl transition-all">
              <img
                src="/projects/project-h/thumbnail.png"
                alt="Project-H Main Interface showing fitness tracking dashboard"
                className="w-full h-full object-cover"
              />
              {/* Add accessibility-friendly focus indicator for keyboard navigation */}
              <div className="absolute inset-0 pointer-events-none border-2 border-transparent focus-within:border-primary/80 rounded-lg">
                <span className="sr-only">View Project-H details</span>
              </div>
            </div>
          </div>

          {/* Project details - better spacing for mobile */}
          <div>
            <div className="space-y-3 md:space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <div
                  className="font-medium text-xs sm:text-sm px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full"
                  aria-label="Project category"
                >
                  My Flagship Project
                </div>
              </div>

              <h2
                id="flagship-project-heading"
                className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-1 justify-center md:justify-start flex-wrap"
              >
                <span className="inline-flex items-baseline">
                  <span className="text-[#3E7B27]">Project-</span>
                  <span className="text-[#3E7B27] font-extrabold">H</span>
                </span>
                <span className="ml-2 text-primary/80 text-base sm:text-lg md:text-xl font-normal flex items-center">
                  <span className="h-1 w-1 rounded-full bg-primary/40 mx-2" aria-hidden="true"></span>
                  <span>Founder</span>
                </span>
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto md:mx-0">
                An AI-powered health and fitness platform that helps users track their fitness
                with personalized insights using the 'Oats' AI coach and integrated biometric data analysis.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 pt-1">
                <a
                  href="https://projhealth.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#3E7B27] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 rounded-sm group"
                  aria-label="Visit Project-H website (opens in new tab)"
                >
                  Visit Project-H
                  <ExternalLink className="ml-1 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </a>

                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <Users size={14} className="mr-1.5 text-[#3E7B27]" aria-hidden="true" />
                  <span>200+ users and counting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}