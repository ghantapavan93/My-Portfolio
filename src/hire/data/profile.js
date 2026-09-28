// Content for the hiring portfolio's non-project sections. Facts from lib/persona.js.

export const PROFILE = {
  name: 'Pavan Kalyan Ghanta',
  role: 'AI Engineer & Full-Stack Developer',
  statement: 'I build AI systems that hold up in production — and the full-stack products around them.',
  intro:
    'I was the first engineer to bring AI into 100 Miles of Summer, a fitness platform serving 270,000+ people, and the founding engineer of a crowd-safety platform piloted live for 20,000 attendees. I own the whole path — data, backend, model, interface, deployment — and I design for the moment things go wrong.',
  facts: [
    'Dallas–Fort Worth, Texas · open to onsite, hybrid or remote',
    'Authorized to work in the US (STEM OPT) through June 2028',
    'M.S. Computer Science, University of North Texas',
  ],
};

export const STATS = [
  { value: '270,000+', label: 'people on the platform I build AI for' },
  { value: '20,000', label: 'attendees on a live crowd-safety pilot' },
  { value: '8% → 2%', label: 'LLM hallucination rate after retrieval and guardrail work' },
  { value: '596', label: 'tests behind Move Relay’s one-command verify' },
];

export const EXPERIENCE = [
  {
    company: '100 Miles of Summer',
    role: 'Software Engineer — Full-Stack AI',
    dates: 'Jan 2026 – Present',
    location: 'Remote',
    points: [
      'First engineer to bring AI into the company; built the QUANTUM Health Coach with RAG and Pydantic-validated structured output (~99% schema validity, ~97% groundedness).',
      'Built an idempotency-keyed wearable sync pipeline across Apple Health, Fitbit and Garmin (~99% sync success, ~0.5% mismatch).',
      'Shipped production iOS and Android apps (React Native + Expo), an internal ops console, and an LLM evaluation harness with CI regression gates.',
    ],
  },
  {
    company: 'Vosyn',
    role: 'Machine Learning Intern — VosynCore',
    dates: 'Aug 2025 – Jan 2026',
    location: 'Remote',
    points: [
      'GPU inference (FastAPI/gRPC, PyTorch → ONNX/TensorRT) sustaining 1,200+ concurrent requests at 274 ms p95, with 32% lower tail latency.',
      'Tuned RAG retrieval and LangGraph agent guardrails: hallucinations 8% → 2%, human escalations −42%.',
      'Multilingual evaluation over 5.2M QA pairs; deployed on AWS EKS with Terraform, ArgoCD, Prometheus and OpenTelemetry.',
    ],
  },
  {
    company: 'Krowd Guide',
    role: 'Founding Software Engineer',
    dates: 'Jun 2025 – Dec 2025',
    location: 'Dallas, TX',
    points: [
      'Built an AI crowd-safety platform from zero: cloud architecture, real-time AI pipeline, and plain-English safety alerts with RAG.',
      'Piloted live at AfroTech Houston for 20,000+ attendees; predictive accuracy 83.7% → 93.5%, <400 ms p95, 99.95% uptime.',
      'Owned the live-event incident: isolated the failure domain, scaled past prototype limits, and moved hot paths to cached insights — stable in four hours.',
    ],
  },
  {
    company: 'University of North Texas',
    role: 'Outreach & Research Assistant — AI-First Discovery Initiative',
    dates: 'Aug 2023 – May 2025',
    location: 'Denton, TX',
    points: [
      'Core contributor to Scrappy, a RAG assistant that gives students and staff source-cited answers from institutional knowledge.',
      'Ran 20+ workshops for 200+ students with hands-on code reviews; AI project submissions rose 53%.',
    ],
  },
  {
    company: 'SRM Institute of Science and Technology',
    role: 'AI & Software Engineer — Industry Client Projects & Robotics',
    dates: 'Jul 2019 – Feb 2023',
    location: 'Chennai, India',
    points: [
      'One tenure spanning industry client projects contracted through the institute and SRM Team Robocon.',
      'Lineysha & Thevan Technologies: hybrid LSTM-ARIMA anomaly detection, 65% fewer false positives. Builder.ai: natural-language-to-app-blueprint flows (FastAPI + FAISS). Al Web: Firebase-backed web workflows.',
      'SRM Team Robocon: real-time YOLOv4 vision at 30 fps on edge hardware and SLAM navigation across 10+ competition robots.',
    ],
  },
];

// "How I build AI systems" — each principle points at code a reviewer can check.
export const PRINCIPLES = [
  {
    title: 'The model explains; something deterministic decides',
    body: 'Rules, constraints or a verifier make the decision. The language model turns it into words people can act on.',
    evidence: [
      { label: 'Move Relay — a CHECK constraint stops AI from merging records', to: '/work/move-relay' },
      { label: 'FanFlow — a sanitiser stops the model changing the chosen gate', href: 'https://github.com/ghantapavan93/FanFlow-AI' },
    ],
  },
  {
    title: 'Cite it or don’t show it',
    body: 'Answers are grounded in retrieved sources, and anything that can’t point to its source is dropped before a user sees it.',
    evidence: [
      { label: 'Move Relay — uncited model lines are removed before display', to: '/work/move-relay' },
      { label: 'Scrappy at UNT — source-cited answers for students and staff' },
    ],
  },
  {
    title: 'Measure before you ship',
    body: 'Golden question sets, adversarial prompts and CI regression gates — so "it got better" is a number, not a feeling.',
    evidence: [
      { label: 'Vosyn — hallucinations 8% → 2% under an eval harness' },
      { label: 'This site’s assistant — 89-case retrieval eval, 98.9%, gated in CI' },
    ],
  },
  {
    title: 'Design the failure path first',
    body: 'Lost responses, retries, partial rollouts and crashes are designed for, with idempotency keys, outboxes and explicit unknown states.',
    evidence: [
      { label: 'Move Relay — lost reply → UNKNOWN → reconcile, never a duplicate', to: '/work/move-relay' },
      { label: 'ShelfTrace — transactional outbox and row-locked recovery', href: 'https://github.com/ghantapavan93/ShelfTrace' },
    ],
  },
];

export const SKILLS = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'C++'] },
  { group: 'AI & ML', items: ['LLMs', 'RAG', 'LangChain', 'LangGraph', 'Evals', 'PyTorch', 'TensorFlow', 'ONNX / TensorRT', 'YOLO', 'FAISS', 'Pinecone', 'pgvector'] },
  { group: 'Backend', items: ['FastAPI', 'Node.js', 'Django', 'Flask', 'PostgreSQL', 'gRPC', 'REST', 'Celery', 'Transactional outbox'] },
  { group: 'Frontend & mobile', items: ['React', 'Next.js', 'React Native', 'Expo', 'Tailwind CSS'] },
  { group: 'Cloud & operations', items: ['AWS (EKS, Lambda, S3)', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus', 'OpenTelemetry'] },
];
