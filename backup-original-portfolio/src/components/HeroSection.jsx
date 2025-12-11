import { Button } from './ui/button'
import { useEffect, useRef, useState } from 'react'
import { ImageOff, Github, Linkedin, ExternalLink, Compass } from 'lucide-react'

export function HeroSection() {
  const imageRef = useRef(null);
  const mobileImageRef = useRef(null);
  const contentRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const resumeLink = "https://drive.google.com/file/d/1ZzsEtDdGER8rRoCCX9zFI3qQSAgfj50z/view?usp=sharing";
  
  useEffect(() => {
    // Initialize elements with opacity-0
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.fade-element');
      elements.forEach(el => {
        el.classList.add('opacity-0');
      });
    }
    
    // Set up fade animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add('transition-opacity', 'duration-1000', 'opacity-100');
        }
      });
    }, { threshold: 0.1 });
    
    // For content elements with staggered fade
    const contentFadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.fade-element');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.remove('opacity-0');
              el.classList.add('transition-opacity', 'duration-1000', 'opacity-100');
            }, 150 * index); // Stagger the animations
          });
        }
      });
    }, { threshold: 0.1 });
    
    // Observe both desktop and mobile images
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    if (mobileImageRef.current) {
      observer.observe(mobileImageRef.current);
    }
    
    if (contentRef.current) {
      contentFadeObserver.observe(contentRef.current);
    }
    
    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (mobileImageRef.current) observer.unobserve(mobileImageRef.current);
      if (contentRef.current) contentFadeObserver.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section className="pt-24 md:pt-28 pb-8 md:pb-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[80%] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-br from-primary/5 to-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[60%] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-tr from-primary/5 to-primary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 md:gap-10 items-center">
          {/* Mobile profile image with enhanced design */}
          <div className="block lg:hidden order-1 mx-auto mb-8">
            <div ref={mobileImageRef} className="w-[220px] sm:w-[280px] opacity-0">
              <div className="relative">
                {/* Background design elements */}
                <div className="absolute -top-3 -right-3 w-24 h-24 bg-primary/10 rounded-full blur-md -z-10"></div>
                <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-primary/15 rounded-full blur-md -z-10"></div>
                <div className="absolute inset-2 bg-gradient-to-tr from-primary/5 to-primary/10 rounded-xl -z-10 blur-sm"></div>
                
                {/* Decorative corner elements */}
                <div className="absolute -top-1 -left-1 w-10 h-10 border-t-2 border-l-2 border-primary/30 rounded-tl-xl"></div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-2 border-r-2 border-primary/30 rounded-br-xl"></div>
                
                <div className="overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-primary/20 transition-all hover:shadow-[0_15px_30px_rgba(0,71,171,0.25)] relative z-10 bg-card">
                  {imageError ? (
                    <div className="w-full aspect-[3/4] flex flex-col items-center justify-center text-muted-foreground">
                      <ImageOff className="h-8 w-8 mb-2" />
                      <p className="text-sm">Image not available</p>
                      <Button variant="outline" size="sm" className="mt-3 text-xs" onClick={() => setImageError(false)}>
                        Try again
                      </Button>
                    </div>
                  ) : (
                    <div className="relative bg-gradient-to-tl from-primary/5 to-primary/10 p-0">
                      {/* Mobile profile image */}
                      <img 
                        src="/Pavan_Profile_Pic.jpg" 
                        alt="Pavankalyan Ghanta" 
                        className="w-full h-auto object-cover aspect-[3/4] hover:scale-[1.02] transition-all duration-300"
                        onError={() => setImageError(true)}
                        loading="eager"
                      />
                      
                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 mix-blend-overlay"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section - unchanged */}
          <div ref={contentRef} className="max-w-3xl order-2 lg:order-1">
            {/* Content remains the same */}
            <div className="fade-element">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 md:mb-5">
                Building a <span className="relative inline-block">
                  smarter world
                  <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 bg-primary/20 rounded-lg -z-10"></span>
                </span> with <span className="text-primary">Human-Centered AI</span>
              </h1>
            </div>
            
            <div className="fade-element">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 md:mb-5 max-w-2xl">
                I'm an AI Full-Stack Developer and Product Engineer, contributor of Project-H,
                a community-driven initiative focused on building intelligent, user-focused products that bridge software, data,
                and behavior. My journey in AI began with a passion for creating solutions that enhance human experiences
                and empower users through technology.
                <a 
                  href="https://projhealth.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative inline-flex items-center font-medium text-primary mx-1.5 group"
                >
                  <span className="border-b border-primary/30 group-hover:border-primary transition-colors">Project-H</span>
                  <ExternalLink className="h-3 w-3 ml-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                building intelligent, user-focused products that bridge software, data, and behavior.
              </p>
            </div>
            
            <div className="fade-element">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-5 md:mb-7 max-w-2xl">
                With experience mentoring 120+ students and delivering full-stack AI solutions, I share my journey through 
                <a 
                  href="https://www.youtube.com/@pavankalyanghanta2737" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative inline-flex items-center font-medium text-primary mx-1.5 group"
                >
                  <span className="border-b border-primary/30 group-hover:border-primary transition-colors">YouTube</span>
                  <ExternalLink className="h-3 w-3 ml-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                videos and podcasts.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-6 fade-element">
              <Button variant="outline" className="flex gap-2 items-center border-primary/20 hover:bg-primary/5 group h-9 md:h-10 text-sm md:text-base" asChild>
                <a href="#projects" className="px-3 md:px-5">
                  <Compass className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary group-hover:rotate-45 transition-transform duration-300" />
                  <span className="text-primary ml-1">Explore Projects</span>
                </a>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 group h-9 md:h-10 text-sm md:text-base px-3 md:px-5" asChild>
                <a href={resumeLink} target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </Button>
            </div>

            <div className="mt-6 md:mt-8 pt-4 md:pt-5 border-t border-border/40 fade-element">
              <div className="flex items-center gap-3 md:gap-4">
                <a 
                  href="https://github.com/ghantapavan93" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-full text-white bg-[#24292e] hover:bg-[#24292e]/90 transition-all hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <Github size={16} className="md:hidden" />
                  <Github size={18} className="hidden md:block" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/pavankalyan-ghanta-b20115200/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-full text-white bg-[#0077b5] hover:bg-[#0077b5]/90 transition-all hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={16} className="md:hidden" />
                  <Linkedin size={18} className="hidden md:block" />
                </a>
                <a 
                  href="https://www.youtube.com/@pavankalyanghanta2737" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-full text-white bg-[#FF0000] hover:bg-[#FF0000]/90 transition-all hover:scale-110"
                  aria-label="YouTube Channel"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="md:hidden" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="hidden md:block" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Desktop Image Section with enhanced design */}
          <div ref={imageRef} className="hidden lg:block order-1 lg:order-2 w-full max-w-[360px] mx-auto lg:mx-0 opacity-0">
            <div className="relative">
              {/* Background design elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-md -z-10"></div>
              <div className="absolute -bottom-3 -left-3 w-28 h-28 bg-primary/15 rounded-full blur-md -z-10"></div>
              <div className="absolute inset-2 bg-gradient-to-tr from-primary/5 to-primary/10 rounded-xl -z-10 blur-sm"></div>
              
              {/* Decorative corner elements */}
              <div className="absolute -top-1.5 -left-1.5 w-12 h-12 border-t-2 border-l-2 border-primary/30 rounded-tl-xl"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-12 h-12 border-b-2 border-r-2 border-primary/30 rounded-br-xl"></div>
              
              <div className="overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-primary/20 transition-all hover:shadow-[0_15px_30px_rgba(0,71,171,0.25)] relative z-10 bg-card">
                {imageError ? (
                  <div className="w-full aspect-[3/4] flex flex-col items-center justify-center text-muted-foreground">
                    <ImageOff className="h-10 w-10 mb-2" />
                    <p className="text-sm">Image not available</p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={() => setImageError(false)}>
                      Try again
                    </Button>
                  </div>
                ) : (
                  <div className="relative bg-gradient-to-tl from-primary/5 to-primary/10 p-0">
                    <img 
                      src="/Pavan_Profile_Pic.jpg" 
                      alt="Pavankalyan Ghanta" 
                      className="w-full h-auto object-cover aspect-[3/4] hover:scale-[1.02] transition-all duration-300"
                      onError={() => setImageError(true)}
                      loading="eager"
                    />
                    
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 mix-blend-overlay"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}