import { Card, CardContent } from './ui/card'
import { ArrowRight, Github, ExternalLink, Globe, X, ChevronRight, Database, Layout, Server, Shield, Zap, Layers, CheckCircle2, Play } from 'lucide-react'
import { Button } from './ui/button'
import { useRef, useEffect, useState } from 'react'

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null); // For Learn More modal

  // Data for Get Towed Learn More
  // Data for Get Towed - Premium Case Study Structure
  const getTowedLearnMore = {
    id: "gettowed",
    title: "Get Towed",
    tagline: "Full-Stack Towing Management System",
    description: "A complete towing workflow platform connecting Vehicle Owners, Towing Companies, and Admins into one consistent, database-backed system. It solves fragmentation by enforcing a single source of truth for all tow operations.",
    role: "Full-Stack Developer",
    timeline: "2024",
    type: "Web Application",
    liveUrl: "https://aftab-x5sw.vercel.app/home",
    repoUrl: "https://github.com/ghantapavan93/GET-TOWED",
    technologies: ["React", "Flask", "SQLite", "Alembic", "SQLAlchemy"],
    heroImage: "/projects/Get Towed/Main.png",
    gallery: [
      "/projects/Get Towed/towed-1.png",
      "/projects/Get Towed/towed-2.png",
      "/projects/Get Towed/towed-3.png",
      "/projects/Get Towed/towed-4.png",
      "/projects/Get Towed/towed-5.png",
      "/projects/Get Towed/towed-6.png",
      "/projects/Get Towed/towed-7.png",
      "/projects/Get Towed/towed-8.png",
      "/projects/Get Towed/towed-9.png",
      "/projects/Get Towed/towed-10.png",
      "/projects/Get Towed/towed-11.png"
    ],
    story: [
      {
        type: "intro",
        heading: "The Challenge",
        text: "Towing workflows are often chaotic: owners can’t find their vehicles, payments aren’t traceable, and disputes get lost in email threads. Operations teams lack a single source of truth, leading to frustration and inefficiency."
      },
      {
        type: "feature_split",
        heading: "Public Owner Portal",
        text: "A transparent, user-friendly portal where owners can search by license plate to find their vehicle immediately. They can view clear tow details (reason, fine, location), securely pay fines, or file structured disputes if the tow was unjust.",
        bullets: ["Real-time License Plate Search", "Secure Payment Flow", "Structured Dispute Context"],
        image: "/projects/Get Towed/towed-1.png",
        imageCaption: "Owner Portal: Search & Payment Interface",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Towing Company Operations",
        text: "Gated access for towing providers to securely log in and create immutable tow records. Vehicles entered here become instantly searchable in the public portal, ensuring real-time cross-system consistency and preventing data poisoning.",
        bullets: ["Secure Authentication", "Instant Record Searchability", "Validation & Data Consistency"],
        image: "/projects/Get Towed/towed-7.png",
        imageCaption: "Company Portal: Vehicle Record Management",
        reverse: true
      },
      {
        type: "feature_split",
        heading: "Admin Command Center",
        text: "A central operational control plane to manage the entire lifecycle: users, vehicles, payments, disputes, and retrieval records. This ensures all actions are auditable and follow a defined state machine (e.g., Pending → Paid).",
        bullets: ["User & Role Management", "Payment Auditing & Analytics", "Dispute Resolution Queues"],
        image: "/projects/Get Towed/towed-8.png",
        imageCaption: "Admin Dashboard: Payment Tracking & Analytics",
        reverse: false
      },
      {
        type: "grid",
        heading: "Technical Architecture",
        items: [
          { title: "Frontend", desc: "React + Tailwind for responsive, state-driven interfaces.", icon: "Layout" },
          { title: "Backend", desc: "Flask REST API with route modularity (Blueprints).", icon: "Server" },
          { title: "Database", desc: "SQLite with SQLAlchemy ORM & Alembic migrations.", icon: "Database" },
          { title: "Workflow", desc: "State-machine logic for payments and disputes.", icon: "Zap" }
        ]
      }
    ]
  };

  // Data for Medisync
  const medisyncLearnMore = {
    id: "medisync",
    title: "Medisync",
    tagline: "Intelligent Web Prescription & Healthcare Platform",
    description: "A secure, end-to-end digital health platform designed to streamline the prescription lifecycle. It connects physicians, patients, and pharmacies in a unified interface, ensuring medication accuracy, improving adherence, and facilitating seamless healthcare communication.",
    role: "Full-Stack Engineer",
    timeline: "2024",
    type: "Healthcare Platform",
    liveUrl: null,
    repoUrl: "https://github.com/ghantapavan93/Medisync",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT Auth", "REST API"],
    heroImage: "/projects/Medisync/thumbnail.png",
    gallery: [
      "/projects/Medisync/thumbnail.png"
    ],
    story: [
      {
        type: "intro",
        heading: "The Challenge",
        text: "Traditional prescription management is often fragmented, relying on handwritten notes or disconnected systems. This leads to medication errors, pharmacy bottlenecks, and a lack of clear tracking for patients. The goal was to build a system that digitizes this entire flow while maintaining high standards of data integrity."
      },
      {
        type: "feature_split",
        heading: "Smart Prescription Hub",
        text: "Doctors can generate digital prescriptions with instant validation checks. These are immediately accessible to linked pharmacies and the patient's mobile-ready dashboard, eliminating paper waste and transcription errors.",
        bullets: ["Instant Digital Prescriptions", "Pharmacy Integration", "Error Reduction"],
        image: "/projects/Medisync/thumbnail.png",
        imageCaption: "Doctor's Prescription Dashboard",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Patient-Centric Portal",
        text: "Patients get a dedicated portal to view their medication history, track active prescriptions, and find nearby pharmacies. The interface is designed for accessibility, ensuring users of all ages can manage their health effectively.",
        bullets: ["Medication History Tracking", "Pharmacy Finder", "Accessible UI Design"],
        image: "/projects/Medisync/thumbnail.png",
        imageCaption: "Patient Medical History View",
        reverse: true
      },
      {
        type: "grid",
        heading: "Technical Architecture",
        items: [
          { title: "Frontend", desc: "React with modular components for a responsive experience.", icon: "Layout" },
          { title: "Backend", desc: "Node.js & Express REST API for scalable data handling.", icon: "Server" },
          { title: "Database", desc: "MongoDB for flexible patient and record schemas.", icon: "Database" },
          { title: "Security", desc: "JWT Authentication & Role-Based Access Control (RBAC).", icon: "Shield" }
        ]
      }
    ]
  };

  // Data for Episode Companion Agent
  const episodeAgentLearnMore = {
    id: "episode-agent",
    title: "Episode Companion Agent",
    tagline: "Microservice for AI Research Daily Episodes",
    description: "A focused microservice designed to give individual 'AI Research Daily' episodes their own dedicated mini-agents. It creates structured interaction modes like 'Founder Takeaway' and 'Engineer Angle', transforming static audio/text content into dynamic, queryable agents.",
    role: "Full-Stack Developer",
    timeline: "2024",
    type: "AI Agent System",
    liveUrl: null, // No live URL mentioned, only GitHub
    repoUrl: "https://github.com/ghantapavan93/EPISODE-COMPANION-AGENT",
    technologies: ["Python", "FastAPI", "Google Gemini", "ChromaDB", "React", "RAG"],
    heroImage: "/Episode%20Companion%20Agent/Kochi-1.png",
    gallery: [
      "/Episode%20Companion%20Agent/Kochi-1.png",
      "/Episode%20Companion%20Agent/Kochi-2.png",
      "/Episode%20Companion%20Agent/Kochi-3.png",
      "/Episode%20Companion%20Agent/Kochi-4.png",
      "/Episode%20Companion%20Agent/Kochi-5.png",
      "/Episode%20Companion%20Agent/Kochi-6.png"
    ],
    story: [
      {
        type: "video_showcase",
        heading: "Demo Video",
        videoUrl: "/Episode%20Companion%20Agent/AI%20Research%20Daily%20Companion.mp4",
        caption: "Watch the Episode Companion Agent in action"
      },
      {
        type: "intro",
        heading: "The Challenge",
        text: "Daily AI research updates are valuable but often static. The goal was to transform these episodes into interactive experiences, allowing users to query specific details, understand technical depth, or get high-level business takeaways on demand."
      },
      {
        type: "feature_split",
        heading: "Ingestion & RAG Pipeline",
        text: "The system automatically chunks and embeds episode scripts into a local vector store (ChromaDB). This enables Retrieval-Augmented Generation (RAG) to provide precise, context-aware answers to user queries, grounded in the actual content of the episode.",
        bullets: ["Automated Script Chunking", "Vector Store Embedding", "Context-Aware Retrieval"],
        image: "/Episode%20Companion%20Agent/Kochi-2.png",
        imageCaption: "RAG Pipeline Visualization",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Structured Personas",
        text: "Users can interact with the content through different lenses. 'Plain English' simplifies complex topics, 'Founder Takeaway' focuses on market intent and product strategy, and 'Engineer Angle' dives into the architectural and technical details.",
        bullets: ["Multi-Persona RAG", "Business vs. Technical Views", "Tailored Insights"],
        image: "/Episode%20Companion%20Agent/Kochi-3.png",
        imageCaption: "Persona Selection Interface",
        reverse: true
      },
      {
        type: "grid",
        heading: "Tech Stack & Architecture",
        items: [
          { title: "Backend", desc: "FastAPI for high-performance REST endpoints.", icon: "Server" },
          { title: "AI/LLM", desc: "Google Gemini & OpenAI for intelligence and reasoning.", icon: "Zap" },
          { title: "Vectors", desc: "ChromaDB for semantic search and retrieval.", icon: "Database" },
          { title: "Frontend", desc: "React for a responsive, interactive chat interface.", icon: "Layout" }
        ]
      }
    ]
  };

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

          {/* New: Censys Summarization Agent (appears right after Project-H) */}
          <ProjectCard
            title="Censys Summarization Agent"
            description="Full‑stack app that ingests Censys host data and produces analyst‑grade summaries: risks, insights, and next actions. Modern React UI, FastAPI backend, optional LLM rewrite, metrics, and export tools. Windows and Docker quickstart."
            tags={["AI Agent", "RAG", "LLM Integration", "Cybersecurity AI", "React"]}
            imageUrl={[
              "/projects/censys-agent/Censys-1.png",
              "/projects/censys-agent/Censys-2.png",
              "/projects/censys-agent/Censys-3.png",
              "/projects/censys-agent/diagram.svg"
            ]}
            liveUrl="/projects/censys-agent/demo.html"
            githubUrl="https://github.com/ghantapavan93/censys-summarization-agent"
          />

          <ProjectCard
            title="Medisync"
            description="A secure, HIPAA-compliant web prescription platform connecting doctors, patients, and pharmacies. Streamlines medication management with real-time tracking and digital verification."
            tags={["React", "Node.js", "Healthcare", "HIPAA", "Web App"]}
            imageUrl="/projects/Medisync/thumbnail.png"
            githubUrl="https://github.com/ghantapavan93/Medisync"
            onLearnMore={() => setActiveProject(medisyncLearnMore)}
            learnMore={true}
          />

          <ProjectCard
            title="Episode Companion Agent"
            description="Microservice agent for 'AI Research Daily' episodes. Features automated RAG ingestion, vector search, and multi-persona queries (Founder, Engineer, Plain English)."
            tags={["AI Agent", "FastAPI", "RAG", "ChromaDB", "Gemini"]}
            imageUrl={[
              "/Episode%20Companion%20Agent/Kochi-1.png",
              "/Episode%20Companion%20Agent/Kochi-2.png",
              "/Episode%20Companion%20Agent/Kochi-3.png"
            ]}
            githubUrl="https://github.com/ghantapavan93/EPISODE-COMPANION-AGENT"
            onLearnMore={() => setActiveProject(episodeAgentLearnMore)}
            learnMore={true}
          />

          <ProjectCard
            title="Get Towed"
            description="A dedicated platform for vehicle towing services, enabling users to quickly request assistance. Built with React for a responsive and intuitive user experience."
            tags={["React", "Web Application", "Emergency Services"]}
            imageUrl="/projects/Get Towed/Main.png"
            liveUrl="https://aftab-x5sw.vercel.app/home"
            githubUrl="https://github.com/ghantapavan93/GET-TOWED"
            onLearnMore={() => setActiveProject(getTowedLearnMore)}
            learnMore={true}
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
            imageUrl="/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/interface-1.png"
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
      {/* Learn More Modal - Premium Case Study Layout */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-300">
          <div
            className="relative bg-background w-full max-w-6xl h-full sm:h-[95vh] rounded-none sm:rounded-2xl border border-border/50 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
            role="dialog"
            aria-modal="true"
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 shrink-0 bg-background/95 backdrop-blur z-20">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold tracking-tight">{activeProject.title}</h3>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                  {activeProject.type || 'Project'}
                </span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-secondary/5">

              {/* Hero Section */}
              {activeProject.heroImage && (
                <div className="relative h-[300px] sm:h-[400px] w-full group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                  <img
                    src={activeProject.heroImage}
                    alt="Hero"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20 max-w-4xl mx-auto text-center sm:text-left">
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground drop-shadow-sm">
                      {activeProject.tagline || activeProject.title}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-6">
                      {activeProject.liveUrl && (
                        <a href={activeProject.liveUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5">
                          <Play className="h-4 w-4 fill-current" /> View Live Demo
                        </a>
                      )}
                      {activeProject.repoUrl && (
                        <a href={activeProject.repoUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 font-semibold text-sm hover:bg-secondary hover:text-foreground transition-all">
                          <Github className="h-4 w-4" /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Project Stats Bar */}
              {(activeProject.role || activeProject.timeline || activeProject.technologies) && (
                <div className="border-y border-border/40 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                  <div className="max-w-5xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                    {activeProject.role && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Role</p>
                        <p className="font-medium text-sm">{activeProject.role}</p>
                      </div>
                    )}
                    {activeProject.timeline && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Timeline</p>
                        <p className="font-medium text-sm">{activeProject.timeline}</p>
                      </div>
                    )}
                    {activeProject.technologies && (
                      <div className="col-span-2 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Tech Stack</p>
                        <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                          {activeProject.technologies.map(t => (
                            <span key={t} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-[10px] border border-border/50">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="max-w-5xl mx-auto px-6 py-12 space-y-20">

                {/* Intro / Challenge - only if not story based */}
                {!activeProject.story && (
                  <div className="space-y-6">
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-light">
                      {activeProject.intro}
                    </p>
                    {activeProject.images && (
                      <div className="grid grid-cols-2 gap-4">
                        {activeProject.images.map((img, i) => <img key={i} src={img} className="rounded-lg" />)}
                      </div>
                    )}
                    {activeProject.sections?.map((s, i) => (
                      <div key={i}>
                        <h4 className="font-bold">{s.heading}</h4>
                        <ul>{s.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Introductory Description (if story present) */}
                {activeProject.story && activeProject.description && (
                  <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h3 className="text-2xl font-bold">Project Overview</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>
                )}

                {/* Dynamic Story Sections */}
                {activeProject.story && (
                  <div className="space-y-24">
                    {activeProject.story.map((section, idx) => {
                      if (section.type === 'intro') {
                        return (
                          <div key={idx} className="bg-secondary/20 rounded-2xl p-8 sm:p-12 border border-primary/10 text-center max-w-3xl mx-auto relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                            <h4 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                              <Shield className="h-5 w-5 text-primary" /> {section.heading}
                            </h4>
                            <p className="text-base sm:text-lg text-muted-foreground">{section.text}</p>
                          </div>
                        );
                      }

                      if (section.type === 'feature_split') {
                        return (
                          <div key={idx} className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
                            {/* Text Content */}
                            <div className="flex-1 space-y-6">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider">
                                Feature Spotlight
                              </div>
                              <h4 className="text-2xl sm:text-3xl font-bold">{section.heading}</h4>
                              <p className="text-muted-foreground text-lg leading-relaxed">{section.text}</p>
                              <ul className="space-y-3 pt-2">
                                {section.bullets.map((b, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm font-medium">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Image Showcase */}
                            <div className="flex-1 w-full">
                              <div className="relative rounded-xl border border-border/50 bg-secondary/20 p-2 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-xl pointer-events-none" />
                                <img
                                  src={section.image}
                                  alt={section.imageCaption}
                                  className="rounded-lg w-full h-auto shadow-sm border border-black/5"
                                />
                                <div className="absolute -bottom-4 -right-4 bg-background border border-border/50 px-4 py-2 rounded-lg shadow-lg text-xs font-semibold text-muted-foreground hidden sm:block">
                                  {section.imageCaption}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (section.type === 'grid') {
                        return (
                          <div key={idx} className="space-y-8">
                            <div className="text-center">
                              <h4 className="text-2xl font-bold mb-2">{section.heading}</h4>
                              <div className="h-1 w-20 bg-primary/30 mx-auto rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {section.items.map((item, i) => (
                                <div key={i} className="bg-background border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1 shadow-sm">
                                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    {item.icon === 'Layout' && <Layout className="h-5 w-5" />}
                                    {item.icon === 'Server' && <Server className="h-5 w-5" />}
                                    {item.icon === 'Database' && <Database className="h-5 w-5" />}
                                    {item.icon === 'Zap' && <Zap className="h-5 w-5" />}
                                    {!item.icon && <Layers className="h-5 w-5" />}
                                  </div>
                                  <h5 className="font-bold mb-2">{item.title}</h5>
                                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }


                      if (section.type === 'video_showcase') {
                        return (
                          <div key={idx} className="max-w-4xl mx-auto space-y-4">
                            <div className="text-center mb-6">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                                Video Demo
                              </div>
                              <h4 className="text-2xl sm:text-3xl font-bold">{section.heading}</h4>
                            </div>
                            <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-black">
                              <video
                                src={section.videoUrl}
                                controls
                                className="w-full h-auto max-h-[600px] mx-auto"
                                poster={section.poster || activeProject.heroImage}
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                            {section.caption && (
                              <p className="text-center text-sm text-muted-foreground italic">
                                {section.caption}
                              </p>
                            )}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                )}

                {/* Footer Call to Action */}
                {activeProject.repoUrl && (
                  <div className="pt-10 pb-6 text-center border-t border-border/40">
                    <p className="text-muted-foreground mb-4">Interested in the code?</p>
                    <a href={activeProject.repoUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                      View Repository <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function ProjectCard({ title, description, tags, imageUrl, githubUrl, liveUrl, highlight = false, learnMore = null, onLearnMore = null }) {
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
      className={`overflow-hidden transition-all hover:translate-y-[-4px] hover:shadow-lg focus-within:shadow-lg focus-within:border-primary/50 ${highlight ? 'border-primary/30 shadow-md' : 'border-primary/10'
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
          {learnMore && onLearnMore && (
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs h-7 sm:h-8 px-3 sm:px-3.5 flex-1 bg-primary/90 hover:bg-primary shadow-sm hover:shadow-primary/20"
              onClick={(e) => {
                e.preventDefault();
                onLearnMore();
              }}
            >
              <span>Learn More</span>
              <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-80" />
            </Button>
          )}
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