export const experiences = [
    {
        id: "100mos",
        company: "100 Miles of Summer",
        role: "App Developer — Full Stack AI Engineer",
        domainTags: ["Full-Stack", "AI/ML", "Real-time"],
        dateRange: "Jan 2026 – Present",
        location: "Remote (TX) — Chicago, IL (HQ)",
        teamContext: "Startup. Working directly with founders and stakeholders to ship production iOS, Android, and web experiences for a fitness movement platform.",
        hookLine: "Shipping production mobile apps, a reliability-first wearable sync pipeline, and an LLM-powered QUANTUM Health Coach for a fitness movement platform.",
        proofMetrics: [
            { label: "Sync Success", value: "~99%", hint: "Wearable data reconciliation across Apple Health, Fitbit, Garmin." },
            { label: "Schema Valid.", value: "~99%", hint: "LLM structured output validation pass rate in QUANTUM Health Coach." },
            { label: "Link Success", value: "~91%", hint: "Onboarding account-linking flow completion rate." }
        ],
        snapshotProof: [
            "~99% Sync Success Rate",
            "~0.5% Reconciliation Mismatches",
            "~18% Duplicate Events Handled Safely",
            "~91% Account-Link Success",
            "~22% Setup Drop-off Reduction",
            "~7 Min First Successful Sync",
            "~99% Schema Validation Pass Rate",
            "~97% Groundedness Score"
        ],
        heroMotif: {
            emoji: "🏃",
            title: "Movement Platform",
            subtitle: "Full-Stack AI + Mobile"
        },
        theme: {
            accent: "#FF6B2B",
            motif: "pulse",
            backgroundFx: "canvas",
            iconSet: "duotone"
        },
        topStack: ["React Native", "Python", "FastAPI", "Docker", "LangChain", "PostgreSQL"],
        groupedTechStack: {
            "📱 Mobile & Frontend": ["React Native", "React", "TypeScript", "Expo"],
            "⚙️ Backend & API": ["Python", "FastAPI", "Node.js", "REST APIs", "Webhooks"],
            "🧠 AI & LLM": ["LangChain", "GPT-4", "RAG", "Structured Outputs", "Pydantic"],
            "🔄 Data Pipeline": ["Idempotency Keys", "Deduplication Engine", "Reconciliation", "PostgreSQL"],
            "☁️ DevOps & Infra": ["Docker", "CI/CD", "GitHub Actions", "Vercel"]
        },
        chapters: [
            { id: "overview", title: "Overview" },
            { id: "pipeline", title: "Data Pipeline" },
            { id: "quantumCoach", title: "QUANTUM Health Coach" },
            { id: "mobileOnboarding", title: "Mobile & Onboarding" },
            { id: "opsConsole", title: "Ops Console" },
            { id: "evalHarness", title: "Evaluation Harness" },
            { id: "visuals", title: "Visuals" }
        ],
        narrativeSections: {
            overview: {
                title: "Mission: No Lost Miles",
                paragraphs: [
                    "100 Miles of Summer is a fitness movement platform where participants commit to walking, jogging, running, or rolling 100 miles over the summer. It's inclusive by design — all paces, all faces. The platform has a React Native mobile app for iOS and Android, a web prototype (Mirror+), and a Python backend powering data sync, AI coaching, and internal operations.",
                    "As the App Developer and Full Stack AI Engineer, I own the entire technical stack: from shipping production mobile releases through CI/CD, to building the reliability-first wearable sync pipeline, to architecting the LLM-powered QUANTUM Health Coach with strict validation gates and deterministic fallback behavior."
                ],
                ownership: [
                    "Production iOS & Android releases (React Native + Expo)",
                    "Python backend services containerized with Docker",
                    "Wearable data ingestion & reconciliation pipeline",
                    "QUANTUM Health Coach AI layer (LLM + RAG)",
                    "Internal operations console for sync monitoring",
                    "Direct collaboration with founders on product direction"
                ]
            },
            pipeline: {
                title: "Reliability-First Data Pipeline",
                problem: "Wearable providers (Apple Health, Fitbit, Garmin) emit noisy, unpredictable webhook events — ~18% of events are duplicates or replays. Without careful handling, these would cause double-counted miles, corrupted totals, and user trust erosion. The core promise is 'No Lost Miles', meaning every legitimate activity must be captured and zero duplicates can slip through.",
                built: [
                    "Designed and built the entire ingestion and reconciliation pipeline from scratch, using idempotency keys to guarantee exactly-once processing regardless of how many times a provider replays an event",
                    "Implemented a deduplication engine that safely handles ~18% duplicate or replayed events without double-counting, drift, or corrupted totals",
                    "Built source-of-truth aggregation that reconciles data from multiple wearable providers into a single, authoritative activity record per user"
                ],
                how: [
                    "Used idempotency keys as the first gate — every incoming webhook is fingerprinted and checked against a processed-events index before any state mutation",
                    "Implemented ordering safeguards to handle out-of-sequence events from providers that don't guarantee delivery order",
                    "Built replay-safe processing that detects and discards provider retry storms without affecting legitimate data",
                    "Designed a reconciliation module that compares ingested data against provider source-of-truth, maintaining ~0.5% mismatch rate"
                ],
                bullets: [
                    {
                        id: "pipe-01",
                        label: "~99% Sync Success Rate",
                        receipts: {
                            metric: "~99%",
                            layerTags: ["Pipeline", "Data"],
                            proofs: ["Sustained ~99% sync success across real provider event conditions by building idempotency-keyed ingestion with deduplication, replay-safe processing, ordering safeguards, and source-of-truth aggregation", "Safely handled ~18% duplicate or replayed events without double-counting, drift, or corrupted totals — maintaining ~0.5% reconciliation mismatches"],
                            tech: ["Python", "FastAPI", "PostgreSQL", "Webhooks"],
                            src: "/100mos/thumbnail.png"
                        }
                    }
                ]
            },
            quantumCoach: {
                title: "QUANTUM Health Coach — Aether Technology Layer",
                problem: "Users need personalized health coaching that is contextually aware, biometrically informed, and safe for production. LLMs are inherently unpredictable — they can hallucinate, produce malformed outputs, or give unsafe health advice. We needed structured, validated, and deterministic AI responses that never break the app or mislead users.",
                built: [
                    "Architected and built the Aether Technology Layer powering QUANTUM Health Coach — the AI backbone that delivers LLM + RAG features with schema-valid structured outputs",
                    "Implemented strict validation gates using Pydantic schemas to ensure every AI response conforms to the expected structure before reaching the user",
                    "Designed deterministic fallback behavior so the system degrades gracefully when the LLM produces invalid or uncertain outputs, keeping responses stable and safe in production"
                ],
                how: [
                    "Used LangChain for LLM orchestration with structured output parsing that enforces Pydantic models at the response boundary",
                    "Built RAG retrieval pipelines that ground coaching advice in verified health content rather than allowing pure generation",
                    "Implemented a multi-layer validation stack: schema validation → content safety checks → groundedness verification → fallback routing",
                    "Designed the system so that invalid outputs trigger a deterministic fallback response rather than surfacing raw LLM errors to users"
                ],
                bullets: [
                    {
                        id: "quantum-01",
                        label: "~99% Schema Validation + ~97% Groundedness",
                        receipts: {
                            metric: "~99% Valid",
                            layerTags: ["AI", "LLM"],
                            proofs: ["Maintained ~99% schema validation pass rate by enforcing Pydantic structured outputs with strict type validation at every LLM response boundary", "Achieved ~97% groundedness on internal test sets by grounding all coaching responses in verified health content through RAG retrieval rather than pure generation"],
                            tech: ["LangChain", "GPT-4", "Pydantic", "RAG"],
                            src: "/100mos/thumbnail.png"
                        }
                    }
                ]
            },
            mobileOnboarding: {
                title: "Mobile Apps & Onboarding Flows",
                problem: "User onboarding for a wearable-connected fitness app is notoriously fragile. Account linking with providers like Apple Health, Fitbit, and Garmin involves OAuth flows, permission grants, and initial sync — any failure point causes users to drop off before they've logged a single mile. We needed to make the path from download to first sync as frictionless as possible.",
                built: [
                    "Shipped production iOS and Android releases through React Native + Expo, containerized backend services with Docker, and deployed through CI/CD for repeatable, low-risk releases",
                    "Owned the entire onboarding and account-linking flow — from wearable provider selection through OAuth to first successful sync",
                    "Built an internal operations console that surfaces sync runs, reconciliation outcomes, and error states for the ops team"
                ],
                how: [
                    "Designed progressive disclosure onboarding — users choose their provider, grant permissions, and see their first synced mile within ~7 minutes",
                    "Implemented retry logic and clear error states for OAuth failures so users can self-recover without contacting support",
                    "Used analytics and funnel tracking to identify and eliminate drop-off points, achieving ~22% reduction in setup abandonment",
                    "Shipped with CI/CD pipelines for both mobile and backend, enabling rapid iteration without deployment risk"
                ],
                bullets: [
                    {
                        id: "mobile-01",
                        label: "~91% Link Success, ~22% Drop-off Reduction",
                        receipts: {
                            metric: "~91% Link",
                            layerTags: ["Mobile", "UX"],
                            proofs: ["Improved wearable account-linking success to ~91% and reduced onboarding setup drop-off by ~22% through progressive disclosure design, retry logic, and clear error recovery flows", "Achieved first successful sync in ~7 minutes for typical users by optimizing the OAuth → permission → initial sync path end-to-end"],
                            tech: ["React Native", "Expo", "Docker", "CI/CD"],
                            src: "/100mos/thumbnail.png"
                        }
                    }
                ]
            },
            opsConsole: {
                title: "Internal Operations Console",
                problem: "During peak summer season, the ops team needs real-time visibility into sync health, reconciliation outcomes, and error patterns across thousands of users and multiple wearable providers. Without a dedicated console, debugging sync issues meant SSH-ing into servers and grepping logs.",
                built: [
                    "Built a dedicated internal operations console that surfaces sync run history, reconciliation outcomes (success/mismatch/retry), and error state breakdowns",
                    "Designed provider-level health monitoring showing per-provider sync success rates, latency, and error patterns",
                    "Implemented quiet list monitoring for flagged users whose data needs manual review"
                ],
                how: [
                    "Used React for the console frontend with real-time polling for sync status updates",
                    "Built API endpoints that aggregate sync metrics across all providers and surface reconciliation details",
                    "Designed the console for 'calm summer ops' — the team should be able to monitor the entire platform with minimal stress during peak season"
                ],
                bullets: [
                    {
                        id: "ops-01",
                        label: "Calm Summer Ops Console",
                        receipts: {
                            metric: "Full Visibility",
                            layerTags: ["Ops", "Internal"],
                            proofs: ["Built an internal ops console that gives the team full visibility into sync runs, reconciliation outcomes, and error states — replacing manual log-grepping with a real-time dashboard", "Designed for 'calm summer ops' so the team can monitor thousands of users across multiple wearable providers with minimal stress during peak season"],
                            tech: ["React", "FastAPI", "PostgreSQL"],
                            src: "/100mos/thumbnail.png"
                        }
                    }
                ]
            },
            evalHarness: {
                title: "LLM Evaluation Harness",
                problem: "LLM-powered features in a health app are high-stakes — a regression in output quality, a spike in invalid responses, or an increase in latency can directly harm user trust. We needed a rigorous evaluation framework that catches problems before they reach production, across every dimension: accuracy, safety, structure, and cost.",
                built: [
                    "Designed and built an evaluation harness with golden test sets and automated regression checks",
                    "Tracked precision, recall, invalid-output rate, latency, and cost across prompt changes, retrieval changes, and model changes",
                    "Implemented automated CI gates that block deployment if key metrics regress beyond defined thresholds"
                ],
                how: [
                    "Created golden test sets from real user interactions and edge cases, covering diverse health contexts",
                    "Built regression checks that run automatically on every PR that touches the AI layer",
                    "Tracked schema validation pass rate (~99%), groundedness (~97%), and cost-per-query to ensure changes don't sacrifice quality for speed",
                    "Used the harness to confidently iterate on prompts and retrieval strategies without fear of silent regressions"
                ],
                bullets: [
                    {
                        id: "eval-01",
                        label: "Golden Test Sets + Regression Gates",
                        receipts: {
                            metric: "CI-Gated",
                            layerTags: ["ML", "Eval"],
                            proofs: ["Built an evaluation harness that tracks precision, recall, invalid-output rate, latency, and cost across every prompt, retrieval, and model change — maintaining ~99% schema validation pass rate and ~97% groundedness", "Implemented automated regression checks with golden test sets that run on every PR touching the AI layer, catching quality degradations before they reach production"],
                            tech: ["Python", "Pydantic", "CI/CD", "Golden Sets"],
                            src: "/100mos/thumbnail.png"
                        }
                    }
                ]
            },
            visuals: {
                images: [
                    {
                        src: "/100mos/hero.webp",
                        alt: "100 Miles of Summer — Mirror+ Landing",
                        caption: "The Mirror+ prototype landing page — 'THE MOMENT THAT GETS YOU MOVING.' We solved the challenge of making a fitness platform feel instantly inclusive and premium. The hero section communicates the core promise: all paces, all faces, no lost miles. Built with React and deployed on Vercel, it's the consumer-facing entry point to the entire ecosystem."
                    }
                ]
            }
        },
        keyDecisions: [
            { decision: "Idempotency-First Pipeline", why: "Wearable providers replay events unpredictably. Idempotency keys guarantee exactly-once processing regardless of provider behavior.", tradeoff: "Additional storage and lookup cost per event, justified by zero-tolerance for double-counted miles." },
            { decision: "Strict LLM Output Validation", why: "Health coaching is high-stakes. Every LLM response must conform to a Pydantic schema before reaching users.", tradeoff: "Occasional fallback responses when the LLM produces novel but malformed outputs. Safety > flexibility." },
            { decision: "Deterministic Fallbacks over Silent Failures", why: "When the AI layer fails or produces uncertain outputs, users get a safe, pre-validated response rather than an error or nothing.", tradeoff: "Fallback responses are less personalized, but the app never breaks and users never see raw errors." }
        ],
        bulletPoints: [
            {
                icon: "Smartphone",
                headline: "Production Mobile Releases",
                content: "Shipped production iOS and Android releases via React Native + Expo, with Python backend services containerized in Docker and deployed through CI/CD for repeatable, low-risk releases across both platforms.",
                metric: "iOS + Android"
            },
            {
                icon: "Database",
                headline: "Reliability-First Data Pipeline",
                content: "Built an ingestion and reconciliation pipeline using idempotency keys, deduplication, replay-safe processing, and source-of-truth aggregation — sustaining ~99% sync success with ~0.5% reconciliation mismatches under real provider conditions.",
                metric: "~99% Sync"
            },
            {
                icon: "Brain",
                headline: "QUANTUM Health Coach AI",
                content: "Architected the Aether Technology Layer delivering LLM + RAG features with Pydantic-validated structured outputs, strict validation gates, and deterministic fallback behavior — maintaining ~99% schema validation and ~97% groundedness.",
                metric: "~99% Schema"
            },
            {
                icon: "UserCheck",
                headline: "Onboarding & Account Linking",
                content: "Owned the full onboarding and wearable account-linking flow, improving link success to ~91%, reducing setup drop-off by ~22%, and achieving first successful sync in ~7 minutes for typical users.",
                metric: "~91% Link"
            },
            {
                icon: "BarChart3",
                headline: "Evaluation Harness & Ops Console",
                content: "Built an LLM evaluation harness with golden test sets and regression checks, plus an internal ops console for sync monitoring — enabling confident iteration and calm summer operations at scale.",
                metric: "CI-Gated"
            }
        ],
        links: {
            live: "https://100mosproto.vercel.app",
            caseStudy: "/experience/100mos"
        }
    },
    {
        id: "vosyn",
        company: "Vosyn",
        role: "Machine Learning Intern — VosynCore Multimodal Localization",
        domainTags: ["AI/ML", "Infra/MLOps", "Backend"],
        dateRange: "Aug 2025 – Present",
        location: "Remote",
        teamContext: "Team: Voice cloning and text to speech, multimodal localization platform (voice, text, video), production inference and quality gates.",
        hookLine: "Built shared AI services for VosynCore, cutting ETL setup time by 51% and API latency by 45%.",
        proofMetrics: [
            { label: "Concurrent Req", value: "1,200+", hint: "Sustained p95 latency of 274ms at peak load." },
            { label: "Eval Dataset", value: "5.2M QA", hint: "Multilingual golden sets for factual regression." },
            { label: "Tail Latency", value: "−32%", hint: "Reduced p99 spikes via TensorRT/CUDA optimization." }
        ],
        heroMotif: {
            emoji: "🎧",
            title: "Multimodal localization",
            subtitle: "Voice & video AI"
        },
        theme: {
            accent: "#4285F4",
            motif: "waveform",
            backgroundFx: "svg",
            iconSet: "duotone"
        },
        topStack: ["Python", "PyTorch", "FastAPI", "Docker", "Kubernetes", "AWS EKS", "Terraform"],
        stackAtlas: {
            Backend: ["FastAPI", "gRPC"],
            "ML & Inference": ["PyTorch", "TensorRT", "ONNX Runtime"],
            Data: ["GCS", "Postgres", "Vector Store"],
            Infra: ["Docker", "Kubernetes", "Terraform", "AWS EKS"],
            Observability: ["Prometheus", "OpenTelemetry"]
        },
        contributionModules: [
            {
                id: "inference-pipeline",
                headline: "Inference pipeline at scale",
                icon: "Zap",
                metricTag: "p95 < 300ms",
                receipt: {
                    title: "GPU Inference Architecture",
                    explanation: "Built GPU inference pipeline served via FastAPI and gRPC, sustained high concurrency with lower tail latency.",
                    proofLabel: "p95 Latency",
                    proofValue: "274ms",
                    tech: ["FastAPI", "gRPC", "PyTorch", "TensorRT"]
                }
            },
            {
                id: "model-shipping",
                headline: "Model shipping pipeline",
                icon: "Ship",
                metricTag: "CI/CD",
                receipt: {
                    title: "Automated Model Release",
                    explanation: "Automated training and versioning pipeline for voice cloning models with reproducible deployments.",
                    proofLabel: "Deploy Time",
                    proofValue: "-51%",
                    tech: ["Docker", "Kubernetes", "Terraform"]
                }
            },
            {
                id: "eval-gates",
                headline: "Multilingual evaluation gates",
                icon: "ShieldCheck",
                metricTag: "+18% Acc",
                receipt: {
                    title: "Regression Suite Engine",
                    explanation: "Built regression and scoring suite over large QA sets, improved accuracy and reduced misclassification.",
                    proofLabel: "QA Set Size",
                    proofValue: "5.2M",
                    tech: ["Python", "PyTorch", "GCS"]
                }
            },
            {
                id: "rag-reliability",
                headline: "LLM and RAG reliability",
                icon: "Brain",
                metricTag: "2% Hal.",
                receipt: {
                    title: "High-Fidelity RAG",
                    explanation: "Added retrieval tuned RAG flows with measurable gates for relevance and faithfulness.",
                    proofLabel: "Hallucination Rate",
                    proofValue: "2%",
                    tech: ["Vector Store", "Python", "ONNX Runtime"]
                }
            },
            {
                id: "agent-safety",
                headline: "Agent orchestration safety",
                icon: "UserCheck",
                metricTag: "Fallback",
                receipt: {
                    title: "Safe AI Orchestration",
                    explanation: "Implemented retry and fallback logic with confidence thresholds, reduced hallucinations and escalations.",
                    proofLabel: "Escalation Rate",
                    proofValue: "-42%",
                    tech: ["FastAPI", "Python"]
                }
            },
            {
                id: "prod-ops",
                headline: "Production ops and observability",
                icon: "Activity",
                metricTag: "O11y",
                receipt: {
                    title: "Deep-Stack Observability",
                    explanation: "Instrumented with OpenTelemetry and Prometheus, added drift monitoring and cut recovery time.",
                    proofLabel: "Drift Detection",
                    proofValue: "3%",
                    tech: ["Prometheus", "OpenTelemetry", "Grafana"]
                }
            }
        ],
        bulletPoints: [
            {
                headline: "Multimodal Localization Contributor",
                content: "Contributed to a production multimodal localization platform (voice, text, video), optimizing real-time inference while maintaining quality gates for customer-facing reliability.",
                icon: "Layers"
            },
            {
                headline: "High-Concurrency Inference Pipelines",
                content: "Built and optimized Python inference pipelines with PyTorch/TensorFlow + CUDA/TensorRT, exported to ONNX Runtime, and served via FastAPI/gRPC; sustained ~1,200 concurrent requests at 274 ms p95 and reduced tail latency by 32%.",
                icon: "Zap",
                metric: "274ms p95"
            },
            {
                headline: "Multilingual Evaluation & Regression",
                content: "Designed multilingual evaluation and regression suites over 5.2M QA pairs using golden sets and automated scoring; improved factual accuracy by 18% and reduced misclassification by 22%.",
                icon: "ShieldCheck",
                metric: "5.2M QA"
            },
            {
                headline: "LLM + RAG Retrieval Tuning",
                content: "Integrated LLM + RAG workflows using embeddings and vector search (FAISS, Pinecone, ChromaDB, pgvector), improving relevance and faithfulness through retrieval tuning and measurable release gates.",
                icon: "Brain",
                metric: "RAG Guard"
            },
            {
                headline: "Agentic Orchestration & Safety",
                content: "Implemented agent-style orchestration with LangChain/LangGraph (retry/fallback logic, circuit breakers, retrieval-confidence thresholds), reducing hallucinations from 8% to 2% and lowering escalations per 10K requests by 42%.",
                icon: "UserCheck",
                metric: "2% Hallucination"
            },
            {
                headline: "Production MLOps (AWS EKS)",
                content: "Supported production ML ops on AWS EKS using Docker/Kubernetes/Terraform with GitHub Actions + ArgoCD; added Prometheus/OpenTelemetry observability and drift monitoring (~3% monthly) to catch issues before customer impact.",
                icon: "Cloud",
                metric: "3% Drift Detection"
            },
            {
                headline: "Technical Ablations & Design",
                content: "Partnered with senior ML engineers on ablations and failure analysis; authored 10+ experiment reports used in design decisions and sprint planning.",
                icon: "BarChart3",
                metric: "10+ Reports"
            }
        ],
        snapshotProof: [
            "1,200+ concurrent requests",
            "274ms p95 latency",
            "32% p99 tail reduction",
            "5.2M QA regression set",
            "Hallucinations: 8% → 2%",
            "Escalations: -42% per 10k"
        ],
        groupedTechStack: {
            "🧠 ML & Accel": ["PyTorch", "TensorFlow", "CUDA", "TensorRT", "ONNX Runtime"],
            "🛰️ Serving": ["FastAPI", "gRPC", "NGINX"],
            "📊 Data & Retrieval": ["FAISS", "Pinecone", "ChromaDB", "pgvector", "PostgreSQL"],
            "⚙️ Infra & Ops": ["Docker", "Kubernetes", "AWS EKS", "Terraform", "GitHub Actions", "ArgoCD"],
            "🔭 Observability": ["Prometheus", "OpenTelemetry"],
            "🔐 Security & Access": ["IAM", "Service Roles", "Secrets Manager"]
        },
        chapters: [
            { id: "overview", title: "Overview" },
            { id: "inference", title: "Inference Pipelines" },
            { id: "evals", title: "Evaluation & Evals" },
            { id: "rag", title: "Agentic RAG" },
            { id: "safety", title: "Agent Safety" },
            { id: "ops", title: "ML Infrastructure" },
            { id: "ablations", title: "Technical Ablations" },
            { id: "visuals", title: "Visuals" }
        ],
        narrativeSections: {
            overview: {
                title: "System Overview",
                paragraphs: [
                    "At Vosyn, I contributed to VosynCore, a production-grade multimodal localization platform that supports voice, text, and video. I worked inside the voice and localization workflows where latency, stability, and quality gates directly impact customer trust.",
                    "My focus was real-time inference performance and release safety. I shipped improvements that made the platform faster under load, more measurable across languages, and safer against failure modes through evaluation gates, retrieval grounding, and observable operations."
                ],
                ownership: [
                    "Inference pipelines that stayed fast under concurrency",
                    "Evaluation and regression gates that prevented silent quality drops",
                    "Retrieval grounding and agent orchestration safety logic",
                    "EKS-based operations and monitoring to keep releases stable"
                ]
            },
            inference: {
                title: "High Concurrency Inference Pipelines",
                problem: "We needed real-time localization and voice workflows to hold performance under bursty traffic. The failure mode was not average latency; it was tail latency and queue collapse under concurrency.",
                built: [
                    "Built a Python inference service that ran accelerated model execution and stayed stable under load",
                    "Introduced batching and quantization strategies to reduce tail latency without breaking quality",
                    "Implemented gRPC paths for high-throughput internal calls while keeping FastAPI for external control and routing"
                ],
                how: [
                    "Exported models to ONNX Runtime for faster and more consistent execution paths",
                    "Tuned GPU execution using CUDA and TensorRT acceleration where it mattered most",
                    "Added warmup, request shaping, and concurrency controls to prevent cold spikes",
                    "Used guardrails so batching did not inflate latency for small requests",
                    "Added timeouts, backpressure handling, and safe retries to avoid cascading failures"
                ],
                bullets: [
                    {
                        id: "concurrency",
                        label: "1,200+ concurrent requests @ 274ms p95",
                        receipts: {
                            metric: "274ms p95",
                            layerTags: ["ML", "Infra"],
                            proofs: ["274ms p95 sustained under 1,200+ concurrent requests", "32% reduction in p99 tail latency"],
                            tech: ["PyTorch", "CUDA", "TensorRT", "ONNX Runtime", "FastAPI", "gRPC"],
                            src: "/experience/vosyn-latency.png"
                        }
                    }
                ]
            },
            evals: {
                title: "Multilingual Evaluation and Regression Gates",
                problem: "Multimodal localization breaks quietly. A release can look fine in one language and fail in another. Without a system-level regression harness, quality drops show up as customer escalations.",
                built: [
                    "Designed multilingual eval suites that ran continuously and caught regressions before release",
                    "Built regression gates using golden sets and automated scoring so promotion was measurable",
                    "Created error analysis loops that turned failures into structured fix lists"
                ],
                how: [
                    "Curated a regression set at scale across 20+ languages with balanced coverage",
                    "Established pass-fail thresholds per language group and per task type",
                    "Added scoring pipelines that tracked factual correctness and failure clustering",
                    "Used LLM-based judging patterns anchored with golden references",
                    "Set up repeatable evaluation across model versions and environments"
                ],
                bullets: [
                    {
                        id: "qa52m",
                        label: "5.2M QA set with Fact-Check Regression",
                        receipts: {
                            metric: "5.2M QA",
                            layerTags: ["ML", "Data"],
                            proofs: ["5.2M QA regression coverage", "18% improvement in factual accuracy", "22% reduction in misclassification"],
                            tech: ["Python", "PostgreSQL", "LLM-as-a-Judge"],
                            src: "/experience/vosyn-eval.png"
                        }
                    }
                ]
            },
            rag: {
                title: "LLM + RAG Retrieval Tuning",
                problem: "When localization tasks require context, plain generation becomes risky. The failure mode is confident wrong output. The fix is grounding with retrieval plus measurable gates.",
                built: [
                    "Integrated retrieval pipelines using embeddings and vector search",
                    "Tuned retrieval, chunking, and scoring so answers were grounded and consistent",
                    "Introduced release gates so retrieval changes were measured and reversible"
                ],
                how: [
                    "Built and compared indexes across FAISS, Pinecone, ChromaDB, and pgvector",
                    "Tuned chunk sizes and overlap to reduce irrelevant retrieval",
                    "Added confidence scoring so weak retrieval triggered a safer fallback path",
                    "Evaluated groundedness using test sets and audit samples"
                ],
                bullets: [
                    {
                        id: "retrieval",
                        label: "Gated Retrieval (FAISS/Pinecone/pgvector)",
                        receipts: {
                            metric: "Grounding Gate",
                            layerTags: ["ML", "Data"],
                            proofs: ["Reduction in hallucinations via enforced confidence", "Measurable release gates for retrieval updates"],
                            tech: ["FAISS", "Pinecone", "ChromaDB", "pgvector"],
                            src: "/experience/vosyn-arch.png"
                        }
                    }
                ]
            },
            safety: {
                title: "Agent Orchestration and Safety Gates",
                problem: "Multi-step localization tasks fail in long chains. A single weak step corrupts downstream steps. We needed orchestration that could recover, not just run.",
                built: [
                    "Implemented planner-executor flow using LangChain and LangGraph",
                    "Added circuit breaker logic, fallbacks, and confidence thresholds",
                    "Introduced escalation controls so risky outputs did not hit customers"
                ],
                how: [
                    "Modeled each task as steps with explicit success checks",
                    "Added retry rules only when evidence supported them",
                    "Used retrieval confidence thresholds to decide when to proceed",
                    "Logged decisions so failures were explainable and debuggable"
                ],
                bullets: [
                    {
                        id: "safety",
                        label: " LangGraph Safety (Circuit Breakers/Fallbacks)",
                        receipts: {
                            metric: "2% Hallucination",
                            layerTags: ["ML", "API"],
                            proofs: ["Hallucinations reduced from 8% to 2%", "Escalations reduced by 42% per 10k requests"],
                            tech: ["LangChain", "LangGraph", "Python"],
                            src: "/experience/vosyn-graph.png"
                        }
                    }
                ]
            },
            ops: {
                title: "Production ML Operations on AWS EKS",
                problem: "Fast models do not matter if operations are blind. The failure mode is shipping a regression and finding out from customers. We needed measurable health.",
                built: [
                    "Operated GPU-enabled services on AWS EKS with Infrastructure as Code",
                    "Added observability for latency, errors, and health across the stack",
                    "Implemented drift monitoring to detect quality decay early"
                ],
                how: [
                    "Used Terraform to manage clusters and node groups",
                    "Containerized inference with Docker for repeatable environments",
                    "Automated deployment with GitHub Actions and ArgoCD",
                    "Instrumented Prometheus and OpenTelemetry for deep-stack tracing",
                    "Implemented drift signals to detect model decay"
                ],
                bullets: [
                    {
                        id: "observability",
                        label: "Grafana O11y + Drift Monitoring (~3%)",
                        receipts: {
                            metric: "~3% Drift Det.",
                            layerTags: ["Infra", "Observability"],
                            proofs: ["Drift detection around 3% monthly", "Latencies traced to exact model stages"],
                            tech: ["AWS EKS", "Terraform", "Prometheus", "OpenTelemetry", "ArgoCD"],
                            src: "/experience/vosyn-o11y.png"
                        }
                    }
                ]
            },
            ablations: {
                title: "Ablations, Failure Analysis, and Design",
                problem: "Without disciplined ablations, teams optimize the wrong thing. I helped turn failures into decisions backed by evidence.",
                built: [
                    "Partnered with senior ML engineers to run ablations and isolate root causes",
                    "Turned results into short design memos that influenced the next sprint",
                    "Documented tradeoffs so decisions were repeatable"
                ],
                bullets: [
                    {
                        id: "reports",
                        label: "10+ Experiment Reports & Design Memos",
                        receipts: {
                            metric: "10+ Reports",
                            layerTags: ["ML", "Ops"],
                            proofs: ["10+ experiment reports used in sprint planning", "Design decisions backed by ablation evidence"],
                            tech: ["Python", "Instrumentation", "A/B Testing"],
                            src: "/experience/vosyn-reports.png"
                        }
                    }
                ]
            },
            visuals: {
                images: [
                    { src: "/experience/vosyn-arch.png", alt: "VosynCore Architecture", caption: "Edge routing, internal gRPC, ONNX workers, vector retrieval, and metrics." },
                    { src: "/experience/vosyn-latency.png", alt: "Latency Distribution", caption: "p50, p95, and p99 distribution showing 32% tail reduction." },
                    { src: "/experience/vosyn-eval.png", alt: "Eval Dashboard", caption: "Language coverage and automated pass/fail regression gates." },
                    { src: "/experience/vosyn-graph.png", alt: "Agent Graph", caption: "Planner-executor flow with explicit retry and fallback paths." },
                    { src: "/experience/vosyn-o11y.png", alt: "Observability Panel", caption: "Prometheus metrics and OTel traces across inference stages." },
                    { src: "/experience/vosyn-reports.png", alt: "Ablation Reports", caption: "Filmstrip of design memos and experiment failure analysis." }
                ]
            }
        },
        keyDecisions: [
            { decision: "Serving split: FastAPI + gRPC", why: "gRPC for internal throughput; FastAPI for control surface and routing.", tradeoff: "Two protocols to maintain, solved by shared schemas." },
            { decision: "ONNX Runtime for serving path", why: "Consistent, fast runtime across environments; easier optimization.", tradeoff: "Export complexity and runtime tuning effort." },
            { decision: "Retrieval confidence gating", why: "Reduces confident wrong outputs and makes quality measurable.", tradeoff: "More 'I don't know' outputs, solved by fallbacks." }
        ],
        links: {
            live: "https://vosyn.ai",
            caseStudy: "/experience/vosyn"
        }
    },
    {
        id: "krowd",
        company: "Krowd Guide",
        role: "Founding Software Engineer",
        domainTags: ["AI/ML", "Real-Time Systems", "Full-Stack"],
        dateRange: "Jun 2025 – Dec 2025",
        location: "Dallas, TX",
        hookLine: "Founding engineer for an AI-powered crowd safety platform piloted at AfroTech Houston.",
        proofMetrics: [
            { label: "Predictive Acc.", value: "93.46%", hint: "Up from 83.71% via iterative ML lifecycle." },
            { label: "Latency p95", value: "<400ms", hint: "High-concurrency streaming inference." },
            { label: "Uptime", value: "99.95%", hint: "During live event windows." }
        ],
        snapshotProof: [
            "93.46% Predictive Accuracy (vs 83.71%)",
            "<400ms p95 Latency",
            "41.22% Faster Processing",
            "19.63% Risk Detection Sensitivity",
            "20,000+ Attendees Protected",
            "99.95% System Uptime"
        ],
        heroMotif: {
            emoji: "🛰️",
            title: "Crowd Intelligence",
            subtitle: "Real-time Safety"
        },
        theme: {
            accent: "#FF3B30",
            motif: "radar",
            backgroundFx: "canvas",
            iconSet: "duotone"
        },
        topStack: ["Python", "FastAPI", "React", "Terraform", "LangChain", "Kubernetes"],
        groupedTechStack: {
            "🧠 AI & ML": ["PyTorch", "TensorFlow", "Keras", "vLLM", "DeepSpeed"],
            "🤖 Agents & RAG": ["LangChain", "LangGraph", "LlamaIndex", "Pinecone", "ChromaDB"],
            "⚙️ Backend & API": ["FastAPI", "Node.js", "TypeScript", "Docker", "Kubernetes"],
            "☁️ Cloud & DevOps": ["AWS", "GCP", "Azure", "Terraform", "GitHub Actions"],
            "🔭 Observability": ["Prometheus", "OpenTelemetry", "Langfuse", "Evidently AI", "MLflow"]
        },
        chapters: [
            { id: "overview", title: "Overview" },
            { id: "architecture", title: "System Architecture" },
            { id: "mlLifecycle", title: "ML Lifecycle" },
            { id: "inference", title: "Real-time Inference" },
            { id: "ragAgents", title: "RAG & Agents" },
            { id: "ops", title: "DevOps & Scale" },
            { id: "visuals", title: "Visuals" }
        ],
        narrativeSections: {
            overview: {
                title: "Mission: Crowd Safety at Scale",
                paragraphs: [
                    "Krowd Guide is a real-time AI crowd-intelligence system designed to translate chaotic signals—motion, density, sentiment—into clear safety narratives for non-technical operators. We piloted this system at major events like AfroTech Houston.",
                    "As the Founding Software Engineer, I owned the entire technical lifecycle: from requirements workshops with operations teams to designing the combined ML/backend architecture and leading on-site validation."
                ],
                ownership: [
                    "Full-stack architecture (AI + Backend + Dashboard)",
                    "End-to-end ML lifecycle (Data -> Deployment)",
                    "Real-time inference pipeline optimization",
                    "On-site validation and operator feedback loops"
                ]
            },
            architecture: {
                title: "System Design & Architecture",
                problem: "Operators needed real-time actionable insights, not raw data. The system had to ingest high-frequency signals and deliver explainable narratives with sub-second latency.",
                built: [
                    "Conceived and architected the combined ML + backend + streaming + UX system",
                    "Built a real-time web dashboard and backend services in TypeScript/Node.js",
                    "Designed event-driven pipelines for risk state monitoring"
                ],
                how: [
                    "Decoupled ingestion from processing using async queues",
                    "Implemented REST APIs for frontend-backend communication",
                    "Used efficient state management for real-time dashboard updates"
                ],
                bullets: [
                    {
                        id: "arch-01",
                        label: "Full-Stack System Design",
                        receipts: {
                            metric: "20k+ Users",
                            layerTags: ["Arch", "Full-Stack"],
                            proofs: ["Designed and deployed the full-stack system that served 20,000+ attendees at AfroTech Houston with zero critical failures", "Decoupled ingestion from processing using async event-driven queues, enabling horizontal scaling during peak load"],
                            tech: ["TypeScript", "Node.js", "React", "REST"],
                            src: "/krowd-guide/home-page.png?v=2"
                        }
                    }
                ]
            },
            mlLifecycle: {
                title: "Core ML Lifecycle",
                problem: "Initial models lacked precision in real-world chaotic environments. We needed a rigorous loop to improve accuracy from a baseline of ~83%.",
                built: [
                    "Owned the end-to-end ML lifecycle from data collection to deployment",
                    "Implemented rigorous evaluation gates and regression suites",
                    "Built reproducible training pipelines"
                ],
                how: [
                    "Ran requirements workshops to define failure modes",
                    "Executed statistical analysis and feature engineering",
                    "Integrated MLflow and DVC for experiment tracking",
                    "Used Great Expectations for data validation (>99.9% schema integrity)"
                ],
                bullets: [
                    {
                        id: "ml-01",
                        label: "Accuracy Lift (83% → 93%)",
                        receipts: {
                            metric: "+9.75%",
                            layerTags: ["ML", "Data"],
                            proofs: ["Lifted predictive accuracy from 83.71% to 93.46% through rigorous iterative training, feature engineering, and statistical analysis on real-world event data", "Implemented automated release gates with regression suites and Great Expectations data validation (>99.9% schema integrity) to prevent model quality degradation"],
                            tech: ["MLflow", "DVC", "Great Expectations"],
                            src: "/krowd-guide/j1.png?v=2"
                        }
                    }
                ]
            },
            inference: {
                title: "High-Performance Inference",
                problem: "Live events generate massive concurrent streams. Standard inference serving was too slow (>500ms) for real-time safety decisions.",
                built: [
                    "Engineered GPU-accelerated streaming inference pipelines",
                    "Implemented dynamic batching and mixed-precision inference",
                    "Deployed async FastAPI services for model serving"
                ],
                how: [
                    "Used Docker and Kubernetes for container orchestration",
                    "Leveraged vLLM/DeepSpeed techniques for throughput",
                    "Optimized serving with distributed queues"
                ],
                bullets: [
                    {
                        id: "inf-01",
                        label: "Latency Optimization (<400ms)",
                        receipts: {
                            metric: "<400ms p95",
                            layerTags: ["Inference", "Perf"],
                            proofs: ["Slashed p95 inference latency to <400ms using GPU-accelerated streaming, dynamic batching, and mixed-precision inference via vLLM/DeepSpeed", "Achieved 41.22% faster end-to-end processing through async FastAPI serving and distributed queue orchestration on Kubernetes"],
                            tech: ["Docker", "Kubernetes", "vLLM", "FastAPI"],
                            src: "/krowd-guide/j7.png?v=2"
                        }
                    }
                ]
            },
            ragAgents: {
                title: "RAG & Agentic Workflows",
                problem: "Dense telemetry is hard to read. Operators needed plain-English explanations of *why* a risk score was high.",
                built: [
                    "Built RAG and agentic-style LLM workflows",
                    "Implemented human-in-the-loop guardrails",
                    "Deployed vector search for grounding"
                ],
                how: [
                    "Used LangChain and LangGraph for orchestration",
                    "Integrated Pinecone/ChromaDB for vector retrieval",
                    "Added source-citation checks and deterministic fallbacks"
                ],
                bullets: [
                    {
                        id: "rag-01",
                        label: "Explainable Safety Narratives",
                        receipts: {
                            metric: "+43% Interp.",
                            layerTags: ["AI", "UX"],
                            proofs: ["Boosted interpretability by 43.12% by building RAG-powered narrative generation that translates raw telemetry into plain-English safety explanations with source citations", "Cut reporting turnaround by 32.6% through agentic LLM workflows with human-in-the-loop guardrails and deterministic fallbacks for safety-critical context"],
                            tech: ["LangChain", "LangGraph", "Vector DBs"],
                            src: "/krowd-guide/j2.png?v=2"
                        }
                    }
                ]
            },
            ops: {
                title: "DevOps & Infrastructure",
                problem: "Manual deployments were risky and slow. We needed a robust CI/CD pipeline to support frequent updates during event windows.",
                built: [
                    "Deployed multi-cloud AI workloads (AWS, GCP, Azure)",
                    "Automated CI/CD with blue-green rollouts",
                    "Wired deep observability stack (Prometheus, OTel, Langfuse)"
                ],
                how: [
                    "Used Terraform for Infrastructure as Code",
                    "Implemented canary evaluations and rollback hooks",
                    "Reduced regression detection time from 21m to ~9m"
                ],
                bullets: [
                    {
                        id: "ops-01",
                        label: "Multi-Cloud Reliability",
                        receipts: {
                            metric: "99.95% Uptime",
                            layerTags: ["DevOps", "Cloud"],
                            proofs: ["Achieved 99.27–99.95% uptime across live event windows by deploying multi-cloud AI workloads (AWS/GCP/Azure) with blue-green rollouts and automated canary evaluations", "Reduced infrastructure costs by 28.03% and regression detection time from 21 minutes to ~9 minutes through Terraform IaC, GitHub Actions CI/CD, and deep observability via Prometheus + OpenTelemetry"],
                            tech: ["Terraform", "GitHub Actions", "Prometheus"],
                            src: "/krowd-guide/j4.png?v=2"
                        }
                    }
                ]
            },
            visuals: {
                images: [
                    {
                        src: "/krowd-guide/home-page.png?v=2",
                        alt: "Krowd Guide Landing — Know the Vibe Before You Arrive",
                        caption: "The consumer-facing landing page of Krowd Guide. We solved the 'blind arrival' problem — attendees had no way to gauge crowd levels, parking, or safety before showing up to an event. This page introduces the platform's value prop with a real-time search bar, Houston Live Guide banner, and direct links to live event intelligence. Built with React and styled for instant trust."
                    },
                    {
                        src: "/krowd-guide/houston-1.png?v=2",
                        alt: "Houston Live Guide — Real-Time Event Discovery",
                        caption: "The Houston Live Guide aggregates 55+ live events with real-time crowd data. We solved the problem of fragmented event discovery — users previously had to check multiple platforms to find what's happening. This view shows category filtering (Dining, Nightlife, Networking), timeline-based event cards with 'How's the Vibe?' sentiment voting, RSVP actions, and crowd-sourced parking/wait data. Each card feeds back into our ML prediction pipeline."
                    },
                    {
                        src: "/krowd-guide/houston-2.png?v=2",
                        alt: "Crowd Density Predictions — Live Event Intelligence",
                        caption: "The deep event detail view with our core ML prediction engine in action. We solved the problem of unpredictable crowd surges — operators and attendees had no advance warning. This screen shows expected attendance (8–12 people, 66% confidence), 'vs. Typical Event' comparison bars (300% busier than usual), check-in breakdowns, activity timelines with peak-time predictions, and crowd-sourced vibe/parking/wait signals. This is the data that feeds our 93.46% accuracy model."
                    },
                    {
                        src: "/krowd-guide/j1.png?v=2",
                        alt: "ML Analytics Dashboard — Population & Prediction Metrics",
                        caption: "The real-time ML analytics dashboard showing Active Population (1.2M, +18.7% today), Revenue Impact ($287K, -12.3% vs forecast), High Risk Zones (12, +3 active), and Prediction Accuracy (98.4%, +0.8% this week). We solved the problem of operating blind — venue operators previously had no unified view of crowd health. This dashboard was the single pane of glass that let operators make data-driven decisions in real time, powered by our iterative ML lifecycle that pushed accuracy from 83.71% to 93.46%."
                    },
                    {
                        src: "/krowd-guide/j2.png?v=2",
                        alt: "City Risk Map — Geospatial Threat Visualization",
                        caption: "The City Risk Map with color-coded threat pins (Critical/Warning/Normal) plotted on a spatial grid. We solved the problem of situational blindness — security teams couldn't visualize *where* risk was concentrating across a large venue or city zone. This geospatial layer uses our RAG-enhanced classification pipeline to place risk labels based on crowd density, incident reports, and sensor data. It's the spatial foundation that drives the emergency dispatch system."
                    },
                    {
                        src: "/krowd-guide/j3.png?v=2",
                        alt: "Heatmap & Spatial Distribution View",
                        caption: "Spatial distribution heatmap overlaying crowd density onto venue zones. We solved the problem of 'where are the bottlenecks?' — traditional monitoring couldn't show density gradients in real time. This view transforms raw location signals into a multi-layered risk heatmap, enabling operators to deploy resources to the exact zones that are approaching capacity before a dangerous crush occurs."
                    },
                    {
                        src: "/krowd-guide/j4.png?v=2",
                        alt: "Business Impact Analysis — Revenue vs Cost Tracking",
                        caption: "The Business Impact Analysis chart showing revenue (blue) vs. cost (red) over event hours, with a '+$1.2M recovered this week' callout and a Live Alert Ticker streaming real-time warnings ('Max capacity exceeded by 42%', 'delay predicted'). We solved the problem of proving ROI for safety tech — stakeholders needed concrete financial evidence. This dashboard directly ties crowd management interventions to revenue protection, making the business case for continued investment."
                    },
                    {
                        src: "/krowd-guide/j5.png?v=2",
                        alt: "Live Alert Ticker & Risk Zones Monitor",
                        caption: "The Live Alert Ticker broadcasting WARNING and UPDATE events alongside the Risk Zones Monitor with per-zone capacity bars (Market District 78% rising, University Campus 65% falling, Entertainment Quarter 89% rising). We solved the problem of alert fatigue and information overload — operators were drowning in raw data. This view uses our RAG-powered triage to classify, prioritize, and surface only the alerts that matter, with directional trend indicators to show which zones need immediate attention."
                    },
                    {
                        src: "/krowd-guide/j6.png?v=2",
                        alt: "Emergency Response Console — One-Click Dispatch",
                        caption: "The Emergency Response action panel with one-click operations: Deploy Safety Teams (dispatch 8 teams to Downtown & Central Station), Activate Traffic Flow (optimize signals for emergency vehicle access), and Generate Impact Report (business disruption forecast & recovery plan). We solved the problem of slow manual coordination — dispatching teams previously required phone calls and radio. This console turns AI-recommended actions into a single button press, reducing mean-time-to-response from minutes to seconds."
                    },
                    {
                        src: "/krowd-guide/j7.png?v=2",
                        alt: "System Status & Observability Dashboard",
                        caption: "The System Status panel showing real-time health of all critical subsystems: Data Processing (98.7%), Prediction Engine (99.2%), and API Latency (187ms), alongside the Emergency Response console. We solved the problem of 'is the system even working?' — in safety-critical environments, operators need continuous proof that the AI pipeline is healthy. This observability layer is powered by Prometheus, OpenTelemetry, and Langfuse, enabling our 99.95% uptime SLA during live events."
                    },
                    {
                        src: "/krowd-guide/venues-and-events.png?v=2",
                        alt: "Venue & Event Search — Hierarchical Zone Management",
                        caption: "The Search Venues and Events interface with category-based filtering (Dining & Drinks, Nightlife, Local Events, Outdoor Activities, Family Fun, Arts & Culture, Networking & Conferences) and a live busyness gradient bar. We solved the problem of venue discovery and capacity planning — operators needed a way to see all venues in a region and their current load. This page serves as the entry point to drill into any venue's zone-level crowd data, connecting the consumer-facing search to the operator-side intelligence layer."
                    }
                ]
            }
        },
        keyDecisions: [
            { decision: "Hybrid Cloud (AWS/GCP/Azure)", why: "Leverage best-in-class AI services from each provider.", tradeoff: "Complexity in networking/auth, managed via Terraform." },
            { decision: "DeepSpeed/vLLM for Inference", why: "Necessary to hit <400ms latency targets on budget hardware.", tradeoff: "Higher engineering complexity vs off-the-shelf serving." },
            { decision: "Human-in-the-loop RAG", why: "Safety-critical context requires human verification of AI claims.", tradeoff: "Slightly slower final output, but critical for trust." }
        ],
        bulletPoints: [
            {
                icon: "Layers",
                headline: "Product & Systems",
                content: "Led end-to-end web development across React, TypeScript, and Node.js/FastAPI—owning architecture, core user flows, and real-time crowd maps that non-technical staff can operate under pressure.",
                metric: "Architecture"
            },
            {
                icon: "Brain",
                headline: "AI Agents & RAG Pipelines",
                content: "Designed LLM and RAG agents using LangChain, LangGraph, and ChromaDB/Pinecone to fuse crowdsourced reports into ranked alerts, introducing guardrails and human-in-the-loop review for trusted field operations.",
                metric: "AI Pipelines"
            },
            {
                icon: "Zap",
                headline: "Backend Constraints & Scale",
                content: "Architected services targeting sub-400ms p95 latency under event load, using MongoDB/PostgreSQL with caching for fast queries and deployed containerized services via Docker/K8s.",
                metric: "<400ms Latency"
            },
            {
                icon: "BarChart3",
                headline: "Production Observability",
                content: "Wired deep observability inspired by Prometheus, Grafana, Langfuse, and OpenTelemetry to track latency, error rates, and AI drift like a production-grade platform.",
                metric: "Full O11y"
            },
            {
                icon: "UserCheck",
                headline: "Leadership & Roadmap",
                content: "Collaborated directly with the founder and early customers to prioritize the roadmap, balancing reliability, new features, and AI experiments.",
                metric: "Tech Lead"
            }
        ],
        links: {
            live: "#",
            caseStudy: "/experience/krowd"
        }
    },
    {
        id: "unt-ai-first",
        company: "University of North Texas",
        role: "Outreach & Research Assistant — AI-First Discovery Initiative",
        domainTags: ["AI/ML", "Full-Stack", "Education", "Research"],
        dateRange: "Aug 2023 – May 2025",
        location: "Denton, TX",
        teamContext: "Co-founded the AI-First Discovery Initiative at UNT's Discovery Park Library — an applied AI studio delivering full-stack web apps, LLM assistants, and hands-on workshops for faculty, students, and external collaborators.",
        hookLine: "Co-founded an applied AI studio, shipping LLM/RAG assistants, production-style internal tools, and 20+ workshops for 200+ learners — increasing AI project submissions by 53%.",
        proofMetrics: [
            { label: "Query Resolution", value: "−40%", hint: "RAG-powered assistants reduced query resolution time by 40.18%." },
            { label: "Answer Quality", value: "+21%", hint: "Human-rated answer quality improved by 21.36% with hybrid retrieval." },
            { label: "AI Submissions", value: "+53%", hint: "Student AI project submissions increased by 53.12%." }
        ],
        snapshotProof: [
            "40.18% Faster Query Resolution",
            "21.36% Better Answer Quality",
            "53.12% More AI Submissions",
            "200+ Learners Trained",
            "20+ Workshops Delivered",
            "Published in UNT Scholarly Repository",
            "−31% Environment Setup Issues"
        ],
        heroMotif: {
            emoji: "🧠",
            title: "AI-First Discovery",
            subtitle: "Applied AI Studio"
        },
        theme: {
            accent: "#059033",
            motif: "notebook",
            backgroundFx: "css",
            iconSet: "duotone"
        },
        topStack: ["Python", "FastAPI", "LangChain", "PostgreSQL", "Docker", "Apache Airflow"],
        groupedTechStack: {
            "🧠 AI & LLM": ["LangChain", "LangGraph", "GPT-4", "RAG", "Vector Search", "Embeddings", "Pydantic"],
            "⚙️ Backend & API": ["Python", "FastAPI", "PostgreSQL", "REST APIs"],
            "🔄 Pipeline & Automation": ["Apache Airflow", "Prefect", "CI/CD", "GitHub Actions"],
            "📊 Evaluation": ["Golden Test Sets", "Rubric Scoring", "Regression Checks", "A/B Testing"],
            "☁️ Infra": ["Docker", "AWS", "GCP", "Vertex AI", "Linux Servers"]
        },
        chapters: [
            { id: "overview", title: "Overview" },
            { id: "appliedStudio", title: "Applied AI Studio" },
            { id: "ragSystems", title: "LLM & RAG Systems" },
            { id: "workshops", title: "Workshops & Teaching" },
            { id: "evalHarness", title: "Evaluation Harness" },
            { id: "pipelines", title: "Automated Pipelines" },
            { id: "publication", title: "Publication & Research" },
            { id: "visuals", title: "Visuals" }
        ],
        narrativeSections: {
            overview: {
                title: "An Applied AI Studio Inside a University",
                paragraphs: [
                    "The AI-First Discovery Initiative at UNT's Discovery Park Library wasn't a typical campus job — it was an applied AI studio. I co-founded it with the mission of translating ambiguous, cross-disciplinary needs into requirements, success metrics, and reliable releases. We served faculty, students from engineering, art, media, and design, and external collaborators who needed AI solutions but didn't have engineering teams.",
                    "Over two years, I delivered full-stack web applications, LLM and RAG assistants, internal tools, automated pipelines, and 20+ hands-on workshops — while also publishing a research paper documenting a reusable reference architecture for modular RAG systems with evaluation, observability, and human-in-the-loop review."
                ],
                ownership: [
                    "Co-founded and led the AI-First Discovery Initiative",
                    "Shipped full-stack web apps and LLM/RAG assistants for faculty and students",
                    "Translated ambiguous needs into requirements, success metrics, and releases",
                    "Delivered 20+ workshops for 200+ learners across multiple disciplines",
                    "Published research in UNT Scholarly Repository (2025)",
                    "Led student teams through sprint planning and code reviews"
                ]
            },
            appliedStudio: {
                title: "Applied AI Studio — Translating Ambiguity into Shipped Products",
                problem: "Faculty and students across engineering, art, media, and design needed AI-powered tools — but their requirements were often vague ('I want an AI to help with my research'), cross-disciplinary, and had no engineering team to execute. The gap between 'I heard AI can do this' and a shipped, reliable product was enormous.",
                built: [
                    "Ran the applied AI studio end-to-end: intake meetings with faculty to understand their domain, requirements decomposition, prototype iteration, and production-style releases",
                    "Shipped production-style internal tools and web applications supporting UNT workflows, with a focus on usability, reliability, and maintainability",
                    "Contributed to ongoing development and iteration of university apps, treating each project like a real startup delivering to real users"
                ],
                how: [
                    "Ran structured intake sessions to decompose vague requests into concrete requirements with measurable success criteria",
                    "Used rapid prototyping (1–2 week sprints) to get working demos in front of stakeholders early and iterate based on real feedback",
                    "Applied production engineering practices (CI/CD, Docker, testing) even for internal tools, because reliability matters even when users aren't paying customers",
                    "Led student engineering teams through sprint planning, code reviews, and pair programming"
                ],
                bullets: [
                    {
                        id: "studio-01",
                        label: "Full-Stack AI Solutions Delivered",
                        receipts: {
                            metric: "Multi-Project",
                            layerTags: ["Full-Stack", "Product"],
                            proofs: ["Ran an applied AI studio delivering full-stack web applications and AI assistants for faculty and students across engineering, art, media, and design — translating ambiguous needs into requirements, success metrics, and reliable releases", "Shipped production-style internal tools and web applications supporting UNT workflows with focus on usability, reliability, and maintainability"],
                            tech: ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
                            src: "/contributions/Time at UNT/thumbnail-1.jpeg"
                        }
                    }
                ]
            },
            ragSystems: {
                title: "LLM & RAG Assistants — Evidence-Grounded AI",
                problem: "Faculty needed AI assistants that could answer domain-specific questions accurately — not generic chatbot responses, but evidence-grounded answers citing real sources. Pure LLM generation hallucinated too much for academic use. We needed hybrid retrieval that combined semantic search with structured database queries to produce trustworthy, citation-backed responses.",
                built: [
                    "Built end-to-end LLM and RAG assistants in Python using FastAPI, PostgreSQL, and vector search with embeddings, enabling hybrid retrieval and evidence-grounded outputs",
                    "Implemented hybrid retrieval combining dense vector search (embeddings) with structured SQL queries to cover both semantic similarity and exact-match needs",
                    "Designed the output layer to surface source citations alongside every answer, making it easy for faculty to verify claims"
                ],
                how: [
                    "Used embedding models to create dense vector representations of documents, stored in vector-capable databases for fast semantic search",
                    "Combined vector search results with structured PostgreSQL queries to enable hybrid retrieval — catching both conceptual matches and exact keyword needs",
                    "Built FastAPI services with clean API contracts so assistants could be embedded into existing UNT web applications",
                    "Measured impact rigorously: 40.18% reduction in query resolution time and 21.36% improvement in human-rated answer quality"
                ],
                bullets: [
                    {
                        id: "rag-01",
                        label: "−40% Query Time, +21% Answer Quality",
                        receipts: {
                            metric: "−40.18%",
                            layerTags: ["AI", "RAG"],
                            proofs: ["Built end-to-end LLM and RAG assistants using FastAPI, PostgreSQL, and vector search with embeddings — reducing query resolution time by 40.18% and improving human-rated answer quality by 21.36%", "Implemented hybrid retrieval combining dense vector search with structured SQL queries to produce evidence-grounded, citation-backed outputs for academic use"],
                            tech: ["LangChain", "FastAPI", "PostgreSQL", "Vector Search", "Embeddings"],
                            src: "/contributions/Time at UNT/thumbnail-2.jpeg"
                        }
                    }
                ]
            },
            workshops: {
                title: "Workshops & Teaching — Scaling AI Literacy",
                problem: "Most students (and many faculty) had heard of AI but had no practical experience building with it. Environment setup alone — Python versions, CUDA drivers, API keys, Docker — caused a 30%+ failure rate before anyone wrote a line of code. We needed a workshop model that made AI tangible and accessible for non-engineers.",
                built: [
                    "Delivered 20+ workshops for 200+ learners, covering Python fundamentals, LLM prompt engineering, RAG architectures, computer vision, and deployment",
                    "Created reproducibility checklists and pre-configured environments that reduced environment setup issues by 31.29%",
                    "Designed structured assignments with evaluation-driven iteration, increasing successful AI project submissions by 53.12%"
                ],
                how: [
                    "Structured workshops around 'build something real in 2 hours' — not lectures, but guided hands-on projects with real datasets and real APIs",
                    "Created reproducibility checklists: numbered setup guides, pre-built Docker containers, and environment validation scripts students could run before the session",
                    "Used evaluation-driven teaching — students submitted projects, received rubric-based feedback, and iterated, mirroring real engineering review cycles",
                    "Led student teams through sprint planning and code reviews, treating workshops like collaborative sprints rather than one-way lectures"
                ],
                bullets: [
                    {
                        id: "workshop-01",
                        label: "200+ Learners, 53% Submission Increase",
                        receipts: {
                            metric: "+53.12%",
                            layerTags: ["Education", "Leadership"],
                            proofs: ["Delivered 20+ workshops for 200+ learners and led student teams through sprint planning and code reviews, increasing successful AI project submissions by 53.12% through structured assignments and evaluation-driven iteration", "Reduced environment setup issues by 31.29% through reproducibility checklists, pre-configured Docker environments, and validation scripts"],
                            tech: ["Python", "Docker", "Jupyter", "GitHub"],
                            src: "/Workshops/outreachmain.jpeg"
                        }
                    }
                ]
            },
            evalHarness: {
                title: "Evaluation Harness — Making Quality Measurable",
                problem: "Without rigorous evaluation, LLM improvements were subjective — 'it feels better' isn't a metric. We needed a systematic framework to measure quality across every dimension: correctness, groundedness, structure, and latency — and to catch silent behavior drift when prompts, retrieval configurations, or models changed.",
                built: [
                    "Designed evaluation harnesses with golden question sets, rubric-based scoring, and automated regression checks",
                    "Made quality measurable across prompt, retrieval, and model iterations using standardized metrics",
                    "Implemented drift detection to prevent silent behavior changes from degrading output quality"
                ],
                how: [
                    "Created golden question sets from real faculty questions and edge cases, each with human-validated reference answers",
                    "Built rubric-based scoring that evaluates answers on correctness, completeness, citation quality, and safety",
                    "Implemented regression checks that run automatically when any component of the RAG pipeline changes",
                    "Used the harness to make every prompt change, retrieval tweak, and model swap a measurable experiment rather than a guess"
                ],
                bullets: [
                    {
                        id: "eval-01",
                        label: "Golden Sets + Rubric Scoring",
                        receipts: {
                            metric: "Measurable Quality",
                            layerTags: ["ML", "Eval"],
                            proofs: ["Designed evaluation harnesses with golden question sets, rubric-based scoring, and regression checks to make quality measurable across prompt, retrieval, and model iterations — preventing silent behavior drift", "Made every AI system change a measurable experiment: tracking correctness, completeness, citation quality, and safety against human-validated reference answers"],
                            tech: ["Python", "Pydantic", "Golden Sets", "Rubric Scoring"],
                            src: "/contributions/Research paper/SUDT.png"
                        }
                    }
                ]
            },
            pipelines: {
                title: "Automated Pipelines — Reliable AI Operations",
                problem: "Running LLM assistants in production means continuous data ingestion, embedding refresh cycles, and regular evaluation runs. Doing this manually is error-prone and doesn't scale. We needed automated pipelines with quality gates that could catch regressions before they reached users.",
                built: [
                    "Implemented automated pipelines using Apache Airflow and Prefect for ingestion, embedding refresh, and evaluation runs",
                    "Added latency and accuracy gates to prevent degraded deployments from reaching users",
                    "Built simple A/B comparison frameworks to safely test prompt and retrieval changes against production baselines"
                ],
                how: [
                    "Used Apache Airflow for orchestrating multi-step DAGs: data ingestion → embedding generation → vector store update → evaluation run → deployment gate",
                    "Implemented latency gates (p95 < threshold) and accuracy gates (golden set pass rate > threshold) as mandatory checkpoints",
                    "Built A/B comparison pipelines that run candidate changes against the production baseline and surface statistical comparisons before rollout",
                    "Used Prefect for simpler event-driven flows like on-demand embedding refresh and ad-hoc evaluation runs"
                ],
                bullets: [
                    {
                        id: "pipe-01",
                        label: "Automated Ingestion, Embedding & Eval Pipelines",
                        receipts: {
                            metric: "CI-Gated",
                            layerTags: ["Pipeline", "MLOps"],
                            proofs: ["Implemented automated pipelines using Apache Airflow and Prefect for ingestion, embedding refresh, and evaluation runs — adding latency and accuracy gates plus A/B comparisons for safe rollouts", "Created a repeatable MLOps workflow: data changes trigger embedding refresh, evaluation runs validate quality, and gates block deployment if metrics regress"],
                            tech: ["Apache Airflow", "Prefect", "Docker", "CI/CD"],
                            src: "/contributions/Time at UNT/thumbnail-3.jpeg"
                        }
                    }
                ]
            },
            publication: {
                title: "Published Research — Reference Architecture for Modular RAG",
                problem: "The AI engineering work we did at the Initiative was novel but undocumented. Without a published reference, other universities and teams would have to reinvent the same patterns. We needed to formalize our approach into a reusable reference architecture that others could adopt.",
                built: [
                    "Published 'Bridging Technology, Creativity, and Outreach: Responsible AI Education through the AI-First Discovery Initiative' in UNT Scholarly Repository (2025)",
                    "Documented a reusable reference architecture for modular RAG systems with evaluation, observability, and human-in-the-loop review",
                    "Formalized the patterns we developed — from intake to evaluation to deployment — into a reproducible blueprint"
                ],
                how: [
                    "Collaborated with faculty advisors to frame the engineering work as a scholarly contribution",
                    "Documented the full pipeline: modular RAG architecture, evaluation harness design, observability integration, and human-in-the-loop review patterns",
                    "Published through UNT's formal scholarly review process, making it citable by other researchers and practitioners",
                    "Designed the architecture to be modular and reusable — any team can adopt the patterns without needing our specific codebase"
                ],
                bullets: [
                    {
                        id: "pub-01",
                        label: "UNT Scholarly Repository Publication",
                        receipts: {
                            metric: "Published",
                            layerTags: ["Research", "Architecture"],
                            proofs: ["Published 'Bridging Technology, Creativity, and Outreach' in UNT Scholarly Repository (2025), documenting a reusable reference architecture for modular RAG systems with evaluation, observability, and human-in-the-loop review", "Formalized the Initiative's engineering patterns into a citable, reproducible blueprint that other universities and teams can adopt"],
                            tech: ["RAG Architecture", "Evaluation", "Observability"],
                            src: "/contributions/UNT Library Publication/Symposium photo.png"
                        }
                    }
                ]
            },
            visuals: {
                images: [
                    {
                        src: "/Workshops/outreachmain.jpeg?v=1",
                        alt: "AI-First Discovery Initiative — Main Outreach",
                        caption: "The heart of the AI-First Discovery Initiative at UNT's Discovery Park Library. This is where we ran the applied AI studio — translating cross-disciplinary needs from faculty and students into shipped AI solutions. We solved the problem of making AI tangible and accessible in an academic environment where most learners had zero hands-on experience."
                    },
                    {
                        src: "/Workshops/outreach.jpeg?v=1",
                        alt: "Workshop Session — Hands-On AI Building",
                        caption: "A live workshop session where students are building with AI hands-on. We solved the problem of passive AI education — instead of lectures, each workshop was structured around 'build something real in 2 hours' with real datasets and real APIs. This approach contributed to the 53.12% increase in successful AI project submissions."
                    },
                    {
                        src: "/Workshops/outreach1.jpeg?v=1",
                        alt: "Student Engagement — Collaborative AI Development",
                        caption: "Students collaborating during an AI workshop, pairing up on projects. We solved the problem of isolation in learning — by treating workshops like collaborative sprints with sprint planning and code reviews, students learned not just AI but real engineering practices."
                    },
                    {
                        src: "/Workshops/outreach3.jpg?v=1",
                        alt: "Workshop Presentation — Teaching AI Concepts",
                        caption: "Presenting AI concepts to a diverse audience of engineering, art, media, and design students. We solved the problem of 'AI is only for CS majors' — the Initiative was deliberately cross-disciplinary, making AI accessible to every department."
                    },
                    {
                        src: "/Workshops/outreach4.JPG?v=1",
                        alt: "Discovery Park Library — AI Studio Space",
                        caption: "The physical space at Discovery Park Library where the AI-First Discovery Initiative operated. We transformed a traditional library space into an applied AI studio, complete with workstations, GPU resources, and a collaborative environment."
                    },
                    {
                        src: "/Workshops/outreach5.jpeg?v=1",
                        alt: "Outreach Event — Community AI Engagement",
                        caption: "A community outreach event showcasing AI projects and demos. We solved the problem of AI being perceived as abstract and inaccessible — by putting working demos in people's hands, we made the technology tangible."
                    },
                    {
                        src: "/Workshops/Poster Image.jpeg?v=1",
                        alt: "Research Poster — AI-First Discovery Initiative",
                        caption: "The research poster summarizing the AI-First Discovery Initiative's approach, methodology, and results. This visual distills two years of applied AI studio work into a single, shareable format for academic conferences and symposiums."
                    },
                    {
                        src: "/Workshops/Python Image.jpeg?v=1",
                        alt: "Python Workshop — Foundations for AI",
                        caption: "A Python fundamentals workshop — the foundation layer for all AI work. We solved the problem of students jumping into LLMs and ML without basic programming skills by creating a structured progression from Python basics to AI applications."
                    },
                    {
                        src: "/contributions/Linkedin/Bridging.jpg?v=1",
                        alt: "LinkedIn — 'Bridging Technology, Creativity, and Outreach'",
                        caption: "LinkedIn post announcing the publication of 'Bridging Technology, Creativity, and Outreach: Responsible AI Education through the AI-First Discovery Initiative' — our published research in UNT Scholarly Repository documenting the reusable reference architecture for modular RAG systems."
                    },
                    {
                        src: "/contributions/Linkedin/Create with python.jpg?v=1",
                        alt: "LinkedIn — Creating with Python Workshop",
                        caption: "LinkedIn post announcing a 'Create with Python' workshop series at UNT. These workshops were the entry point for many students who went on to build full AI projects — contributing to the 53.12% increase in successful AI project submissions."
                    },
                    {
                        src: "/contributions/Linkedin/Hackathon.jpg?v=1",
                        alt: "LinkedIn — Hackathon Event",
                        caption: "LinkedIn post promoting a hackathon event organized through the AI-First Discovery Initiative. Hackathons were our accelerated learning format — students built and shipped AI projects in 24–48 hours, applying everything from the workshop series."
                    },
                    {
                        src: "/contributions/Linkedin/Javascript.jpg?v=1",
                        alt: "LinkedIn — JavaScript & Web Development Workshop",
                        caption: "LinkedIn post for a JavaScript workshop — because full-stack AI means the frontend matters too. We taught students to build complete web applications, not just Python scripts, bridging the gap between AI backend and user-facing interfaces."
                    },
                    {
                        src: "/contributions/Linkedin/My exp in AI.jpg?v=1",
                        alt: "LinkedIn — My Experience in AI",
                        caption: "LinkedIn post reflecting on the personal journey building the AI-First Discovery Initiative — the lessons learned from translating ambiguous cross-disciplinary needs into shipped AI products in an academic setting."
                    },
                    {
                        src: "/contributions/UNT Library Publication/Symposium photo.png?v=1",
                        alt: "UNT Symposium — Research Presentation",
                        caption: "Presenting at the UNT Symposium where the AI-First Discovery Initiative research was showcased. This was the formal academic validation of our engineering work — demonstrating that applied AI studio practices produce measurable educational and research outcomes."
                    },
                    {
                        src: "/contributions/UNT Library Publication/download.jpg?v=1",
                        alt: "Published Paper — UNT Scholarly Repository",
                        caption: "The published paper in UNT Scholarly Repository: 'Bridging Technology, Creativity, and Outreach: Responsible AI Education through the AI-First Discovery Initiative.' This documents our reusable reference architecture for modular RAG systems with evaluation, observability, and human-in-the-loop review — a citable blueprint for other institutions."
                    },
                    {
                        src: "/contributions/Works Published at UNT/_National_Engineering_Week_flyer.png?v=1",
                        alt: "National Engineering Week — Workshop Flyer",
                        caption: "Flyer for National Engineering Week workshops organized through the AI-First Discovery Initiative. We partnered with the engineering department to bring AI workshops to a broader audience during this national celebration of engineering education."
                    },
                    {
                        src: "/contributions/Works Published at UNT/crack_the_code_to_computer_programming.png?v=1",
                        alt: "'Crack the Code to Computer Programming' Workshop",
                        caption: "Workshop flyer for 'Crack the Code to Computer Programming' — an introductory workshop that lowered the barrier to entry for students with no programming background. This was the first step in our pipeline from zero experience to shipped AI projects."
                    },
                    {
                        src: "/contributions/Works Published at UNT/python workshop.png?v=1",
                        alt: "Python Workshop Series Flyer",
                        caption: "Official flyer for the Python workshop series at UNT. These structured, hands-on workshops used reproducibility checklists and pre-configured environments to reduce setup friction by 31.29%, ensuring students spent time learning AI instead of fighting environment issues."
                    },
                    {
                        src: "/contributions/Works Published at UNT/certificate citi.png?v=1",
                        alt: "CITI Research Ethics Certification",
                        caption: "CITI research ethics certification — ensuring all AI education and research through the Initiative met institutional ethical standards. Responsible AI isn't just a buzzword; we formalized it with proper certifications and review processes."
                    },
                    {
                        src: "/contributions/Research paper/SUDT.png?v=1",
                        alt: "Research Paper — System Design",
                        caption: "Technical diagram from the research paper showing the system design and architecture of the modular RAG framework developed through the AI-First Discovery Initiative. This architecture became the basis for the published reference architecture."
                    },
                    {
                        src: "/Workshops/outreach2.jpeg?v=1",
                        alt: "Student Teams — Sprint Planning",
                        caption: "Students working in teams during a sprint planning session. We solved the problem of teaching software engineering practices alongside AI — students didn't just learn to build models, they learned to plan, review, iterate, and ship like a real engineering team."
                    },
                    {
                        src: "/Workshops/outreach6.jpeg?v=1",
                        alt: "Workshop Materials — Structured Learning",
                        caption: "Structured workshop materials and hands-on exercises. Each workshop included reproducibility checklists, numbered setup guides, and evaluation rubrics — treating education with the same rigor we applied to engineering."
                    },
                    {
                        src: "/Workshops/outreach7.jpeg?v=1",
                        alt: "AI Demo Day — Student Projects",
                        caption: "Student projects on display during an AI demo day. These are the tangible outcomes of the Initiative's evaluation-driven teaching approach — real, working AI applications built by students who started with zero AI experience."
                    },
                    {
                        src: "/Workshops/outreach8.jpeg?v=1",
                        alt: "Mentorship — One-on-One Guidance",
                        caption: "One-on-one mentorship session with a student. Beyond workshops, we provided individual guidance for students working on more complex AI projects — the kind of support that turns classroom knowledge into real engineering capability."
                    }
                ]
            }
        },
        keyDecisions: [
            { decision: "Reproducibility-First Workshops", why: "Non-engineering students lose 30%+ of workshop time to environment issues. Pre-configured Docker containers and validation scripts eliminated this.", tradeoff: "More prep time per workshop, but 31.29% fewer setup failures." },
            { decision: "Hybrid Retrieval over Pure Vector Search", why: "Academic questions often need exact-match retrieval (paper titles, course numbers) alongside semantic search.", tradeoff: "More complex retrieval layer, but 40.18% faster resolution and 21.36% better quality." },
            { decision: "Evaluation Harness Before Feature Work", why: "Without measurable baselines, 'improvements' are just opinions. Golden sets and regression checks make quality objective.", tradeoff: "Slower initial velocity, but every subsequent change is a measured experiment." }
        ],
        bulletPoints: [
            {
                icon: "Layers",
                headline: "Applied AI Studio",
                content: "Co-founded the AI-First Discovery Initiative and ran an applied AI studio, delivering full-stack web applications and AI assistants for faculty and students across multiple disciplines — translating ambiguous needs into requirements, success metrics, and reliable releases.",
                metric: "Multi-Project"
            },
            {
                icon: "Brain",
                headline: "LLM & RAG Assistants",
                content: "Built end-to-end LLM and RAG assistants using FastAPI, PostgreSQL, and vector search with embeddings — reducing query resolution time by 40.18% and improving human-rated answer quality by 21.36%.",
                metric: "−40% Resolution"
            },
            {
                icon: "Users",
                headline: "Workshops & Teaching",
                content: "Delivered 20+ workshops for 200+ learners and led student teams through sprint planning and code reviews — increasing successful AI project submissions by 53.12% through structured assignments and evaluation-driven iteration.",
                metric: "+53% Submissions"
            },
            {
                icon: "BarChart3",
                headline: "Evaluation & Pipelines",
                content: "Designed evaluation harnesses with golden question sets and regression checks, plus automated pipelines using Apache Airflow and Prefect for ingestion, embedding refresh, and safe rollouts with latency and accuracy gates.",
                metric: "CI-Gated"
            },
            {
                icon: "BookOpen",
                headline: "Published Research",
                content: "Published 'Bridging Technology, Creativity, and Outreach' in UNT Scholarly Repository (2025) — documenting a reusable reference architecture for modular RAG systems with evaluation, observability, and human-in-the-loop review.",
                metric: "Published"
            }
        ],
        links: {
            caseStudy: "/experience/unt-ai-first"
        }
    },
    {
        id: "robocon",
        company: "SRM Robocon Team",
        role: "AI & Vision Systems Intern — SRM Robocon Robotics Team",
        domainTags: ["Robotics", "AI/ML", "Embedded", "IoT"],
        dateRange: "Jan 2021 – Feb 2023",
        location: "SRMIST, Kattankulathur, Chennai, India",
        teamContext: "Member of SRM Team Robocon — a multidisciplinary robotics team at SRM Institute of Science and Technology competing in ABU Robocon, Smart India Hackathon, Technoaxian, and university events. Built real-time AI, embedded, and IoT systems across 10+ robot projects.",
        hookLine: "Built real-time YOLOv4 vision pipelines, autonomous SLAM navigation, and IoT sensor systems for 10+ competition-grade robots — from maze-solving micro mice to underwater ROVs.",
        proofMetrics: [
            { label: "Robot Projects", value: "10+", hint: "Contributed to 10+ distinct robot builds across competitions and events." },
            { label: "Detection", value: "Real-time 30fps", hint: "YOLOv4 inference on edge hardware (Raspberry Pi, STM32) at 30fps." },
            { label: "Competitions", value: "ABU Robocon · SIH · Technoaxian", hint: "Competed in national and international robotics competitions." }
        ],
        snapshotProof: [
            "10+ Robot Projects Shipped",
            "Real-time 30fps Edge Inference",
            "SLAM-Based Autonomous Navigation",
            "98.5% UV-C Sanitization Efficiency (PYRO)",
            "ABU Robocon · Smart India Hackathon · Technoaxian",
            "Custom PCB Design & Fabrication",
            "Environmental Monitoring IoT Systems"
        ],
        heroMotif: {
            emoji: "🤖",
            title: "SRM Robocon",
            subtitle: "Robotics & Edge AI"
        },
        theme: {
            accent: "#E25A1C",
            motif: "circuit",
            backgroundFx: "svg",
            iconSet: "line"
        },
        topStack: ["Python", "OpenCV", "YOLOv4", "ROS", "C++", "STM32"],
        groupedTechStack: {
            "🤖 Robotics & Control": ["ROS", "SLAM", "Path Planning", "PID Control", "Kinematics"],
            "🧠 AI & Vision": ["YOLOv4", "OpenCV", "TensorFlow", "Face Recognition", "Object Detection"],
            "⚡ Embedded": ["Raspberry Pi", "STM32", "Arduino Nano", "ESP8266", "Teensy"],
            "🔌 Sensors & IoT": ["Rplidar", "IMU", "BME680", "IR Sensor Arrays", "Pulse Oximeter"],
            "🛠️ Hardware": ["Custom PCB Design", "3D Printing", "SolidWorks", "Motor Drivers"]
        },
        chapters: [
            { id: "overview", title: "Overview" },
            { id: "rosRover", title: "ROS Rover" },
            { id: "microMouse", title: "Micro Mouse" },
            { id: "cheepaRobot", title: "Cheepa Robot" },
            { id: "rov", title: "ROV — Smart India Hackathon" },
            { id: "teamProjects", title: "Team Project Portfolio" },
            { id: "visuals", title: "Visuals" }
        ],
        narrativeSections: {
            overview: {
                title: "A Robotics Lab That Ships Robots That Compete",
                paragraphs: [
                    "SRM Team Robocon wasn't an academic exercise — it was a high-pressure engineering team that built competition-grade robots under real deadlines, real weight budgets, and real referee scoring. Based at BEL 604 in SRMIST's Basic Engineering Lab, the team shipped autonomous systems for ABU Robocon (international), Smart India Hackathon (national), Technoaxian (World Robotics Championship), and university-level engineering events.",
                    "Over two years, I contributed to 10+ robot projects spanning autonomous navigation (SLAM), real-time computer vision (YOLOv4 on edge hardware), IoT environmental sensors, custom PCB design, and underwater ROVs. Every system had a hard constraint: no cloud, no high-end GPUs, and no second chances on the competition floor."
                ],
                ownership: [
                    "Built real-time YOLOv4 vision pipelines for Raspberry Pi and STM32 at 30fps",
                    "Developed SLAM-based autonomous navigation for indoor security robots",
                    "Designed IoT sensor systems for environmental monitoring",
                    "Contributed to custom PCB design and embedded firmware",
                    "Competed in ABU Robocon, Smart India Hackathon, and Technoaxian"
                ]
            },
            rosRover: {
                title: "ROS Rover — Autonomous Security & Surveillance Robot",
                problem: "Traditional security systems rely on fixed cameras with blind spots and manual monitoring. For the Technoaxian 2023 competition (World Robotics Championship), we needed an autonomous robot that could navigate multi-floor indoor environments, create real-time maps, detect humans and identify threats — all without cloud connectivity, running entirely on edge hardware.",
                built: [
                    "Developed an autonomous skid-drive robot using ROS (Robot Operating System) with Rplidar, IMU, and camera sensors for real-time indoor navigation",
                    "Implemented SLAM (Simultaneous Localization and Mapping) for autonomous map creation and navigation through dynamic, unknown environments",
                    "Built real-time digital twin simulation for testing navigation algorithms before deploying to physical hardware",
                    "Integrated machine learning models for human detection, face recognition, and hazard identification — all running on-device without cloud dependency",
                    "Added remote controllability for security teams to override autonomous behavior and manually direct the robot when needed"
                ],
                how: [
                    "Used ROS as the middleware layer, connecting sensor inputs (Rplidar for LIDAR, IMU for orientation, cameras for vision) to navigation and detection outputs through ROS topics and services",
                    "Implemented SLAM algorithms that build and update a map of the environment in real-time, enabling the rover to navigate floors it has never seen before",
                    "Ran YOLOv4 for human detection and threat classification on Raspberry Pi, optimized through model pruning and quantization to maintain 30fps inference",
                    "Built a digital twin in Gazebo simulator to test navigation paths, obstacle avoidance, and edge cases before burning competition time on physical hardware",
                    "Designed the control architecture for dual-mode operation: fully autonomous patrol and manual teleoperation, switchable in real-time"
                ],
                bullets: [
                    {
                        id: "rover-01",
                        label: "SLAM + Edge AI Security Robot",
                        receipts: {
                            metric: "Autonomous",
                            layerTags: ["Robotics", "AI"],
                            proofs: ["Built an autonomous SLAM-based security robot with Rplidar, IMU, and camera sensors for the Technoaxian 2023 (World Robotics Championship), navigating multi-floor indoor environments without cloud connectivity", "Integrated YOLOv4 human detection, face recognition, and hazard identification running entirely on edge hardware (Raspberry Pi) at 30fps with model pruning and quantization"],
                            tech: ["ROS", "SLAM", "YOLOv4", "Raspberry Pi", "Rplidar", "IMU"],
                            src: "/robocon/ros-rover.png"
                        }
                    }
                ]
            },
            microMouse: {
                title: "Micro Mouse — Autonomous Maze Navigation",
                problem: "The Technoaxian micro-mouse competition required a robot small enough to fit in maze corridors, fast enough to solve the maze competitively, and smart enough to learn the optimal path — all on a tiny microcontroller with minimal sensor inputs and severe power constraints.",
                built: [
                    "Developed a compact, autonomous maze-solving robot with custom chassis design for stability in tight maze corridors",
                    "Implemented maze-solving algorithms (flood-fill) on a microcontroller, processing IR/ultrasonic sensor data to detect walls and calculate optimal paths",
                    "Designed the motor control system with precise speed adjustments for accurate turns and straight-line tracking in narrow corridors",
                    "Built manual override controls (buttons) for speed adjustment, system reset, and start/stop — essential for competition reliability"
                ],
                how: [
                    "Used infrared and ultrasonic sensors to detect walls and open corridors, feeding distance data to the microcontroller at high frequency",
                    "Implemented flood-fill algorithm for maze exploration: the robot first explores the entire maze, builds an internal map, then calculates and executes the shortest path",
                    "Tuned PID controllers for motor speed to achieve smooth turns and straight-line accuracy — critical when corridors are only slightly wider than the robot",
                    "Designed the power system to balance motor torque with battery life, ensuring the robot had enough energy to complete multiple maze runs per competition round"
                ],
                bullets: [
                    {
                        id: "mouse-01",
                        label: "Autonomous Maze-Solving Robot",
                        receipts: {
                            metric: "Competition-Grade",
                            layerTags: ["Embedded", "Algorithms"],
                            proofs: ["Built an autonomous maze-solving micro mouse with flood-fill algorithms, IR/ultrasonic sensing, and PID-tuned motor control for the Technoaxian 2023 competition", "Designed everything from chassis to firmware: custom PCB, sensor integration, motor drivers, and manual override buttons for competition reliability"],
                            tech: ["Microcontroller", "PID Control", "IR Sensors", "Custom PCB"],
                            src: "/robocon/micro-mouse.png"
                        }
                    }
                ]
            },
            cheepaRobot: {
                title: "Cheepa Robot — Portable Air Quality Monitor",
                problem: "Air quality monitoring traditionally requires expensive, stationary equipment. For the Smart Agro Event organized by the IEI Department, we needed a device that was portable, low-cost, and capable of measuring multiple air quality parameters (VOCs, PM 2.5, CO, pressure, humidity) in real-time — with the added safety requirement of smoke detection and personal health monitoring via pulse oximetry.",
                built: [
                    "Designed a bird-inspired portable air quality measuring device using BME680 sensors for comprehensive environmental monitoring",
                    "Integrated multiple sensor types: VOC detection, PM 2.5 particulate measurement, CO monitoring, pressure sensing, humidity tracking, plus smoke detection sensors",
                    "Added a pulse oximeter for measuring carbon monoxide exposure levels — critical in agricultural and industrial settings where CO is a silent danger",
                    "Built an integrated airflow system that draws air samples into the sensors for accurate measurement, not just ambient diffusion",
                    "Designed real-time OLED display showing all measured parameters simultaneously for immediate on-site readings"
                ],
                how: [
                    "Used BME680 sensor for multi-parameter environmental sensing (VOCs, pressure, humidity, gas resistance) in a single compact package",
                    "Integrated separate PM 2.5 and smoke sensors for particulate matter and fire safety detection — these parameters require different sensing technologies",
                    "Built the airflow system using a small fan to actively draw air samples across the sensors, improving measurement accuracy over passive diffusion",
                    "Designed the enclosure to be lightweight and bird-inspired, making it portable enough for field use — farmers and inspectors can carry it through fields and facilities",
                    "Used OLED display with I2C communication for real-time data visualization, showing all sensor readings on a single compact screen"
                ],
                bullets: [
                    {
                        id: "cheepa-01",
                        label: "Multi-Sensor Air Quality IoT Device",
                        receipts: {
                            metric: "6 Parameters",
                            layerTags: ["IoT", "Sensors"],
                            proofs: ["Designed a portable, bird-inspired air quality monitor measuring VOCs, PM 2.5, CO, pressure, humidity, and smoke — with pulse oximeter for personal safety monitoring", "Built integrated airflow system and real-time OLED display for accurate field measurements, demonstrated at the Smart Agro Event (IEI Department)"],
                            tech: ["BME680", "PM 2.5 Sensor", "Pulse Oximeter", "OLED", "Arduino"],
                            src: "/robocon/cheepa-robot.png"
                        }
                    }
                ]
            },
            rov: {
                title: "ROV — Underwater Inspection for Hydroelectric Projects",
                problem: "Hydroelectric project infrastructure requires regular submerged inspections — dam walls, turbine intakes, and sluice gates all need visual assessment. Sending human divers is dangerous, expensive, and causes operational disruptions. The Smart India Hackathon challenge asked us to propose a safer, more efficient solution for continuous underwater monitoring.",
                built: [
                    "Proposed and prototyped a Remotely Operated Vehicle (ROV) for submerged inspections of hydroelectric infrastructure, eliminating the need for dangerous human dive operations",
                    "Designed the ROV for early detection of structural issues, cracks, and biological fouling on dam surfaces and turbine intakes",
                    "Integrated real-time water quality sensors for environmental monitoring — collecting data on temperature, turbidity, pH, and dissolved oxygen alongside visual inspection",
                    "Built the control system for remote operation from a shore-based station, with live video feed and sensor data telemetry"
                ],
                how: [
                    "Designed the ROV chassis for underwater stability using buoyancy control and multi-thruster propulsion for precise positioning in currents",
                    "Integrated underwater cameras with LED illumination for visual inspection in low-visibility dam environments",
                    "Added environmental monitoring sensors (water quality, temperature, biodiversity indicators) that collect data passively during inspection runs",
                    "Built the telemetry system for real-time data transmission from the ROV to the shore-based operator station via tethered communication",
                    "Presented the solution at Smart India Hackathon, demonstrating how ROVs can prevent operational disruptions and support sustainable hydropower operations"
                ],
                bullets: [
                    {
                        id: "rov-01",
                        label: "Underwater ROV for Dam Inspection",
                        receipts: {
                            metric: "SIH Solution",
                            layerTags: ["Robotics", "IoT"],
                            proofs: ["Proposed and prototyped a Remotely Operated Vehicle for submerged hydroelectric infrastructure inspection at Smart India Hackathon — replacing dangerous human dive operations with autonomous underwater monitoring", "Integrated real-time water quality sensors and visual inspection cameras, enabling early detection of structural issues while collecting environmental data for sustainable operations"],
                            tech: ["ROV", "Underwater Cameras", "Sensors", "Telemetry"],
                            src: "/robocon/rov.png"
                        }
                    }
                ]
            },
            teamProjects: {
                title: "The Broader Team Portfolio — 10+ Robots Shipped",
                problem: "Beyond the four featured projects, SRM Team Robocon shipped a diverse portfolio of robots — each designed for a different competition or event, each solving a unique engineering challenge. The common thread: hard real-time constraints, edge computing, and zero tolerance for failure on the competition floor.",
                built: [
                    "EVA — Autonomous professor and visitor assistant with AI conversation, speech recognition, face detection, and path planning for campus navigation",
                    "PYRO — UV-C sanitization robot achieving 98.5% efficiency with omnidirectional mobility, designed for hospitals and labs during the COVID era",
                    "Spider Bot — Search and rescue robot mimicking spider agility for infrastructure inspection in hazardous environments where wheeled robots cannot operate",
                    "Elephant & Rabbit Robots — Precision ring-throwing and high-speed component handling robots for ABU Robocon's relay-style competition format",
                    "IDEX — 3D-printed welding helmet with HDR cameras, infrared imaging, and dot projectors for real-time parameter display during welding",
                    "Line Follower — Competition bot with 7-channel IR sensor array and Arduino Nano, achieving top-3 finish through advanced sensor integration",
                    "Pentagonal SCARA Plotter — Five-link robotic arm with Raspberry Pi Pico for precision drawing and educational applications"
                ]
            },
            visuals: {
                images: [
                    {
                        src: "/robocon/ros-rover.png?v=1",
                        alt: "ROS Rover — Autonomous Security Robot (CAD Render)",
                        caption: "CAD render of the ROS Rover — an autonomous skid-drive security robot built for Technoaxian 2023 (World Robotics Championship). The four-wheel-drive chassis houses a Raspberry Pi (visible as the dark board), an Rplidar sensor (the cylindrical unit on top for SLAM mapping), and dual antennas for wireless communication. This robot navigates multi-floor indoor environments autonomously using SLAM, detects humans via YOLOv4, and identifies threats — all on edge hardware without cloud connectivity."
                    },
                    {
                        src: "/robocon/pcb-design.jpg?v=1",
                        alt: "Custom PCB Design — Robocon Control Board",
                        caption: "Custom-designed PCB for the competition robots, shown in the EDA tool with full component placement. This board integrates motor drivers, voltage sensors, status LEDs, I2C port headers, CAN bus connectors, and a Teensy microcontroller — all on a single board. Custom PCB design was essential because off-the-shelf boards couldn't meet our size, weight, and pin-count requirements for competition robots."
                    },
                    {
                        src: "/robocon/micro-mouse.png?v=1",
                        alt: "Micro Mouse — Autonomous Maze-Solving Robot",
                        caption: "The Micro Mouse robot for Technoaxian 2023 — a compact, autonomous maze navigator. The 3D-printed chassis houses a microcontroller, motor driver board, IR sensors for wall detection, and a LiPo battery. The wide-tread wheels provide grip for precise turns in tight maze corridors. This robot implements flood-fill algorithms to explore, map, and solve mazes autonomously."
                    },
                    {
                        src: "/robocon/cheepa-robot.png?v=1",
                        alt: "Cheepa Robot — Portable Air Quality Monitor (CAD Render)",
                        caption: "CAD render of the bird-inspired Cheepa Robot — a portable air quality monitoring device developed for the Smart Agro Event. The compact enclosure houses BME680 sensors (VOCs, pressure, humidity), PM 2.5 particulate sensors, smoke detectors, a pulse oximeter, an integrated airflow system, and an OLED display. Designed to be field-portable for agricultural and industrial air quality assessment."
                    },
                    {
                        src: "/robocon/rov.png?v=1",
                        alt: "ROV — Underwater Inspection Vehicle (CAD Render)",
                        caption: "CAD render of the Remotely Operated Vehicle (ROV) proposed at Smart India Hackathon for hydroelectric infrastructure inspection. The multi-thruster design enables precise underwater positioning, while the modular frame accommodates cameras, LED arrays for illumination in murky dam water, and environmental sensors for water quality monitoring. This ROV replaces dangerous human dive operations with safer, more efficient autonomous inspection."
                    }
                ]
            }
        },
        keyDecisions: [
            { decision: "YOLOv4 over Higher-Accuracy Models", why: "Competition robots run on Raspberry Pi with hard real-time constraints. YOLOv4 hit 30fps on edge hardware; heavier models could not.", tradeoff: "Slight drop in mAP for very small objects, but reliable real-time detection on the competition floor." },
            { decision: "ROS over Custom Navigation Stack", why: "ROS provided a mature SLAM + navigation ecosystem (gmapping, move_base) that would take months to build from scratch, and the competition deadline was fixed.", tradeoff: "Larger footprint on the Pi, but dramatically faster development and access to the ROS package ecosystem." },
            { decision: "Custom PCB Design over Off-the-Shelf", why: "Competition weight and size budgets required consolidating motor drivers, sensors, and microcontrollers onto a single board.", tradeoff: "Weeks of PCB design and fabrication time, but lighter, more reliable, and competition-legal hardware." },
            { decision: "Active Airflow over Passive Diffusion (Cheepa)", why: "Passive sensor exposure gives slow, inaccurate readings in open-air agricultural fields with wind.", tradeoff: "Added fan and ducting complexity, but measurements became reliable enough for real agricultural decision-making." }
        ],
        bulletPoints: [
            {
                icon: "Bot",
                headline: "SLAM-Based Autonomous Navigation",
                content: "Developed the ROS Rover — an autonomous security robot with SLAM mapping, YOLOv4 human detection, and face recognition running on edge hardware for the Technoaxian 2023 (World Robotics Championship).",
                metric: "Real-time 30fps"
            },
            {
                icon: "Cpu",
                headline: "Edge AI & Embedded Systems",
                content: "Built real-time computer vision pipelines running YOLOv4 on Raspberry Pi and STM32 microcontrollers, optimized through model pruning and quantization to maintain 30fps inference under competition latency budgets.",
                metric: "Edge AI"
            },
            {
                icon: "Thermometer",
                headline: "IoT Environmental Monitoring",
                content: "Designed the Cheepa Robot — a bird-inspired portable air quality monitor measuring VOCs, PM 2.5, CO, pressure, humidity, and smoke with real-time OLED display and pulse oximetry for the Smart Agro Event.",
                metric: "6 Parameters"
            },
            {
                icon: "Anchor",
                headline: "Underwater ROV for Infrastructure Inspection",
                content: "Proposed and prototyped a Remotely Operated Vehicle at Smart India Hackathon for hydroelectric dam inspection — replacing dangerous human dive operations with autonomous underwater monitoring and environmental sensing.",
                metric: "SIH Solution"
            },
            {
                icon: "Users",
                headline: "10+ Competition-Grade Robots",
                content: "Contributed to 10+ robot projects across ABU Robocon, Smart India Hackathon, and Technoaxian — spanning SLAM navigation, maze-solving, UV-C sanitization, search-and-rescue, and precision robotic arms.",
                metric: "10+ Robots"
            }
        ],
        links: {
            caseStudy: "/experience/robocon",
            website: "https://www.srmteamrobocon.com/"
        }
    },
    {
        id: "lineysha",
        company: "Lineysha & Thevan Technologies",
        role: "AI Engineer — Applied ML & Edge AI",
        domainTags: ["AI/ML", "Research", "IoT"],
        dateRange: "Jan 2021 – Feb 2023",
        location: "India",
        hookLine: "Reduced false positives in anomaly detection by 65% through hybrid LSTM-ARIMA models.",
        proofMetrics: [
            { label: "Data records", value: "50,000+", hint: "Sensor data processing." },
            { label: "Stability", value: "+30%", hint: "Improved predictive robustness." },
            { label: "False positives", value: "−65%", hint: "Via hybrid modeling." }
        ],
        heroMotif: {
            emoji: "🔬",
            title: "Edge AI Research",
            subtitle: "Time-series & Anomaly detection"
        },
        theme: {
            accent: "#8B5CF6",
            motif: "circuit",
            backgroundFx: "css",
            iconSet: "line"
        },
        topStack: ["TensorFlow", "Scikit-Learn", "Apache Airflow", "AWS Lambda", "Docker", "NVIDIA Jetson"],
        fullStackByLayer: {
            API: ["Flask", "REST APIs"],
            Data: ["Pandas", "Airflow ETL", "Time-Series"],
            ML: ["TensorFlow", "Scikit-learn", "LSTM-ARIMA", "Model Compression"],
            Infra: ["AWS Lambda", "Docker", "NVIDIA Jetson Nano", "IaC Pattern"],
            Observability: ["Prometheus", "Grafana", "Schema Validation"]
        },
        chapters: [
            { id: "overview", title: "Overview" },
            { id: "research", title: "ML Research" },
            { id: "systems", title: "Systems" },
            { id: "proof", title: "Impact" },
            { id: "visuals", title: "Visuals" }
        ],
        narrativeSections: {
            overview: {
                paragraphs: [
                    "Lineysha & Thevan Technologies provided an intensive environment for applied ML research. My role centered on time-series forecasting and anomaly detection for industrial sensor data—specifically reducing the 'noise' that often leads to false positives in automated monitoring systems.",
                    "As an AI Engineer, I worked on the bridge between raw experimental models and field-deployable edge solutions, ensuring that research insights could survive the constraints of low-power hardware like the NVIDIA Jetson Nano."
                ],
                ownership: [
                    "Developed and evaluated hybrid LSTM-ARIMA models for time-series forecasting",
                    "Architected serverless inference pipelines using AWS Lambda",
                    "Optimized model weights for deployment on NVIDIA Jetson edge kits",
                    "Automated data ingestion and cleaning workflows with Apache Airflow"
                ]
            },
            research: {
                title: "Applied ML: Hybrid Anomaly Detection",
                problem: "Industrial sensors are notoriously noisy. Traditional statistical models (like ARIMA) struggle with non-linear spikes, while pure deep learning models (like LSTMs) can overfit or lose track of long-term seasonal trends. This leads to a high rate of false positives, causing 'alert fatigue' for operators.",
                built: [
                    "Implemented a hybrid LSTM-ARIMA ensemble that used ARIMA for linear seasonal trends and LSTM for residual non-linear anomaly capture",
                    "Developed systematic cross-validation suites that measured model stability across 50,000+ sensor records",
                    "Explored model quantization techniques to compress TensorFlow models for real-time edge inference"
                ],
                how: [
                    "Utilized Scikit-Learn and TensorFlow to build and train the ensemble architecture",
                    "Applied sliding-window techniques to prepare high-frequency sensor data for sequential model training",
                    "Conducted feature importance analysis to identify the most critical sensors for anomaly prediction, reducing input dimensionality"
                ]
            },
            systems: {
                title: "Engineering: Edge-to-Cloud Pipelines",
                problem: "Moving from a Jupyter Notebook to a production pipeline is a major hurdle. Models frequently crashed due to input data drift or schema changes, and deployments were manual and error-prone.",
                built: [
                    "Wired a complete ETL and retraining pipeline using Apache Airflow to handle daily sensor dumps",
                    "Designed a serverless inference layer using AWS Lambda, allowing for scalable, on-demand anomaly checks",
                    "Implemented deep observability with Grafana to track model 'drift'—catching when live data deviated too far from training sets"
                ],
                how: [
                    "Built Dockerized tasks for Airflow to ensure consistent environments across local development and production",
                    "Used Pydantic and schema-validation gates to stop 'toxic data' from reaching the models, preventing 90%+ of pipeline crashes",
                    "Integrated Prometheus metrics to monitor API latency and model inference times at the edge"
                ]
            },
            proof: {
                title: "Impact: Accuracy & Reliability",
                bullets: [
                    "Cut false positive rates by 65%, significantly reducing operator alert fatigue",
                    "Improved predictive robustness by 30% through hybrid model stabilization",
                    "Proved that complex ML models could be reliably served on $99 edge hardware through quantization",
                    "Established a 'Schema-First' data culture that eliminated silent pipeline failures"
                ]
            },
            visuals: {
                images: [
                    {
                        src: "/lineysha/anomaly-graph.png",
                        alt: "Anomaly Detection Curve",
                        caption: "Visualization of the hybrid LSTM-ARIMA model: ARIMA captures the base seasonality while LSTM identifies the residual non-linear spikes with 65% fewer false positives."
                    },
                    {
                        src: "/lineysha/jetson-deploy.png",
                        alt: "Jetson Nano Edge Pipeline",
                        caption: "The end-to-end deployment flow: Data ingestion → Airflow ETL → Model Quantization → NVIDIA Jetson Nano inference."
                    }
                ]
            }
        },
        interactiveBullets: [],
        keyDecisions: [
            { decision: "Hybrid LSTM-ARIMA", why: "To capture both linear and non-linear patterns in sensor data.", tradeoff: "Harder to maintain and retrain compared to single models." }
        ],
        links: {
            caseStudy: "/experience/lineysha"
        }
    },
    {
        id: "builder",
        company: "Builder.ai",
        role: "AI Engineering Intern — Prompt-to-app GenAI Workflows",
        domainTags: ["AI/ML", "GenAI", "Product"],
        dateRange: "Jul 2020 – Jan 2021",
        location: "Remote",
        hookLine: "Built RAG-inspired flows that turned natural language into structured app blueprints.",
        proofMetrics: [
            { label: "Orchestration", value: "FastAPI", hint: "High-performance API layer." },
            { label: "Search", value: "FAISS", hint: "Vector similarity search." },
            { label: "Models", value: "GPT-3 & Codex", hint: "Early LLM adoption." },
            { label: "Schema", value: "JSON-Schema", hint: "Blueprint validation." }
        ],
        heroMotif: {
            emoji: "🧱",
            title: "Builder AI",
            subtitle: "Prompt-to-app workflows"
        },
        theme: {
            accent: "#000000",
            motif: "notebook",
            backgroundFx: "svg",
            iconSet: "duotone"
        },
        topStack: ["Python", "FastAPI", "OpenAI", "Codex", "FAISS", "Docker", "JSON-Schema"],
        fullStackByLayer: {
            API: ["FastAPI", "RESTful Orchestration", "Python"],
            Data: ["FAISS Vector Store", "Structured Blueprint JSON"],
            ML: ["OpenAI GPT-3", "OpenAI Codex", "Prompt Engineering", "Chain-of-Thought Patterns"],
            Infra: ["Docker", "AWS ECS", "GCP Cloud Run"],
            Observability: ["Versioned Prompts", "Coherence Scoring", "JSON Validation"]
        },
        chapters: [
            { id: "overview", title: "Overview" },
            { id: "discovery", title: "Discovery" },
            { id: "systems", title: "Systems" },
            { id: "gen-ai", title: "Gen-AI" },
            { id: "proof", title: "Proof" },
            { id: "visuals", title: "Visuals" }
        ],
        narrativeSections: {
            overview: {
                paragraphs: [
                    "Builder.ai is a leading platform for AI-powered app construction. During my internship, I worked at the bleeding edge of Generative AI, long before the 'GPT-boom' became mainstream. My mission was to help close the gap between a user's natural language idea and a structured, buildable application blueprint.",
                    "This involved not just 'prompting', but building a robust orchestration layer that could validate AI outputs, handle ambiguity, and map vague intents to specific software architectures."
                ],
                ownership: [
                    "Architected prompt-to-blueprint orchestration using FastAPI",
                    "Implemented early RAG patterns with FAISS for intent mapping",
                    "Designed fallbacks for ambiguous user specifications",
                    "Collaborated with product teams to define the 'Spec-to-Code' bridge"
                ]
            },
            discovery: {
                title: "The Problem: The Intent-to-Architecture Gap",
                problem: "Translating a user's 'I want an Uber for cats' into a technical reality requires more than just code; it requires a structured blueprint of features, data schemas, and user flows. Manual specification gathering was slow and prone to human error. We needed an AI-driven system that could parse intent and propose a coherent software structure instantly.",
                built: [
                    "Developed semantic mapping systems that identified core 'entities' and 'features' from raw text prompts",
                    "Built a blueprint generator that produced valid JSON schemas describing intended app functionality",
                    "Created a 'Similar Blueprint' search tool to help users refine their ideas based on existing successful architectures"
                ],
                how: [
                    "Used FAISS (Facebook AI Similarity Search) to index thousands of existing feature descriptions, allowing us to find the closest 'technical matches' for any given user prompt",
                    "Structured the data layer to treat 'Features' as reusable components that the AI could 'pick and place' into a new blueprint",
                    "Implemented JSON-Schema as the source of truth, ensuring that AI-generated blueprints were always machine-readable and valid"
                ]
            },
            systems: {
                title: "System Architecture: Orchestration & Validation",
                built: [
                    "Designed a middleware layer that buffered LLM responses, ensuring we didn't ship 'hallucinations' to the frontend",
                    "Implemented versioned prompt storage, allowing us to iterate on prompt engineering without breaking production flows",
                    "Created an internal dashboard to monitor prompt performance and coherence scores across different user demographics"
                ],
                how: [
                    "Developed 'Validation Gates'—small, specialized scripts that checked the AI's output for specific structural requirements before proceeding",
                    "Leveraged FastAPI for its high concurrency and pydantic models, providing a second layer of type-safety for AI outputs",
                    "Integrated with OpenAI's beta Codex and GPT-3 APIs, experimenting with early few-shot prompting techniques to improve schema accuracy"
                ]
            },
            genAi: {
                title: "Gen-AI Workflows: Prompt Chaining & RAG",
                built: [
                    "Pioneered early 'Prompt Chaining' workflows where the output of one LLM call defined the context for the next",
                    "Optimized token usage by injecting relevant 'blueprint snippets' into the model context dynamically",
                    "Refined the 'Identity' of the AI assistant to act as a Senior Technical Lead, improving the quality of the generated architectures"
                ],
                how: [
                    "Implemented a Retrieval-Augmented Generation (RAG) approach: searching for relevant technical docs and injecting them into the prompt to 'ground' the AI's response",
                    "Balanced creative intent vs. technical constraints by enforcing deterministic 'anchor points' within the prompts",
                    "Experimented with Codex's ability to 'summarize' technical requirements into buildable task lists"
                ]
            },
            proof: {
                title: "The Result: Faster Spec to Build",
                bullets: [
                    "Dramatically reduced the time required to move from 'Concept' to 'Technical Blueprint'",
                    "Isolated specific 'Intent Mismatches' through iterative coherence monitoring",
                    "Established the foundational prompting patterns later used for the platform's 'Natasha' AI assistant"
                ]
            },
            visuals: {
                images: [
                    {
                        src: "/builder-ai/blueprint-flow.png",
                        alt: "Prompt-to-Blueprint Flow Diagram",
                        caption: "A visualization of the orchestration layer: Natural language input → FAISS vector search → GPT-3 blueprint generation → JSON Schema validation → Structured API output."
                    },
                    {
                        src: "/builder-ai/schema-editor.png",
                        alt: "GenAI Blueprint Validation Interface",
                        caption: "The internal validation dashboard showing real-time coherence scoring of AI-generated schemas against historical success patterns."
                    }
                ]
            }
        },
        interactiveBullets: [],
        keyDecisions: [
            { decision: "FAISS over Traditional Search", why: "Traditional keyword search failed to understand the 'vibe' of complex app requests; vector search captured semantic intent.", tradeoff: "Required maintaining an embedding pipeline and managing vector index updates." },
            { decision: "Stateless Prompt Chaining", why: "To keep the API resilient and horizontally scalable, we pushed state back to the client/database rather than holding LLM context in memory.", tradeoff: "Slightly higher latency per request due to context re-injection." },
            { decision: "Codex over GPT-3 for Logic", why: "Early Codex models significantly outperformed standard GPT-3 in generating structured JSON and technical task lists.", tradeoff: "Higher cost per 1k tokens during the beta period." }
        ],
        links: {
            caseStudy: "/experience/builder"
        }
    },
    {
        id: "alweb",
        company: "Alweb.ai",
        role: "AI Intern — Prompt-driven UI generation",
        domainTags: ["AI/ML", "Web", "Design"],
        dateRange: "Jul 2019 – Jul 2020",
        location: "Remote",
        hookLine: "Pioneered prompt-to-UI workflows mapping user intent to SEO-optimized page structures.",
        proofMetrics: [
            { label: "Focus", value: "UI Generation", hint: "Prompt-driven layouts." },
            { label: "DB", value: "Firebase", hint: "Real-time sync for editors." },
            { label: "Stack", value: "GPT-3 · Flask", hint: "Scalable API prototype." },
            { label: "SEO", value: "Semantic", hint: "LLM-optimized tagging." }
        ],
        heroMotif: {
            emoji: "🌐",
            title: "Alweb AI",
            subtitle: "Semantic UI generation"
        },
        theme: {
            accent: "#E97627",
            motif: "notebook",
            backgroundFx: "css",
            iconSet: "line"
        },
        topStack: ["Python", "Flask", "GPT-3", "Firebase", "HTML/CSS", "SEO"],
        fullStackByLayer: {
            API: ["Flask", "REST APIs", "Python"],
            Data: ["Firebase Realtime DB", "NoSQL"],
            ML: ["OpenAI GPT-3", "NLP", "Semantic Parsing", "few-shot Prompting"],
            Infra: ["Python Environment", "GCP Deployment"],
            Observability: ["Quality Gates", "Coherence Checks", "SEO Audit Logs"]
        },
        chapters: [
            { id: "overview", title: "Overview" },
            { id: "product", title: "Product" },
            { id: "systems", title: "Systems" },
            { id: "ai-flow", title: "AI-Flow" },
            { id: "impact", title: "Impact" },
            { id: "visuals", title: "Visuals" }
        ],
        narrativeSections: {
            overview: {
                paragraphs: [
                    "Alweb.ai was one of the early pioneers in the 'AI Website Builder' space. Long before tools like Framer or Wix ADI became household names, we were experimenting with how GPT-3 could convert a simple marketing sentence into a fully structured, SEO-optimized web layout.",
                    "As an AI Intern, my role centered on the bridge between raw LLM completions and render-ready HTML structures. I helped define the mapping logic that ensured AI-generated content didn't just 'look' good, but also followed strict semantic and SEO rules."
                ],
                ownership: [
                    "Developed Flask inference APIs for real-time UI generation",
                    "Integrated Firebase for collaborative, real-time layout editing",
                    "Tuned early GPT-3 prompts to produce valid semantic HTML wrappers",
                    "Collaborated with designers to define the AI's 'layout constraints'"
                ]
            },
            product: {
                title: "The Vision: Automated Marketing Layouts",
                problem: "Small businesses and marketing teams often struggle to move from a 'Content Doc' to a 'Landing Page'. The design-to-development cycle was too slow for rapid testing. We wanted to build a tool where a user could type their value proposition and get a structured, sectioned landing page proposal in seconds.",
                built: [
                    "Implemented layout-intent parsers that translated marketing goals (e.g., 'Lead Gen', 'Event Info') into specific section hierarchies",
                    "Built a real-time 'Editor Sync' layer using Firebase, allowing multiple users to tweak AI-generated sections simultaneously",
                    "Created simple SEO automation rules that injected targeted keywords into the generated LLM structures"
                ],
                how: [
                    "Mapped specific marketing 'Intents' to predefined component sets: Hero, Features, Testimonial, and CTA",
                    "Utilized Firebase's real-time listeners to ensure that whenever the AI updated a section, all concurrent editors saw the change instantly",
                    "Designed the frontend to treat GPT-3 outputs as 'Proposals' that could be manually refined by the user"
                ]
            },
            systems: {
                title: "System Design: Prototype to Persistence",
                built: [
                    "Architected a Flask-based backend to manage user sessions and OpenAI completions",
                    "Established a structured NoSQL schema in Firebase to store versioned 'User Projects'",
                    "Implemented quality gates that stripped out non-semantic or broken HTML tags generated by the early GPT-3 models"
                ],
                how: [
                    "Developed a 'Regex-based Cleaner' specifically for GPT-3 outputs to handle the common formatting quirks of early LLMs",
                    "Built the backend as a stateless API, passing context through the request payload to maintain simplicity",
                    "Leveraged Python's Flask-RESTful extension to build a clean, documented interface for the frontend React components"
                ]
            },
            aiFlow: {
                title: "AI Workflows: Intent Mapping",
                built: [
                    "Defined few-shot prompting patterns to help GPT-3 understand the difference between a 'Section Title' and 'Section Content'",
                    "Applied semantic parsing techniques to extract metadata (keywords, imagery themes) from user input",
                    "Contributed to the prompt library for 'Style Injection', allowing users to select a 'Tone' for their website generation"
                ],
                how: [
                    "Crafted specialized system prompts that acted as a 'Virtual Web Designer', enforcing hierarchy and readability in the output text",
                    "Used early NLP libraries to stem and tokenize user inputs for better keyword enrichment within the prompts",
                    "Experimented with temperature and top-p settings to find the balance between 'Creative Copy' and 'Technical Accuracy'"
                ]
            },
            impact: {
                title: "The Result: SEO-First Generation",
                bullets: [
                    "Proved that LLMs could generate structured web schemas with 80%+ structural accuracy in early testing",
                    "Significantly lowered the technical barrier for non-designers to prototype landing pages",
                    "Laid the groundwork for semantic-first web generation, prioritizing SEO over purely aesthetic placeholders"
                ]
            },
            visuals: {
                images: [
                    {
                        src: "/alweb-ai/layout-gen.png",
                        alt: "Prompt-to-UI Generation Engine",
                        caption: "A screenshot of the early prototype: A single sentence input generating a structured five-section landing page blueprint."
                    },
                    {
                        src: "/robocon/rov.png",
                        alt: "Real-time Collaborative Editor",
                        caption: "Visualizing the Firebase real-time sync: Multiple cursors editing the AI-suggested titles and content blocks concurrently."
                    }
                ]
            }
        },
        interactiveBullets: [],
        keyDecisions: [
            { decision: "Firebase for State Management", why: "Wanted immediate, collaborative feedback for users as the AI 'wrote' the page; traditional polling was too slow.", tradeoff: "Limited query capabilities compared to SQL, but perfect for document-based project storage." },
            { decision: "Semantic HTML over Div-Soup", why: "Ensured generated pages were 'SEO-ready' by default, providing more value than simple visual builders.", tradeoff: "Required much more complex prompt engineering to force the AI into specific tag structures." },
            { decision: "Flask for Rapid Prototyping", why: "Python's rich ecosystem for NLP and AI made Flask the obvious choice for building the inference middle-layer quickly.", tradeoff: "Slightly less performant than Node.js for high-concurrency WebSocket loads, but sufficient for the MVP stage." }
        ],
        links: {
            caseStudy: "/experience/alweb"
        }
    }
];
