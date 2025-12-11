import { Badge } from './ui/badge'
import { CalendarIcon, MapPinIcon, Briefcase, ChevronRightIcon, X } from 'lucide-react'
import { useState } from 'react'

const experiences = [
  {
    id: 'vosyn',
    title: 'Machine Learning Intern',
    company: 'Vosyn',
    location: 'Remote',
    period: 'Aug 2025 – Present',
    fullTitle: 'Machine Learning Intern — VosynCore Multimodal Localization',
    domain: 'Multimodal localization · Voice & video AI',
    headline:
      'Built Python + Machine Learning services for VosynCore, the localization engine behind VosynVerse and VosynConnect—turning scattered scripts into shared APIs and cutting ETL and inference latency.',
    metrics: [
      { label: 'API reuse', value: '+43.27%' },
      { label: 'ETL prep time', value: '−51.84%' },
      { label: 'p95 API latency', value: '823.14 → 447.29 ms' }
    ],
    productBullets: [
      'Designed and implemented Python backend services with FastAPI and Flask, exposing REST (Representational State Transfer) and GraphQL APIs for localization, dubbing, and quality checks consumed by VosynVerse tooling and VosynConnect clients.',
      'Consolidated scattered Python and shell scripts into shared microservices with clear API contracts, increasing internal API reuse by approximately 43.27% and reducing duplicate business logic across teams.',
      'Collaborated with product, media, and localization engineers to capture real requirements, define acceptance criteria, and convert them into buildable tickets and technical designs.',
      'Deployed services across AWS, Google Cloud Platform, and Microsoft Azure using Docker and Kubernetes, achieving roughly 99.28% service uptime over rolling 90-day windows for core localization workloads.'
    ],
    aiBullets: [
      'Built ETL (Extract–Transform–Load) pipelines over audio, transcripts, timing, and language metadata using Pandas, NumPy, PostgreSQL, and MongoDB—cutting manual preprocessing time per dataset by 51.84% and reducing experiment setup time from 3.42 hours to 1.69 hours.',
      'Engineered MLOps workflows in PyTorch and TensorFlow for training, fine-tuning, quantization, and serving dubbing and lip-sync models, reducing streaming inference latency by 34.63% and improving alignment and intelligibility scores from 86.42% to 92.83%.',
      'Designed Retrieval-Augmented Generation (RAG) pipelines with LangChain, LangGraph, and the OpenAI API to generate context-aware translations, subtitles, and dialogue variants, then exposed these workflows as reusable backend APIs—driving a 58.11% increase in adoption of shared AI services across internal tools.',
      'Instrumented services with logging, OpenTelemetry, Prometheus, Grafana, and CloudWatch, and wrote PyTest-based unit and integration tests for critical ETL flows and FastAPI endpoints—reducing escaped defects in staging by 27.94% and improving mean time to recovery (MTTR) by 23.68% during incidents.'
    ],
    skills: [
      'Python',
      'FastAPI',
      'Flask',
      'REST APIs',
      'GraphQL',
      'Pandas',
      'NumPy',
      'PostgreSQL',
      'MongoDB',
      'PyTorch',
      'TensorFlow',
      'LangChain',
      'LangGraph',
      'OpenAI API',
      'Docker',
      'Kubernetes',
      'AWS',
      'GCP',
      'Azure',
      'CI/CD',
      'PyTest',
      'OpenTelemetry',
      'Prometheus',
      'Grafana',
      'JWT',
      'OAuth2'
    ],
    domainChips: ['🎧 Multimodal localization', '🌐 Voice & video AI', '📡 Streaming inference'],
    learnMore: {
      intro:
        'At Vosyn, I worked on VosynCore, the multimodal localization engine that powers both consumer products (VosynVerse) and enterprise integrations (VosynConnect). My role blended Python backend engineering, Machine Learning, and MLOps to make localization pipelines faster, more reusable, and easier for other teams to consume.',
      sections: [
        {
          heading: 'Problem & context',
          points: [
            'Localization code lived in ad-hoc scripts and notebooks, making reuse and iteration slow for new markets and languages.',
            'Experiment setup required extensive manual preprocessing of audio and transcript data, delaying analysis and deployment.',
            'Latency on core APIs limited how "realtime" dubbing and lip-sync experiences could feel to users.'
          ]
        },
        {
          heading: 'Systems & architecture',
          points: [
            'Turned scripts into FastAPI and Flask-based microservices with well-documented REST and GraphQL endpoints.',
            'Standardized ETL pipelines to load audio, transcripts, and timing data into PostgreSQL and MongoDB with consistent schemas.',
            'Containerized workloads using Docker and Kubernetes, and deployed to AWS, GCP, and Azure depending on the product surface.'
          ]
        },
        {
          heading: 'Impact & outcomes',
          points: [
            'Reduced ETL setup time and dataset prep, unlocking denser experimentation and faster iteration on models.',
            'Cut API latency almost in half on critical routes used by VosynVerse and VosynConnect while keeping error rates under 0.73%.',
            'Enabled downstream teams to integrate localization capabilities through stable APIs instead of bespoke scripts.'
          ]
        }
      ]
    }
  },
  {
    id: 'krowd',
    title: 'Founding Full-Stack & AI Engineer',
    company: 'Krowd Guide',
    location: 'Dallas, TX',
    period: 'Jun 2025 – Present',
    fullTitle: 'Founding Full-Stack & AI Engineer — Crowd Safety & Event Intelligence',
    domain: 'Crowd safety · Events · Real-time platforms',
    headline:
      'Founding engineer for Krowd Guide\'s MVP, an AI- powered crowd safety and engagement platform piloted at events like AfroTech Houston—taking the product from sketches to a field - tested system used by security teams and attendees.',
    metrics: [
      { label: 'Target p95 latency', value: '&lt; 400 ms' },
      { label: 'Pilot events', value: 'AfroTech Houston + others' },
      { label: 'Platform role', value: 'Founding engineer' }
    ],
    productBullets: [
      'Led end-to-end web development across React, TypeScript, Tailwind CSS, and Node.js / Express / FastAPI—owning architecture, core user flows, real-time crowd maps, and incident dashboards that non-technical staff can operate under pressure.',
      'Turned high-level ideas from the founder, early investors, and safety partners into concrete designs, API contracts, and implementation tickets, then drove them through development, review, and release.',
      'Designed admin and operator views to surface crowd density, parking status, and incident queues in a single, glanceable interface optimized for phones and tablets used on the move.',
      'Collaborated directly with the founder and early customers to prioritize the roadmap, balancing reliability, new features, and AI experiments.'
    ],
    aiBullets: [
      'Designed and implemented Large Language Model (LLM) and Retrieval-Augmented Generation (RAG) agents using LangChain, ChromaDB / Pinecone, and OpenAI / Claude to fuse crowdsourced reports, civic data, and field notes into ranked alerts and narrative summaries.',
      'Introduced guardrails and human-in-the-loop review for AI-generated alerts, with evaluation-style monitoring so safety teams see why an alert was raised and can trust it in the field.',
      'Architected backend services and data models for live crowd metrics, alerts, and analytics, targeting sub-400 ms p95 latency under event load and using MongoDB / PostgreSQL with caching for fast queries.',
      'Deployed containerized services with Docker and GitHub Actions to cloud infrastructure, wiring in observability inspired by Prometheus, Grafana, Langfuse, and OpenTelemetry to track latency, error rates, and AI drift like a production-grade platform.'
    ],
    skills: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'FastAPI',
      'MongoDB',
      'PostgreSQL',
      'LangChain',
      'ChromaDB',
      'Pinecone',
      'OpenAI',
      'Claude',
      'Docker',
      'GitHub Actions',
      'AWS',
      'CI/CD',
      'OpenTelemetry',
      'Prometheus',
      'Grafana',
      'Langfuse',
      'Agile'
    ],
    domainChips: ['✈️ Events & crowd safety', '📊 Real-time dashboards', '🤝 Founding engineer'],
    learnMore: {
      intro:
        'Krowd Guide started as a rough sketch and a simple idea: give organizers a real-time sense of crowd safety that fits directly into how they already run events. As founding engineer, I owned the full stack—from UX, to APIs, to AI agents and observability.',
      sections: [
        {
          heading: 'Problem & context',
          points: [
            'Event organizers had fragmented tools for parking, crowd density, and incidents, with no single live source of truth.',
            'On-the-ground staff needed mobile-friendly dashboards that were simple enough to use while walking venues.',
            'There was a wealth of crowdsourced reports and civic data that was not being summarized or prioritized.'
          ]
        },
        {
          heading: 'Systems & architecture',
          points: [
            'Built a MERN-style MVP (React + TypeScript + Node.js / Express + MongoDB) with FastAPI where appropriate for Python-based AI services.',
            'Designed API contracts and data models for events, zones, incidents, alerts, and metrics, keeping future multi-tenant and multi-city requirements in mind.',
            'Integrated LangChain-based RAG agents to triage and summarize crowdsourced inputs without blocking the baseline dashboards.'
          ]
        },
        {
          heading: 'Impact & outcomes',
          points: [
            'Delivered a field-tested MVP used at events like AfroTech Houston, validating both UX and architecture under real pressure.',
            'Established a technical foundation—APIs, observability, and AI services—that the team can extend as more cities and partners come on board.',
            'Proved that crowd-safety AI can sit alongside human workflows rather than replacing them, increasing trust and adoption.'
          ]
        }
      ]
    }
  },
  {
    id: 'unt-ai-first',
    title: 'Outreach & Research Assistant',
    company: 'University of North Texas',
    location: 'Denton, TX',
    period: 'Aug 2023 – May 2025',
    fullTitle: 'Outreach & Research Assistant — AI-First Discovery Initiative, Discovery Park Library',
    domain: 'Creative AI · Education · RAG labs',
    headline:
      'Co-founded and led the AI-First Discovery Initiative, turning the library into a creative-tech studio where 450+ students and faculty built with LLMs, RAG agents, and FastAPI backends instead of only talking about AI.',
    metrics: [
      { label: 'Learners supported', value: '450+ students & faculty' },
      { label: 'Env issues reduced', value: '−31.29%' },
      { label: 'Engagement detection', value: '92.46% accuracy' }
    ],
    productBullets: [
      'Co-founded the AI-First Discovery Initiative and structured it like a small internal startup exploring LLMs, Retrieval-Augmented Generation (RAG), LangChain / LangGraph agents, and FastAPI backends through fast, iterative experiments.',
      'Taught, mentored, and tutored 450+ students and faculty across engineering, art, media, and design through hands-on workshops and 1:1 sessions on Generative AI, RAG, computer vision, and Responsible AI.',
      'Designed workshops around "ship a tiny product today" flows that decomposed Python, PyTorch / TensorFlow, and LangChain into approachable steps so non-engineers could launch their own prototypes.',
      'Collaborated with librarians, faculty, and student groups to align AI projects with real creative, storytelling, and research needs rather than abstract demos.'
    ],
    aiBullets: [
      'Built and shipped lightweight AI agents and creative tools, including an AI-assisted film-editing interface that suggested cuts and transitions from script plus scene metadata, adaptive exhibit narrators powered by RAG + LLMs, and a GPT-based "story coach" for script iteration.',
      'Set up teaching-grade MLOps and deployment environments using Docker, Unix/Linux servers, GitHub Actions, and AWS / GCP (Vertex AI) so students could deploy LLM / RAG agents and APIs themselves.',
      'Introduced reproducibility checklists, basic regression tests, and Git discipline that collectively reduced environment and setup issues by 31.29% and helped beginners go from idea to working prototype in a single workshop cycle.',
      'Designed data pipelines using Python, Pandas, SQL, sentiment analysis, and simple computer vision signals to understand engagement, achieving 92.46% accuracy in detecting attention peaks and feeding those insights back into workshop design.'
    ],
    skills: [
      'Python',
      'PyTorch',
      'TensorFlow',
      'LangChain',
      'LangGraph',
      'FastAPI',
      'Docker',
      'GitHub Actions',
      'AWS',
      'GCP',
      'Vertex AI',
      'SQL',
      'Pandas',
      'Computer Vision',
      'Generative AI',
      'RAG',
      'Teaching',
      'Responsible AI'
    ],
    domainChips: ['🎨 Creative AI lab', '📚 Education & outreach', '🤝 Cross-disciplinary teaching'],
    learnMore: {
      intro:
        'The AI-First Discovery Initiative at UNT\'s Discovery Park Library was my chance to treat a university space like an internal AI startup: listen, prototype quickly, deploy small tools, and leave behind a repeatable blueprint others can use.',
      sections: [
        {
          heading: 'Problem & context',
          points: [
            'Students and faculty were curious about AI but lacked practical, hands-on experiences mapping AI to their specific creative and research work.',
            'Existing resources focused on theory and ethics without enough "here is a tiny agent you can deploy today" examples.',
            'The library was an ideal neutral ground to host multi-disciplinary experimentation if we could lower the technical bar.'
          ]
        },
        {
          heading: 'Systems & architecture',
          points: [
            'Used FastAPI, Docker, and cloud services to package LLM and RAG workflows into simple APIs that any student project could call.',
            'Standardized workshop starter templates with reproducible environments, example notebooks, and CI/CD hooks via GitHub Actions.',
            'Created small "AI building blocks" (narrators, script coaches, summarizers) that could be combined into larger experiences.'
          ]
        },
        {
          heading: 'Impact & outcomes',
          points: [
            'Hundreds of learners left with working AI prototypes instead of just slides or notes.',
            'We captured our architecture and playbook in a publication on bridging technology, creativity, and outreach in AI labs.',
            'The initiative showed how a modest lab can host serious AI experimentation with good patterns for deployment and safety.'
          ]
        }
      ]
    }
  },
  {
    id: 'robocon',
    title: 'AI & Vision Systems Intern',
    company: 'SRM Robocon Team',
    location: 'India',
    period: 'Jan 2021 – Feb 2023',
    fullTitle: 'AI & Vision Systems Intern — SRM Robocon Robotics Team',
    domain: 'Robotics · Embedded AI · Real-time vision',
    headline:
      'Built and deployed computer vision pipelines and embedded integrations for competition robots, working under strict real-time and hardware constraints.',
    metrics: [
      { label: 'Robots supported', value: 'Multi-robot stack' },
      { label: 'Latency budget', value: 'Real-time constraints' },
      { label: 'Stack', value: 'YOLOv4 · OpenCV · STM32' }
    ],
    productBullets: [
      'Engineered YOLOv4 + OpenCV pipelines for real-time object detection and tracking on Raspberry Pi and STM32-based systems, keeping inference within tight latency budgets required for competition robots.',
      'Integrated vision outputs with low-level control logic via UART and I2C, enabling robots to react dynamically to targets and field markers instead of following fixed pre-programmed paths.',
      'Worked closely with mechanical and control teams to debug end-to-end behavior from camera capture through model inference to actuator commands under noisy real-world conditions.',
      'Documented vision behaviour, calibration routines, and performance benchmarks so future team members could reproduce results across different robot builds.'
    ],
    aiBullets: [
      'Optimized model architectures and pre-processing for embedded inference, experimenting with input resolution, quantization, and pruning to balance accuracy and frame rate on limited compute.',
      'Explored Robot Operating System (ROS) for agent-based communication and state sharing, prototyping behaviours where multiple robots coordinated tasks across the field.',
      'Used Python and C++ together to bridge high-level AI logic with low-level firmware, ensuring safe and predictable behaviour even when detections were noisy.',
      'Practiced hardware-aware AI engineering, treating latency, power, and memory as first-class constraints rather than afterthoughts.'
    ],
    skills: [
      'Python',
      'OpenCV',
      'YOLOv4',
      'TensorFlow',
      'PyTorch',
      'Raspberry Pi',
      'STM32',
      'Arduino',
      'UART',
      'I2C',
      'ROS',
      'C++',
      'Embedded AI'
    ],
    domainChips: ['🤖 Robotics', '📷 Computer vision', '⚙️ Embedded systems'],
    learnMore: {
      intro:
        'On the SRM Robocon team, AI was not a slide deck—if a model missed a marker or lagged by a few milliseconds, the robot simply failed the task. That environment forced me to treat latency, reliability, and integration as seriously as accuracy.',
      sections: [
        {
          heading: 'Problem & context',
          points: [
            'Robots needed to see field markers, goals, and obstacles in real-time with limited compute on Raspberry Pi and STM32.',
            'Vision outputs had to be tightly integrated with motor control loops and state machines for competition scoring.',
            'Models and parameters had to be reproducible across multiple robot builds and hardware revisions.'
          ]
        },
        {
          heading: 'Systems & architecture',
          points: [
            'Implemented YOLOv4-based pipelines with OpenCV, tuned for Raspberry Pi-friendly resolutions and frame rates.',
            'Bridged Python-based AI code with C++ firmware using UART and I2C communication channels.',
            'Explored ROS topics and messages for coordinating behaviour across multiple robots on the field.'
          ]
        },
        {
          heading: 'Impact & outcomes',
          points: [
            'Improved robot responsiveness and reliability in identifying field cues under competition conditions.',
            'Left behind documented vision and calibration workflows for future teams to reuse and extend.',
            'Gained intuition for how AI behaves when it must run on constrained hardware, not only cloud servers.'
          ]
        }
      ]
    }
  },
  {
    id: 'lineysha',
    title: 'AI Engineer',
    company: 'Lineysha & Thevan Technologies',
    location: 'India',
    period: 'Jan 2021 – Feb 2023',
    fullTitle: 'AI Engineer — Applied ML & Edge AI',
    domain: 'Computer vision · Edge AI · MLOps',
    headline:
      'Contributed to applied research and product development, designing and deploying data-driven Machine Learning models with focus on time-series forecasting, anomaly detection, and edge deployment.',
    metrics: [
      { label: 'Data processed', value: '50,000+ records' },
      { label: 'False positives reduced', value: '~65%' },
      { label: 'Stack', value: 'TensorFlow · AWS · Docker' }
    ],
    productBullets: [
      'Contributed as an AI Engineer to applied research and product-development initiatives, helping design, train, and deploy data-driven Machine Learning models under mentorship from senior engineers and research scientists.',
      'Containerized models and data-preprocessing modules with Docker and deployed experimental inference endpoints via AWS Lambda and Flask REST APIs, using Infrastructure-as-Code (IaC) patterns similar to Terraform to keep environments reproducible.',
      'Configured Prometheus and Grafana dashboards to monitor model and service behavior (latency, throughput, and drift), gaining early experience in MLOps observability and Responsible AI–aligned monitoring practices.',
      'Practiced strong software-engineering discipline with Object-Oriented Programming (OOP), Test-Driven Development (TDD), and GitHub Actions–based CI/CD pipelines to keep Machine Learning releases reliable, auditable, and easy to extend.'
    ],
    aiBullets: [
      'Supported end-to-end Machine Learning pipelines in Python, TensorFlow, and Scikit-learn, handling feature engineering, dataset curation, and model retraining on 50,000+ sensor and transaction data records.',
      'Implemented and tuned baseline models (logistic regression, random forests, LSTM) with systematic cross-validation, achieving consistent improvements in predictive stability and robustness across multiple iterations.',
      'Assisted time-series and anomaly-detection research by building and evaluating LSTM–ARIMA hybrid models for sensor anomaly forecasting, contributing to experiments that reduced false positives by approximately 65%.',
      'Automated ETL (Extract–Transform–Load) and retraining workflows using Apache Airflow and Pandas, introducing schema-validation checks that prevented frequent pipeline crashes and significantly improved data reliability for downstream modeling.',
      'Explored lightweight model-compression techniques such as quantization and pruning for embedded deployments on NVIDIA Jetson Nano, collaborating with hardware engineers to benchmark inference performance under edge conditions.',
      'Contributed to an internal technical report titled "Adaptive ML Pipelines for Edge Environments," summarizing compression and latency experiments so other teams could reuse the findings for future edge-AI projects.'
    ],
    skills: [
      'Python',
      'TensorFlow',
      'Scikit-learn',
      'Apache Airflow',
      'Pandas',
      'Time-Series Forecasting',
      'Anomaly Detection',
      'Docker',
      'AWS Lambda',
      'Flask',
      'Infrastructure as Code',
      'Prometheus',
      'Grafana',
      'NVIDIA Jetson Nano',
      'MLOps',
      'CI/CD',
      'GitHub Actions',
      'OOP',
      'TDD'
    ],
    domainChips: ['🔬 Applied ML research', '🤖 Edge AI', '📊 Time-series & anomaly detection'],
    learnMore: {
      intro:
        'At Lineysha & Thevan Technologies, I gained hands-on experience in applied Machine Learning research and product development, working on time-series forecasting, anomaly detection, and edge deployment under the guidance of senior engineers and research scientists.',
      sections: [
        {
          heading: 'Problem & context',
          points: [
            'Sensor and transaction data needed reliable anomaly detection to prevent system failures and false alarms.',
            'Edge devices required lightweight models that could run inference without cloud connectivity.',
            'ML pipelines faced frequent crashes due to schema inconsistencies and missing validation.'
          ]
        },
        {
          heading: 'Systems & architecture',
          points: [
            'Built LSTM–ARIMA hybrid models for time-series anomaly forecasting with systematic cross-validation.',
            'Automated ETL and retraining workflows using Apache Airflow with schema validation checks.',
            'Deployed containerized models via AWS Lambda and Flask APIs with IaC patterns for reproducibility.',
            'Explored quantization and pruning for NVIDIA Jetson Nano edge deployments.'
          ]
        },
        {
          heading: 'Impact & outcomes',
          points: [
            'Reduced false positives in anomaly detection by approximately 65% through hybrid modeling approaches.',
            'Improved data pipeline reliability significantly by introducing schema-validation checks.',
            'Contributed research findings to internal technical reports for reuse across edge-AI projects.',
            'Gained practical MLOps experience with monitoring, observability, and Responsible AI practices.'
          ]
        }
      ]
    }
  },
  {
    id: 'builder',
    title: 'AI Engineering Intern',
    company: 'Builder.ai',
    location: 'Remote',
    period: 'Jul 2020 – Jan 2021',
    fullTitle: 'AI Engineering Intern — Prompt-to-app GenAI Workflows',
    domain: 'GenAI platforms · Prompt-to-app',
    headline:
      'Worked on prompt-to-app Generative AI workflows that turned natural language specifications into app blueprints, flows, and UI suggestions.',
    metrics: [
      { label: 'Focus', value: 'Prompt-to-app flows' },
      { label: 'Stack', value: 'GPT-3 · Codex · FastAPI' },
      { label: 'Pattern', value: 'RAG-inspired orchestration' }
    ],
    productBullets: [
      'Developed prompt-to-app workflows using GPT-3 and OpenAI Codex to transform natural language requirements into structured representations, flows, and component suggestions.',
      'Collaborated with product teams to define reusable prompt templates aligned with real customer intents, not just demo prompts.',
      'Exposed the resulting orchestration flows as FastAPI-based services so other internal tools could trigger prompt-to-app generation via stable APIs.'
    ],
    aiBullets: [
      'Prototyped RAG-inspired orchestration using FastAPI, FAISS, and Docker to inject documentation and examples into model context for more grounded outputs.',
      'Designed fallback strategies, prompt chains, and validation steps to handle ambiguous or incomplete input specifications.',
      'Applied early cloud-native MLOps practices—containerizing services, versioning prompts, and monitoring key metrics—to support production-grade GenAI deployment.'
    ],
    skills: [
      'Python',
      'FastAPI',
      'OpenAI Codex',
      'GPT-3',
      'FAISS',
      'Docker',
      'Prompt Engineering',
      'REST APIs'
    ],
    domainChips: ['🧱 Prompt-to-app', '🧠 Generative AI', '🧩 Orchestration'],
    learnMore: {
      intro:
        'Builder.ai gave me early exposure to using Generative AI and LLMs not just for chat, but for transforming messy natural language into usable software artefacts.',
      sections: [
        {
          heading: 'Problem & context',
          points: [
            'Many customers could describe what they wanted, but not in a way that mapped cleanly to tickets, flows, or components.',
            'We needed a way to turn narrative requirements into semi-structured representations the platform could work with.'
          ]
        },
        {
          heading: 'Systems & architecture',
          points: [
            'Used GPT-3 and OpenAI Codex for intent extraction, flow generation, and component suggestion.',
            'Wrapped orchestration pipelines in FastAPI services with FAISS-based retrieval for relevant examples and patterns.'
          ]
        },
        {
          heading: 'Impact & outcomes',
          points: [
            'Helped lay down patterns for prompt design and orchestration that treated GenAI as a system component, not just a UI widget.',
            'Influenced how downstream tools integrated with AI by pushing for clear API contracts and observability.'
          ]
        }
      ]
    }
  },
  {
    id: 'alweb',
    title: 'AI Intern',
    company: 'Alweb.ai',
    location: 'Remote',
    period: 'Jul 2019 – Jul 2020',
    fullTitle: 'AI Intern — Prompt-driven UI generation & SEO-aware layouts',
    domain: 'Web AI · Design & SEO',
    headline:
      'Worked on prompt-driven UI generation workflows that used GPT-3 to propose layouts, copy, and SEO structure for web pages.',
    metrics: [
      { label: 'Focus', value: 'UI generation' },
      { label: 'Stack', value: 'GPT-3 · Flask · Firebase' },
      { label: 'Angle', value: 'Semantic parsing & SEO' }
    ],
    productBullets: [
      'Built prompt-driven UI generation workflows using GPT-3 to propose layout structures, component groupings, and textual copy for marketing and informational pages.',
      'Designed Flask-based inference APIs with real-time collaborative editing so designers and marketers could iterate on AI-suggested layouts directly in the browser.',
      'Worked with front-end and content teams to align generated structures with design systems and brand guidelines.'
    ],
    aiBullets: [
      'Applied semantic parsing and Natural Language Processing (NLP) to map user intents and keywords into page sections optimized for SEO.',
      'Contributed to prompt tuning, coherence checks, and basic quality gates to keep generated designs within realistic and usable boundaries.',
      'Integrated Firebase for authentication and data storage, enabling multi-user editing and persistence of AI-generated proposals.'
    ],
    skills: [
      'Python',
      'GPT-3',
      'Flask',
      'Firebase',
      'HTML/CSS',
      'NLP',
      'REST APIs',
      'SEO'
    ],
    domainChips: ['🖼️ UI generation', '🔍 SEO-aware layouts', '🌐 Web AI'],
    learnMore: {
      intro:
        'Alweb.ai was my earliest experience using LLMs to influence user interfaces directly, long before "AI UI builders" became common.',
      sections: [
        {
          heading: 'Problem & context',
          points: [
            'Marketing teams needed faster ways to go from concept to page structure without waiting on full design cycles.',
            'We wanted AI to suggest not only copy, but also structure that respected SEO and layout constraints.'
          ]
        },
        {
          heading: 'Systems & architecture',
          points: [
            'Used GPT-3 to generate candidate layouts and content, wrapped in Flask APIs for easy integration with front-end tools.',
            'Introduced simple semantic checks and constraints to keep AI outputs usable, not just imaginative.'
          ]
        },
        {
          heading: 'Impact & outcomes',
          points: [
            'Showed that LLMs could speed up ideation for both design and content when paired with clear constraints.',
            'Learned early lessons about when to trust AI outputs and when to require human review.'
          ]
        }
      ]
    }
  }
]

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [openModalId, setOpenModalId] = useState(null)

  const activeExperience = experiences[activeTab]

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-primary font-medium uppercase tracking-wider mb-2">
            Experience
          </p>
          <h2 className="text-3xl font-semibold mb-3">
            Professional Journey
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            From multimodal localization and crowd-safety platforms to creative AI labs and robotics,
            every role here ended with a shipped system: APIs, agents, dashboards, or deployed models.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {experiences.map((exp, index) => {
            const isActive = index === activeTab
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-xs sm:text-sm transition-all border ${isActive
                  ? 'bg-primary/10 text-primary font-medium border-primary/30 shadow-sm shadow-primary/30'
                  : 'bg-secondary/40 text-muted-foreground border-border/40 hover:bg-secondary hover:text-foreground'
                  }`}
              >
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{exp.title}</span>
                </span>
                <span className="text-[11px] text-muted-foreground sm:text-xs sm:ml-1">
                  {exp.company}
                </span>
              </button>
            )
          })}
        </div>

        {/* Experience card */}
        <div className="max-w-5xl mx-auto overflow-hidden rounded-xl border border-primary/10 bg-card/80 backdrop-blur-sm shadow-md shadow-black/10 transition-all animate-fade-up">
          <div className="p-6 md:p-7">
            {/* Header: company, role, meta, headline */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5 pb-4 border-b border-border/40">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">
                  {activeExperience.company}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {activeExperience.fullTitle}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-primary/80">
                  {activeExperience.domain}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                    {activeExperience.period}
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="mr-1.5 h-3.5 w-3.5" />
                    {activeExperience.location}
                  </div>
                </div>

                <p className="text-sm mt-3 text-foreground max-w-xl">
                  {activeExperience.headline}
                </p>
              </div>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-2 justify-start md:justify-end max-w-xs">
                {activeExperience.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-primary/8 text-primary border border-primary/25 px-2 py-0.5 rounded-md font-medium text-[11px]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Metrics strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {activeExperience.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-3 rounded-lg bg-secondary/40 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className="text-[11px] font-semibold tracking-wide uppercase text-muted-foreground mb-1">
                    {metric.label}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Bullets: two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Product & Systems */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                    Product & Systems
                  </span>
                </div>
                <div className="space-y-2">
                  {activeExperience.productBullets.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 bg-secondary/30 rounded-lg p-3 border border-border/30 hover:border-primary/25 hover:bg-primary/5 transition-all"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary/70 mt-2" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI / Data / Infrastructure */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                    AI / Data / Infrastructure
                  </span>
                </div>
                <div className="space-y-2">
                  {activeExperience.aiBullets.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 bg-secondary/30 rounded-lg p-3 border border-border/30 hover:border-primary/25 hover:bg-primary/5 transition-all"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary/70 mt-2" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer: domains + Learn more */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {activeExperience.domainChips.map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 dark:bg-black/20 border border-white/15 text-muted-foreground"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setOpenModalId(activeExperience.id)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 hover:gap-2 transition-all"
              >
                <span>Learn more about this role</span>
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learn more modal */}
      {openModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm">
          <div className="relative bg-card max-w-3xl w-full mx-4 rounded-xl border border-border/50 shadow-2xl max-h-[80vh] overflow-hidden">
            {(() => {
              const exp = experiences.find((e) => e.id === openModalId)
              return (
                <>
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                        Deep dive
                      </p>
                      <h3 className="text-lg font-semibold">
                        {exp.fullTitle}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {exp.company} · {exp.period} · {exp.location}
                      </p>
                    </div>
                    <button
                      onClick={() => setOpenModalId(null)}
                      className="p-1.5 rounded-full hover:bg-secondary/60 transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="px-5 py-4 space-y-3 overflow-y-auto max-h-[60vh]">
                    <p className="text-sm text-foreground">
                      {exp.learnMore.intro}
                    </p>
                    {exp.learnMore.sections.map((section) => (
                      <div key={section.heading} className="mt-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                          {section.heading}
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                          {section.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </section>
  )
}