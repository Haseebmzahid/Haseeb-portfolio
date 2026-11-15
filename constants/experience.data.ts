export interface ExperienceEntry {
  number: string;
  role: string;
  org: string;
  type: "project" | "employment" | "internship" | "freelance";
  period: string;
  bullets: string[];
  tags: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    number: "01",
    role: "Software Engineer",
    org: "Pro Codes Solution · UK / Remote",
    type: "employment",
    period: "2023 – 2025",
    bullets: [
      "Engineered cross-platform mobile applications in Flutter targeting both iOS and Android from a single codebase",
      "Implemented state management patterns and modular widget architecture to maintain scalability across feature sets",
      "Collaborated directly with clients to translate product requirements into production-ready UI/UX flows",
      "Reduced iteration cycles by establishing component-level reusability across multiple app screens",
    ],
    tags: ["Flutter", "Dart", "Mobile", "Cross-Platform", "UI/UX"],
  },
  {
    number: "02",
    role: "AI Engineer & Senior Developer",
    org: "Eco Green Developers — Lahore",
    type: "employment",
    period: "2025 – Present",
    bullets: [
      "Architected autonomous AI workflow pipelines using n8n, integrating LLM-based decision nodes with external APIs and data sources",
      "Designed multi-step agentic flows capable of conditional branching, error recovery, and dynamic task routing without human intervention",
      "Cut manual operational overhead by automating 3+ repetitive business workflows end-to-end",
      "Deployed and maintained n8n instances, configuring webhooks, credentials, and execution logs for production reliability",
    ],
    tags: ["n8n", "Agentic AI", "Workflow Automation", "LLMs", "DevOps"],
  },
  {
    number: "03",
    role: "AI Systems Developer",
    org: "Property Estimation Engine",
    type: "project",
    period: "2024",
    bullets: [
      "Designed and trained supervised ML models (Random Forest, Linear Regression) on structured real estate tabular data, selecting Random Forest after benchmarking a >12% MAE reduction over linear baseline",
      "Engineered domain-specific features — location encoding, price-per-sqft normalization, and categorical embeddings — improving model R² from 0.71 to 0.89",
      "Evaluated model performance using MAE and RMSE, delivering interpretable error metrics to justify non-deep-learning architecture for structured, low-volume tabular input",
      "Integrated trained inference pipeline into a REST API backend, enabling real-time price predictions with <200ms response latency",
      "Authored technical rationale documenting why classical ML outperforms neural networks for small-sample, feature-rich tabular datasets",
    ],
    tags: [
      "Python",
      "Scikit-learn",
      "Random Forest",
      "Feature Engineering",
      "REST API",
      "ML Ops",
    ],
  },
  {
    number: "04",
    role: "Backend Engineer",
    org: "ROYAL ENCLAVE — Real Estate Platform",
    type: "project",
    period: "2024",
    bullets: [
      "Designed a normalized relational schema (up to BCNF), eliminating redundancy across 8+ entity relationships covering users, listings, bids, and transactions",
      "Implemented atomic bidding logic with transactional integrity constraints, preventing race conditions and double-bid scenarios under concurrent load",
      "Built RESTful API layer with input validation, error boundaries, and structured response contracts consumed by the full-stack frontend",
      "Integrated the ML price estimation engine directly into listing workflows, surfacing AI-generated valuations at point of listing creation",
      "Architected the system with horizontal scalability in mind — stateless API design, indexed queries, and separation of read/write concerns",
    ],
    tags: [
      "Node.js",
      "PostgreSQL",
      "REST API",
      "BCNF",
      "System Design",
      "ML Integration",
    ],
  },
  {
    number: "05",
    role: "Systems & DevOps Engineer",
    org: "Personal Portfolio Infrastructure",
    type: "project",
    period: "2025",
    bullets: [
      "Provisioned and configured MongoDB Atlas cluster with connection pooling, IP whitelisting, and environment-scoped credentials",
      "Debugged DNS SRV resolution failures in cloud-hosted MongoDB URI, tracing root cause to ISP-level DNS filtering and implementing a resolver override",
      "Implemented production-grade API validation using schema-based input sanitization, rate limiting middleware, and structured error responses",
      "Managed multi-environment configuration via `.env` scoping, separating development, staging, and production secrets with zero credential leakage",
      "Prepared full deployment pipeline for Vercel — configuring build output, serverless function routing, and environment variable injection at the platform level",
    ],
    tags: [
      "MongoDB Atlas",
      "Next.js API",
      "Vercel",
      "DevOps",
      "Security",
      "DNS",
    ],
  },
];
