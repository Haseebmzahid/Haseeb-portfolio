"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Pause, Play, X } from "lucide-react";
import { useMotionControl } from "@/components/spatial/MotionProvider";
import { useGlassHighlight } from "@/hooks/useGlassHighlight";
import { useClickOutside } from "@/hooks/useClickOutside";

const links = [
  ["Work", "projects"],
  ["About", "about"],
  ["Expertise", "skills"],
  ["Experience", "experience"],
];
export default function Navbar() {
  const glassHighlight = useGlassHighlight();
  const [open, setOpen] = useState(false);
  const { paused, toggle } = useMotionControl();
  const ref = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useClickOutside(ref, () => setOpen(false));
  useEffect(() => {
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  return (
    <header className="nav-shell">
      <nav
        ref={ref}
        className="floating-nav"
        onPointerMove={glassHighlight}
        aria-label="Main navigation"
      >
        <a className="wordmark" href="#home" onClick={() => setOpen(false)}>
          <span className="monogram">
            hz<span>↗</span>
          </span>
          <span>
            Haseeb Zahid<span className="wordmark-sub">Software engineer</span>
          </span>
        </a>
        <div className="desktop-links">
          {links.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="icon-button motion-toggle"
            onClick={toggle}
            aria-label={
              paused ? "Resume ambient motion" : "Pause ambient motion"
            }
            aria-pressed={paused}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <a href="#contact" className="nav-contact">
            Let’s talk <ArrowUpRight size={14} />
          </a>
          <button
            ref={menuButton}
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div id="mobile-navigation" className="mobile-links">
            {links.concat([["Contact", "contact"]]).map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
