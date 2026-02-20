"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { socialLinks } from "@/config/socials.config";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
type FormStatus = "idle" | "loading" | "success" | "error";

interface FieldErrors {
    name?: string[];
    email?: string[];
    message?: string[];
}

/* ─────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
};

const statusVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" as const },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2 },
    },
};

/* ─────────────────────────────────────────────
   Floating label input
   ───────────────────────────────────────────── */
function FloatingInput({
    id,
    label,
    type = "text",
    value,
    onChange,
    error,
    disabled,
}: {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disabled: boolean;
}) {
    const hasValue = value.length > 0;

    return (
        <div className="relative">
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                autoComplete={type === "email" ? "email" : id === "name" ? "name" : "off"}
                placeholder=" "
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`peer w-full bg-bg-card border rounded-lg px-4 pt-5 pb-2 text-fg-primary text-sm outline-none transition-all duration-200 placeholder-transparent disabled:opacity-50 ${error
                        ? "border-red-500/60 focus:border-red-400"
                        : "border-border-default focus:border-accent-indigo hover:border-border-hover"
                    } focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]`}
            />
            <label
                htmlFor={id}
                className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${hasValue
                        ? "top-2.5 translate-y-0 text-xs text-fg-muted"
                        : "top-1/2 -translate-y-1/2 text-fg-muted"
                    } peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent-indigo ${error ? "peer-focus:text-red-400" : ""
                    }`}
            >
                {label}
            </label>
            <AnimatePresence>
                {error && (
                    <motion.p
                        id={`${id}-error`}
                        variants={statusVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                        role="alert"
                    >
                        <AlertCircle size={12} />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Floating label textarea
   ───────────────────────────────────────────── */
function FloatingTextarea({
    id,
    label,
    value,
    onChange,
    error,
    disabled,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    disabled: boolean;
}) {
    const hasValue = value.length > 0;

    return (
        <div className="relative">
            <textarea
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder=" "
                rows={5}
                maxLength={2000}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`peer w-full bg-bg-card border rounded-lg px-4 pt-6 pb-3 text-fg-primary text-sm outline-none transition-all duration-200 placeholder-transparent resize-none disabled:opacity-50 ${error
                        ? "border-red-500/60 focus:border-red-400"
                        : "border-border-default focus:border-accent-indigo hover:border-border-hover"
                    } focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]`}
            />
            <label
                htmlFor={id}
                className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${hasValue
                        ? "top-1.5 text-xs text-fg-muted"
                        : "top-4 text-fg-muted"
                    } peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent-indigo ${error ? "peer-focus:text-red-400" : ""
                    }`}
            >
                {label}
            </label>
            {/* Character count */}
            <span
                className={`absolute bottom-2 right-3 text-[11px] ${value.length > 1900 ? "text-red-400" : "text-fg-muted"
                    }`}
            >
                {value.length}/2000
            </span>
            <AnimatePresence>
                {error && (
                    <motion.p
                        id={`${id}-error`}
                        variants={statusVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                        role="alert"
                    >
                        <AlertCircle size={12} />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Contact Section
   ───────────────────────────────────────────── */
export default function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<FormStatus>("idle");
    const [serverMessage, setServerMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setFieldErrors({});
        setServerMessage("");
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    setFieldErrors({
                        name: data.errors.name,
                        email: data.errors.email,
                        message: data.errors.message,
                    });
                }
                setServerMessage(data.message || "Something went wrong.");
                setStatus("error");
                return;
            }

            setServerMessage(data.message);
            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");

            // Reset to idle after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch {
            setServerMessage("Network error. Please check your connection.");
            setStatus("error");
        }
    }

    const isDisabled = status === "loading" || status === "success";

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-dot-grid opacity-20" aria-hidden="true" />
            <div
                className="glow-blob absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.04]"
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: "easeOut" as const }}
                >
                    <span className="inline-block text-sm font-mono tracking-widest uppercase text-accent-indigo mb-4">
                        Get in Touch
                    </span>
                    <h2 className="heading-lg mb-4">
                        Let&apos;s{" "}
                        <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="body-text max-w-xl mx-auto">
                        Have a project in mind or want to collaborate? Drop me
                        a message and I&apos;ll get back to you as soon as
                        possible.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                    {/* ── Form column ── */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 glass p-8 space-y-5"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        noValidate
                    >
                        <motion.div variants={itemVariants}>
                            <FloatingInput
                                id="name"
                                label="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={fieldErrors.name?.[0]}
                                disabled={isDisabled}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <FloatingInput
                                id="email"
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={fieldErrors.email?.[0]}
                                disabled={isDisabled}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <FloatingTextarea
                                id="message"
                                label="Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                error={fieldErrors.message?.[0]}
                                disabled={isDisabled}
                            />
                        </motion.div>

                        {/* Submit button */}
                        <motion.div variants={itemVariants}>
                            <button
                                type="submit"
                                disabled={isDisabled}
                                className="btn-primary w-full justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </motion.div>

                        {/* Status feedback — accessible live region */}
                        <div aria-live="polite" aria-atomic="true">
                            <AnimatePresence mode="wait">
                                {status === "success" && (
                                    <motion.div
                                        key="success"
                                        variants={statusVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                                        role="status"
                                    >
                                        <CheckCircle2
                                            size={18}
                                            className="shrink-0"
                                        />
                                        <span>{serverMessage}</span>
                                    </motion.div>
                                )}
                                {status === "error" && (
                                    <motion.div
                                        key="error"
                                        variants={statusVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                                        role="alert"
                                    >
                                        <AlertCircle
                                            size={18}
                                            className="shrink-0"
                                        />
                                        <span>{serverMessage}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.form>

                    {/* ── Info sidebar ── */}
                    <motion.div
                        className="lg:col-span-2 space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {/* Direct contact info */}
                        <motion.div
                            variants={itemVariants}
                            className="card-subtle space-y-4"
                        >
                            <h3 className="text-base font-semibold text-fg-primary">
                                Direct Contact
                            </h3>
                            <div className="space-y-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target={
                                            link.href.startsWith("mailto")
                                                ? undefined
                                                : "_blank"
                                        }
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-sm text-fg-secondary hover:text-fg-primary transition-colors duration-200 group"
                                    >
                                        <span className="p-2 rounded-lg bg-bg-card border border-border-default group-hover:border-border-hover transition-colors duration-200">
                                            <link.icon size={16} />
                                        </span>
                                        <span>{link.label}</span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability card */}
                        <motion.div
                            variants={itemVariants}
                            className="card-subtle"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                </span>
                                <span className="text-sm font-medium text-fg-primary">
                                    Available for work
                                </span>
                            </div>
                            <p className="text-xs text-fg-muted leading-relaxed">
                                I&apos;m currently open to freelance projects,
                                full-time roles, and interesting collaboration
                                opportunities.
                            </p>
                        </motion.div>

                        {/* Response time */}
                        <motion.div
                            variants={itemVariants}
                            className="card-subtle"
                        >
                            <p className="text-sm text-fg-secondary">
                                ⚡ Typical response time:{" "}
                                <span className="text-fg-primary font-medium">
                                    within 24 hours
                                </span>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
