"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface ExperienceEntry {
    number: string;
    role: string;
    org: string;
    type: "project" | "internship" | "freelance";
    period: string;
    bullets: string[];
    tags: string[];
}

const experiences: ExperienceEntry[] = [
    {
        number: "01",
        role: "Mobile App Developer",
        org: "Pro Codes Solution",
        type: "internship",
        period: "2024",
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
        role: "Agentic AI Engineer",
        org: "Eco Green Developers — Lahore",
        type: "freelance",
        period: "2024 – 2025",
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
        tags: ["Python", "Scikit-learn", "Random Forest", "Feature Engineering", "REST API", "ML Ops"],
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
        tags: ["Node.js", "PostgreSQL", "REST API", "BCNF", "System Design", "ML Integration"],
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
        tags: ["MongoDB Atlas", "Next.js API", "Vercel", "DevOps", "Security", "DNS"],
    },
];

const typeLabel: Record<ExperienceEntry["type"], string> = {
    project: "Project",
    internship: "Internship",
    freelance: "Freelance",
};

const typeColor: Record<ExperienceEntry["type"], string> = {
    project: "rgba(59,130,246,0.12)",
    internship: "rgba(34,211,238,0.12)",
    freelance: "rgba(139,92,246,0.12)",
};

const typeBorder: Record<ExperienceEntry["type"], string> = {
    project: "rgba(59,130,246,0.25)",
    internship: "rgba(34,211,238,0.25)",
    freelance: "rgba(139,92,246,0.25)",
};

const typeText: Record<ExperienceEntry["type"], string> = {
    project: "#60a5fa",
    internship: "#22d3ee",
    freelance: "#a78bfa",
};

function ExperienceCard({
    entry,
    index,
}: {
    entry: ExperienceEntry;
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div
            ref={ref}
            className="relative grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-0 lg:gap-8 group"
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
            }}
        >
            {/* ── Left: number + period (desktop) ── */}
            <div className="hidden lg:flex flex-col items-end pt-1 gap-1">
                <span
                    className="font-mono text-4xl font-bold"
                    style={{
                        background: "var(--gradient-text)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        opacity: 0.25,
                    }}
                >
                    {entry.number}
                </span>
                <span className="text-fg-muted text-xs font-mono">{entry.period}</span>
            </div>

            {/* ── Timeline line (desktop) ── */}
            <div
                className="hidden lg:block absolute top-3 bottom-0 w-px opacity-20"
                style={{
                    left: "168px",
                    background: "var(--gradient-primary)",
                }}
            />
            <div
                className="hidden lg:block absolute top-3 w-2.5 h-2.5 rounded-full border-2"
                style={{
                    left: "163px",
                    borderColor: "var(--accent-blue)",
                    background: "var(--bg-primary)",
                    boxShadow: "0 0 8px rgba(59,130,246,0.5)",
                }}
            />

            {/* ── Right: card content ── */}
            <div
                className="card group-hover:border-border-hover"
                style={{ paddingLeft: "1.75rem" }}
            >
                {/* Header */}
                <div className="flex flex-wrap items-start gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="heading-md text-fg-primary leading-tight">
                            {entry.role}
                        </h3>
                        <p className="text-fg-secondary text-sm mt-0.5 font-mono">
                            {entry.org}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Mobile period */}
                        <span className="lg:hidden text-fg-muted text-xs font-mono">
                            {entry.period}
                        </span>
                        {/* Type badge */}
                        <span
                            className="text-xs font-mono px-2.5 py-0.5 rounded-full border"
                            style={{
                                background: typeColor[entry.type],
                                borderColor: typeBorder[entry.type],
                                color: typeText[entry.type],
                            }}
                        >
                            {typeLabel[entry.type]}
                        </span>
                    </div>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-2 mb-5">
                    {entry.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 items-start">
                            <span
                                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: "var(--accent-blue)", opacity: 0.7 }}
                            />
                            <span className="body-text text-sm leading-relaxed">{bullet}</span>
                        </li>
                    ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                        <span key={tag} className="tag text-xs px-2.5 py-0.5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ExperienceSection() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section
            id="experience"
            className="section-padding relative overflow-hidden"
        >
            {/* Ambient blobs */}
            <div
                className="glow-blob"
                style={{
                    top: "5%",
                    right: "-10%",
                    background: "var(--gradient-secondary)",
                    opacity: 0.04,
                }}
            />
            <div
                className="glow-blob"
                style={{ bottom: "10%", left: "-10%", opacity: 0.05 }}
            />

            <div className="max-w-[var(--container-content)] mx-auto">
                {/* Section header */}
                <div
                    ref={headerRef}
                    style={{
                        opacity: headerInView ? 1 : 0,
                        transform: headerInView ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                >
                    <p className="text-fg-muted text-sm font-mono mb-3 tracking-widest uppercase">
                        05
                    </p>
                    <h2 className="heading-xl gradient-text mb-16">Experience</h2>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-10">
                    {experiences.map((entry, i) => (
                        <ExperienceCard key={entry.number} entry={entry} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
