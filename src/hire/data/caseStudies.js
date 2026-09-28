// ─────────────────────────────────────────────────────────────────────────────
// Case studies for the featured projects (/work/:slug).
// Every study answers the same five questions:
//   problem → decisions → architecture → execution → outcome.
//
// SOURCE RULE: facts come from the project's own repo (README, docs, ADRs). A
// reviewer who opens the repo must find the same thing described here. Anything
// designed but not in the code is labelled as such (see `tier`).
// ─────────────────────────────────────────────────────────────────────────────

export const CASE_STUDIES = {
  'move-relay': {
    role: 'Solo — design, backend, frontend, tests',
    context:
      'A proof-of-work for a home-services concierge platform: what does it take to hand a household’s move to utility providers without losing, duplicating, or inventing anything?',
    problem: [
      'One move arrives three ways — a partner API, a CSV upload, and the customer’s own form — and no two agree.',
      'Worse, a provider can create the order while its response is lost in transit. A blind retry enrols the same household twice; a naive "failed" status leaves them without service on move-in day.',
    ],
    decisions: [
      {
        title: 'The database is the source of truth',
        why: 'Not the workflow engine, not the frontend. Every guarantee below is a Postgres constraint or a transaction (ADR-001).',
      },
      {
        title: 'A canonical value needs a named human',
        why: 'A CHECK constraint makes it structurally impossible for AI to merge records. AI explains conflicts; people resolve them (ADR-003).',
      },
      {
        title: 'Lost reply means UNKNOWN, not failure',
        why: 'The workflow refuses the blind retry, reconciles against the provider’s own ledger, and recovers the existing order. Idempotency keys live in Postgres, so they survive restarts and cache eviction (ADR-002).',
      },
      {
        title: 'A modular monolith, on purpose',
        why: 'The core guarantees must share one transaction, so the system is one deployable with enforced module boundaries — Kubernetes and microservices were deliberately left out.',
      },
      {
        title: 'The model rewrites, it never decides',
        why: 'Briefings are built from cited field-version rows first. A model line citing an id it wasn’t given is dropped before display; with no model available, the same briefing is assembled deterministically.',
      },
    ],
    architecture: [
      { name: 'Intake', detail: 'Immutable raw submissions from API, CSV and form, de-duplicated by content hash.' },
      { name: 'Canonicalise', detail: 'Every field version keeps its source; exactly one canonical value per field, approved by a named human.' },
      { name: 'Orchestrate', detail: 'Durable workflow steps that resume after a crash without repeating side effects.' },
      { name: 'Fulfil', detail: 'Persisted operation keys, an explicit UNKNOWN state, and reconciliation against the provider.' },
      { name: 'Project', detail: 'Concierge, customer and partner views of one record, with relationship-based authorization.' },
      { name: 'Brief', detail: 'Grounded AI briefing: local Ollama, then Claude, then a deterministic fallback.' },
      { name: 'Outbox & audit', detail: 'Transactional outbox for exactly-once events; an append-only audit log.' },
    ],
    execution: [
      'Next.js 16 and React 19 over PostgreSQL, with an embedded Postgres (PGlite) so a reviewer runs everything without Docker.',
      '`npm run verify` runs the schema checks and 596 tests against a real database; CI adds a Postgres 16 job and 10 Playwright end-to-end specs.',
      'Architecture fitness tests fail the build if an AI module writes canonical tables or a projection reads raw PII.',
      'A live demo with six "break it" buttons that attack the real backend, plus an engineering view showing each AI run and whether the fallback served.',
    ],
    outcome: {
      proof: [
        '596 tests against a real Postgres, run by one command',
        'The duplicate-order failure is reproduced and recovered live',
        'AI output without a citation never reaches the screen',
      ],
      limitations: [
        'Provider integrations and notifications are simulated, and labelled as such.',
        'No authentication — identity is a demo header; authorization is real where it is applied.',
        'All data is synthetic. Not affiliated with Utility Connect.',
      ],
    },
  },

  'eagleeye-ai': {
    role: 'Hackathon team member',
    context:
      'Scanning hours of CCTV footage for a described suspect or a developing incident is slow, and detection-only tools raise an alert at every shadow.',
    problem: [
      'Security staff need to know which moments matter and why — not a stream of bounding boxes.',
      'The team had a hackathon weekend to show that detection plus language understanding could turn footage into meaningful, reviewable alerts.',
    ],
    decisions: [
      {
        title: 'Detect first, then describe',
        why: 'YOLOv8 finds people in sampled frames; only then does a vision model summarise the scene, which keeps model calls to the frames that matter.',
      },
      {
        title: 'Keyword gate before an alert',
        why: 'A crime-term filter over the scene summary decides what is flagged, so the language model never raises an alert on its own say-so.',
      },
      {
        title: 'Match suspects by description',
        why: 'MiniLM sentence embeddings compare a witness’s text description with each detected person’s summary.',
      },
    ],
    architecture: [
      { name: 'Frame sampling', detail: 'Video frames captured every 0.25 s.' },
      { name: 'Detection', detail: 'YOLOv8 locates people.' },
      { name: 'Scene analysis', detail: 'GPT-4o-mini summarises each flagged frame; a keyword check marks likely incidents.' },
      { name: 'Suspect matching', detail: 'Sentence embeddings rank people against a text description.' },
      { name: 'Review app', detail: 'Streamlit dashboard with alerts and summaries.' },
    ],
    next: {
      title: 'What I designed for the next version',
      note: 'Not in the hackathon code — this is the architecture I would build to make it trustworthy in production.',
      points: [
        'Deterministic risk scoring (motion, trajectory, dwell) decides severity; the model only explains a decision already made.',
        'Every alert carries its evidence — the exact frame and timestamp — so a person can verify it in seconds.',
        'An evaluation harness from day one. On this project we built it last, and retrofitting trust is far harder than building it in.',
      ],
    },
    execution: [
      'Python pipeline with YOLOv8, GPT-4o-mini via LangChain, and sentence-transformers.',
      'Tested on a 15-video set of simulated CCTV scenarios; the README reports 3–5 seconds from frame to flag.',
      'Won GradInnoHack 2025 as a team.',
    ],
    outcome: {
      proof: ['GradInnoHack 2025 winner (team)', '3–5 s from frame to flag on the test set', 'Suspect search from a plain-text description'],
      limitations: [
        'A hackathon prototype: no automated tests and no customer deployment.',
        'Team project — the original repository belongs to a teammate; my copy is linked.',
      ],
    },
  },

  'project-h': {
    role: 'Founder — product, frontend, backend, AI',
    context:
      'Fitness apps collect a lot of data and explain very little of it. I wanted a coach that talks about your own plan and progress in plain language.',
    problem: [
      'People get generic advice from chatbots and generic plans from apps; neither adapts to their goals, schedule and preferences.',
      'The product had to be simple enough for non-technical users and cheap enough to run as a solo founder.',
    ],
    decisions: [
      {
        title: 'One AI coach, many structured flows',
        why: 'A questionnaire captures goals once; the coach, workout and diet features all build on that profile instead of starting from zero.',
      },
      {
        title: 'Prompts as versioned files',
        why: 'Each feature’s prompt lives in its own file on the server, so behaviour changes are reviewable in code, not hidden in a dashboard.',
      },
      {
        title: 'Managed auth and data',
        why: 'Firebase Auth and Firestore removed infrastructure work, so time went into the product.',
      },
    ],
    architecture: [
      { name: 'Client', detail: 'React + Vite + Tailwind app.' },
      { name: 'API', detail: 'Express with auth middleware; coach, diet, workout and questionnaire routes.' },
      { name: 'AI service', detail: 'OpenAI calls with per-feature prompt files.' },
      { name: 'Data', detail: 'Firebase Auth and Firestore.' },
    ],
    execution: [
      'Built and shipped the MVP end-to-end: questionnaire, AI coach, workout and diet plans, and sleep analytics.',
      'Deployed to a live domain, projhealth.com.',
    ],
    outcome: {
      proof: ['Live at projhealth.com', '200+ users', 'Coach, workout, diet and sleep in one flow'],
      limitations: ['An MVP — no automated tests yet.', 'Not a medical device and not a source of medical advice.'],
    },
  },
};
