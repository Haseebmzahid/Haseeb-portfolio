"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/constants/projects.data";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="section-padding relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-dot-grid opacity-20" aria-hidden />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: "easeOut" as const }}
                >
                    <span className="inline-block text-sm font-mono tracking-widest uppercase text-accent-indigo mb-4">
                        Featured Work
                    </span>
                    <h2 className="heading-lg mb-4">
                        Things I&apos;ve <span className="gradient-text">Built</span>
                    </h2>
                    <p className="body-text max-w-xl mx-auto">
                        A selection of projects that showcase my experience with full-stack
                        development, AI systems, and scalable architecture.
                    </p>
                </motion.div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={i}
                            onSelect={setSelectedProject}
                        />
                    ))}
                </div>
            </div>

            {/* Detail modal */}
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
