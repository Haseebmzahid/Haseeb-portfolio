"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSceneMotion } from "./MotionProvider";

const cuts = ["A different perspective", "Space to think", "Beyond the screen"];
export default function PortraitSequence() {
  const [active, setActive] = useState(0);
  const manualCut = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const moving = useSceneMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress < 0.08 || progress > 0.96) manualCut.current = false;
    if (moving && !manualCut.current) {
      const cut = Math.min(2, Math.floor(progress * 3));
      setActive((current) => (current === cut ? current : cut));
    }
  });
  return (
    <div ref={ref} className="portrait-sequence">
      <div className="portrait-grid" aria-hidden="true" />
      <span className="photo-coordinate">HZ / PERSONAL ARCHIVE</span>
      <motion.div className="portrait-film" style={{ y: moving ? y : 0 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`portrait-frame ${i === active ? "is-active" : ""}`}
            data-cut={i}
          >
            <Image
              src={`/portraits/haseeb-${i + 1}.webp`}
              fill
              sizes="(max-width: 768px) 78vw, 480px"
              alt={
                [
                  "Haseeb Zahid by the sea, looking toward the horizon",
                  "Haseeb Zahid seated on a beach",
                  "Haseeb Zahid beside a mountain lake",
                ][i]
              }
            />
            <div className="photo-shade" />
            <span className="frame-label">
              0{i + 1} / {cuts[i]}
            </span>
          </div>
        ))}
      </motion.div>
      <div className="portrait-caption">
        <span>
          Many perspectives.
          <br />
          <em>One curious mind.</em>
        </span>
        <ArrowUpRight size={20} />
      </div>
      <div className="portrait-cuts" aria-label="Photograph sequence">
        {cuts.map((c, i) => (
          <button
            key={c}
            aria-label={`Show portrait ${i + 1}: ${c}`}
            aria-pressed={active === i}
            onClick={() => {
              manualCut.current = true;
              setActive(i);
            }}
          >
            <span>0{i + 1}</span>
            <span className="cut-line" />
          </button>
        ))}
      </div>
    </div>
  );
}
