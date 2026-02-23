import {
  Code2, Brain, Database, Cloud, Workflow, Cpu, Sparkles, Terminal, CpuIcon, Zap,
  Layers, RefreshCw, Network, Activity, Bot, BookOpen, CheckCircle, BarChart3,
  Bug, ShieldCheck, ShieldAlert, Search, Key, Smartphone, Webhook, ArrowLeftRight,
  Gauge, Monitor, Rocket, Blocks, CloudLightning, BrainCircuit, Eye, Lock,
  Microscope, TerminalSquare, Layout, Users, Lightbulb, ShoppingCart, MessageSquare, ListCheck, Share2
} from 'lucide-react'
import { useState } from 'react'

// Optimized mapping for all technologies with validated Simple Icons slugs
const getIconMetadata = (name) => {
  const mapping = {
    // --- Machine Learning ---
    "Scikit-Learn": { slug: "scikitlearn", color: "#F7931E" },
    "TensorFlow": { slug: "tensorflow", color: "#FF6F00" },
    "PyTorch": { slug: "pytorch", color: "#EE4C2C" },
    "Keras": { slug: "keras", color: "#D00000" },
    "OpenAI": { slug: "openai", color: "#412991" },
    "Gemini": { slug: "googlegemini", color: "#8E75FF" },
    "Claude": { slug: "anthropic", color: "#D97757" },
    "LLMs": { slug: "lucide-brain", color: "#A78BFA" },
    "Transformers": { slug: "huggingface", color: "#FFD21E" },
    "LangChain": { slug: "langchain", color: "#1C3C3C" },
    "Retrieval-Augmented Generation (RAG)": { slug: "lucide-zap", color: "#F472B6" },
    "Prompt Engineering": { slug: "lucide-terminal", color: "#4ADE80" },
    "CNNs": { slug: "lucide-layers", color: "#F472B6" },
    "LSTMs": { slug: "lucide-refresh-cw", color: "#60A5FA" },
    "Deep Learning": { slug: "lucide-network", color: "#A78BFA" },
    "Model Training": { slug: "lucide-activity", color: "#FACC15" },
    "Real-time Inference APIs": { slug: "lucide-zap", color: "#22D3EE" },
    "FAISS": { slug: "meta", color: "#0668E1" },
    "VectorDBs": { slug: "lucide-database", color: "#6EE7B7" },
    "Internal AI Enablement": { slug: "lucide-sparkles", color: "#F472B6" },
    "Workflow Automation": { slug: "lucide-workflow", color: "#818CF8" },
    "LLM Prompt Library": { slug: "lucide-book-open", color: "#34D399" },
    "Pilot Testing": { slug: "lucide-check-circle", color: "#FB923C" },
    "YoLov10": { slug: "lucide-eye", color: "#FACC15" },

    // --- Big Data & Analytics ---
    "Pandas": { slug: "pandas", color: "#150458" },
    "NumPy": { slug: "numpy", color: "#013243" },
    "SPSS": { slug: "ibm", color: "#052FAD" },
    "SAS": { slug: "sas", color: "#007CC3" },
    "Matlab (Basics)": { slug: "mathworks", color: "#ED1C24" },
    "Data Analysis": { slug: "lucide-bar-chart-3", color: "#38BDF8" },
    "Visualization (Tableau, matplotlib, Plotly)": { slug: "tableau", color: "#E97627" },
    "Spark": { slug: "apachespark", color: "#E25A1C" },
    "PySpark": { slug: "apachespark", color: "#E25A1C" },
    "SQL/NoSQL": { slug: "lucide-database", color: "#6366F1" },
    "Cassandra": { slug: "apachecassandra", color: "#1287B1" },
    "Kafka (Event Streams)": { slug: "apachekafka", color: "#231F20" },
    "InfluxDB": { slug: "influxdb", color: "#22ADF6" },

    // --- Frameworks & Libraries ---
    "Flask": { slug: "flask", color: "#000000" },
    "Spring Boot": { slug: "springboot", color: "#6DB33F" },
    "React.js": { slug: "react", color: "#61DAFB" },
    "Node.js": { slug: "nodedotjs", color: "#339933" },
    "Express.js": { slug: "express", color: "#000000" },
    "jQuery": { slug: "jquery", color: "#0769AD" },
    "FastAPI": { slug: "fastapi", color: "#05998B" },
    "Microservices Architecture": { slug: "lucide-blocks", color: "#F43F5E" },
    "Firebase Functions": { slug: "firebase", color: "#FFCA28" },
    "React Native": { slug: "react", color: "#61DAFB" },
    "Xamarin": { slug: "xamarin", color: "#3498DB" },
    "FlutterFlow": { slug: "flutter", color: "#02569B" },
    "Pydantic": { slug: "pydantic", color: "#E92063" },
    "Apache Airflow": { slug: "apacheairflow", color: "#017CEE" },
    "Mocha": { slug: "mocha", color: "#8D6748" },
    "Puppeteer": { slug: "puppeteer", color: "#40B5A4" },

    // --- Cloud Platforms ---
    "AWS (EC2, S3, Lambda, SageMaker, IoT)": { slug: "amazonwebservices", color: "#FF9900" },
    "Firebase (Auth, Realtime DB, Cloud Messaging)": { slug: "firebase", color: "#FFCA28" },
    "Google Cloud (Vertex AI, BigQuery, basic)": { slug: "googlecloud", color: "#4285F4" },
    "Azure Functions": { slug: "microsoftazure", color: "#0062AD" },
    "Docker": { slug: "docker", color: "#2496ED" },
    "Terraform (Exploring)": { slug: "terraform", color: "#7B42BC" },
    "Jenkins (Intro)": { slug: "jenkins", color: "#D24939" },
    "GitHub Actions (CI/CD)": { slug: "githubactions", color: "#2088FF" },
    "Cloud Monitoring (CloudWatch, Prometheus – Exploring)": { slug: "amazoncloudwatch", color: "#FF4F8B" },
    "Serverless Computing": { slug: "lucide-cloud-lightning", color: "#FF9900" },

    // --- DevOps & Tools ---
    "Git (GitHub, GitLab, GitHub Copilot)": { slug: "git", color: "#F05032" },
    "CI/CD Pipelines": { slug: "githubactions", color: "#2088FF" },
    "Redis": { slug: "redis", color: "#DC382D" },
    "Microsoft SQL Server": { slug: "microsoftsqlserver", color: "#CC2927" },
    "Elasticsearch APM": { slug: "elasticsearch", color: "#005571" },
    "Postman": { slug: "postman", color: "#FF6C37" },
    "MLflow": { slug: "mlflow", color: "#0194E2" },
    "Locust": { slug: "lucide-bug", color: "#7DB839" },
    "JIRA": { slug: "jira", color: "#0052CC" },
    "SonarQube (Intro)": { slug: "sonarqube", color: "#4E9BCD" },
    "Confluence": { slug: "confluence", color: "#172B4D" },
    "Replit": { slug: "replit", color: "#F26207" },

    // --- Security & Testing ---
    "TLS/SSL": { slug: "lucide-lock", color: "#10B981" },
    "OWASP ZAP": { slug: "owasp", color: "#D32F2F" },
    "NESSUS Essentials": { slug: "lucide-search", color: "#0047AB" },
    "Vulnerability Assessment": { slug: "lucide-shield-check", color: "#F59E0B" },
    "JUnit": { slug: "junit5", color: "#25A162" },
    "PyTest": { slug: "pytest", color: "#0A9EDC" },
    "Secure Authentication": { slug: "lucide-key", color: "#6366F1" },
    "MFA Integration": { slug: "lucide-smartphone", color: "#3B82F6" },

    // --- APIs & Backend ---
    "RESTful API Development": { slug: "lucide-webhook", color: "#0EA5E9" },
    "JWT/Auth": { slug: "jsonwebtokens", color: "#000000" },
    "Realtime Sync (Firebase)": { slug: "firebase", color: "#FFCA28" },
    "WebSockets": { slug: "lucide-arrow-left-right", color: "#F97316" },
    "Performance Tuning": { slug: "lucide-gauge", color: "#10B981" },
    "Serverless Functions (AWS Lambda)": { slug: "awslambda", color: "#FF9900" },
    "GraphQL": { slug: "graphql", color: "#E10098" },

    // --- Architecture ---
    "RESTful API Design": { slug: "lucide-webhook", color: "#0EA5E9" },
    "Event-Driven Architecture (Kafka, Scheduler-based)": { slug: "apachekafka", color: "#231F20" },
    "Serverless Design": { slug: "lucide-cloud-lightning", color: "#FF9900" },
    "Distributed Systems": { slug: "lucide-share-2", color: "#8B5CF6" },

    // --- Core Competencies ---
    "Full Stack Web Development": { slug: "lucide-monitor", color: "#6366F1" },
    "Cloud-Native Architecture": { slug: "lucide-cloud", color: "#0EA5E9" },
    "Microservices Design": { slug: "lucide-blocks", color: "#F43F5E" },
    "Debugging & Troubleshooting": { slug: "lucide-bug", color: "#94A3B8" },
    "DevOps Practices": { slug: "lucide-rocket", color: "#10B981" },
    "Real-Time Application Logic": { slug: "lucide-zap", color: "#FACC15" },
    "Technical Communication": { slug: "lucide-message-square", color: "#3B82F6" },
    "Mobile App Development": { slug: "lucide-smartphone", color: "#F43F5E" },
    "Product Thinking": { slug: "lucide-lightbulb", color: "#FACC15" },
    "Agile & Cross-Functional Collaboration": { slug: "lucide-users", color: "#6366F1" },
    "Responsive UI/UX Design": { slug: "lucide-layout", color: "#10B981" },
    "E-Commerce Systems": { slug: "lucide-shopping-cart", color: "#EC4899" },
    "Infrastructure Automation": { slug: "lucide-rocket", color: "#10B981" },

    "Python": { slug: "python", color: "#3776AB" },
    "Java": { slug: "java", color: "#007396" },
    "C++": { slug: "cplusplus", color: "#00599C" },
    "MySQL": { slug: "mysql", color: "#4479A1" },
    "Dart": { slug: "dart", color: "#0175C2" },
  };

  const defaultMeta = { slug: name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, ''), color: "#6366f1" };
  const meta = mapping[name] || defaultMeta;

  if (meta.slug.startsWith('lucide-')) {
    return { ...meta, isLucide: true, iconName: meta.slug.replace('lucide-', '') };
  }

  return { ...meta, isLucide: false };
};

