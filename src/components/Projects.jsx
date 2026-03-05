import { useEffect, useRef, useState } from "react"
import CircuitCanvas from "./CircuitCanvas"

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

const upcoming = [
  {
    initials: "NS",
    name: "NetSuite Automation Suite",
    desc: "A collection of SuiteScript utilities for automating common ERP tasks — record processing, scheduled jobs, and data validation.",
    tags: ["SuiteScript 2.x", "Scheduled Scripts", "User Event"],
  },
  {
    initials: "RI",
    name: "REST Integration Boilerplate",
    desc: "A RESTlet-based integration template for connecting external applications with NetSuite securely and efficiently.",
    tags: ["RESTlets", "SuiteTalk", "JSON", "OAuth"],
  },
  {
    initials: "PD",
    name: "Portfolio Dashboard",
    desc: "A React + Rails dashboard for tracking personal productivity, learning goals, and project progress.",
    tags: ["React", "Ruby on Rails", "REST API"],
  },
]

function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef)

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .projects-section {
          width: 100%; overflow-x: hidden;
          display: flex; flex-direction: column; justify-content: center;
          padding: 8rem 4rem;
          border-bottom: 1px solid #1e1e30;
          position: relative;
        }
        .projects-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: #6effc0;
          margin-bottom: 1rem; position: relative; z-index: 1;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .projects-label-line {
          display: inline-block; width: 24px; height: 1px;
          background: #6effc0; flex-shrink: 0;
        }
        .projects-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          line-height: 0.95; color: #dddde8;
          margin-bottom: 1rem; position: relative; z-index: 1;
        }
        .projects-subtitle {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.8rem; color: #88889a;
          letter-spacing: 0.08em; margin-bottom: 3rem;
          border-left: 2px solid #6effc0; padding-left: 1rem;
          position: relative; z-index: 1;
        }

        /* ── Coming soon banner ── */
        .projects-coming-banner {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.25rem 1.5rem;
          border: 1px solid rgba(110,255,192,0.2);
          background: rgba(110,255,192,0.04);
          margin-bottom: 3rem;
          position: relative; z-index: 1;
        }
        .projects-coming-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #6effc0; box-shadow: 0 0 8px #6effc0;
          flex-shrink: 0; animation: bannerPulse 2s ease-in-out infinite;
        }
        .projects-coming-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem; letter-spacing: 0.1em;
          color: #6effc0; text-transform: uppercase;
        }

        /* ── Upcoming grid ── */
        .projects-upcoming-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: #55556a;
          margin-bottom: 1.25rem; position: relative; z-index: 1;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: #1e1e30;
          border: 1px solid #1e1e30;
          position: relative; z-index: 1;
        }
        .projects-card {
          background: #080810;
          padding: 2rem;
          display: flex; flex-direction: column; gap: 1rem;
          position: relative; overflow: hidden;
          transition: background 0.2s ease;
        }
        .projects-card:hover { background: rgba(110,255,192,0.03); }
        .projects-card-watermark {
          position: absolute; top: 1rem; right: 1.25rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4rem; color: rgba(110,255,192,0.06);
          letter-spacing: 0.1em; line-height: 1;
          pointer-events: none; user-select: none;
        }
        .projects-card-status {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.55rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #55556a;
          border: 1px solid #1e1e30; border-radius: 999px;
          padding: 0.2rem 0.6rem; width: fit-content;
        }
        .projects-card-status-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #55556a; flex-shrink: 0;
        }
        .projects-card-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem; color: #dddde8;
          letter-spacing: 0.03em; line-height: 1.1;
        }
        .projects-card-desc {
          font-size: 0.88rem; color: #55556a;
          line-height: 1.6; font-style: italic;
        }
        .projects-card-tags {
          display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto;
        }
        .projects-card-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.08em;
          text-transform: uppercase; color: #6effc0;
          background: rgba(110,255,192,0.06);
          border: 1px solid rgba(110,255,192,0.15);
          padding: 0.2rem 0.55rem;
        }

        /* ── RESPONSIVE ── */
        @media (min-width: 1440px) { .projects-section { padding: 8rem 8rem; } }
        @media (max-width: 1280px) { .projects-section { padding: 8rem 3rem; } }
        @media (max-width: 1024px) {
          .projects-section { padding: 7rem 2.5rem; }
          .projects-card { padding: 1.5rem; }
          .projects-card-name { font-size: 1.3rem; }
        }
        @media (max-width: 820px) {
          .projects-section { padding: 6rem 2rem; }
          .projects-grid { grid-template-columns: 1fr; }
          .projects-subtitle { margin-bottom: 2rem; }
          .projects-card-watermark { font-size: 3rem; }
        }
        @media (max-width: 600px) {
          .projects-section { padding: 5rem 1.5rem; }
          .projects-card { padding: 1.25rem; }
          .projects-card-name { font-size: 1.2rem; }
          .projects-card-desc { font-size: 0.83rem; }
          .projects-subtitle { font-size: 0.72rem; margin-bottom: 1.75rem; }
        }
        @media (max-width: 480px) {
          .projects-section { padding: 5rem 1.25rem; }
          .projects-card { padding: 1.1rem; }
          .projects-card-name { font-size: 1.1rem; }
          .projects-card-desc { font-size: 0.8rem; }
        }
        @media (max-width: 360px) {
          .projects-section { padding: 5rem 1rem; }
          .projects-card-name { font-size: 1rem; }
        }
        @media (min-width: 1000px) and (max-width: 1050px) and (max-height: 640px) {
          .projects-section { padding: 5rem 2rem; }
          .projects-card { padding: 1.25rem; }
          .projects-subtitle { margin-bottom: 1.5rem; }
        }
        @media (min-width: 1260px) and (max-width: 1310px) and (max-height: 820px) {
          .projects-section { padding: 5rem 3rem; }
          .projects-subtitle { margin-bottom: 2rem; }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .projects-section { padding: 4.5rem 2rem; }
          .projects-subtitle { margin-bottom: 1.25rem; font-size: 0.68rem; }
          .projects-card { padding: 1rem; }
        }

        @keyframes bannerPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #6effc0; }
          50% { opacity: 0.4; box-shadow: 0 0 3px #6effc0; }
        }
      `}</style>

      <section ref={sectionRef} className="projects-section" id="projects">
        <CircuitCanvas gridSize={100} pulseCount={4} pulseSpeed={0.003} nodeOpacity={0.2} lineOpacity={0.04} />

        <p className="projects-label" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <span className="projects-label-line" />Work
        </p>

        <h2 className="projects-title" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          Projects
        </h2>

        <p className="projects-subtitle" style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.7s ease 0.2s',
        }}>
          Currently building. Real projects dropping soon.
        </p>

        {/* Coming soon banner */}
        <div className="projects-coming-banner" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
        }}>
          <span className="projects-coming-dot" />
          <span className="projects-coming-text">
            Projects in progress — check back soon or watch my GitHub
          </span>
        </div>

        {/* Upcoming cards */}
        <p className="projects-upcoming-label" style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.7s ease 0.3s',
        }}>
          In the pipeline
        </p>

        <div className="projects-grid">
          {upcoming.map((p, i) => (
            <div key={p.name} className="projects-card" style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease ${0.35 + i * 0.08}s, transform 0.6s ease ${0.35 + i * 0.08}s`,
            }}>
              <span className="projects-card-watermark">{p.initials}</span>
              <span className="projects-card-status">
                <span className="projects-card-status-dot" />
                In progress
              </span>
              <h3 className="projects-card-name">{p.name}</h3>
              <p className="projects-card-desc">{p.desc}</p>
              <div className="projects-card-tags">
                {p.tags.map(tag => (
                  <span key={tag} className="projects-card-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Projects