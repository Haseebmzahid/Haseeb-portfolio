import { skillCategories } from "@/constants/skills.data";

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section section-wrap">
      <div className="section-heading">
        <p className="eyebrow">03 / TECHNICAL EXPERTISE</p>
        <div className="heading-row">
          <h2>
            Deep foundations.
            <br />
            <em>Broader possibilities.</em>
          </h2>
          <p>
            The tools change.
            <br />
            The engineering principles stay.
          </p>
        </div>
      </div>
      <div className="skills-ledger">
        {skillCategories.map((c, i) => (
          <div className="skill-row" key={c.title}>
            <span className="skill-number">0{i + 1}</span>
            <h3>{c.title}</h3>
            <p>
              {c.skills.map((s) => (
                <span key={s.name}>{s.name}</span>
              ))}
            </p>
          </div>
        ))}
      </div>
      <div className="skills-footnote">
        <span>ARCHITECTURE / IMPLEMENTATION / INFRASTRUCTURE</span>
        <span>Always learning. Always building.</span>
      </div>
    </section>
  );
}
