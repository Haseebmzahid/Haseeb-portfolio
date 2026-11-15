import { ArrowUpRight } from "lucide-react";
import { education, qualifications } from "@/constants/credentials.data";
import { biography } from "@/constants/profile.data";
import PortraitSequence from "@/components/spatial/PortraitSequence";

export default function AboutSection() {
  return (
    <section id="about" className="about-section section-wrap">
      <p className="eyebrow">02 / THE PERSON BEHIND THE SYSTEMS</p>
      <div className="about-layout">
        <PortraitSequence />
        <div className="about-copy">
          <h2>
            A systems mind.
            <br />
            <em>A human perspective.</em>
          </h2>
          <p className="about-intro">{biography[0]}</p>
          <p>{biography[1]}</p>
          <p>{biography[4]}</p>
          <details className="biography-details">
            <summary>
              More about my approach <span>+</span>
            </summary>
            {[biography[2], biography[3], biography[5]].map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              Areas of depth: System Design / Backend APIs / AI Integration /
              DevOps / Database Internals / Performance Optimization / Clean
              Architecture / Production Deployment.
            </p>
            <p>Stack: Next.js · Node · MongoDB · DevOps.</p>
          </details>
          <div className="profile-facts">
            <div>
              <span>FOCUS</span>
              <p>Backend &amp; AI Systems</p>
            </div>
            <div>
              <span>OPEN TO</span>
              <p>Internships · Remote · Freelance</p>
            </div>
          </div>
          <a
            className="text-link"
            href="/Haseeb-Zahid-Resume.pdf"
            download="Haseeb-Zahid-Resume.pdf"
          >
            The full story / Résumé <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="education-credentials">
        <div className="education-record">
          <span className="eyebrow">EDUCATION / THE FOUNDATION</span>
          <h3>{education.degree}</h3>
          <p>{education.institution}</p>
          <span className="education-context">{education.context}</span>
        </div>
        <div className="qualification-list">
          <p className="eyebrow">CERTIFICATIONS &amp; CONTINUED LEARNING</p>
          {qualifications.map((q, i) => (
            <div className="qualification" key={q.issuer}>
              <span className="qualification-number">0{i + 1}</span>
              <div>
                <span className="qualification-issuer">{q.issuer}</span>
                <h4>{q.title}</h4>
              </div>
              <span className="qualification-type">{q.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
