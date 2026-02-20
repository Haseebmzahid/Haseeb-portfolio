"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/constants/skills.data";

/* ─────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────── */
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
};

const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, ease: "easeOut" as const },
    },
};

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function SkillsSection() {
    return (
        <section id="skills" className="section-padding relative overflow-hidden">
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
                        Skills &amp; Technologies
                    </span>
                    <h2 className="heading-lg mb-4">
                        My <span className="gradient-text">Tech Stack</span>
                    </h2>
                    <p className="body-text max-w-xl mx-auto">
                        Technologies and tools I use to bring ideas to life — from backend
                        systems to intelligent AI applications.
                    </p>
                </motion.div>

                {/* Skills grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {skillCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={cardVariants}
                            className="group glass p-6 hover:border-border-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)]"
                        >
                            {/* Category header */}
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-2xl" role="img" aria-label={category.title}>
                                    {category.emoji}
                                </span>
                                <h3 className="text-lg font-semibold text-fg-primary">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Gradient divider */}
                            <div className="h-px mb-5 bg-gradient-to-r from-accent-indigo/30 via-accent-purple/20 to-transparent" />

                            {/* Skill badges */}
                            <motion.div
                                className="flex flex-wrap gap-2"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.04 } },
                                }}
                            >
                                {category.skills.map((skill) => (
                                    <motion.span
                                        key={skill.name}
                                        variants={badgeVariants}
                                        className="tag cursor-default hover:bg-accent-blue/20 hover:border-accent-blue/30 hover:text-accent-cyan transition-all duration-200"
                                    >
                                        {skill.name}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
