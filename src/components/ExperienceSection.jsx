import { Badge } from './ui/badge'
import { CalendarIcon, MapPinIcon, ChevronRightIcon, Briefcase } from 'lucide-react'
import { useState } from 'react'

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  
  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "Krowd Guide",
      location: "Dallas, TX",
      period: "Jun 2025 – Present",
      description: [
        "Enhanced and maintained a live MERN-stack MVP for real-time crowd density and parking insights.",
        "Implemented new front-end features using React.js + TailwindCSS, optimizing UX responsiveness.",
        "Built and debugged scalable Express.js REST APIs, improving backend efficiency and response times.",
        "Practiced secure and modular full-stack development, contributing clean, well-documented code.",
        "Collaborated directly with the founder in Agile sprint cycles, using Notion and GitHub for task tracking and version control.",
        "Emulated CI/CD principles by documenting commits and preparing automated deployment pipelines.",
        "Designed admin-facing components using React.js and Firebase for real-time analytics and moderation."
      ],
      skills: ["React.js", "TailwindCSS", "TypeScript", "Node.js", "Express.js", "MongoDB", "CI/CD", "Agile"]
    },
    {
      title: "Outreach Assistant",
      company: "Discovery Park Library, UNT",
      location: "Denton, TX",
      period: "Aug 2023 – May 2025",
      description: [
        "Designed and delivered technical workshops in Python, C++, and Java covering ML, data preprocessing, and GenAI foundations.",
        "Built a GenAI-powered RAG assistant (MiniLM + ChromaDB) for workshop Q&A, increasing query resolution speed by 40%.",
        "Developed Firebase + AWS-hosted automation systems integrating GPT-based content generators.",
        "Led 20+ GenAI workshops, teaching prompt engineering & document-based Q&A to 200+ non-CS learners.",
        "Practiced CI/CD & version-controlled content updates with GitHub Actions."
      ],
      skills: ["Python", "C++", "Java", "GenAI", "LangChain", "Firebase", "AWS", "CI/CD"]
    },
    {
      title: "Student Research Assistant",
      company: "University of North Texas",
      location: "Denton, TX",
      period: "Dec 2023 – May 2025",
      description: [
        "Architected and evaluated GenAI agent workflows by designing RAG pipelines and Planner–Retriever–Critic orchestration.",
        "Deployed LLMs (GPT-3.5, BERT, GPT-2) on GCP Vertex AI with dynamic batching and containerized endpoints.",
        "Automated data ingestion & retraining workflows using Apache Airflow + Prefect.",
        "Explored LoRA and adapter-based fine-tuning of DistilGPT-2 and Mistral for domain-specific tasks.",
        "Enhanced LLM reliability by prototyping fallback strategies and prompt reranking."
      ],
      skills: ["LangChain", "FAISS", "Transformers", "OpenAI APIs", "GCP Vertex AI", "Airflow", "Prefect", "FastAPI", "Docker"]
    },
    {
      title: "AI & Vision Systems Intern",
      company: "SRM Robocon Team",
      location: "India",
      period: "Jan 2021 – Feb 2023",
      description: [
        "Engineered YOLOv4 + OpenCV pipelines for real-time object detection on Raspberry Pi & STM32.",
        "Integrated AI predictions with control logic via UART/I2C, enabling intelligent actuation.",
        "Explored ROS for agent-based communication in swarm robotics.",
        "Applied hardware-aware AI engineering for embedded AI deployment."
      ],
      skills: ["Python", "OpenCV", "TensorFlow", "YOLOv4", "Arduino", "STM32", "ROS", "C++"]
    },
    {
      title: "AI Engineering Intern",
      company: "Builder.ai",
      location: "Remote",
      period: "May 2022 – Feb 2023",
      description: [
        "Developed prompt-to-app GenAI workflows using GPT-3 + OpenAI Codex.",
        "Built RAG-inspired orchestration flows with FastAPI + FAISS + Docker.",
        "Designed reusable prompt templates and fallback strategies.",
        "Applied cloud-native MLOps practices for production-grade GenAI deployment."
      ],
      skills: ["Python", "FastAPI", "OpenAI Codex", "GPT-3", "Docker", "Firebase", "FAISS", "Prompt Engineering"]
    },
    {
      title: "AI Intern",
      company: "Alweb.ai",
      location: "Remote",
      period: "Jul 2021 – May 2022",
      description: [
        "Built prompt-driven UI generation workflows using GPT-3.",
        "Applied semantic parsing & NLP for layout structure & SEO optimization.",
        "Designed Flask-based inference APIs with real-time collaborative editing.",
        "Contributed to prompt tuning & coherence checks for GenAI design."
      ],
      skills: ["Python", "GPT-3", "HTML/CSS", "Flask", "Firebase", "OpenAI APIs", "SEO", "REST APIs"]
    }
  ];

  return (
    <section id="resume" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-primary font-medium uppercase tracking-wider mb-2">Experience</p>
          <h2 className="text-3xl font-semibold mb-4">Professional Journey</h2>
        </div>

        {/* Horizontal role tabs - styled like skills section */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {experiences.map((exp, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                activeTab === index
                  ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                  : 'bg-secondary/40 text-muted-foreground hover:bg-secondary'
              }`}
            >
              <Briefcase className="h-5 w-5" />
              {exp.title}
            </button>
          ))}
        </div>

        {/* Experience Card - styled like skills card */}
        <div className="max-w-5xl mx-auto overflow-hidden rounded-xl border border-primary/10 transition-all">
          <div className="bg-card p-6 h-full">
            {/* Company and location header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border/30">
              <div>
                <h3 className="text-xl font-medium flex items-center">
                  {experiences[activeTab].company}
                </h3>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                    {experiences[activeTab].period}
                  </div>
                  
                  <div className="flex items-center">
                    <MapPinIcon className="mr-1.5 h-3.5 w-3.5" />
                    {experiences[activeTab].location}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {experiences[activeTab].skills.map((skill, index) => (
                  <Badge key={index} className="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Achievements grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {experiences[activeTab].description.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-2 bg-secondary/30 rounded-lg p-3 border border-border/30 hover:border-primary/20 hover:bg-primary/5 transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-primary/70 mt-2"></div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}