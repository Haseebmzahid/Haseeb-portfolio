import Image from "next/image";
import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import ProductShowcase from "@/components/spatial/ProductShowcase";
import { projects } from "@/constants/projects.data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="work-section section-wrap">
      <div className="section-heading">
        <p className="eyebrow">01 / SELECTED WORK</p>
        <div className="heading-row">
          <h2>
            Complexity in.
            <br />
            <em>Clarity out.</em>
          </h2>
          <p>
            Products and explorations in turning complex data
            <br className="desktop-break" /> into software people can use.
          </p>
        </div>
      </div>
      {projects.map((p, i) => {
        const v = p;
        return (
          <article
            className={`case-study case-${v.screen}`}
            id={`project-${p.id}`}
            key={p.id}
          >
            <div className="case-meta">
              <span>
                0{i + 1} / {v.category}
              </span>
              <span>
                {p.status} <ArrowUpRight size={13} />
              </span>
            </div>
            {p.kind !== "desktop" ? (
              <ProductShowcase project={p} />
            ) : (
              <div className="case-visual">
                <div className="case-art-title">{v.headline}</div>
                <div className="case-browser">
                  <div className="browser-bar">
                    <span />
                    <span />
                    <span />
                    <p>{p.title} / Interface study</p>
                  </div>
                  <Image
                    src={`/displays/${v.screen}.svg`}
                    width={1440}
                    height={900}
                    sizes="(max-width: 768px) 90vw, 70vw"
                    alt={`Illustrative ${p.title} interface with sample data`}
                  />
                </div>
                <span className="visual-caption">
                  INTERFACE STUDY / ILLUSTRATIVE DATA
                </span>
              </div>
            )}
            <div className="case-info">
              <div>
                <h3>{p.title}</h3>
                <p>{p.shortDescription}</p>
              </div>
              <div className="case-stack">
                <span className="eyebrow">BUILT WITH</span>
                <p>{p.techStack.slice(0, 7).join(" / ")}</p>
                {p.techStack.length > 7 && (
                  <details className="stack-details">
                    <summary>
                      Full technology stack <span>+</span>
                    </summary>
                    <p>{p.techStack.slice(7).join(" / ")}</p>
                  </details>
                )}
                {p.repositoryVisibility === "private" ? (
                  <span className="source-private">
                    <LockKeyhole size={12} /> Private repository
                  </span>
                ) : (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    {p.githubUrl.replace(/\/$/, "").split("/").length > 4
                      ? "View source"
                      : "GitHub profile"}{" "}
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </div>
            <div
              className="workflow"
              aria-label={`${p.title} conceptual workflow`}
            >
              {v.steps.map((s, j) => (
                <span key={s}>
                  <small>0{j + 1}</small>
                  {s}
                  {j < 3 && <ArrowRight size={14} />}
                </span>
              ))}
            </div>
            <details className="project-details">
              <summary>
                Project notes &amp; engineering details <span>+</span>
              </summary>
              <div>
                <p>{p.fullDescription}</p>
                <ul>
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="source-note">
                  {p.id === "finflow"
                    ? "Device screens use an actual app capture from the source repository (January 2026). Historical prices, not a live market feed."
                    : p.kind === "agent"
                      ? "Interactive workflow study with local sample availability. No clinic, patient database or messaging service is connected."
                      : "Original interface illustration with sample data, not a deployed-system screenshot or a live feed."}
                </p>
              </div>
            </details>
          </article>
        );
      })}
    </section>
  );
}
