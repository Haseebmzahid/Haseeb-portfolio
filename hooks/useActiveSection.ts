"use client";

import { useState, useEffect } from "react";

/**
 * Tracks which section is currently visible in the viewport using
 * IntersectionObserver. Returns the id of the active section (without '#').
 *
 * @param sectionIds - Array of section element ids to observe (without '#')
 * @param offset     - rootMargin top offset to trigger slightly before center
 */
export function useActiveSection(
    sectionIds: string[],
    offset: number = 100
): string {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                {
                    rootMargin: `-${offset}px 0px -50% 0px`,
                    threshold: 0.1,
                }
            );

            observer.observe(element);
            observers.push(observer);
        });

        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, [sectionIds, offset]);

    return activeSection;
}
