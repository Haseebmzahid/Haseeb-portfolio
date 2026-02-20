"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import type { Project } from "@/constants/projects.data";

/* ─────────────────────────────────────────────
   Props
   ───────────────────────────────────────────── */
interface ProjectCardProps {
    project: Project;
    index: number;
    onSelect: (project: Project) => void;
}

/* ─────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────── */
const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    }),
};

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
    return (
        <motion.article
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="group card flex flex-col cursor-pointer"
            onClick={() => onSelect(project)}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${project.title}`}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(project);
                }
            }}
        >
            {/* Card top accent line */}
            <div className="h-[2px] -mx-[1.75rem] -mt-[1.75rem] mb-6 rounded-t-[inherit] bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-purple opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Title + arrow */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-bold text-fg-primary group-hover:text-accent-blue transition-colors duration-200">
                    {project.title}
                </h3>
                <ArrowUpRight
                    size={20}
                    className="shrink-0 mt-0.5 text-fg-muted opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                />
            </div>

            {/* Description */}
            <p className="text-sm text-fg-secondary leading-relaxed mb-5 flex-1">
                {project.shortDescription}
            </p>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.slice(0, 5).map((tech) => (
                    <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-bg-elevated border border-border-default text-fg-muted"
                    >
                        {tech}
                    </span>
                ))}
                {project.techStack.length > 5 && (
                    <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-bg-elevated border border-border-default text-fg-muted">
                        +{project.techStack.length - 5}
                    </span>
                )}
            </div>

            {/* Footer actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-border-default">
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg-primary transition-colors duration-200 focus-ring"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`GitHub for ${project.title}`}
                >
                    <Github size={15} />
                    <span>Source</span>
                </a>

                <span className="ml-auto text-xs text-fg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click for details →
                </span>
            </div>
        </motion.article>
    );
}
