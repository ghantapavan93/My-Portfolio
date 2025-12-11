import { Youtube, Users } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Button } from './ui/button'

export function YoutubeShowcase() {
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in', 'fade-in', 'duration-700');
        }
      });
    });

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) observer.unobserve(componentRef.current);
    };
  }, []);

  return (
    <section 
      className="py-8 md:py-10 relative z-10 overflow-hidden border-b border-border/20 bg-secondary/5"
      aria-labelledby="youtube-heading"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-primary font-medium uppercase tracking-wider text-xs md:text-sm mb-1 md:mb-2">Video Content</p>
          <h2 id="youtube-heading" className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">YouTube Channel</h2>
        </div>
        
        <div ref={componentRef} className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center">
              <div 
                className="font-medium text-xs md:text-sm px-2 md:px-3 py-1 bg-primary/20 text-primary rounded-full"
                aria-label="YouTube channel username"
              >
                @pavankalyanghanta2737
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">
              <span className="text-foreground">Tech Podcasts & AI Insights (Coming Soon)</span>
            </h3>
            
            <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
              I’m launching my YouTube channel soon! I’ll be sharing content on tech, AI, and personal growth. Subscribe to get notified when new videos drop.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-1">
              <Button 
                className="bg-[#FF0000] text-white hover:bg-[#FF0000]/90 shadow-sm h-9 md:h-10 text-xs md:text-sm"
                asChild
              >
                <a 
                  href="https://www.youtube.com/@pavankalyanghanta2737" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 md:gap-2"
                  aria-label="Visit my YouTube channel (opens in new tab)"
                >
                  <Youtube className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
                  Visit Channel
                </a>
              </Button>
              
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                <Users size={14} className="mr-1.5 text-primary" aria-hidden="true" />
                <span>Join our growing community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}