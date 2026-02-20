"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

const highlights = [
    { label: "Focus", value: "Backend & AI Systems" },
    { label: "Stack", value: "Next.js · Node · MongoDB · DevOps" },
    { label: "Available for", value: "Internships · Remote · Freelance" },
];

export default function AboutSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="about"
            ref={ref}
            className="section-padding relative overflow-hidden"
        >
            {/* Ambient background blobs */}
            <div
                className="glow-blob"
                style={{ top: "10%", left: "-8%", opacity: 0.05 }}
            />
            <div
                className="glow-blob"
                style={{
                    bottom: "10%",
                    right: "-8%",
                    background: "var(--gradient-secondary)",
                    opacity: 0.04,
                }}
            />

            <div className="max-w-[var(--container-content)] mx-auto">
                {/* Section label */}
                <div
                    style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                >
                    <p className="text-fg-muted text-sm font-mono mb-3 tracking-widest uppercase">
                        02
                    </p>
                    <h2 className="heading-xl gradient-text mb-16">About</h2>
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                    {/* ── Left: paragraphs ── */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        {[
                            {
                                text: "I build systems that don't just work — they hold up under load, scale across environments, and survive production.",
                                delay: 0.1,
                                accent: true,
                            },
                            {
                                text: "I'm a Software Engineering student with a focus on backend architecture, AI integration, and infrastructure. My foundation runs deep: Operating Systems, Database internals, distributed systems design — the kind of fundamentals that make the difference between software that ships and software that lasts.",
                                delay: 0.2,
                            },
                            {
                                text: "My most technically demanding project is an AI-powered real estate estimation engine — a system that ingests property data, applies machine learning inference, and serves predictions at scale. Building it forced me to think beyond feature delivery: I had to reason about data pipelines, model latency, caching strategies, and the boundary between ML infrastructure and backend services. I didn't just connect an API — I architected the layer between raw data and actionable output.",
                                delay: 0.3,
                            },
                            {
                                text: "I also designed and shipped ROYAL ENCLAVE, a full-stack real estate bidding platform. That project touched everything from database schema design and transactional integrity to deployment pipelines and real-time interaction patterns. It's where I learned that production-readiness isn't a final step — it's a design constraint from the beginning.",
                                delay: 0.4,
                                highlight: "ROYAL ENCLAVE",
                            },
                            {
                                text: "My current focus: backend engineering, DevOps automation, and AI systems. I'm drawn to problems where performance constraints are real, where infrastructure decisions have visible consequences, and where clean architecture isn't optional.",
                                delay: 0.5,
                            },
                            {
                                text: "I'm actively seeking internships, remote engineering roles, and freelance projects where I can contribute at the systems level — and keep building things that matter in production, not just in development.",
                                delay: 0.6,
                            },
                        ].map((para, i) => (
                            <p
                                key={i}
                                className={para.accent ? "body-text text-fg-accent font-medium text-lg" : "body-text"}
                                style={{
                                    opacity: isInView ? 1 : 0,
                                    transform: isInView ? "translateY(0)" : "translateY(20px)",
                                    transition: `opacity 0.6s ease ${para.delay}s, transform 0.6s ease ${para.delay}s`,
                                }}
                            >
                                {para.highlight
                                    ? para.text.split(para.highlight).map((part, j, arr) =>
                                        j < arr.length - 1 ? (
                                            <span key={j}>
                                                {part}
                                                <span className="gradient-text font-semibold">
                                                    {para.highlight}
                                                </span>
                                            </span>
                                        ) : (
                                            part
                                        )
                                    )
                                    : para.text}
                            </p>
                        ))}
                    </div>

                    {/* ── Right: info cards ── */}
                    <div
                        className="lg:col-span-2 flex flex-col gap-4 lg:sticky lg:top-32"
                        style={{
                            opacity: isInView ? 1 : 0,
                            transform: isInView ? "translateX(0)" : "translateX(20px)",
                            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
                        }}
                    >
                        {/* Highlights */}
                        <div className="card-subtle">
                            <p className="text-fg-muted text-xs font-mono tracking-widest uppercase mb-4">
                                Quick Profile
                            </p>
                            <div className="flex flex-col gap-3">
                                {highlights.map((item) => (
                                    <div key={item.label} className="flex flex-col gap-0.5">
                                        <span className="text-fg-muted text-xs font-mono uppercase tracking-wider">
                                            {item.label}
                                        </span>
                                        <span className="text-fg-primary text-sm font-medium">
                                            {item.value}
                                        </span>
                                        <hr className="divider-gradient mt-2" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Currently working on / interests */}
                        <div className="card-subtle">
                            <p className="text-fg-muted text-xs font-mono tracking-widest uppercase mb-4">
                                Areas of Depth
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "System Design",
                                    "Backend APIs",
                                    "AI Integration",
                                    "DevOps",
                                    "Database Internals",
                                    "Performance Optimization",
                                    "Clean Architecture",
                                    "Production Deployment",
                                ].map((tag) => (
                                    <span key={tag} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
