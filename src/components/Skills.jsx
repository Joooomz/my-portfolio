import { useEffect, useRef, useState } from "react"
import CircuitCanvas from "./CircuitCanvas"

const skills = [
  { category: "NetSuite", name: "SuiteBuilder", desc: "Custom records, forms, fields & ERP data modeling", level: 95 },
  { category: "NetSuite", name: "SuiteFlow", desc: "Business process automation & approval workflows", level: 92 },
  { category: "NetSuite", name: "SuiteScript 2.x", desc: "User Event, Client, Scheduled scripts & RESTlets", level: 85 },
  { category: "NetSuite", name: "SuiteAnalytics", desc: "Saved searches, dashboards & workbooks", level: 88 },
  { category: "NetSuite", name: "SuiteQL", desc: "Advanced NetSuite data queries & analytics", level: 82 },
  { category: "NetSuite", name: "SuiteTalk", desc: "SOAP & REST integrations with external systems", level: 78 },
  { category: "Web Development", name: "JavaScript", desc: "ES6+, async programming & DOM manipulation", level: 84 },
  { category: "Web Development", name: "React", desc: "Component architecture, hooks & routing", level: 75 },
  { category: "Web Development", name: "Ruby on Rails", desc: "REST APIs, MVC architecture & ActiveRecord", level: 72 },
  { category: "Web Development", name: "HTML & CSS", desc: "Semantic markup & responsive layouts", level: 86 },
  { category: "Tools", name: "SuiteCloud (SDF)", desc: "SuiteCloud Development Framework & deployments", level: 82 },
  { category: "Tools", name: "SQL & SuiteQL", desc: "Database queries, validation & reporting", level: 83 },
  { category: "Tools", name: "Jira & Confluence", desc: "Agile tracking, documentation & collaboration", level: 88 },
  { category: "Integrations", name: "REST APIs", desc: "Connecting NetSuite with external platforms", level: 80 },
  { category: "Tools", name: "Git", desc: "Version control for collaborative development", level: 78 },
]

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

