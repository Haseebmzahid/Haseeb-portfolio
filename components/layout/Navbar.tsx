"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { navItems, siteConfig } from "@/config/nav.config";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useClickOutside } from "@/hooks/useClickOutside";

/* ─────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────── */
const navVariants: Variants = {
    hidden: { y: -80, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const linkVariants: Variants = {
    hidden: { y: -12, opacity: 0 },
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: { delay: 0.3 + i * 0.06, duration: 0.4, ease: "easeOut" },
    }),
};

const mobileMenuVariants: Variants = {
    closed: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
    },
    open: {
        opacity: 1,
        height: "auto",
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const mobileLinkVariants: Variants = {
    closed: { x: -16, opacity: 0 },
    open: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: 0.05 + i * 0.06, duration: 0.35, ease: "easeOut" },
    }),
};

/* ─────────────────────────────────────────────
   Hamburger icon component
   ───────────────────────────────────────────── */
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <div className="relative w-5 h-4 flex flex-col justify-between">
            <motion.span
                className="block h-[2px] w-full bg-fg-primary rounded-full origin-center"
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
                className="block h-[2px] w-full bg-fg-primary rounded-full"
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
            />
            <motion.span
                className="block h-[2px] w-full bg-fg-primary rounded-full origin-center"
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </div>
    );
}

/* ─────────────────────────────────────────────
   Navbar component
   ───────────────────────────────────────────── */
export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    // Track scroll to add backdrop blur
    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 20);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Active section tracking
    const sectionIds = useMemo(
        () => navItems.map((item) => item.href.replace("#", "")),
        []
    );
    const activeSection = useActiveSection(sectionIds);

    // Close mobile menu on outside click
    useClickOutside(navRef, () => setMobileOpen(false));

    // Smooth scroll handler
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            setMobileOpen(false);

            const targetId = href.replace("#", "");
            const element = document.getElementById(targetId);

            if (element) {
                const navHeight = 80;
                const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: "smooth" });
            }
        },
        []
    );

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <motion.nav
            ref={navRef}
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border-default shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                : "bg-transparent"
                }`}
        >
            <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-[72px]">
                {/* ── Logo ── */}
                <motion.a
                    href="#home"
                    onClick={(e) => handleClick(e, "#home")}
                    className="relative text-xl font-bold tracking-tight text-fg-primary focus-ring"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span className="gradient-text">{siteConfig.name}</span>
                    <span className="text-accent-indigo">.</span>
                </motion.a>

                {/* ── Desktop links ── */}
                <ul className="hidden md:flex items-center gap-1">
                    {navItems.map((item, i) => {
                        const isActive = activeSection === item.href.replace("#", "");
                        return (
                            <motion.li
                                key={item.href}
                                custom={i}
                                variants={linkVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <a
                                    href={item.href}
                                    onClick={(e) => handleClick(e, item.href)}
                                    className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus-ring ${isActive
                                        ? "text-fg-primary"
                                        : "text-fg-muted hover:text-fg-secondary"
                                        }`}
                                >
                                    {item.label}

                                    {/* Active indicator pill */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeNav"
                                            className="absolute inset-0 rounded-lg bg-bg-elevated border border-border-default -z-10"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </a>
                            </motion.li>
                        );
                    })}

                    {/* CTA button */}
                    <motion.li
                        custom={navItems.length}
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <a
                            href="#contact"
                            onClick={(e) => handleClick(e, "#contact")}
                            className="ml-3 btn-primary text-sm !px-5 !py-2"
                        >
                            Let&apos;s Talk
                        </a>
                    </motion.li>
                </ul>

                {/* ── Mobile hamburger ── */}
                <motion.button
                    className="md:hidden relative z-50 p-2 rounded-lg focus-ring"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    whileTap={{ scale: 0.9 }}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                >
                    <HamburgerIcon isOpen={mobileOpen} />
                </motion.button>
            </div>

            {/* ── Mobile menu panel ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="md:hidden overflow-hidden border-t border-border-default bg-bg-primary/95 backdrop-blur-2xl"
                    >
                        <ul className="flex flex-col px-6 py-6 gap-1">
                            {navItems.map((item, i) => {
                                const isActive = activeSection === item.href.replace("#", "");
                                return (
                                    <motion.li
                                        key={item.href}
                                        custom={i}
                                        variants={mobileLinkVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                    >
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleClick(e, item.href)}
                                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${isActive
                                                ? "text-fg-primary bg-bg-elevated border border-border-default"
                                                : "text-fg-muted hover:text-fg-secondary hover:bg-bg-secondary/50"
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    </motion.li>
                                );
                            })}

                            {/* Mobile CTA */}
                            <motion.li
                                custom={navItems.length}
                                variants={mobileLinkVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="mt-3"
                            >
                                <a
                                    href="#contact"
                                    onClick={(e) => handleClick(e, "#contact")}
                                    className="btn-primary w-full justify-center text-base"
                                >
                                    Let&apos;s Talk
                                </a>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
