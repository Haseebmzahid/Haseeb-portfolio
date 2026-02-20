"use client";

import { motion } from "framer-motion";
import { socialLinks, ArrowDown, FileText } from "@/config/socials.config";

/* ─────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────── */
const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" as const },
    },
};

const floatSlowTarget = { y: [0, -14, 0] };
const floatSlowTransition = { duration: 6, repeat: Infinity, ease: "easeInOut" as const };

const floatFastTarget = { y: [0, -10, 0] };
const floatFastTransition = { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay: 1 };

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* ── Decorative blobs ── */}
            <motion.div
                className="glow-blob -top-32 -left-32 w-[500px] h-[500px]"
                animate={floatSlowTarget}
                transition={floatSlowTransition}
                aria-hidden="true"
            />
            <motion.div
                className="glow-blob -bottom-40 -right-40 w-[600px] h-[600px] !bg-[linear-gradient(135deg,#6366f1,#22d3ee)]"
                animate={floatFastTarget}
                transition={floatFastTransition}
                aria-hidden="true"
            />

            {/* ── Dot grid background ── */}
            <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />

            {/* ── Content ── */}
            <motion.div
                className="relative z-10 max-w-4xl mx-auto px-6 text-center"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/* Status badge */}
                <motion.div variants={fadeUp} className="mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border border-border-default bg-bg-elevated text-fg-secondary">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        Available for opportunities
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1 variants={fadeUp} className="heading-xl mb-6">
                    Building{" "}
                    <span className="gradient-text">Intelligent Systems</span>
                    <br />
                    That Scale
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    variants={fadeUp}
                    className="body-text max-w-2xl mx-auto mb-10 text-lg"
                >
                    Full-Stack Software Engineer{" "}
                    <span className="text-fg-muted">·</span> AI Systems{" "}
                    <span className="text-fg-muted">·</span> Backend &amp; DevOps
                    Enthusiast
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap items-center justify-center gap-4 mb-12"
                >
                    <a href="#projects" className="btn-primary group">
                        <span>View Projects</span>
                        <ArrowDown
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-y-0.5"
                        />
                    </a>
                    <a
                        href="/Resume.png"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost group"
                    >
                        <FileText
                            size={16}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5"
                        />
                        <span>Download Resume</span>
                    </a>
                </motion.div>

                {/* Social links */}
                <motion.div
                    variants={fadeIn}
                    className="flex items-center justify-center gap-3"
                >
                    {socialLinks.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("mailto") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="group relative p-3 rounded-xl border border-border-default bg-bg-card/50 text-fg-muted transition-all duration-300 hover:text-fg-primary hover:border-border-hover hover:bg-bg-card focus-ring"
                            whileHover={{ y: -3, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <link.icon size={20} />

                            {/* Tooltip */}
                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 text-xs font-medium rounded-md bg-bg-secondary text-fg-primary border border-border-default opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100 whitespace-nowrap">
                                {link.label}
                            </span>
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            {/* ── Scroll indicator ── */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-fg-muted">
                    Scroll
                </span>
                <motion.div
                    className="w-5 h-8 rounded-full border-2 border-fg-muted/30 flex justify-center pt-1.5"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-1.5 rounded-full bg-accent-indigo"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