function SkillCard({ skill, index, sectionInView }) {
  const [hovered, setHovered] = useState(false)
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    if (!sectionInView) return
    const delay = setTimeout(() => setBarWidth(skill.level), 200 + index * 60)
    return () => clearTimeout(delay)
  }, [sectionInView, skill.level, index])

  return (
    <div
      className={`skill-card${hovered ? ' skill-card-hovered' : ''}`}
      style={{
        opacity: sectionInView ? 1 : 0,
        transform: sectionInView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s, background 0.2s ease, box-shadow 0.2s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="skill-category">{skill.category}</p>
      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-desc">{skill.desc}</p>
      <div className="skill-bar-wrap">
        <div className="skill-bar">
          <div className="skill-bar-fill" style={{
            width: `${barWidth}%`,
            transition: `width 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.06}s`,
          }} />
        </div>
        <span className="skill-bar-label">{skill.level}%</span>
      </div>
    </div>
  )
}

function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef)

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .skills-section {
          width: 100%; overflow-x: hidden;
          display: flex; flex-direction: column; justify-content: center;
          padding: 8rem 4rem;
          border-bottom: 1px solid #1e1e30;
          position: relative;
        }
        .skills-canvas {
          position: absolute; top:0; left:0;
          width:100%; height:100%;
          display:block; pointer-events:none; z-index:0;
        }
        .skills-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: #6effc0;
          margin-bottom: 1rem; position: relative; z-index: 1;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .skills-label-line {
          display: inline-block; width: 24px; height: 1px; background: #6effc0; flex-shrink: 0;
        }
        .skills-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          line-height: 0.95; color: #dddde8;
          margin-bottom: 3rem; position: relative; z-index: 1;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid #1e1e30;
          position: relative; z-index: 1;
        }
        .skill-card {
          padding: 2rem;
          border-right: 1px solid #1e1e30;
          border-bottom: 1px solid #1e1e30;
          cursor: default;
        }
        .skill-card-hovered {
          background: rgba(110,255,192,0.03);
          box-shadow: inset 0 0 0 1px rgba(110,255,192,0.15);
        }
        .skill-category {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.15em;
          text-transform: uppercase; color: #6effc0;
          margin-bottom: 0.5rem;
        }
        .skill-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem; letter-spacing: 0.03em;
          color: #dddde8; margin-bottom: 0.35rem; line-height: 1;
        }
        .skill-desc {
          font-size: 0.95rem; font-style: italic;
          color: #88889a; margin-bottom: 1.25rem; line-height: 1.5;
        }
        .skill-bar-wrap {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .skill-bar {
          flex: 1; height: 2px; background: #1e1e30;
          border-radius: 99px; overflow: hidden;
        }
        .skill-bar-fill {
          height: 100%; width: 0%;
          background: linear-gradient(to right, #6effc0, #a8ffd8);
          border-radius: 99px;
        }
        .skill-bar-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.6rem; color: #88889a;
          letter-spacing: 0.05em; min-width: 28px; text-align: right;
        }

        /* =============================================
           RESPONSIVE BREAKPOINTS
        ============================================= */

        /* Large desktops */
        @media (min-width: 1440px) {
          .skills-section { padding: 8rem 8rem; }
        }

        /* Laptops */
        @media (max-width: 1280px) {
          .skills-section { padding: 8rem 3rem; }
        }

        /* Tablet landscape / small laptops — 2 columns */
        @media (max-width: 1024px) {
          .skills-section { padding: 7rem 2.5rem; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
          .skill-card { padding: 1.5rem; }
          .skill-name { font-size: 1.4rem; }
          .skill-desc { font-size: 0.85rem; }
        }

        /* Nest Hub (1024x600) */
        @media (min-width: 1000px) and (max-width: 1050px) and (max-height: 640px) {
          .skills-section { padding: 5rem 2rem; }
          .skills-grid { grid-template-columns: repeat(3, 1fr); }
          .skill-card { padding: 1rem; }
          .skill-name { font-size: 1.2rem; }
          .skill-desc { font-size: 0.78rem; margin-bottom: 0.75rem; }
          .skills-title { margin-bottom: 1.5rem; }
        }

        /* Nest Hub Max (1280x800) */
        @media (min-width: 1260px) and (max-width: 1310px) and (max-height: 820px) {
          .skills-section { padding: 5rem 3rem; }
          .skill-card { padding: 1.25rem; }
          .skill-name { font-size: 1.4rem; }
          .skill-desc { font-size: 0.85rem; margin-bottom: 1rem; }
          .skills-title { margin-bottom: 2rem; }
        }

        /* iPad Mini/Air/Pro portrait — 2 columns */
        @media (max-width: 820px) {
          .skills-section { padding: 6rem 2rem; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
          .skill-card { padding: 1.25rem; }
          .skill-name { font-size: 1.3rem; }
          .skill-desc { font-size: 0.82rem; }
          .skills-title { margin-bottom: 2rem; }
        }

        /* Surface Pro portrait */
        @media (min-width: 900px) and (max-width: 930px) and (min-height: 1300px) {
          .skills-section { padding: 6rem 2.5rem; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Surface Duo, large phones — 2 columns */
        @media (max-width: 600px) {
          .skills-section { padding: 5rem 1.5rem; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
          .skill-card { padding: 1rem; }
          .skill-name { font-size: 1.1rem; }
          .skill-desc { font-size: 0.78rem; margin-bottom: 1rem; }
          .skills-title { margin-bottom: 1.75rem; }
        }

        /* Mobile phones — 1 column */
        @media (max-width: 480px) {
          .skills-section { padding: 5rem 1.25rem; }
          .skills-grid { grid-template-columns: 1fr; }
          .skill-card { padding: 1.25rem 1rem; }
          .skill-name { font-size: 1.4rem; }
          .skill-desc { font-size: 0.85rem; }
        }

        /* Small phones */
        @media (max-width: 360px) {
          .skills-section { padding: 5rem 1rem; }
          .skill-card { padding: 1rem; }
          .skill-name { font-size: 1.25rem; }
          .skill-desc { font-size: 0.8rem; }
          .skill-category { font-size: 0.55rem; }
        }

        /* Short landscape — 3 columns compact */
        @media (max-height: 640px) and (orientation: landscape) and (max-width: 1000px) {
          .skills-section { padding: 5rem 2rem; }
          .skills-grid { grid-template-columns: repeat(3, 1fr); }
          .skill-card { padding: 1rem; }
          .skill-name { font-size: 1.1rem; }
          .skill-desc { font-size: 0.75rem; margin-bottom: 0.75rem; }
          .skills-title { margin-bottom: 1.5rem; }
        }
      `}</style>

      <section ref={sectionRef} className="skills-section" id="skills">
        <CircuitCanvas
          gridSize={100}
          pulseCount={4}
          pulseSpeed={0.003}
          nodeOpacity={0.2}
          lineOpacity={0.04}
        />

        <p className="skills-label" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <span className="skills-label-line" />Toolkit
        </p>

        <h2 className="skills-title" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          Skills &amp;<br />Technologies
        </h2>

        <div className="skills-grid">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} sectionInView={inView} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Skills