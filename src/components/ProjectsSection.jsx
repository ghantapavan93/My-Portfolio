import { Card, CardContent } from './ui/card'
import { ArrowRight, Github, ExternalLink, Globe, X, ChevronRight, Database, Layout, Server, Shield, Zap, Layers, CheckCircle2, Play } from 'lucide-react'
import { Button } from './ui/button'
import { useRef, useEffect, useState } from 'react'

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null); // For Learn More modal

  // Data for Project-H: AI-Powered Health & Fitness Assistant
  const projectHLearnMore = {
    id: "project-h",
    title: "Project-H",
    tagline: "AI-Powered Health & Fitness Assistant",
    description: "A full-stack AI-driven health assistant that integrates wearable data from Apple Watch and WHOOP to generate personalized fitness, diet, and sleep plans. Powered by LLMs and RAG, it delivers real-time coaching with smart visualizations. Meet 'Oats'—your intelligent health companion that turns biometric data into actionable insights.",
    role: "Full-Stack AI Engineer",
    timeline: "8 weeks",
    type: "HealthTech AI Platform",
    liveUrl: "https://projhealth.com",
    repoUrl: "https://github.com/ghantapavan93/project-h",
    technologies: ["React", "Flask", "OpenAI GPT-4o", "Tailwind CSS", "Apple HealthKit", "RAG", "Recharts", "Machine Learning"],
    heroImage: "/projects/project-h/thumbnail.png",
    gallery: [
      "/projects/project-h/thumbnail.png"
    ],
    story: [
      {
        type: "intro",
        heading: "Motivation: Intelligent Health, Accessible Anywhere",
        text: "With my family in healthcare and my own fitness journey, I wanted to create an intelligent health companion that merges AI reasoning with real biometric data. The vision: actionable insights from your wearables, accessible anytime, powered by generative AI that truly understands your health context."
      },
      {
        type: "feature_split",
        heading: "'Oats' — Your AI Health Coach",
        text: "Oats is powered by GPT-4o + RAG, trained on 20K+ biometric data points from Apple Watch and WHOOP APIs. Ask questions like 'Why am I tired today?' and get evidence-backed answers referencing your sleep stages, HRV, strain, and recovery. Multi-turn dialogue keeps context across the entire conversation.",
        bullets: ["LLM + RAG for Personalized Coaching", "20K+ Biometric Data Points", "Multi-Turn Context Awareness"],
        image: "/projects/project-h/thumbnail.png",
        imageCaption: "Oats AI Coach Interface",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Sleep Intelligence Dashboard",
        text: "Visualize REM, Core, and Deep sleep with interactive pie charts and timelines. The system parses Apple Health XML to extract sleep stages, then correlates them with recovery scores and strain metrics. Users see exactly how their sleep quality impacts next-day performance.",
        bullets: ["Custom XML Parser for Apple Health", "REM/Core/Deep Visualizations", "Recovery Score Correlation"],
        image: "/projects/project-h/thumbnail.png",
        imageCaption: "Sleep Analytics Dashboard",
        reverse: true
      },
      {
        type: "feature_split",
        heading: "Personalized Meal & Workout Plans",
        text: "The platform generates custom meal and workout plans based on your goals (weight loss, muscle gain, endurance) and current biometrics. Rule-based logic adapts suggestions in real-time: high strain? Suggest recovery meals. Low HRV? Recommend lighter workouts.",
        bullets: ["Goal-Based Plan Generation", "Real-Time Biometric Adaptation", "Nutrition + Workout Sync"],
        image: "/projects/project-h/thumbnail.png",
        imageCaption: "Custom Meal & Workout Planner",
        reverse: false
      },
      {
        type: "grid",
        heading: "Technical Architecture",
        items: [
          { title: "Frontend", desc: "React + Tailwind for responsive, modular health dashboards.", icon: "Layout" },
          { title: "Backend", desc: "Flask REST API with Apple HealthKit \u0026 WHOOP integration.", icon: "Server" },
          { title: "AI Engine", desc: "GPT-4o + RAG with FAISS for biometric-grounded coaching.", icon: "Zap" },
          { title: "Visualization", desc: "Recharts for sleep, recovery, and performance graphs.", icon: "Database" }
        ]
      },
      {
        type: "intro",
        heading: "Challenges \u0026 Solutions",
        text: "**Challenge 1:** Parsing Apple Health XML accurately → Built custom XML parser with strict validation. **Challenge 2:** Responsive UI for complex health data → Modular React components + Recharts. **Challenge 3:** Multi-turn LLM dialogue → Implemented session-based context management with OpenAI API. **Challenge 4:** Adapting suggestions to biometrics → Rule-based logic + synthetic WHOOP datasets for real-time personalization."
      },
      {
        type: "grid",
        heading: "Results \u0026 Impact",
        items: [
          { title: "Demo Success", desc: "Simulates real-world use cases with synthetic data.", icon: "CheckCircle2" },
          { title: "User Feedback", desc: "Highly positive reviews for usability \u0026 content accuracy.", icon: "Star" },
          { title: "Recognition", desc: "Praised by mentors for bridging tech with health.", icon: "Award" },
          { title: "Sub-second Inference", desc: "90%+ user satisfaction with AWS Lambda deployment.", icon: "Zap" }
        ]
      }
    ]
  };

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


  // Data for EagleEye AI
  const eagleEyeLearnMore = {
    id: "eagle-eye",
    title: "EagleEye AI",
    tagline: "Safety-First, AI-Powered Video Intelligence Platform",
    description: "EagleEye AI is evolving into a full safety + incident intelligence platform—not just a 'camera demo.' It turns surveillance into a real-time, evidence-grounded decision system: detect risk, explain why, attach proof, and route alerts. Designed like a SOC platform for the physical world, it prioritizes deterministic reasoning and operator trust.",
    role: "AI Engineer & Architect",
    timeline: "2024",
    type: "Enterprise Safety Platform",
    liveUrl: "https://fardeen210-eagle-eye-ai-streamlitapp-cebf0r.streamlit.app/",
    repoUrl: "https://github.com/ghantapavan93/Eagle-Eye-AI/tree/main/Eagle-Eye-AI-main",
    technologies: ["Python", "FastAPI", "OpenCV", "PyTorch", "Docker", "AWS", "Multimodal LLM", "Vector Search"],
    heroImage: "/projects/EagleEye AI/thumbnail.png",
    gallery: [
      "/projects/EagleEye AI/thumbnail.png"
    ],
    story: [
      {
        type: "intro",
        heading: "North Star: Production Safety",
        text: "Most CCTV AI projects are 'box detection.' EagleEye AI is designed like a SOC platform for the physical world. From video → to incident → to action. It features deterministic-first reasoning, evidence bundles (timestamps, frames), and operator-grade workflows. If a security operator opens EagleEye AI, it feels like a production safety platform."
      },
      {
        type: "grid",
        heading: "Core Principles",
        items: [
          { title: "Evidence > Eloquence", desc: "Every summary must map to visible cues + time anchors. No evidence = no escalation.", icon: "Shield" },
          { title: "Deterministic First", desc: "Risk scores decided by rules + physics first. LLM is for explanation, not decision-making.", icon: "Zap" },
          { title: "Operator Trust", desc: "Validation in <15s. Every incident ships with before/during/after context.", icon: "CheckCircle2" },
          { title: "Privacy-by-Design", desc: "Face-blur modes, retention policies, and audit trails are core features.", icon: "Lock" }
        ]
      },
      {
        type: "intro", // Using intro style for Architecture overview
        heading: "Platform Architecture (V2)",
        text: "Built like a real system with distinct layers: **A) Ingestion** (RTSP/ONVIF), **B) Event Fabric** (Signal Bus), **C) Threat Understanding** (Temporal Behavior), **D) Risk Scoring** (Deterministic Truth), **E) Multimodal Reporting** (Grounded LLM), **F) Operator Console** (Triage UI), and **G) Feedback Loop** (Regression Testing)."
      },
      {
        type: "feature_split",
        heading: "Solving Real-World Noise",
        text: "Challenge: 'Movement = Danger' causes false positives. Solution: A two-stage gating design. signals + heuristics build the event first, then a threat lexicon filter applies. For low-light/blur, we use multi-frame context and peak-motion keyframes, bundling evidence so human review is fast even if model confidence drops.",
        bullets: ["Two-Stage Gating", "Multi-Frame Context", "Evidence Bundling"],
        image: "/projects/EagleEye AI/thumbnail.png",
        imageCaption: "Noise Filtering & Evidence Bundling",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Halt Hallucinations & Cost",
        text: "Surveillance AI cannot invent weapons. We use constrained prompts ('describe only visible') and force timestamp references. To manage compute cost, we use dynamic sampling—only 'promising' time windows get expensive reasoning, keeping throughput practical on modest infra.",
        bullets: ["Constrained Prompts", "Dynamic Sampling", "Visual-Only Grounding"],
        image: "/projects/EagleEye AI/thumbnail.png",
        imageCaption: "Cost-Aware AI Reasoning",
        reverse: true
      },
      {
        type: "grid",
        heading: "Results & Impact",
        items: [
          { title: "High-Signal", desc: "Converts long video into specific incident candidates.", icon: "Zap" },
          { title: "Reduced Workload", desc: "Reviewers see only threat-aligned events.", icon: "CheckCircle2" },
          { title: "Explainable", desc: "Audit-friendly bundles with explainable decisions.", icon: "FileText" },
          { title: "Performance", desc: "Optimized frames/sec on CPU vs GPU.", icon: "Activity" }
        ]
      },
      {
        type: "grid",
        heading: "Future Integrations",
        items: [
          { title: "Security Ops", desc: "Slack/Teams alerts, Twilio SMS, Jira tickets.", icon: "Bell" },
          { title: "SOC/SIEM", desc: "Splunk/Sentinel export, SOAR webhooks.", icon: "Server" },
          { title: "VMS Connectors", desc: "Inject incidents back into standard VMS timelines.", icon: "Video" },
          { title: "IoT Triggers", desc: "Correlate with access control (badges) and sensors.", icon: "Wifi" }
        ]
      }
    ]
  };

  // Data for Smart Tutor AI
  const smartTutorLearnMore = {
    id: "smart-tutor",
    title: "Smart Tutor AI",
    tagline: "Autonomous RAG-Driven Educational Agent",
    description: "A next-generation educational platform leveraging Retrieval-Augmented Generation (RAG) and Large Language Models (LLMs) to deliver hyper-personalized tutoring. Unlike static learning management systems, Smart Tutor AI acts as an intelligent companion that dynamically adapts tailored curriculums, generates context-aware quizzes, and employs Socratic reasoning to guide students through complex concepts.",
    role: "AI Engineer & Full-Stack Developer",
    timeline: "2024",
    type: "AI & EdTech Platform",
    liveUrl: null,
    repoUrl: "https://github.com/ghantapavan93/Smart-Tutor-AI-Clean/tree/main/Smart-Tutor-AI-AI-Driven-Personalized-Teaching-Support-main",
    technologies: ["OpenAI GPT-4", "LangChain", "RAG Pipeline", "Pinecone (Vector DB)", "React", "Python FastAPI"],
    heroImage: "/projects/Smart-Tutor-AI-Clean/thumbnail.png",
    gallery: [
      "/projects/Smart-Tutor-AI-Clean/thumbnail.png"
    ],
    story: [
      {
        type: "intro",
        heading: "The Challenge: Beyond Static Learning",
        text: "Traditional online education is passive, and generic LLMs often hallucinate or lack curriculum alignment. The challenge was to build an AI system that is both 'grounded' in specific educational materials (accuracy) and 'pedagogically adaptive' to the student's learning pace (efficacy)."
      },
      {
        type: "feature_split",
        heading: "Context-Aware RAG Engine",
        text: "The core engine ingests textbooks, lecture notes, and research papers into a vector store (Pinecone). When a student asks a query, the system retrieves only the relevant 'knowledge chunks' to prompt the LLM. This ensures every explanation is factually grounded in the course material, eliminating hallucinations.",
        bullets: ["Vector-Based Knowledge Retrieval", "Source-Cided Explanations", "Zero-Hallucination Architecture"],
        image: "/projects/Smart-Tutor-AI-Clean/thumbnail.png",
        imageCaption: "RAG Pipeline: From Textbook to Insight",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Socratic Reasoning Core",
        text: "Instead of simply providing answers, the LLM is instruction-tuned to act as a Socratic tutor. It breaks down complex problems into step-by-step reasoning chains, asking guiding questions that encourage the student to derive the solution themselves, reinforcing long-term retention.",
        bullets: ["Chain-of-Thought Reasoning", "Socratic Dialogue Mode", "Step-by-Step Problem Solving"],
        image: "/projects/Smart-Tutor-AI-Clean/thumbnail.png",
        imageCaption: "AI Tutor Guiding a Student Promise",
        reverse: true
      },
      {
        type: "grid",
        heading: "Architecture & AI Stack",
        items: [
          { title: "LLM Orchestration", desc: "LangChain agents for multi-step reasoning and tool use.", icon: "Zap" },
          { title: "Vector Memory", desc: "Pinecone/ChromaDB for semantic search over course content.", icon: "Database" },
          { title: "API Layer", desc: "Python FastAPI handling asynchronous inference streams.", icon: "Server" },
          { title: "Frontend", desc: "React UI with LaTeX support for mathematical rendering.", icon: "Layout" }
        ]
      }
    ]
  };

  // Data for AI Powered Phishing URL Classifier
  const phishingLearnMore = {
    id: "phishbuster",
    title: "PhishBuster",
    tagline: "AI-Powered Phishing URL Classifier",
    description: "A supervised machine learning system designed to detect zero-day phishing attempts by analyzing lexical and host-based URL features. PhishBuster bridges the gap between static blacklists and dynamic threat landscapes using high-accuracy classification and a real-time inference API.",
    role: "Full-Stack ML Engineer",
    timeline: "2024",
    type: "Cybersecurity ML Platform",
    liveUrl: null,
    repoUrl: "https://github.com/ghantapavan93/PhishBuster",
    technologies: ["Python", "Scikit-Learn", "Flask", "Pandas", "XGBoost", "React"],
    heroImage: "/projects/phishingwebsite/thumbnail.png",
    gallery: [
      "/projects/phishingwebsite/thumbnail.png"
    ],
    story: [
      {
        type: "intro",
        heading: "The Challenge: Beyond Static Blacklists",
        text: "Phishing URLs evolve faster than blacklists can be updated. The goal was to build a predictive system that identifies malicious patterns within the URL structure itself—analyzing length, entropy, special characters, and domain age to catch 'zero-hour' attacks before they land in an inbox."
      },
      {
        type: "grid",
        heading: "Feature Engineering & Data",
        items: [
          { title: "Lexical Analysis", desc: "Extracting 30+ features like URL length, digit counts, and hyphen ratios.", icon: "Shield" },
          { title: "Host-Based Cues", desc: "Checking domain age, TTL metrics, and SSL certificate validity via API.", icon: "Globe" },
          { title: "Balanced Dataset", desc: "Trained on 100K+ URLs from PhishTank and legitimate sources.", icon: "Database" },
          { title: "Normalization", desc: "Robust pre-processing to handle URL encoding and obfuscation.", icon: "Zap" }
        ]
      },
      {
        type: "feature_split",
        heading: "High-Confidence Classification",
        text: "Leveraging ensemble models like Random Forest and XGBoost, the classifier achieves 98%+ accuracy. The system doesn't just give a yes/no; it calculates a probability score, allowing security teams to set custom thresholds for automated blocking vs. manual review.",
        bullets: ["98%+ Model Accuracy", "Probability-Based Scoring", "Ensemble Learning (XGBoost)"],
        image: "/projects/phishingwebsite/thumbnail.png", // Assuming same thumbnail for now
        imageCaption: "Model Performance & Confusion Matrix",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Real-Time Inference API",
        text: "Built with Flask, the inference API allows external systems to scan suspicious links programmatically. It handles request validation, feature extraction on-the-fly, and returns a JSON payload with the risk level and extracted metadata in milliseconds.",
        bullets: ["Sub-50ms Inference Latency", "RESTful API Integration", "Automated Feature Extraction"],
        image: "/projects/phishingwebsite/thumbnail.png",
        imageCaption: "Inference API Documentation & Logic",
        reverse: true
      },
      {
        type: "grid",
        heading: "Technical Architecture",
        items: [
          { title: "ML Core", desc: "Python with Scikit-Learn and XGBoost for model training.", icon: "Zap" },
          { title: "API Layer", desc: "Flask backend serving the model and exposing REST endpoints.", icon: "Server" },
          { title: "Data Pipeline", desc: "Pandas and Numpy for high-speed feature vectorization.", icon: "Database" },
          { title: "UI Dashboard", desc: "React interface for manual URL scanning and reporting.", icon: "Layout" }
        ]
      }
    ]
  };

  // Data for SafePath Transit Assistant
  const safePathLearnMore = {
    id: "safepath",
    title: "SafePath Transit Assistant",
    tagline: "AI-Powered Airport Navigation & Travel Companion",
    description: "An intelligent airport transit assistant that combines real-time flight tracking, indoor navigation, and personalized travel recommendations. SafePath helps travelers navigate complex airport terminals, track their flights, and get AI-powered assistance for a seamless travel experience.",
    role: "Full-Stack AI Engineer",
    timeline: "2024",
    type: "Travel Tech AI Platform",
    liveUrl: null,
    repoUrl: "https://github.com/ghantapavan93/SafePath-Airport-Transit-Assistant-for-Travelers-",
    technologies: ["React", "AI Assistant", "Travel APIs", "Real-time Data", "Navigation", "Python"],
    heroImage: "/projects/SafePath-Airport-Transit-Assistant-for-Travelers/safepath.png",
    gallery: [
      "/projects/SafePath-Airport-Transit-Assistant-for-Travelers/safepath.png",
      "/projects/SafePath-Airport-Transit-Assistant-for-Travelers/Demo video-1.gif",
      "/projects/SafePath-Airport-Transit-Assistant-for-Travelers/demo video-2.gif"
    ],
    story: [
      {
        type: "intro",
        heading: "The Challenge: Navigating Modern Airports",
        text: "Modern airports are complex ecosystems with multiple terminals, constantly changing gates, and real-time flight updates. Travelers—especially first-timers or those with tight connections—often struggle to find their way efficiently. SafePath was built to transform this chaotic experience into a guided, stress-free journey using AI-powered assistance and real-time data integration."
      },
      {
        type: "feature_split",
        heading: "Intelligent AI Travel Companion",
        text: "At the core of SafePath is an AI assistant that understands natural language queries about flights, gates, amenities, and navigation. Ask 'Where is my gate?' or 'Find the nearest coffee shop,' and get instant, context-aware responses tailored to your current location and flight status.",
        bullets: ["Natural Language Understanding", "Context-Aware Responses", "Personalized Recommendations"],
        image: "/projects/SafePath-Airport-Transit-Assistant-for-Travelers/Demo video-1.gif",
        imageCaption: "AI Assistant in Action",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Real-Time Flight & Gate Tracking",
        text: "SafePath integrates with flight tracking APIs to provide live updates on departures, arrivals, gate changes, and delays. The system proactively alerts users to important changes, ensuring they never miss a flight or connection due to last-minute gate switches.",
        bullets: ["Live Flight Status Updates", "Gate Change Alerts", "Connection Time Warnings"],
        image: "/projects/SafePath-Airport-Transit-Assistant-for-Travelers/demo video-2.gif",
        imageCaption: "Real-Time Flight Tracking Dashboard",
        reverse: true
      },
      {
        type: "feature_split",
        heading: "Indoor Navigation & Wayfinding",
        text: "Leveraging indoor mapping technology, SafePath provides step-by-step navigation within airport terminals. Whether you need to find your gate, baggage claim, or a specific restaurant, the system generates optimized routes considering walking time and current terminal congestion.",
        bullets: ["Turn-by-Turn Terminal Navigation", "Optimized Route Planning", "Amenity Discovery"],
        image: "/projects/SafePath-Airport-Transit-Assistant-for-Travelers/safepath.png",
        imageCaption: "Terminal Navigation Interface",
        reverse: false
      },
      {
        type: "grid",
        heading: "Technical Architecture",
        items: [
          { title: "Frontend", desc: "React-based responsive UI with real-time updates and smooth animations.", icon: "Layout" },
          { title: "AI Engine", desc: "Natural language processing for conversational travel assistance.", icon: "Zap" },
          { title: "Data Integration", desc: "Real-time flight APIs and airport terminal data feeds.", icon: "Database" },
          { title: "Navigation", desc: "Indoor mapping and pathfinding algorithms for terminal wayfinding.", icon: "Server" }
        ]
      },
      {
        type: "intro",
        heading: "Impact & User Experience",
        text: "SafePath reduces travel anxiety by providing travelers with a single, intelligent interface for all their airport navigation needs. From check-in to boarding, users have a trusted AI companion that understands their journey and proactively guides them through every step. The system is designed to be especially helpful for international travelers, people with disabilities, and anyone navigating unfamiliar airports."
      }
    ]
  };

  // Data for Clinical Query Assistant
  const clinicalQueryLearnMore = {
    id: "clinical-query",
    title: "Clinical Query Assistant",
    tagline: "RAG-Powered Medical Intelligence Platform",
    description: "An advanced AI-powered clinical assistant that leverages Retrieval-Augmented Generation (RAG) and Large Language Models to deliver accurate, evidence-based answers to complex medical queries. Designed for healthcare professionals, this system combines the power of semantic search over medical literature with the reasoning capabilities of state-of-the-art LLMs to provide contextually relevant clinical insights.",
    role: "AI Engineer & Healthcare Tech Developer",
    timeline: "2024",
    type: "Healthcare AI Platform",
    liveUrl: null,
    repoUrl: "https://github.com/ghantapavan93/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMS-",
    technologies: ["RAG", "LLMs", "Python", "Vector Database", "Medical NLP", "FastAPI"],
    heroImage: "/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/interface-1.png",
    gallery: [
      "/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/interface-1.png",
      "/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/interface-2.png",
      "/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/interface-3.png",
      "/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/performance-report.png"
    ],
    story: [
      {
        type: "intro",
        heading: "The Challenge: Bridging AI and Clinical Accuracy",
        text: "Healthcare professionals need instant access to accurate, evidence-based medical information. Traditional search engines lack clinical context, while pure LLMs risk hallucinations that could have serious consequences. The challenge was to build an AI system that retrieves information from trusted medical sources and generates responses grounded in verified clinical evidence, ensuring both accuracy and relevance."
      },
      {
        type: "feature_split",
        heading: "Retrieval-Augmented Generation (RAG) Pipeline",
        text: "At the core of the system is a sophisticated RAG pipeline that ingests medical literature, clinical guidelines, and research papers into a vector database. When a query is received, the system performs semantic search to retrieve the most relevant medical documents, then feeds this context to the LLM to generate accurate, source-grounded responses.",
        bullets: ["Semantic Search Over Medical Literature", "Vector Embeddings for Clinical Context", "Source Attribution & Citation"],
        image: "/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/interface-2.png",
        imageCaption: "RAG Pipeline Architecture",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "High-Accuracy Medical Query Processing",
        text: "The system is designed to handle complex clinical queries ranging from diagnostic criteria to treatment protocols. By combining retrieval with LLM reasoning, it can synthesize information from multiple sources, identify conflicting evidence, and present balanced, evidence-based recommendations that healthcare professionals can trust.",
        bullets: ["Multi-Source Evidence Synthesis", "Clinical Guideline Adherence", "Hallucination Prevention"],
        image: "/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/interface-3.png",
        imageCaption: "Medical Query Interface",
        reverse: true
      },
      {
        type: "feature_split",
        heading: "Performance Validation & Metrics",
        text: "Rigorous testing ensures the system meets clinical-grade standards. Performance metrics include retrieval accuracy, response relevance, and source attribution quality. The platform was validated against established medical knowledge bases to ensure responses align with current clinical guidelines and best practices.",
        bullets: ["Clinical Accuracy Validation", "Response Quality Metrics", "Evidence Attribution Tracking"],
        image: "/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/performance-report.png",
        imageCaption: "Performance Metrics Dashboard",
        reverse: false
      },
      {
        type: "grid",
        heading: "Technical Architecture",
        items: [
          { title: "RAG Engine", desc: "Custom RAG pipeline with semantic chunking and vector retrieval.", icon: "Zap" },
          { title: "LLM Integration", desc: "State-of-the-art language models for medical reasoning.", icon: "Server" },
          { title: "Vector Store", desc: "Optimized vector database for fast medical literature search.", icon: "Database" },
          { title: "API Layer", desc: "FastAPI backend for scalable query processing.", icon: "Layout" }
        ]
      },
      {
        type: "intro",
        heading: "Impact on Healthcare Professionals",
        text: "The Clinical Query Assistant empowers healthcare professionals with instant access to evidence-based medical information. By reducing the time needed to research clinical questions and ensuring responses are grounded in trusted sources, the platform supports better decision-making and improved patient care. The system is designed with safety as a priority, always attributing sources and avoiding speculative medical advice."
      }
    ]
  };

  // Data for AetherLabs
  const aetherLabsLearnMore = {
    id: "aetherlabs",
    title: "AetherLabs",
    tagline: "Democratizing AI Through Open-Source Innovation",
    description: "AetherLabs is a collaborative innovation hub dedicated to building accessible, high-impact technology solutions. By bridging the gap between cutting-edge AI research and real-world accessibility challenges, AetherLabs fosters an ecosystem of open-source projects designed to empower researchers, developers, and users alike.",
    role: "Founder & Lead Architect",
    timeline: "2024 - Present",
    type: "Innovation Hub & Research Lab",
    liveUrl: "https://aetherlabs.vercel.app/",
    repoUrl: "https://github.com/ghantapavan93/aetherlabs",
    technologies: ["Next.js", "AI/ML", "Python", "Open Source", "Tailwind CSS", "Accessibility-First Design"],
    heroImage: "/projects/aetherlabs/thumbnail.png",
    gallery: [
      "/projects/aetherlabs/thumbnail.png"
    ],
    story: [
      {
        type: "intro",
        heading: "The Vision: Innovation Without Barriers",
        text: "The rapid evolution of AI often leaves accessibility as an after-thought. AetherLabs was founded on the principle that the most advanced technology should be the most inclusive. Our mission is to build a foundation of open-source tools that solve real accessibility gaps while pushing the boundaries of what's possible with agentic AI and computer vision."
      },
      {
        type: "grid",
        heading: "Core Strategic Pillars",
        items: [
          { title: "Research & Development", desc: "Developing novel AI architectures for multimodal safety and incident intelligence.", icon: "Zap" },
          { title: "Open-Source Advocacy", desc: "Releasing modular, documented codebases to empower global builders.", icon: "Database" },
          { title: "Accessibility Standards", desc: "Enforcing WCAG compliance and inclusive design in every project.", icon: "Shield" },
          { title: "Community Growth", desc: "Mentoring over 200+ students through interactive learning platforms like A11yGame.", icon: "Layout" }
        ]
      },
      {
        type: "feature_split",
        heading: "A Thriving Project Ecosystem",
        text: "AetherLabs serves as the launchpad for a suite of specialized platforms. From 'EagleEye AI' (safety intelligence) to 'Smart Tutor' (RAG-driven education), each project follows a unified blueprint: high performance, grounded reasoning, and enterprise-grade accessibility.",
        bullets: ["Unified AI Architecture", "Cross-Project Synergies", "Production-Ready Open Source"],
        image: "/projects/aetherlabs/thumbnail.png",
        imageCaption: "AetherLabs Ecosystem Overview",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Ethical AI & Safety First",
        text: "We believe in deterministic-first reasoning where AI enhances human decision-making rather than replacing it. Our projects prioritize privacy-by-design, audit-ready logs, and cross-verified evidence, ensuring that technology serves as a reliable partner in critical environments.",
        bullets: ["Transparent Logic Chains", "Privacy-Preserving Models", "Human-in-the-Loop Design"],
        image: "/projects/aetherlabs/thumbnail.png",
        imageCaption: "Safety & Integrity Dashboard",
        reverse: true
      },
      {
        type: "grid",
        heading: "Innovation Stack",
        items: [
          { title: "Intelligence Layer", desc: "Gemini, OpenAI, and custom fine-tuned LLMs for specialized tasks.", icon: "Zap" },
          { title: "Infrastructure", desc: "FastAPI and Next.js for high-speed, scalable deployment.", icon: "Server" },
          { title: "Data Memory", desc: "Pinecone and ChromaDB for high-fidelity semantic recall.", icon: "Database" },
          { title: "Experience", desc: "Tailwind CSS and ShadCN for consistent, accessible UI/UX.", icon: "Layout" }
        ]
      }
    ]
  };

  // Data for Doctor Finder
  const doctorFinderLearnMore = {
    id: "doctor-finder",
    title: "Doctor Finder",
    tagline: "Connecting Patients with Quality Healthcare",
    description: "Doctor Finder is a comprehensive Next.js and Firebase-powered web application designed to bridge the gap between patients and healthcare providers. It provides a seamless, intuitive interface for searching doctors by specialty, location, and insurance, while offering real-time appointment scheduling and interactive mapping.",
    role: "Full-Stack Developer",
    timeline: "2024",
    type: "Healthcare Marketplace Platform",
    liveUrl: "https://capstone2024-five.vercel.app/",
    repoUrl: "https://github.com/Afthab33/capstone2024",
    technologies: ["Next.js", "Firebase", "React", "Tailwind CSS", "ShadCN UI", "Google Maps API"],
    heroImage: "/projects/doctorfinder/thumbnail.png",
    gallery: [
      "/projects/doctorfinder/thumbnail.png",
      "/projects/doctorfinder/search_results.png",
      "/projects/doctorfinder/profile_view.png",
      "/projects/doctorfinder/map_view.png"
    ],
    story: [
      {
        type: "intro",
        heading: "The Challenge: Navigating Healthcare Choices",
        text: "Finding the right doctor often involves navigating fragmented systems, outdated directories, and complex insurance networks. The goal of Doctor Finder was to centralize this experience, providing patients with a modern, trusted platform to find, research, and book medical professionals with ease."
      },
      {
        type: "feature_split",
        heading: "Advanced Patient Search & Filtering",
        text: "Patients can filter through a curated database of doctors using granular criteria: specialty, city, insurance provider, and patient ratings. The search engine is optimized for speed, ensuring that users find the care they need in seconds, even with complex combinations of filters.",
        bullets: ["Multi-Criteria Search Engine", "Real-Time Filter Updates", "Insurance-Specific Search"],
        image: "/projects/doctorfinder/search_results.png",
        imageCaption: "Search Results & Granular Filtering Interface",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Interactive Map-Based Discovery",
        text: "Integrated with Google Maps API, the platform allows users to visually browse doctor locations. Selecting a map pin instantly provides an overview of the doctor's practice, allowing patients to find providers that are geographically convenient.",
        bullets: ["Visual Practice Discovery", "Distance-Based Search", "One-Click Profile Access"],
        image: "/projects/doctorfinder/map_view.png",
        imageCaption: "Interactive Mapping & Location Awareness",
        reverse: true
      },
      {
        type: "feature_split",
        heading: "Comprehensive Profiles & Scheduling",
        text: "Each doctor has a detailed professional profile showcasing their education, verified reviews, and a live availability calendar. Patients can request appointments directly through the platform, which syncs in real-time with the doctor's management dashboard.",
        bullets: ["Verified Patient Reviews", "Live Appointment Scheduling", "Doctor-Patient Communication Hub"],
        image: "/projects/doctorfinder/profile_view.png",
        imageCaption: "Detailed Doctor Profiles & Booking Flow",
        reverse: false
      },
      {
        type: "grid",
        heading: "Technical Architecture",
        items: [
          { title: "Frontend", desc: "Next.js for server-side rendering and optimized performance.", icon: "Layout" },
          { title: "Backend", desc: "Firebase for real-time data, authentication, and hosting.", icon: "Server" },
          { title: "UI Components", desc: "ShadCN UI + Tailwind for a professional, accessible design system.", icon: "Zap" },
          { title: "Integrations", desc: "Google Maps API for geospatial intelligence and doctor discovery.", icon: "Database" }
        ]
      }
    ]
  };

  // Data for 100 Miles of Summer
  const hundredMilesLearnMore = {
    id: "100-miles",
    title: "100 Miles of Summer",
    tagline: "Premium Event & Experience Prototype",
    description: "A high-fidelity React Native prototype delivering a buttery-smooth, premium user experience for summer event tracking. Built to demonstrate top-tier mobile interactions, complex animations, and a visually stunning design system that keeps users engaged and moving.",
    role: "Mobile UX Engineer",
    timeline: "2024",
    type: "Mobile Experience Proto",
    liveUrl: "https://100mosproto.vercel.app/",
    repoUrl: "https://github.com/ghantapavan93/100MoS-Proto",
    technologies: ["React Native", "Expo", "Reanimated", "TypeScript", "Skia", "Moti"],
    heroImage: "/projects/100MoS-Proto/thumbnail.png",
    gallery: [
      "/projects/100MoS-Proto/thumbnail.png"
    ],
    story: [
      {
        type: "intro",
        heading: "The Vision: Capturing the Vibe",
        text: "Summer isn't just about distance; it's about the feeling. The goal was to build a mobile experience that captures that energy. This prototype isn't just functional—it's visceral. From the moment you launch it, the fluid animations and vibrant aesthetics promise a premium journey, setting a new standard for fitness and event apps."
      },
      {
        type: "feature_split",
        heading: "Fluid Motion & Interaction",
        text: "Leveraging React Native Reanimated and Skia, every touch response is instantaneous and delightful. The interface breathes with the user, using micro-interactions to provide deep feedback. It's not just about tracking miles; it's about enjoying every swipe and tap along the way.",
        bullets: ["60fps Animations", "Gesture-Driven UI", "Haptic Feedback Integration"],
        image: "/projects/100MoS-Proto/thumbnail.png",
        imageCaption: "Immersive Home Screen Experience",
        reverse: false
      },
      {
        type: "grid",
        heading: "Engineering Excellence",
        items: [
          { title: "Performance", desc: "Optimized render cycles for silky smooth scrolling.", icon: "Zap" },
          { title: "Aesthetics", desc: "Pixel-perfect implementation of a high-end design system.", icon: "Layout" },
          { title: "Architecture", desc: "Clean, modular code structure ready for scale.", icon: "Server" },
          { title: "Cross-Platform", desc: "Unified code delivering native excellence on iOS & Web.", icon: "Globe" }
        ]
      }
    ]
  };

  // Data for Sleep & Lifestyle Insights
  const sleepLifestyleLearnMore = {
    id: "sleep-lifestyle",
    title: "Sleep & Lifestyle Insights",
    tagline: "Decoding the Invisible Architecture of Rest",
    description: "A deep-learning powered analysis engine that correlates 50+ lifestyle markers with sleep architecture. It goes beyond simple tracking to answer 'why'—identifying hidden saboteurs like late-night screen lux levels, specific nutrient gaps, and circadian misalignment.",
    role: "Data Science Engineer",
    timeline: "2024",
    type: "Data Science & Analytics Platform",
    liveUrl: "https://sdv-project-website.vercel.app/",
    repoUrl: "https://github.com/Afthab33/sdv-project-website",
    technologies: ["Python", "Pandas", "Scikit-learn", "React", "D3.js", "Random Forest"],
    heroImage: "/projects/sleepinsights/thumbnail.png",
    gallery: [
      "/projects/sleepinsights/thumbnail.png"
    ],
    story: [
      {
        type: "intro",
        heading: "The Challenge: Quantifying the 'Why'",
        text: "Most sleep trackers tell you *what* happened: 'You slept 6 hours.' But they don't tell you *why*. I wanted to build a deterministic debugger for human rest—a system that ingests messy lifestyle data (caffeine timing, exercise intensity, lux exposure) and mathematically proves their impact on Sleep Efficiency and REM cycles."
      },
      {
        type: "feature_split",
        heading: "Multivariate Correlation Engine",
        text: "Using Pandas and Seaborn, the platform generates correlation matrices that reveal non-obvious relationships. For example, it might detect that 'High Intensity Cardio > 8 PM' correlates with a '30% reduction in Deep Sleep,' visualizing these insights as interactive heatmaps.",
        bullets: ["Behavioral Heatmaps", "Lag-Time Analysis", "Hidden Pattern Detection"],
        image: "/projects/sleepinsights/thumbnail.png",
        imageCaption: "Correlation Matrix: Habits vs. Sleep Stages",
        reverse: false
      },
      {
        type: "feature_split",
        heading: "Predictive Quality Scoring",
        text: "Beyond simple analytics, the system uses a Random Forest Regressor to predict tonight's 'Recovery Score' based on today's inputs. This moves the platform from descriptive analytics ('You slept poorly') to prescriptive guidance ('Avoid caffeine now to save your deep sleep').",
        bullets: ["Random Forest Regression", "Prescriptive Analytics", "feature Importance Ranking"],
        image: "/projects/sleepinsights/thumbnail.png",
        imageCaption: "ML Model Feature Importance",
        reverse: true
      },
      {
        type: "grid",
        heading: "Technical Architecture",
        items: [
          { title: "Analysis Core", desc: "Python (Pandas, Scikit-learn) for heavy statistical lifting.", icon: "Zap" },
          { title: "Visualization", desc: "D3.js & Recharts for interactive data storytelling.", icon: "Layout" },
          { title: "Frontend", desc: "React dashboard for accessible, responsive insights.", icon: "Globe" },
          { title: "Processing", desc: "Automated ETL pipelines for cleaning wearable JSON data.", icon: "Server" }
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
            onLearnMore={() => setActiveProject(projectHLearnMore)}
            learnMore={true}
          />

          <ProjectCard
            title="100 Miles of Summer"
            description="Premium React Native experience for summer event tracking. Features buttery-smooth 60fps animations, intuitive gesture-based UI, and a top-notch design system powered by Skia and Reanimated. The gold standard for mobile interaction."
            tags={["React Native", "Expo", "Reanimated", "Skia", "Top Notch UX"]}
            imageUrl="/projects/100MoS-Proto/thumbnail.png"
            liveUrl="https://100mosproto.vercel.app/"
            githubUrl="https://github.com/ghantapavan93/100MoS-Proto"
            highlight={true}
            onLearnMore={() => setActiveProject(hundredMilesLearnMore)}
            learnMore={true}
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
            onLearnMore={() => setActiveProject(doctorFinderLearnMore)}
            learnMore={true}
          />

          <ProjectCard
            title="AetherLabs"
            description="AetherLabs is an innovation hub building open-source, accessible tech through research, projects, and education."
            tags={["Accessibility", "Open Source", "AI/ML", "Web Development"]}
            imageUrl="/projects/aetherlabs/thumbnail.png"
            liveUrl="https://aetherlabs.vercel.app/"
            githubUrl="https://github.com/ghantapavan93/aetherlabs"
            onLearnMore={() => setActiveProject(aetherLabsLearnMore)}
            learnMore={true}
          />

          <ProjectCard
            title="Sleep & Lifestyle Insights"
            description="An interactive web dashboard that analyzes wearable and self-reported data to uncover how daily habits like caffeine, exercise, and stress impact sleep quality and energy levels."
            tags={["Data Visualization", "HealthTech", "Wearables", "D3.js"]}
            imageUrl="/projects/sleepinsights/thumbnail.png"
            liveUrl="https://sdv-project-website.vercel.app/"
            githubUrl="https://github.com/Afthab33/sdv-project-website"
            onLearnMore={() => setActiveProject(sleepLifestyleLearnMore)}
            learnMore={true}
          />

          <ProjectCard
            title="AI-Powered Phishing URL Classifier"
            description="Phishing detection system using supervised ML, analyzing 100K+ URLs with lexical and host-based features to achieve 98%+ model accuracy."
            tags={["Python", "Machine Learning", "Flask", "Cybersecurity"]}
            imageUrl="/projects/phishingwebsite/thumbnail.png"
            githubUrl="https://github.com/ghantapavan93/PhishBuster"
            onLearnMore={() => setActiveProject(phishingLearnMore)}
            learnMore={true}
          />

          <ProjectCard
            title="EagleEye AI"
            description="Safety-First, AI-Powered Video Intelligence Platform. Turns surveillance into real-time, evidence-grounded decision systems with deterministic reasoning and privacy-by-design."
            tags={["Computer Vision", "Deep Learning", "Python", "OpenCV"]}
            imageUrl="/projects/EagleEye AI/thumbnail.png"
            githubUrl="https://github.com/ghantapavan93/Eagle-Eye-AI/tree/main/Eagle-Eye-AI-main"
            liveUrl="https://fardeen210-eagle-eye-ai-streamlitapp-cebf0r.streamlit.app/"
            onLearnMore={() => setActiveProject(eagleEyeLearnMore)}
            learnMore={true}
          />

          <ProjectCard
            title="Clinical Query Assistant (RAG + LLMs)"
            description="AI-powered clinical assistant using Retrieval-Augmented Generation and LLMs to answer medical queries with high accuracy and context."
            tags={["RAG", "LLMs", "Healthcare AI", "Python"]}
            imageUrl="/projects/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMs/interface-1.png"
            githubUrl="https://github.com/ghantapavan93/CLINICAL-QUERY-ASSISTANT-USING-RAG-AND-LLMS-"
            onLearnMore={() => setActiveProject(clinicalQueryLearnMore)}
            learnMore={true}
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
            onLearnMore={() => setActiveProject(safePathLearnMore)}
            learnMore={true}
          />



          <ProjectCard
            title="Smart Tutor AI"
            description="AI-driven personalized teaching support platform, offering adaptive learning paths and intelligent tutoring for students."
            tags={["AI", "EdTech", "Personalization", "React"]}
            imageUrl="/projects/Smart-Tutor-AI-Clean/thumbnail.png"
            githubUrl="https://github.com/ghantapavan93/Smart-Tutor-AI-Clean/tree/main/Smart-Tutor-AI-AI-Driven-Personalized-Teaching-Support-main"
            onLearnMore={() => setActiveProject(smartTutorLearnMore)}
            learnMore={true}
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