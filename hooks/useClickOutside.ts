"use client";

import { useEffect, type RefObject } from "react";

/**
 * Calls `handler` when a click/touch occurs outside of the referenced element.
 * Used to dismiss the mobile menu when tapping outside.
 */
export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    handler: () => void
): void {
    useEffect(() => {
        function listener(event: MouseEvent | TouchEvent) {
            if (!ref.current || ref.current.contains(event.target as Node)) return;
            handler();
        }

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
