export const contributionsData = [
    // ═══════════════════════════════════════════════════════════════
    // WORKSHOPS (Featured) — Full expanded gallery on main page
    // ═══════════════════════════════════════════════════════════════
    {
        id: "workshop-talk",
        slug: "workshop-talk",
        title: "Technical Programming Workshops",
        category: "Workshops",
        featured: true,
        bentoSize: "expanded",
        impactHeadline: "Mentored aspiring engineers in Python, C++, Java, ML, and GenAI foundations — building repeatable playbooks that helped teams prototype faster.",
        details: {
            role: "Lead Speaker & Curriculum Designer",
            whatIDid: "Designed and delivered hands-on technical workshops covering multiple paradigms from basic syntax to full-stack ML deployments. Created repeatable resources for future workshop leaders.",
            whyItMattered: "Scaled my personal engineering knowledge into tangible community impact, helping early-career devs prototype faster and build confidence in production-grade development.",
            proof: "Video recordings, presentation slides, curriculum repositories, and workshop photographs.",
            linkUrl: null
        },
        highlights: [
            "Curated and delivered multi-day technical workshops across 4+ languages",
            "Covered Python, C++, Java, ML, and Generative AI for 50+ participants",
            "Created repeatable playbooks and hands-on coding templates adopted by peers"
        ],
        skills: ["Python", "Machine Learning", "Technical Communication", "C++", "Java", "GenAI"],
        proofTags: ["Workshop", "Video", "Mentorship"],
        media: [
            { type: "video", url: "/contributions/Mentorship and Tutoring/Workshop talk.mp4", thumbnail: "/Workshops/outreachmain.jpeg", caption: "Live workshop talk — teaching ML fundamentals" },
            { type: "image", url: "/Workshops/outreachmain.jpeg", caption: "Leading a hands-on Python coding session" },
            { type: "image", url: "/Workshops/outreach.jpeg", caption: "Workshop in progress — full house" },
            { type: "image", url: "/Workshops/outreach1.jpeg", caption: "Pair-programming mentorship during workshop" },
            { type: "image", url: "/Workshops/outreach2.jpeg", caption: "Students presenting their workshop projects" },
            { type: "image", url: "/Workshops/outreach3.jpg", caption: "Group coding exercise — C++ fundamentals" },
            { type: "image", url: "/Workshops/outreach4.JPG", caption: "Teaching Java frameworks to beginners" },
            { type: "image", url: "/Workshops/outreach5.jpeg", caption: "Collaborative debugging session" },
            { type: "image", url: "/Workshops/outreach6.jpeg", caption: "GenAI foundations walkthrough" },
            { type: "image", url: "/Workshops/outreach7.jpeg", caption: "One-on-one mentorship during lab time" },
            { type: "image", url: "/Workshops/outreach8.jpeg", caption: "Workshop wrap-up and Q&A" },
            { type: "image", url: "/Workshops/Python Image.jpeg", caption: "Python workshop flyer design" },
            { type: "image", url: "/Workshops/Poster Image.jpeg", caption: "Event poster for engineering outreach" },
        ],
        links: []
    },

    // ═══════════════════════════════════════════════════════════════
    // EAGLE EYE AI — GradInnoHack (Expanded deep-dive)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "eagle-eye-ai",
        slug: "eagle-eye-ai",
        title: "🏆 GradInnoHack 2025 — Eagle Eye AI",
        category: "Research",
        featured: true,
        bentoSize: "medium",
        impactHeadline: "Won at GradInnoHack 2025 — built a real-time AI-powered crime detection system from scratch in 48 hours. Click to see the full hackathon story, architecture, and live demo.",
        details: {
            role: "AI Engineer & Lead Developer",
            whatIDid: "Built a CCTV intelligence pipeline that ingests video streams, extracts frames at a configurable cadence (as low as 0.25 seconds), stores frames plus metadata, and runs detection and alert routing to surface high-risk incidents for rapid security triage. Integrated GPT-4 Vision and Claude to generate incident summaries from selected frames, using deterministic keyword gates (snatching, stabbing, robbing, foul play), idempotent processing, and audit-friendly records so alerts stay reliable and explainable.",
            whyItMattered: "According to the FBI's Crime Clock statistics, a violent crime occurred every 26.3 seconds in the United States — approximately 137 violent crimes per hour. Manually scanning hours of surveillance footage is time-consuming, labor-intensive, and prone to human error. Eagle Eye AI addresses this by integrating AI-powered visual understanding with real-time monitoring, providing law enforcement with a proactive tool for automated suspect detection, enhancing public safety, operational efficiency, and investigative accuracy. There is no current tool that connects surveillance footage with real-time alerts or understands what's happening visually and intelligently flags it for response.",
            proof: "Competition pitch, live demo, documented LinkedIn recap, and GitHub repository.",
            linkUrl: "https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_gradinnohack2025-eagleeyeai-ai-activity-7315266190489047041-496I"
        },
        extendedDescription: {
            problemStatement: "According to the FBI's Crime Clock statistics, a violent crime occurred every 26.3 seconds in the United States, equating to approximately 137 violent crimes per hour. In urgent criminal situations such as kidnappings, robberies, or assaults, law enforcement agencies often receive suspect descriptions that include visual details like gender, clothing, accessories, or behavior. Manually scanning hours of surveillance footage to locate suspects is time-consuming, labor-intensive, and prone to human error.",
            proposedSolution: "Eagle Eye AI is a real-time surveillance intelligence system that detects, understands, and notifies threats from video instantly. The system bridges the gap between law enforcement and live camera feeds, transforming passive video into actionable insight for first responders. It works by identifying people, analyzing interactions, and summarizing what's happening in the scene in human language — with built-in keyword-based threat filtering that scans every generated summary for crime-relevant terms to prioritize high-risk frames and alert authorities immediately.",
            realWorldScenario: "A female pedestrian, described as an adult wearing a pink saree, was walking alone when an unidentified male suspect approached her from behind and forcefully snatched a gold chain from her neck. YOLOv8 detects both individuals and tracks their movement. The relevant frame is passed to OpenAI Vision, which generates: 'A man is seen approaching a woman in pink attire and appears to snatch something from her neck.' Our keyword engine detects the term 'snatch,' flagging the frame and generating an immediate alert with timestamp and visual reference, enabling responders to act without delay.",
            technicalHighlights: [
                "Built a CCTV intelligence pipeline ingesting video streams with configurable frame extraction cadence (as low as 0.25s)",
                "Integrated GPT-4 Vision and Claude for incident summary generation from selected frames",
                "Implemented deterministic keyword gates (snatching, stabbing, robbing, foul play) with idempotent processing",
                "Designed audit-friendly record keeping so alerts stay reliable and explainable",
                "YOLOv8-based person detection and tracking across video frames"
            ]
        },
        highlights: [
            "Built and demoed real-time AI crime detection at GradInnoHack 2025",
            "CCTV pipeline: video ingestion → frame extraction → GPT-4 Vision analysis → alert routing",
            "Deterministic keyword gates with idempotent processing for reliable, explainable alerts",
            "Integrated YOLOv8, GPT-4 Vision, and Claude for multi-model AI analysis",
            "No existing tool connects surveillance with real-time visual understanding and alerting"
        ],
        skills: ["YOLOv8", "GPT-4 Vision", "Claude", "Real-time Systems", "Python", "Computer Vision", "AI Engineering"],
        proofTags: ["Hackathon", "AI", "Real-time", "GitHub"],
        media: [
            { type: "image", url: "/contributions/Linkedin/Hackathon.jpg", caption: "GradInnoHack 2025 — Eagle Eye AI team and live demo" }
        ],
        links: [
            { label: "View on LinkedIn", url: "https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_gradinnohack2025-eagleeyeai-ai-activity-7315266190489047041-496I" },
            { label: "GitHub Repository", url: "https://github.com/ghantapavan93/eagle-eye-ai" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // RESEARCH (Featured)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "sudt-research",
        slug: "sudt-research-paper",
        title: "SUDT Research Paper — Speech Enhancement Using Deep Learning",
        category: "Research",
        featured: true,
        bentoSize: "expanded",
        impactHeadline: "Published peer-reviewed research demonstrating expertise in ML model training, large dataset processing, and encoder-decoder architectures for real-time audio enhancement.",
        details: {
            role: "Lead Author & ML Researcher",
            whatIDid: "Designed a novel speech enhancement system using encoder-decoder deep learning architectures. Trained models on large-scale noisy audio datasets, iterating through fine-tuning cycles to optimize real-time noise reduction on low-compute hardware.",
            whyItMattered: "Validated my ability to take a research problem from hypothesis to peer-reviewed publication — demonstrating hands-on ML expertise in training huge datasets, fine-tuning model parameters, and writing production-grade research.",
            proof: "Published and indexed in the International Journal For Multidisciplinary Research (IJFMR).",
            linkUrl: "https://www.ijfmr.com/research-paper.php?id=12384"
        },
        highlights: [
            "Trained deep learning models on large-scale audio datasets with noise augmentation",
            "Implemented encoder-decoder architecture achieving real-time speech enhancement",
            "Navigated full peer-review cycle and published in IJFMR"
        ],
        skills: ["Machine Learning", "Deep Learning", "Data Processing", "Research", "Technical Writing", "Python"],
        proofTags: ["Published", "Paper", "ML", "Link"],
        media: [
            { type: "image", url: "/contributions/Research paper/SUDT.png", caption: "Published paper — Speech Enhancement Using Deep Learning Techniques" }
        ],
        links: [
            { label: "View Publication", url: "https://www.ijfmr.com/research-paper.php?id=12384" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // PUBLICATIONS (Featured) — UNT Library Symposium
    // ═══════════════════════════════════════════════════════════════
    {
        id: "unt-symposium",
        slug: "unt-symposium",
        title: "UNT Library Symposium — Archived Publication",
        category: "Publications",
        featured: true,
        bentoSize: "expanded",
        impactHeadline: "My name is fetched in official UNT Library records — documenting a reusable reference architecture for modular RAG pipelines, evaluation harnesses, and responsible AI guardrails adopted across new assistants.",
        details: {
            role: "Sole Presenter & Author",
            whatIDid: "Prepared and delivered a comprehensive case study bridging academic research with practical software engineering. Documented a reusable reference architecture for modular RAG pipelines, evaluation harnesses, and responsible AI guardrails that new student assistants now use as their starting framework.",
            whyItMattered: "My work is now referenced in UNT's official digital library. New students and assistants use this as their base framework to continue their work — proving I build systems that outlast my direct involvement.",
            proof: "Archived in the UNT Digital Library and presented at the official university symposium.",
            linkUrl: "https://digital.library.unt.edu/ark:/67531/metadc2434846/"
        },
        highlights: [
            "Archived in UNT Digital Library — my name is in official university records",
            "Documented reusable RAG pipeline reference architecture adopted by new assistants",
            "Presented to faculty, researchers, and industry peers at the official symposium"
        ],
        skills: ["Public Speaking", "RAG Pipelines", "Responsible AI", "Technical Writing", "Academic Research"],
        proofTags: ["Symposium", "Publication", "Archived", "UNT"],
        media: [
            { type: "image", url: "/contributions/UNT Library Publication/Symposium photo.png", caption: "Presenting at the UNT Library Symposium" },
            { type: "image", url: "/contributions/UNT Library Publication/download.jpg", caption: "Symposium event documentation" },
        ],
        links: [
            { label: "UNT Digital Library", url: "https://digital.library.unt.edu/ark:/67531/metadc2434846/" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // PUBLICATIONS — Works Published at UNT
    // ═══════════════════════════════════════════════════════════════
    {
        id: "works-published-unt",
        slug: "works-published-unt",
        title: "Works Published & Events at UNT",
        category: "Publications",
        featured: false,
        bentoSize: "expanded",
        impactHeadline: "Conducted multiple events, maintained the UNT Discovery Park Library guide site, and created engineering outreach materials used university-wide.",
        details: {
            role: "Student Leader, Event Organizer & Site Maintainer",
            whatIDid: "Organized and led multiple technical events including National Engineering Week and Python workshops. Maintained the UNT Discovery Park Library guide website, adding photos and updating content for students and faculty.",
            whyItMattered: "Proved I can organize, document, and promote technical initiatives at scale — not just writing code, but building the systems and materials that support an engineering community.",
            proof: "Archived flyers, workshop images, CITI certification, and the maintained library guide site.",
            linkUrl: "https://guides.library.unt.edu/c.php?g=1329081"
        },
        highlights: [
            "Led National Engineering Week outreach and Python workshop series",
            "Maintained the UNT Discovery Park Library guide site with photos and content",
            "Earned CITI research certification for responsible research conduct"
        ],
        skills: ["Event Management", "Technical Writing", "Python", "Research Ethics", "Web Content"],
        proofTags: ["Event", "Workshop", "Certificate", "Site"],
        media: [
            { type: "image", url: "/contributions/Works Published at UNT/crack_the_code_to_computer_programming.png", caption: "Crack the Code to Computer Programming — event flyer" },
            { type: "image", url: "/contributions/Works Published at UNT/python workshop.png", caption: "Python Workshop outreach materials" },
            { type: "image", url: "/contributions/Works Published at UNT/_National_Engineering_Week_flyer.png", caption: "National Engineering Week flyer" },
            { type: "image", url: "/contributions/Works Published at UNT/certificate citi.png", caption: "CITI Research Ethics Certification" },
            { type: "image", url: "/contributions/Works Published at UNT/Symposium photo.png", caption: "Presenting at the university symposium" },
            { type: "image", url: "/contributions/Works Published at UNT/download.jpg", caption: "Published works documentation" },
        ],
        links: [
            { label: "UNT Library Guide Site", url: "https://guides.library.unt.edu/c.php?g=1329081" }
        ]
    },


    // ═══════════════════════════════════════════════════════════════
    // WORKSHOPS — Time at UNT Photo Gallery
    // ═══════════════════════════════════════════════════════════════
    {
        id: "time-at-unt",
        slug: "time-at-unt",
        title: "My Time at UNT — Photo Gallery",
        category: "Workshops",
        featured: false,
        bentoSize: "expanded",
        impactHeadline: "A visual log of community engagement, hackathons, and technical outreach — the human side of engineering.",
        details: {
            role: "Volunteer Mentor & Engineering Student Leader",
            whatIDid: "Facilitated coding events, mentored teams through roadblocks, and helped build a collaborative engineering culture through hands-on technical outreach across campus.",
            whyItMattered: "Demonstrates my commitment to the human element of software engineering — debugging together and fostering the next generation of engineers.",
            proof: "Event photography collection spanning multiple semesters.",
            linkUrl: null
        },
        highlights: [
            "Facilitated community-driven hackathons and coding events",
            "Mentored aspiring developers in hands-on lab environments",
            "Built a collaborative engineering culture across departments"
        ],
        skills: ["Mentorship", "Community Building", "Leadership", "Event Management"],
        proofTags: ["Gallery", "Outreach", "Photos"],
        media: [
            { type: "image", url: "/contributions/Time at UNT/thumbnail-1.jpeg", caption: "Engineering outreach event" },
            { type: "image", url: "/contributions/Time at UNT/thumbnail-2.jpeg", caption: "Collaborative workspace" },
            { type: "image", url: "/contributions/Time at UNT/thumbnail-3.jpeg", caption: "Technical mentorship session" },
            { type: "image", url: "/contributions/Time at UNT/thumbnail-4.jpeg", caption: "Hackathon team collaboration" },
            { type: "image", url: "/contributions/Time at UNT/thumbnail-5.jpeg", caption: "Workshop lab setup" },
            { type: "image", url: "/contributions/Time at UNT/thumbnail-6.jpeg", caption: "Presenting technical concepts" },
            { type: "image", url: "/contributions/Time at UNT/thumbnail-7.jpeg", caption: "Group coding challenge" },
            { type: "image", url: "/contributions/Time at UNT/thumbnail-8.jpeg", caption: "Building projects together" },
            { type: "image", url: "/contributions/Time at UNT/thumbnail-9.jpeg", caption: "End-of-semester celebration" },
        ],
        links: []
    },

    // ═══════════════════════════════════════════════════════════════
    // LINKEDIN POSTS (Medium cards — larger images + more depth)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "linkedin-mentorship",
        slug: "linkedin-mentorship",
        title: "My Experience in AI & Mentorship",
        category: "Mentorship",
        featured: false,
        bentoSize: "medium",
        impactHeadline: "Documented the real challenges of translating high-level ML concepts into digestible lessons for junior developers — a reflection on what it takes to mentor in AI, from debugging neural nets to explaining gradient descent over coffee.",
        details: {
            role: "Content Creator / Developer Advocate",
            whatIDid: "Authored a detailed post documenting the specific challenges of translating high-level ML concepts for junior developers. Covered the gap between academic AI theory and practical engineering reality.",
            whyItMattered: "Built transparency in public, engaging my professional network around the realities of mentoring in AI. Showed that effective mentorship requires simplifying without dumbing down.",
            proof: "High-engagement LinkedIn post with broad community response.",
            linkUrl: "https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_softwareengineering-ai-machinelearning-activity-7292416543970275328-8eUa"
        },
        highlights: [
            "Shared industry insights on AI, Software Engineering, and the mentorship gap",
            "Engaged a broad professional network with candid observations",
            "Documented the real experience of technical mentorship beyond the textbook"
        ],
        skills: ["AI Strategy", "Developer Advocacy", "Content Creation", "Machine Learning"],
        proofTags: ["LinkedIn", "Article", "AI"],
        media: [
            { type: "image", url: "/contributions/Linkedin/My exp in AI.jpg", caption: "My Experience in AI, Software Development & Mentorship" }
        ],
        links: [
            { label: "View on LinkedIn", url: "https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_softwareengineering-ai-machinelearning-activity-7292416543970275328-8eUa" }
        ]
    },
    {
        id: "linkedin-python",
        slug: "linkedin-python",
        title: "Create with Python",
        category: "Workshops",
        featured: false,
        bentoSize: "medium",
        impactHeadline: "Built a web application out of a pain point — students kept asking the same questions. Used Python to create an interactive tool with a real-world thermostat example that made complex concepts click instantly.",
        details: {
            role: "Technical Author & Builder",
            whatIDid: "Created a working web application to solve a recurring student problem. Used real-world examples like a thermostat controller to teach Python concepts, making abstract programming ideas tangible and immediately useful.",
            whyItMattered: "Sparked a community discussion on how the best tools come from real pain points. Proved that rapid prototyping in Python can solve real educational gaps faster than any curriculum committee.",
            proof: "Published LinkedIn technical post with strong engagement from the educator community.",
            linkUrl: "https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_python-softwareengineering-ai-activity-7298758761836331008-z51Q"
        },
        highlights: [
            "Built a web app to solve a real student pain point",
            "Used real-world examples like thermostat controllers for teaching",
            "Advocated for rapid prototyping over overthinking in education tools"
        ],
        skills: ["Python", "Rapid Prototyping", "Software Architecture", "Education Technology"],
        proofTags: ["LinkedIn", "Discussion", "Python"],
        media: [
            { type: "image", url: "/contributions/Linkedin/Create with python.jpg", caption: "Create with Python — turning pain points into working tools" }
        ],
        links: [
            { label: "View on LinkedIn", url: "https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_python-softwareengineering-ai-activity-7298758761836331008-z51Q" }
        ]
    },
    {
        id: "linkedin-js",
        slug: "linkedin-js",
        title: "JavaScript Innovation at UNT",
        category: "Publications",
        featured: false,
        bentoSize: "medium",
        impactHeadline: "A technical retrospective on modern frontend architectures — comparing component-driven development vs. framework abstractions, and how JavaScript innovation at UNT pushes the boundaries of web engineering.",
        details: {
            role: "Frontend Advocate & Technical Writer",
            whatIDid: "Shared a deep analysis of component-driven architectures versus high-level framework abstractions, drawing from real project experience at UNT. Compared React, vanilla JS, and emerging patterns.",
            whyItMattered: "Represented a solid understanding of web performance fundamentals and created high-signal technical dialogue in the professional community. Proved I think beyond just using tools — I evaluate them critically.",
            proof: "Published LinkedIn retrospective with technical depth and community engagement.",
            linkUrl: "https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_webdevelopment-javascript-frontenddevelopment-activity-7308894816111669248-60sD"
        },
        highlights: [
            "Analyzed the tradeoffs between modern frontend frameworks and standards",
            "Discussed JavaScript performance optimization and architecture decisions",
            "Represented UNT's tech innovation culture in professional discourse"
        ],
        skills: ["JavaScript", "Frontend Architecture", "Web Performance", "React", "Technical Writing"],
        proofTags: ["LinkedIn", "Insight", "JS"],
        media: [
            { type: "image", url: "/contributions/Linkedin/Javascript.jpg", caption: "JavaScript Innovation at UNT — deep-dive on frontend architecture" }
        ],
        links: [
            { label: "View on LinkedIn", url: "https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_webdevelopment-javascript-frontenddevelopment-activity-7308894816111669248-60sD" }
        ]
    },
    {
        id: "linkedin-impact",
        slug: "linkedin-impact",
        title: "Bridging Code & Impact",
        category: "Mentorship",
        featured: false,
        bentoSize: "medium",
        impactHeadline: "One Workshop at a Time — the philosophy that the highest-impact engineers master business logic and user experience, not just algorithms. Shipping end-to-end creates more value than isolated features.",
        details: {
            role: "Product Engineer & Philosophy Author",
            whatIDid: "Argued that the highest-impact engineers master the business logic and user experience, not just algorithms. Shared lessons from real workshops where shipping a complete product was more impactful than any single technical skill.",
            whyItMattered: "Encapsulated my core engineering philosophy: shipping systems end-to-end creates more value than isolated features. This resonated with the community and received strong engagement from engineers and hiring managers alike.",
            proof: "Highly-engaged LinkedIn post with comments from engineering leaders.",
            linkUrl: "https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_opentowork-softwareengineering-machinelearning-activity-7318365589826072578-8mR5"
        },
        highlights: [
            "Articulated product-minded engineering philosophy with real examples",
            "Focused on the intersection of code and measurable business impact",
            "Received strong engagement from engineers and hiring managers"
        ],
        skills: ["Product Thinking", "Engineering Leadership", "User-Centric Design", "Full-Stack Development"],
        proofTags: ["LinkedIn", "Philosophy", "Impact"],
        media: [
            { type: "image", url: "/contributions/Linkedin/Bridging.jpg", caption: "Bridging Code, Creativity, and Real Impact — One Workshop at a Time" }
        ],
        links: [
            { label: "View on LinkedIn", url: "https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_opentowork-softwareengineering-machinelearning-activity-7318365589826072578-8mR5" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // FULL-STACK PLATFORMS — Built While Mentoring Undergrads
    // ═══════════════════════════════════════════════════════════════
    {
        id: "fullstack-platforms",
        slug: "fullstack-platforms",
        title: "Full-Stack Platforms Built While Mentoring Students",
        category: "Workshops",
        featured: false,
        bentoSize: "medium",
        impactHeadline: "Attended seminars, connected with industry leaders, identified real pain points companies face — then led undergrad students to architect and ship 13+ production-grade full-stack applications solving those exact problems.",
        details: {
            role: "Lead Mentor, Architect & Full-Stack Developer",
            whatIDid: "Attended company seminars and industry workshops to learn what enterprises actually struggle with — from payment fraud to clinical documentation to IoT monitoring. Translated those real-world pain points into structured engineering challenges, then guided undergrad students through the entire product lifecycle: requirements, architecture, implementation, testing, and deployment.",
            whyItMattered: "Proved I can identify market needs, translate them into buildable systems, lead teams of junior developers, and ship working software. Every platform below started as a real pain point heard at a seminar and became a full-stack solution students built under my guidance.",
            proof: "13+ open-source repositories on GitHub — each with architecture docs, working demos, and the pain point it was built to solve.",
            linkUrl: "https://github.com/ghantapavan93"
        },
        extendedDescription: {
            problemStatement: "Companies at seminars kept describing the same gaps: 'We can't detect fraud in real-time.' 'Our clinical notes take hours to document.' 'We have no way to validate addresses at scale.' 'Our IoT devices have no central intelligence dashboard.' These weren't hypothetical — these were pain points costing real companies millions.",
            proposedSolution: "Instead of just teaching theory, I turned each pain point into a semester project. Students learned full-stack engineering by building platforms that solve real problems — with proper architecture, APIs, databases, auth, testing, and deployment. Every project below is a working prototype with production-grade patterns.",
            platforms: [
                { name: "FraudWatch", tagline: "Real-Time Fraud Detection & Risk Scoring Engine", painPoint: "Companies lose billions to payment fraud because detection is too slow.", solution: "Built a real-time fraud detection pipeline that scores transactions instantly using ML risk models, flags anomalies, and routes alerts to security teams.", repo: "FRAUDWATCH-REAL-TIME-FRAUD-DETECTION-RISK-SCORING-ENGINE" },
                { name: "FlowControl Reliability Copilot", tagline: "Agentic AI Ops Prototype Platform", painPoint: "DevOps teams drown in alerts with no intelligent triage.", solution: "Created an agentic AI operations platform that autonomously triages reliability incidents, suggests root causes, and recommends runbook actions.", repo: "FLOWCONTROL-RELIABILITY-COPILOT--AGENTIC-AI-OPS-PROTOTYPE-PLATFORM-" },
                { name: "CareFlow Scheduler", tagline: "Appointment & Telehealth Demo", painPoint: "Healthcare scheduling is fragmented — patients bounce between portals.", solution: "Built a unified appointment and telehealth platform with real-time availability, video consult integration, and patient notifications.", repo: "CAREFLOW-SCHEDULER-APPOINTMENT-TELEHEALTH-DEMO" },
                { name: "LLM Document Assistant", tagline: "RAG-Powered Clinical QA System", painPoint: "Clinicians spend 40% of their time searching documents for answers.", solution: "Built a retrieval-augmented generation (RAG) system that ingests clinical documents, indexes them semantically, and lets clinicians ask natural-language questions.", repo: "LLM-Powered-Document-Assistant-Retrieval-Augmented-Clinical-QA-System" },
                { name: "InsightNotes", tagline: "Clinical Notes Documentation", painPoint: "Clinical note-taking is error-prone and eats into patient time.", solution: "Designed an AI-assisted clinical documentation tool that generates structured notes from conversations, with editable templates and compliance formatting.", repo: "INSIGHTNOTES-CLINICAL-NOTES-DOCUMENTATION-" },
                { name: "PostPath AI", tagline: "Intelligent Address Validation & Delivery API", painPoint: "Last-mile delivery fails because address validation is garbage.", solution: "Built an intelligent address validation API using fuzzy matching, standardization rules, and ML-based delivery prediction.", repo: "POSTPATH-AI-INTELLIGENT-ADDRESS-VALIDATION-DELIVERY-API-" },
                { name: "PayStream", tagline: "Embedded Payments Sandbox Platform", painPoint: "Fintech companies need payment testing without touching real money.", solution: "Created a sandbox for embedded payment flows with mock processors, webhook simulation, and transaction lifecycle visualization.", repo: "PAYSTREAM-EMBEDDED-PAYMENTS-SANDBOX-PLATFORM" },
                { name: "LedgerGuard", tagline: "Double-Entry Ledger Reconciliation Service", painPoint: "Financial reconciliation is done manually in spreadsheets.", solution: "Built an automated double-entry ledger with real-time reconciliation, discrepancy detection, and audit trail generation.", repo: "LEDGERGUARD-DOUBLE-ENTRY-LEDGER-RECONCILIATION-SERVICE" },
                { name: "PolyglotCore", tagline: "Multimodal Real-Time Localization", painPoint: "Global apps struggle with real-time translation and localization.", solution: "Built a multimodal localization engine supporting text, audio, and image content across languages with contextual adaptation.", repo: "POLYGLOTCORE--MULTIMODAL-REAL-TIME-LOCALIZATION-PROTOTYPE-" },
                { name: "Secure Notes", tagline: "Next.js + Apollo + MUI Reference Architecture", painPoint: "Developers need a reference architecture for full-stack secure apps.", solution: "Created a production-ready notes app with E2E encryption, GraphQL API, Next.js SSR, Material UI, and role-based access — now used as a starter template.", repo: "SECURE-NOTES-NEXT.JS-APOLLO-MUI-" },
                { name: "ConnectedGate Intelligence", tagline: "Cloud-Hosted IoT Diagnostics", painPoint: "IoT devices in the field have no centralized monitoring.", solution: "Built a cloud IoT diagnostics dashboard ingesting device telemetry, running anomaly detection, and surfacing actionable diagnostics.", repo: "ConnectedGate-Intelligence-Platform-Cloud-Hosted-IoT-Diagnostics-" },
                { name: "UnifiedCare Navigator", tagline: "AI-Powered Health Benefits Prototype", painPoint: "Employees can't navigate their own health benefits.", solution: "Created an AI-powered benefits navigation tool answering natural-language coverage questions and recommending optimal plan usage.", repo: "UnifiedCare-Navigator-Full-Stack-AI-Powered-Health-Benefits-Prototype-" },
                { name: "BriteLens AI", tagline: "Personalized Event Discovery", painPoint: "Event platforms surface generic results with no personalization.", solution: "Built a personalized event discovery engine using collaborative filtering and content-based recommendation.", repo: "BRITELENS-AI-Personalized-Event-Discovery-" }
            ]
        },
        highlights: [
            "Led undergrad students to build 13+ production-grade full-stack prototypes",
            "Every platform started from a real industry pain point heard at seminars",
            "Covered healthcare, fintech, IoT, AI ops, NLP, payments, logistics, and localization",
            "Taught end-to-end: requirements → architecture → implementation → deployment",
            "Open-source on GitHub — used as reference architectures by new cohorts"
        ],
        skills: ["Full-Stack", "System Architecture", "Mentorship", "React", "Next.js", "Python", "Node.js", "GraphQL", "ML", "RAG", "IoT"],
        proofTags: ["Full-Stack", "13+ Platforms", "Open Source", "Mentorship"],
        media: [],
        links: [
            { label: "GitHub Profile", url: "https://github.com/ghantapavan93" }
        ]
    }
];
