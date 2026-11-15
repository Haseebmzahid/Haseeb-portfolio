"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import { MotionConfig } from "framer-motion";

const MotionContext = createContext({ paused: false, toggle: () => {} });
export function useMedia(query: string) {
  return useSyncExternalStore(
    (listener) => {
      const m = matchMedia(query);
      m.addEventListener("change", listener);
      return () => m.removeEventListener("change", listener);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}
export function useSceneMotion() {
  const { paused } = useContext(MotionContext);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  return !paused && !reduced;
}
export function useMotionControl() {
  return useContext(MotionContext);
}
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <MotionContext.Provider
      value={{ paused, toggle: () => setPaused((v) => !v) }}
    >
      <MotionConfig reducedMotion="user">
        <div data-motion={paused ? "paused" : "active"}>{children}</div>
      </MotionConfig>
    </MotionContext.Provider>
  );
}
