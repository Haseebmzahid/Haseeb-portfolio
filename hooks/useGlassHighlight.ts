"use client";
import type { PointerEvent } from "react";
import { useSceneMotion } from "@/components/spatial/MotionProvider";

export function useGlassHighlight() {
  const moving = useSceneMotion();
  return (event: PointerEvent<HTMLElement>) => {
    if (!moving || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--glass-x",
      `${((event.clientX - rect.left) / rect.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--glass-y",
      `${((event.clientY - rect.top) / rect.height) * 100}%`,
    );
  };
}
