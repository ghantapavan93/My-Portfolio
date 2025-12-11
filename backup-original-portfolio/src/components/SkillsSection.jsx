import { Code2, Brain, Database, Cloud, Workflow, Cpu } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
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
  
  const skillCategories = [
    {
      icon: <Code2 className="h-4 w-4 md:h-5 md:w-5" />,
      title: "Programming Languages",
      skills: [
        "Python", "Java", "C", "C++", "SQL", "JavaScript", "TypeScript", "HTML/CSS", "PHP", "Dart", "Flutter"
      ]
    },
    {
      icon: <Brain className="h-4 w-4 md:h-5 md:w-5" />,
      title: "AI & ML",
      mobileTitle: "AI & ML",
      fullTitle: "AI & Machine Learning",
      skills: [
        "Scikit-Learn", "TensorFlow", "PyTorch", "Keras", "OpenAI", "Gemini 1.5 Flash", "Claude", "LLMs", "Transformers", "LangChain", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering", "CNNs", "LSTMs", "Deep Learning", "Model Training", "Real-time Inference APIs", "FAISS", "VectorDBs", "Internal AI Enablement", "Workflow Automation", "LLM Prompt Library", "Pilot Testing", "YoLov10"
      ]
    },
    {
      icon: <Database className="h-4 w-4 md:h-5 md:w-5" />,
      title: "Data & Big Data",
      mobileTitle: "Data",
      fullTitle: "Big Data & Analytics",
      skills: [
        "Pandas", "NumPy", "SPSS", "SAS", "Matlab (Basics)", "Data Analysis", "Visualization (Tableau, matplotlib, Plotly)", "Spark", "PySpark", "SQL/NoSQL", "Cassandra", "Kafka (Event Streams)", "InfluxDB"
      ]
    },
    {
      icon: <Workflow className="h-4 w-4 md:h-5 md:w-5" />,
      title: "Frameworks & Libraries",
      mobileTitle: "Frameworks",
      fullTitle: "Frameworks & Libraries",
      skills: [
        "Flask", "Spring Boot", "React.js", "Node.js", "Express.js", "jQuery", "FastAPI", "Microservices Architecture", "Firebase Functions", "React Native", "Xamarin", "FlutterFlow", "Pydantic", "Apache Airflow", "Spark", "Mocha", "Puppeteer"
      ]
    },
    {
      icon: <Cloud className="h-4 w-4 md:h-5 md:w-5" />,
      title: "Cloud & Infrastructure",
      mobileTitle: "Cloud",
      fullTitle: "Cloud Platforms & Infrastructure",
      skills: [
        "AWS (EC2, S3, Lambda, SageMaker, IoT)", "Firebase (Auth, Realtime DB, Cloud Messaging)", "Google Cloud (Vertex AI, BigQuery, basic)", "Azure Functions", "Docker", "Terraform (Exploring)", "Jenkins (Intro)", "GitHub Actions (CI/CD)", "Cloud Monitoring (CloudWatch, Prometheus – Exploring)", "Serverless Computing"
      ]
    },
    {
      icon: <Cloud className="h-4 w-4 md:h-5 md:w-5" />,
      title: "DevOps & Tools",
      mobileTitle: "DevOps",
      fullTitle: "DevOps & Tools",
      skills: [
        "Git (GitHub, GitLab, GitHub Copilot)", "CI/CD Pipelines", "Redis", "Microsoft SQL Server", "Elasticsearch APM", "Postman", "MLflow", "Locust", "JIRA", "SonarQube (Intro)", "Confluence", "Replit"
      ]
    },
    {
      icon: <Cpu className="h-4 w-4 md:h-5 md:w-5" />,
      title: "Security & Testing",
      mobileTitle: "Security",
      fullTitle: "Security & Testing",
      skills: [
        "TLS/SSL", "OWASP ZAP", "NESSUS Essentials", "Vulnerability Assessment", "JUnit", "PyTest", "Secure Authentication", "MFA Integration"
      ]
    },
    {
      icon: <Workflow className="h-4 w-4 md:h-5 md:w-5" />,
      title: "APIs & Backend",
      mobileTitle: "APIs",
      fullTitle: "APIs & Backend Development",
      skills: [
        "RESTful API Development", "JWT/Auth", "Realtime Sync (Firebase)", "WebSockets", "Performance Tuning", "Serverless Functions (AWS Lambda)", "GraphQL"
      ]
    },
    {
      icon: <Cpu className="h-4 w-4 md:h-5 md:w-5" />,
      title: "Architecture & Design",
      mobileTitle: "Architecture",
      fullTitle: "Architecture & Design",
      skills: [
        "RESTful API Design", "Microservices Architecture", "Event-Driven Architecture (Kafka, Scheduler-based)", "Secure Authentication", "Serverless Design", "Distributed Systems"
      ]
    },
    {
      icon: <Cpu className="h-4 w-4 md:h-5 md:w-5" />,
      title: "Core & Soft Skills",
      mobileTitle: "Core/Soft",
      fullTitle: "Core Competencies & Soft Skills",
      skills: [
        "Full Stack Web Development", "Cloud-Native Architecture", "Microservices Design", "CI/CD Pipelines", "Debugging & Troubleshooting", "DevOps Practices", "Real-Time Application Logic", "Technical Communication", "Mobile App Development", "Product Thinking", "Agile & Cross-Functional Collaboration", "Responsive UI/UX Design", "E-Commerce Systems", "Infrastructure Automation", "Data Science Techniques"
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      className="py-8 md:py-10"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <p className="text-primary font-medium uppercase tracking-wider text-xs md:text-sm mb-1 md:mb-2" aria-hidden="true">
            Skills
          </p>
          <h2 id="skills-heading" className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
            Technical Expertise
          </h2>
        </div>
        
        {/* Horizontal scrollable category tabs for mobile */}
        <div 
          className="flex items-center justify-start md:justify-center gap-1.5 md:gap-2 mb-6 md:mb-8 overflow-x-auto pb-2 scrollbar-hide"
          role="tablist"
          aria-label="Skill categories"
        >
          {skillCategories.map((category, index) => (
            <button
              key={index}
              id={`tab-${index}`}
              onClick={() => setActiveCategory(index)}
              className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-1.5 md:gap-2 transition-all whitespace-nowrap text-xs md:text-sm flex-shrink-0 ${
                activeCategory === index
                  ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                  : 'bg-secondary/40 text-muted-foreground hover:bg-secondary'
              }`}
              role="tab"
              aria-selected={activeCategory === index}
              aria-controls={`tabpanel-${index}`}
            >
              {category.icon}
              <span className="md:hidden">{category.mobileTitle || category.title}</span>
              <span className="hidden md:inline">{category.fullTitle || category.title}</span>
            </button>
          ))}
        </div>
        
        {/* Skills display - more responsive grid */}
        <div 
          ref={sectionRef}
          className="max-w-5xl mx-auto overflow-hidden rounded-xl border border-primary/10 transition-all"
          role="tabpanel"
          id={`tabpanel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
        >
          <div className="bg-card p-4 md:p-6 h-full">
            <h3 className="sr-only">
              {skillCategories[activeCategory].fullTitle || skillCategories[activeCategory].title} Skills
            </h3>
            
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-secondary/30 rounded-lg p-2 md:p-3 border border-border/30 hover:border-primary/20 hover:bg-primary/5 transition-all"
                >
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/70" aria-hidden="true"></div>
                  <span className="text-xs md:text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}