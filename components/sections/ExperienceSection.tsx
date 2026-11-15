"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { ArrowDownRight, RotateCcw } from "lucide-react";
import { experiences } from "@/constants/experience.data";
import { useMedia, useSceneMotion } from "@/components/spatial/MotionProvider";
import SceneBoundary from "@/components/spatial/SceneBoundary";

const ExperienceScene = dynamic(
  () => import("@/components/spatial/ExperienceScene"),
  { ssr: false },
);
export default function ExperienceSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [portrait, setPortrait] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });
  const desktop = useMedia("(min-width: 1000px)");
  const moving = useSceneMotion();
  function select(index: number) {
    setSelected(index);
    setPortrait(index % 3);
    requestAnimationFrame(() =>
      document.getElementById(`experience-${index}`)?.scrollIntoView({
        behavior: moving ? "smooth" : "instant",
        block: "center",
      }),
    );
  }
  return (
    <section id="experience" className="experience-section section-wrap">
      <div className="section-heading">
        <p className="eyebrow">04 / EXPERIENCE CONSTELLATION</p>
        <div className="heading-row">
          <h2>
            Every experience.
            <br />
            <em>A new perspective.</em>
          </h2>
          <p>
            Professional roles and engineering projects.
            <br />
            Connected by a curiosity for what comes next.
          </p>
        </div>
      </div>
      <div
        ref={ref}
        className={`constellation ${desktop ? "spatial" : "simplified"}`}
      >
        <span className="constellation-label">HASEEB ZAHID / IN CONTEXT</span>
        {desktop && visible && (
          <SceneBoundary
            fallback={<div className="orbit-fallback" aria-hidden="true" />}
          >
            <ExperienceScene
              animate={visible && moving && !hovered && selected === null}
              onSelect={select}
              onHover={setHovered}
            />
          </SceneBoundary>
        )}
        <div className="constellation-portrait">
          {[0, 1, 2].map((i) => (
            <Image
              key={i}
              src={`/portraits/haseeb-${i + 1}.webp`}
              width={360}
              height={480}
              sizes="240px"
              alt={portrait === i ? `Haseeb Zahid, portrait ${i + 1}` : ""}
              className={portrait === i ? "visible" : ""}
            />
          ))}
          <div
            className="portrait-angle-controls"
            aria-label="Constellation portrait angle"
          >
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setPortrait(i)}
                aria-label={`Portrait angle ${i + 1}`}
                aria-pressed={portrait === i}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
        <p className="constellation-hint">
          {desktop
            ? "EXPLORE A NODE / DISCOVER THE STORY"
            : "FIVE EXPERIENCES / ONE CONNECTED JOURNEY"}
        </p>
      </div>
      <div className="timeline-heading">
        <span className="eyebrow">THE UNDERLYING TIMELINE</span>
        {selected !== null ? (
          <button
            className="text-link"
            onClick={() => {
              setSelected(null);
              ref.current?.scrollIntoView({
                behavior: moving ? "smooth" : "instant",
                block: "center",
              });
            }}
          >
            Return to constellation <RotateCcw size={14} />
          </button>
        ) : (
          <span>
            SELECT A RECORD TO READ MORE <ArrowDownRight size={14} />
          </span>
        )}
      </div>
      <div className="experience-timeline">
        {experiences.map((e, i) => (
          <details
            key={e.number}
            id={`experience-${i}`}
            open={selected === i}
            className={selected === i ? "selected" : ""}
          >
            <summary
              onClick={(event) => {
                event.preventDefault();
                setSelected(selected === i ? null : i);
              }}
            >
              <span className="experience-year">{e.period}</span>
              <span className="experience-position">
                <strong>{e.role}</strong>
                <span>{e.org}</span>
              </span>
              <span className="experience-kind">{e.type}</span>
              <span className="expand-symbol">
                {selected === i ? "−" : "+"}
              </span>
            </summary>
            <div className="experience-detail">
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p>{e.tags.join(" / ")}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