const SkillCard = ({ name }) => {
  const { slug, color, isLucide, iconName } = getIconMetadata(name);
  const iconUrl = isLucide ? null : `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`;
  const [hasError, setHasError] = useState(false);

  const LucideIcon = ({ name, className }) => {
    switch (name) {
      case 'brain': return <Brain className={className} />;
      case 'zap': return <Zap className={className} />;
      case 'eye': return <Eye className={className} />;
      case 'bot': return <Bot className={className} />;
      case 'terminal': return <Terminal className={className} />;
      case 'layers': return <Layers className={className} />;
      case 'refresh-cw': return <RefreshCw className={className} />;
      case 'network': return <Network className={className} />;
      case 'activity': return <Activity className={className} />;
      case 'database': return <Database className={className} />;
      case 'sparkles': return <Sparkles className={className} />;
      case 'workflow': return <Workflow className={className} />;
      case 'book-open': return <BookOpen className={className} />;
      case 'check-circle': return <CheckCircle className={className} />;
      case 'bar-chart-3': return <BarChart3 className={className} />;
      case 'blocks': return <Blocks className={className} />;
      case 'cloud-lightning': return <CloudLightning className={className} />;
      case 'bug': return <Bug className={className} />;
      case 'lock': return <Lock className={className} />;
      case 'shield-alert': return <ShieldAlert className={className} />;
      case 'search': return <Search className={className} />;
      case 'shield-check': return <ShieldCheck className={className} />;
      case 'key': return <Key className={className} />;
      case 'smartphone': return <Smartphone className={className} />;
      case 'webhook': return <Webhook className={className} />;
      case 'arrow-left-right': return <ArrowLeftRight className={className} />;
      case 'gauge': return <Gauge className={className} />;
      case 'monitor': return <Monitor className={className} />;
      case 'rocket': return <Rocket className={className} />;
      case 'share-2': return <Share2 className={className} />;
      case 'cloud': return <Cloud className={className} />;
      case 'microscope': return <Microscope className={className} />;
      case 'layout': return <Layout className={className} />;
      case 'users': return <Users className={className} />;
      case 'lightbulb': return <Lightbulb className={className} />;
      case 'shopping-cart': return <ShoppingCart className={className} />;
      case 'message-square': return <MessageSquare className={className} />;
      default: return <Code2 className={className} />;
    }
  };

  return (
    <div
      className="group relative h-32 md:h-44 flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-500 active:scale-90 touch-none overflow-hidden bg-card border border-border hover:border-primary/20 hover:shadow-[0_0_40px_rgba(0,0,0,0.05)] shadow-sm cursor-pointer"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-[40px] pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
      />

      <div
        className="relative z-10 w-14 h-14 md:w-16 md:h-16 mb-4 flex items-center justify-center rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-all duration-500 shadow-sm border border-border group-hover:border-primary/20 group-hover:scale-110 group-hover:rotate-3"
        style={{ boxShadow: `inset 0 0 20px ${color}10` }}
      >
        {!isLucide && !hasError ? (
          <img
            src={iconUrl}
            alt={name}
            className="w-8 h-8 md:w-9 md:h-9 object-contain opacity-90 group-hover:opacity-100 transition-all duration-500"
            style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="text-muted-foreground/60 group-hover:text-primary transition-all duration-500">
            <LucideIcon name={iconName} className="w-8 h-8 md:w-9 md:h-9" />
          </div>
        )}
      </div>

      <span className="relative z-10 text-[9px] md:text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground group-hover:text-foreground transition-all duration-300 text-center px-2 leading-tight">
        {name}
      </span>

      <div
        className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-out animate-pulse"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] pointer-events-none" />
    </div>
  );
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  const skillCategories = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Machine Learning",
      skills: ["Scikit-Learn", "TensorFlow", "PyTorch", "Keras", "OpenAI", "Gemini", "Claude", "LLMs", "Transformers", "LangChain", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering", "CNNs", "LSTMs", "Deep Learning", "Model Training", "Real-time Inference APIs", "FAISS", "VectorDBs", "Internal AI Enablement", "Workflow Automation", "LLM Prompt Library", "Pilot Testing", "YoLov10"]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Big Data & Analytics",
      skills: ["Pandas", "NumPy", "SPSS", "SAS", "Matlab (Basics)", "Data Analysis", "Visualization (Tableau, matplotlib, Plotly)", "Spark", "PySpark", "SQL/NoSQL", "Cassandra", "Kafka (Event Streams)", "InfluxDB"]
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Frameworks & Libraries",
      skills: ["Flask", "Spring Boot", "React.js", "Node.js", "Express.js", "jQuery", "FastAPI", "Microservices Architecture", "Firebase Functions", "React Native", "Xamarin", "FlutterFlow", "Pydantic", "Apache Airflow", "Mocha", "Puppeteer"]
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud & Infrastructure",
      skills: ["AWS (EC2, S3, Lambda, SageMaker, IoT)", "Firebase (Auth, Realtime DB, Cloud Messaging)", "Google Cloud (Vertex AI, BigQuery, basic)", "Azure Functions", "Docker", "Terraform (Exploring)", "Jenkins (Intro)", "GitHub Actions (CI/CD)", "Cloud Monitoring (CloudWatch, Prometheus – Exploring)", "Serverless Computing"]
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "DevOps & Tools",
      skills: ["Git (GitHub, GitLab, GitHub Copilot)", "CI/CD Pipelines", "Redis", "Microsoft SQL Server", "Elasticsearch APM", "Postman", "MLflow", "Locust", "JIRA", "SonarQube (Intro)", "Confluence", "Replit"]
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Security & Testing",
      skills: ["TLS/SSL", "OWASP ZAP", "NESSUS Essentials", "Vulnerability Assessment", "JUnit", "PyTest", "Secure Authentication", "MFA Integration"]
    },
    {
      icon: <Webhook className="h-6 w-6" />,
      title: "APIs & Backend",
      skills: ["RESTful API Development", "JWT/Auth", "Realtime Sync (Firebase)", "WebSockets", "Performance Tuning", "Serverless Functions (AWS Lambda)", "GraphQL"]
    },
    {
      icon: <CpuIcon className="h-6 w-6" />,
      title: "Architecture & Design",
      skills: ["RESTful API Design", "Microservices Architecture", "Event-Driven Architecture (Kafka, Scheduler-based)", "Secure Authentication", "Serverless Design", "Distributed Systems"]
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Core Competencies",
      skills: ["Full Stack Web Development", "Cloud-Native Architecture", "Microservices Design", "CI/CD Pipelines", "Debugging & Troubleshooting", "DevOps Practices", "Real-Time Application Logic", "Technical Communication", "Mobile App Development", "Product Thinking", "Agile & Cross-Functional Collaboration", "Responsive UI/UX Design", "E-Commerce Systems", "Infrastructure Automation"]
    }
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden selection:bg-primary/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-primary/10 via-transparent to-transparent -z-10" />
      <div className="absolute -top-[20%] -right-[10%] w-[1000px] h-[1000px] bg-primary/10 blur-[250px] rounded-full animate-mesh-1 -z-10" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[1000px] h-[1000px] bg-blue-600/10 blur-[250px] rounded-full animate-mesh-2 -z-10" />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-28 space-y-6 flex flex-col items-center animate-fade-up">
          <div className="space-y-2">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.5em] animate-fade-in block">SKILLS</span>
            <h2 className="text-8xl md:text-9xl font-black tracking-tighter leading-[0.8] text-foreground">
              <span className="block animate-fade-up opacity-0 [animation-fill-mode:forwards]">CORE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-600 animate-fade-up opacity-0 [animation-fill-mode:forwards] animation-delay-100 underline decoration-primary/20 underline-offset-8">TECHNOLOGIES</span>
            </h2>
          </div>

          <div className="flex items-center justify-center gap-4 animate-fade-up opacity-0 [animation-fill-mode:forwards] animation-delay-200 py-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary" />
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>

          <p className="text-muted-foreground max-w-3xl mx-auto text-xl md:text-2xl font-medium tracking-tight leading-snug animate-fade-up opacity-0 [animation-fill-mode:forwards] animation-delay-300">
            A specialized arsenal of technologies for high-performance scale, intelligent automation, and autonomous systems.
          </p>

          <button
            onClick={() => document.getElementById('skills-grid')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative mt-8 px-8 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,71,171,0.3)] hover:shadow-[0_0_40px_rgba(0,71,171,0.5)] transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Arsenal <Rocket className="w-4 h-4 animate-bounce" />
            </span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-28 animate-fade-up opacity-0 [animation-fill-mode:forwards] animation-delay-400">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`group relative px-6 md:px-12 py-6 md:py-8 rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-700 active:scale-90 ${activeCategory === index
                ? 'bg-card text-foreground shadow-lg ring-1 ring-border'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <div className="flex flex-col items-center gap-2 md:gap-4">
                <div className={`transition-all duration-700 scale-[1.2] md:scale-[1.7] ${activeCategory === index ? 'text-primary drop-shadow-[0_0_20px_rgba(66,133,244,0.6)]' : 'group-hover:text-primary/40'}`}>
                  {category.icon}
                </div>
                <div className="mt-1 md:mt-2 text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] transition-all duration-500">
                  {category.title}
                </div>
              </div>
              {activeCategory === index && <div className="absolute inset-x-0 -bottom-1 h-1 bg-primary blur-[2px] rounded-full animate-pulse" />}
            </button>
          ))}
        </div>

        <div
          id="skills-grid"
          key={activeCategory}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-20 duration-1000"
        >
          {skillCategories[activeCategory].skills.map((skill) => (
            <SkillCard key={skill} name={skill} />
          ))}
        </div>

        <div className="mt-40 border-t border-border pt-16 flex flex-col md:flex-row items-center justify-between gap-12 opacity-50 hover:opacity-100 transition-all duration-1000 grayscale hover:grayscale-0">
          <div className="flex items-center gap-6 group">
            <Terminal className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Development</span>
              <span className="text-[8px] text-muted-foreground uppercase tracking-[0.2em]">State-of-the-Art Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-6 group">
            <CpuIcon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Architecture</span>
              <span className="text-[8px] text-muted-foreground uppercase tracking-[0.2em]">AI-Native Frameworks</span>
            </div>
          </div>
          <div className="flex items-center gap-6 group">
            <Workflow className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Ecosystem</span>
              <span className="text-[8px] text-muted-foreground uppercase tracking-[0.2em]">Cloud Integrated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}