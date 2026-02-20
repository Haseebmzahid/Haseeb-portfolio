"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, CheckCircle2 } from "lucide-react";
import type { Project } from "@/constants/projects.data";

/* ─────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────── */
const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const modal = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
        opacity: 0,
        scale: 0.97,
        y: 10,
        transition: { duration: 0.2, ease: "easeIn" as const },
    },
};

/* ─────────────────────────────────────────────
   Props
   ───────────────────────────────────────────── */
interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    // Close on Escape key
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (project) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [project, handleKeyDown]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-bg-tertiary/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal panel */}
                    <motion.div
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass p-0"
                        role="dialog"
                        aria-modal="true"
                        aria-label={project.title}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-bg-primary/80 backdrop-blur-xl border-b border-border-default">
                            <h3 className="text-xl font-bold text-fg-primary">
                                {project.title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg text-fg-muted hover:text-fg-primary hover:bg-bg-secondary transition-colors duration-200 focus-ring"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-6 space-y-6">
                            {/* Full description */}
                            <p className="body-text leading-relaxed">
                                {project.fullDescription}
                            </p>

                            {/* Highlights */}
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-fg-muted mb-3">
                                    Key Features
                                </h4>
                                <ul className="space-y-2.5">
                                    {project.highlights.map((highlight) => (
                                        <li
                                            key={highlight}
                                            className="flex items-start gap-2.5 text-fg-secondary text-sm"
                                        >
                                            <CheckCircle2
                                                size={16}
                                                className="text-accent-indigo mt-0.5 shrink-0"
                                            />
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tech stack */}
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-fg-muted mb-3">
                                    Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer actions */}
                        <div className="sticky bottom-0 flex items-center gap-3 px-6 py-4 bg-bg-primary/80 backdrop-blur-xl border-t border-border-default">
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-sm"
                            >
                                <Github size={16} />
                                <span>View on GitHub</span>
                            </a>
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-ghost text-sm"
                                >
                                    <ExternalLink size={16} />
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
