import { Card, CardContent } from './ui/card'
import { ArrowRight, Github, ExternalLink, Globe } from 'lucide-react'
import { Button } from './ui/button'
import { useRef, useEffect, useState } from 'react'

export function ProjectsSection() {
  const sectionRef = useRef(null);
  
  // Add fade-in animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in', 'fade-in', 'duration-700');
        }
      });
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);
  
  return (
    <section 
      id="projects" 
      className="py-10 md:py-14 bg-secondary/5"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-primary font-medium uppercase tracking-wider text-sm mb-2" aria-hidden="true">
            Projects
          </p>
          <h2 
            id="projects-heading" 
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4"
          >
            Live Projects Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            All projects are deployed and ready to explore
          </p>
        </div>
        
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <ProjectCard 
            title="Project-H: AI-Powered Health Platform"
            description="Personalized health platform using React, Tailwind, Node.js, and OpenAI, helping users track fitness with 'Oats' AI coach and integrated biometric data analysis."
            tags={["React", "OpenAI", "Node.js", "Machine Learning"]}
            imageUrl="/projects/project-h/thumbnail.png"
            liveUrl="https://projhealth.com"
            githubUrl="https://github.com/ghantapavan93/project-h"
            highlight={true}
          />
          
          <ProjectCard 
            title="Poster Accessibility Evaluation Tool"
            description="Web app leveraging YOLOv10 and Gemini 1.5 Flash to assess academic posters for accessibility, providing actionable insights on WCAG compliance metrics."
            tags={["YOLOv10", "Gemini 1.5", "Accessibility", "WCAG"]}
            imageUrl="/projects/postera11y/thumbnail.png"
            liveUrl="https://poster-a11y.vercel.app"
            githubUrl="https://github.com/ghantapavan93/poster-evaluation-a11y"
          />
          
          <ProjectCard 
            title="Speech Quest - Speech Learning Platform"
            description="Bilingual speech therapy app built with Angular and Firebase, featuring 7+ interactive games with speech recognition and audio feedback via ElevenLabs API."
            tags={["Angular", "Firebase", "ElevenLabs API", "Speech Recognition"]}
            imageUrl="/projects/speechapp/thumbnail.png"
            liveUrl="https://speechquest.vercel.app"
            githubUrl="https://github.com/ghantapavan93/speech-app"
          />

          <ProjectCard 
            title="A11yGame - Accessibility Game Portal"
            description="Multi-game accessibility learning portal built with React and Firebase, used by 200+ UNT students to engage with accessibility concepts interactively."
            tags={["React", "Tailwind CSS", "Firebase", "Redux"]}
            imageUrl="/projects/a11ygame/thumbnail.png"
            liveUrl="https://a11ygamification.vercel.app"
            githubUrl="https://github.com/ghantapavan93/A11yPDF"
          />
          
          <ProjectCard 
            title="AI Powered Diet Plan Generator"
            description="An OpenAI-powered web app that generates personalized diet plans based on user preferences and dietary restrictions."
            tags={["OpenAI", "Django", "Python", "React"]}
            imageUrl="/projects/dietapp/thumbnail.png"
            liveUrl="https://diet-plan-app-woad.vercel.app/"
            githubUrl="https://github.com/ghantapavan93/diet-plan-app"
          />

          <ProjectCard 
            title="Doctor Finder"
            description="Doctor Finder is a Next.js and Firebase-powered web app that connects patients with healthcare providers based on specialty, location, insurance, and more."
            tags={["JavaScript", "React", "Next.js", "Web Development"]}
            imageUrl="/projects/doctorfinder/thumbnail.png"
            liveUrl="https://capstone2024-five.vercel.app/"
            githubUrl="https://github.com/Afthab33/capstone2024"
          />

          <ProjectCard 
            title="AetherLabs"
            description="AetherLabs is an innovation hub building open-source, accessible tech through research, projects, and education."
            tags={["Accessibility", "Open Source", "AI/ML", "Web Development"]}
            imageUrl="/projects/aetherlabs/thumbnail.png"
            liveUrl="https://aetherlabs.vercel.app/"
            githubUrl="https://github.com/ghantapavan93/aetherlabs"
          />

          <ProjectCard 
            title="Sleep & Lifestyle Insights"
            description="An interactive web dashboard that analyzes wearable and self-reported data to uncover how daily habits like caffeine, exercise, and stress impact sleep quality and energy levels."
            tags={["Data Visualization", "HealthTech", "Wearables", "D3.js"]}
            imageUrl="/projects/sleepinsights/thumbnail.png"
            liveUrl="https://sdv-project-website.vercel.app/"
            githubUrl="https://github.com/Afthab33/sdv-project-website"
          />
          
          <ProjectCard 
            title="AI-Powered Phishing URL Classifier"
            description="Phishing detection system using supervised ML, analyzing 100K+ URLs with lexical and host-based features to achieve 98%+ model accuracy."
            tags={["Python", "Machine Learning", "Flask", "Cybersecurity"]}
            imageUrl="/projects/phishingwebsite/thumbnail.png"
            githubUrl="https://github.com/ghantapavan93/PhishBuster"
          />

          <ProjectCard 
            title="EagleEye AI"
            description="A real-time computer vision platform for surveillance and anomaly detection, leveraging deep learning for security and analytics."
            tags={["Computer Vision", "Deep Learning", "Python", "OpenCV"]}
            imageUrl="/projects/EagleEye AI/thumbnail.png"
            githubUrl="https://github.com/ghantapavan93/Eagle-Eye-AI/tree/main/Eagle-Eye-AI-main"
          />

          <ProjectCard 
            title="Clinical Query Assistant (RAG + LLMs)"
            description="AI-powered clinical assistant using Retrieval-Augmented Generation and LLMs to answer medical queries with high accuracy and context."
            tags={["RAG", "LLMs", "Healthcare AI", "Python"]}
            imageUrl= "/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/interface-1.png"
            githubUrl="https://github.com/ghantapavan93/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMS-"
          />

          <ProjectCard 
            title="PeopleMate AI – Context-Aware HR Assistant"
            description="Conversational AI platform for HR, providing context-aware support for employee engagement, feedback, and HR queries."
            tags={["AI", "NLP", "HR Tech", "React"]}
            imageUrl="/projects/PeopleMate-AI-Context-Aware-HR-Assistant-/thumbnail.png"
            githubUrl="https://github.com/ghantapavan93/PeopleMate-AI-Context-Aware-HR-Assistant-"
          />

          <ProjectCard 
            title="SafePath – Airport Transit Assistant"
            description="AI-powered assistant for airport transit, helping travelers navigate terminals, track flights, and get real-time updates."
            tags={["AI Assistant", "Travel Tech", "React", "APIs"]}
            imageUrl="/projects/SafePath-Airport-Transit-Assistant-for-Travelers/safepath.png"
            githubUrl="https://github.com/ghantapavan93/SafePath-Airport-Transit-Assistant-for-Travelers-"
          />

          <ProjectCard 
            title="Smart Tutor AI"
            description="AI-driven personalized teaching support platform, offering adaptive learning paths and intelligent tutoring for students."
            tags={["AI", "EdTech", "Personalization", "React"]}
            imageUrl="/projects/Smart-Tutor-AI-Clean/thumbnail.png"
            githubUrl="https://github.com/ghantapavan93/Smart-Tutor-AI-Clean/tree/main/Smart-Tutor-AI-AI-Driven-Personalized-Teaching-Support-main"
          />
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ title, description, tags, imageUrl, githubUrl, liveUrl, highlight = false }) {
  // Support both string and array for imageUrl
  const images = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
  const [current, setCurrent] = useState(0);

  // Slideshow effect for multiple images
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000); // 10 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <Card 
      className={`overflow-hidden transition-all hover:translate-y-[-4px] hover:shadow-lg focus-within:shadow-lg focus-within:border-primary/50 ${
        highlight ? 'border-primary/30 shadow-md' : 'border-primary/10'
      } h-full flex flex-col max-w-full mx-auto w-full`}
    >
      {/* Clickable image area - improved accessibility */}
      <a 
        href={liveUrl || githubUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-32 sm:h-40 bg-muted overflow-hidden relative group focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset"
        aria-label={`View ${title} ${liveUrl ? 'website' : 'project'}`}
      >
        <img 
          src={images[current].replace('/public', '')} 
          alt={`Screenshot of ${title}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus:scale-105" 
          loading="lazy"
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === current ? 'bg-primary' : 'bg-white/50'} border border-primary/30`}
              />
            ))}
          </div>
        )}
        
        {/* Overlay with preview text */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white font-medium px-3 py-1.5 text-xs sm:text-sm rounded-md border border-white/30 backdrop-blur-sm">
            {liveUrl ? 'Visit Website' : 'View Project'}
          </div>
        </div>
        
        {/* Browser-like frame effect */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300" aria-hidden="true">
          <div className="flex items-center gap-1.5 px-3 pt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          </div>
        </div>
      </a>
      
      <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2 flex items-center line-clamp-1">
          {title}
          {highlight && (
            <span className="ml-2 text-[10px] sm:text-xs bg-primary/20 text-primary px-1.5 sm:px-2 py-0.5 rounded-full font-medium shrink-0" aria-label="Featured project">
              Featured
            </span>
          )}
        </h3>
        
        <p className="text-[11px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-3 flex-1">{description}</p>
        
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3" aria-label="Project technologies">
          {tags.slice(0, 4).map((tag, index) => (
            <span key={index} className="text-[9px] sm:text-[10px] bg-primary/10 text-primary px-1.5 sm:px-2 py-0.5 rounded-md font-medium whitespace-nowrap">
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="text-[9px] sm:text-[10px] text-muted-foreground px-1" aria-label={`And ${tags.length - 4} more technologies`}>
              +{tags.length - 4} more
            </span>
          )}
        </div>
        
        <div className="flex gap-1.5 sm:gap-2 mt-auto">
          {liveUrl && (
            <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-2.5 group flex-1" asChild>
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Visit ${title} website (opens in new tab)`}
              >
                <Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" aria-hidden="true" />
                <span>Visit Site</span>
                <ExternalLink className="h-2 w-2 sm:h-2.5 sm:w-2.5 ml-0.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
              </a>
            </Button>
          )}
          
          {githubUrl && (
            <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-2.5 flex-1" asChild>
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View ${title} source code on GitHub (opens in new tab)`}
              >
                <Github className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden="true" />
                <span>View Code</span>
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}