import { Github, Linkedin, Mail, FileText, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'

export function Footer() {
  const resumeLink = "https://drive.google.com/file/d/192fUVmZz4lZ9m5NTxJaKGoc5UfPOEqd6/view?usp=drive_link";
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      id="contact" 
      className="bg-gradient-to-r from-black/95 to-gray-900/95 text-white py-6 md:py-8 border-t border-white/10"
      aria-labelledby="footer-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6">
          {/* Contact section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 id="footer-heading" className="text-base md:text-lg font-medium text-white mb-1.5">
              Get in touch
            </h2>
            <a 
              href="mailto:ghantapavan93@gmail.com" 
              className="text-white/80 hover:text-primary transition-all duration-200 inline-flex items-center gap-1.5 text-xs md:text-sm group focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm p-0.5"
              aria-label="Email Pavan Kalyan Ghanta"
            >
              <Mail className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" aria-hidden="true" />
              <span>ghantapavan93@gmail.com</span>
              <ExternalLink className="h-2.5 w-2.5 md:h-3 md:w-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </a>
          </div>
          
          {/* Social icons and resume (center column on mobile, right column on desktop) */}
          <div className="flex flex-row items-center gap-2 md:gap-3 flex-wrap justify-center md:justify-end">
            <a 
              href="https://github.com/ghantapavan93" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-200 border border-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="GitHub Profile"
            >
              <Github size={16} className="text-white md:hidden" aria-hidden="true" />
              <Github size={18} className="text-white hidden md:block" aria-hidden="true" />
            </a>
            <a 
              href="https://www.linkedin.com/in/pavankalyan-ghanta-b20115200/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-200 border border-white/10 hover:border-[#0A66C2]/50 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/50 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} className="text-[#0A66C2] md:hidden" aria-hidden="true" />
              <Linkedin size={18} className="text-[#0A66C2] hidden md:block" aria-hidden="true" />
            </a>
            <a 
              href="https://www.youtube.com/@pavankalyanghanta2737" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-200 border border-white/10 hover:border-[#FF0000]/50 focus:outline-none focus:ring-2 focus:ring-[#FF0000]/50 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="YouTube Channel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FF0000" className="md:hidden" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FF0000" className="hidden md:block" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/20 bg-white/5 hover:bg-primary hover:text-white hover:border-primary text-white ml-0 md:ml-1 flex items-center gap-1.5 text-[10px] md:text-xs rounded-full transition-all duration-200 h-7 md:h-8 px-2.5 md:px-3 focus:ring-offset-gray-900"
              asChild
            >
              <a 
                href={resumeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Download Resume (opens in new tab)"
              >
                <FileText className="h-3 w-3 md:h-3.5 md:w-3.5" aria-hidden="true" />
                <span>Resume</span>
              </a>
            </Button>
          </div>
        </div>
        
        {/* Copyright - smaller and less prominent */}
        <div className="text-center text-[10px] text-white/60 mt-5 md:mt-6">
          <p>© {currentYear} Pavankalyan Ghanta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}