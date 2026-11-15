"use client";
import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useInView } from "framer-motion";
import { socialLinks } from "@/config/socials.config";
import { useMedia, useSceneMotion } from "@/components/spatial/MotionProvider";
import { projects } from "@/constants/projects.data";
import { useGlassHighlight } from "@/hooks/useGlassHighlight";
import SceneBoundary from "@/components/spatial/SceneBoundary";

const LaptopScene = dynamic(() => import("@/components/spatial/LaptopScene"), {
  ssr: false,
});
const names = projects.map((p) => p.selectorLabel);
const screens = projects.map((p) => p.screen);
export default function HeroSection() {
  const glassHighlight = useGlassHighlight();
  const [project, setProject] = useState(0);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });
  const desktop = useMedia("(min-width: 769px)");
  const motion = useSceneMotion();
  const fallback = (
    <div className="laptop-fallback">
      <div className="fallback-screen">
        <Image
          src={`/displays/${screens[project]}.svg`}
          width={1440}
          height={900}
          alt={`${names[project]} illustrative software interface`}
          priority
        />
      </div>
      <div className="fallback-base" />
    </div>
  );
  return (
    <section id="home" className="hero">
      <div className="hero-topline">
        <span>
          <i className="status-dot" /> Open to meaningful opportunities
        </span>
        <span className="hero-edition">PORTFOLIO / SPATIAL ENGINEERING</span>
      </div>
      <div className="hero-composition">
        <div className="hero-copy">
          <p className="eyebrow">
            HASEEB ZAHID <span>—</span> SOFTWARE ENGINEER
          </p>
          <h1>
            I turn complex
            <br />
            problems into
            <br />
            <em>useful software.</em>
          </h1>
          <p className="hero-description">
            Building thoughtful systems through backend engineering, applied AI
            and product-minded development.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="button-light">
              View Work <ArrowDownRight size={17} />
            </a>
            <a
              href="/Haseeb-Zahid-Resume.pdf"
              download="Haseeb-Zahid-Resume.pdf"
              className="text-link"
            >
              Download Résumé <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="hero-socials">
            {socialLinks.map((s) => (
              <a
                href={s.href}
                key={s.label}
                target={s.label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                {s.label}
                <ArrowUpRight size={11} />
              </a>
            ))}
          </div>
        </div>
        <div ref={ref} className="hero-stage" data-scene-ready={ready}>
          <div className="stage-coordinate top">
            FIG. 01 / THE ENGINEERING WORKSPACE
          </div>
          <div className="stage-orbit orbit-one" />
          <div className="stage-orbit orbit-two" />
          <div className="stage-axis" />
          <div className="stage-floor" />
          <div className="laptop-canvas">
            {desktop && visible ? (
              <SceneBoundary fallback={fallback}>
                <LaptopScene
                  project={project}
                  animate={visible && motion}
                  onReady={onReady}
                />
              </SceneBoundary>
            ) : (
              fallback
            )}
            {desktop && visible && !ready && (
              <div className="scene-loading">{fallback}</div>
            )}
          </div>
          <span className="stage-coordinate bottom">
            {desktop
              ? "ALUMINIUM / LIGHT / CODE"
              : "PROJECT INTERFACE / PREVIEW"}
          </span>
          <span className="stage-index">
            0{project + 1}
            <small>/ 0{projects.length}</small>
          </span>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#projects" className="scroll-cue">
          <ArrowDown size={16} />
          <span>SCROLL TO EXPLORE</span>
        </a>
        <div
          className="project-switcher"
          onPointerMove={glassHighlight}
          aria-label="Laptop project display"
        >
          <span className="switcher-label">ON DISPLAY</span>
          {names.map((name, i) => (
            <button
              key={name}
              aria-pressed={project === i}
              onClick={() => setProject(i)}
            >
              <span>0{i + 1}</span>
              {name}
              <span className="selection-dot" />
            </button>
          ))}
        </div>
      </div>
      <p className="demo-note" aria-live="polite">
        {names[project]} ·{" "}
        {projects[project].id === "finflow"
          ? "Historical app capture in a product presentation. No live market feed."
          : "Illustrative interface with sample data, based on project descriptions."}
      </p>
    </section>
  );
}
