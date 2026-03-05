import { useEffect, useRef, useState } from "react"
import CircuitCanvas from "./CircuitCanvas"

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

const experience = [
  {
    role: "Technical Support Engineer",
    company: "Oracle NetSuite",
    division: "SuiteBuilder & SuiteCloud · Platinum Enterprise",
    period: "Sep 2024 — Present",
    current: true,
    tags: ["SuiteBuilder", "SuiteCloud", "SuiteFlow", "SuiteScript", "EBP"],
    highlights: [
      "Delivered advanced technical support for SuiteBuilder and SuiteCloud, ensuring smooth system functionality and improved user efficiency.",
      "Resolved ERP issues involving custom forms, workflows, and scripts, enhancing business process reliability.",
      "Troubleshot Electronic Bank Payment templates, supporting accurate and seamless financial transactions.",
      "Validated saved searches and reports, improving data integrity and supporting better business insights.",
      "Partnered with cross-functional teams to address product issues, contributing to stronger system performance and client satisfaction.",
      "Documented case resolutions and best practices, strengthening internal knowledge sharing and reducing repeat issues.",
    ],
  },
  {
    role: "Associate Technical Support Engineer",
    company: "Oracle NetSuite",
    division: "SuiteBuilder · General Operations",
    period: "Sep 2022 — Sep 2024",
    current: false,
    tags: ["SuiteBuilder", "Saved Searches", "Custom Forms", "Reporting"],
    highlights: [
      "Handled SuiteBuilder customisation requests to improve usability and process fit.",
      "Performed initial technical analysis and escalated complex cases with clear diagnostics.",
      "Assisted clients with reporting and setup, creating documentation to raise first-contact resolution.",
    ],
  },
  {
    role: "Computer System Technician",
    company: "CANORECO",
    division: "Network and Information Technology Division",
    period: "Jan 2021 — Sep 2022",
    current: false,
    tags: ["Networking", "Hardware", "IT Support", "Documentation"],
    highlights: [
      "Maintained network devices and user systems to ensure availability and security.",
      "Diagnosed hardware and software faults and resolved incidents promptly.",
      "Documented fixes and assisted users to reduce repeat issues.",
    ],
  },
]

const certifications = [
  { name: "NetSuite Administrator", year: "2025", issuer: "Oracle · NetSuite" },
  { name: "SuiteFoundation",        year: "2025", issuer: "Oracle · NetSuite" },
  { name: "NetSuite AI Foundations", year: "2025", issuer: "Oracle NetSuite" },
  { name: "OCI AI Foundations",     year: "2025", issuer: "Oracle Cloud" },
]

function Experience() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef)

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .exp-section {
          width: 100%; overflow-x: hidden;
          display: flex; flex-direction: column; justify-content: center;
          padding: 8rem 4rem;
          border-bottom: 1px solid #1e1e30;
          position: relative;
        }
        .exp-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: #6effc0;
          margin-bottom: 1rem; position: relative; z-index: 1;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .exp-label-line {
          display: inline-block; width: 24px; height: 1px;
          background: #6effc0; flex-shrink: 0;
        }
        .exp-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          line-height: 0.95; color: #dddde8;
          margin-bottom: 3rem; position: relative; z-index: 1;
        }

        /* ── Timeline ── */
        .exp-timeline {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          margin-bottom: 4rem;
        }
        .exp-item {
          display: grid;
          grid-template-columns: 210px 1px 1fr;
          gap: 0 2.5rem;
        }

        /* Left — period */
        .exp-period-col {
          display: flex; flex-direction: column;
          align-items: flex-end; padding-top: 0.15rem; gap: 0.5rem;
        }
        .exp-period {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem; letter-spacing: 0.1em;
          color: #6effc0; text-align: right; white-space: nowrap;
        }
        .exp-current-badge {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.55rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #6effc0;
          border: 1px solid rgba(110,255,192,0.3);
          border-radius: 999px; padding: 0.2rem 0.5rem;
        }
        .exp-current-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #6effc0; box-shadow: 0 0 4px #6effc0;
          flex-shrink: 0; animation: pulseDot 2s ease-in-out infinite;
        }

        /* Center — line + node */
        .exp-line-col {
          display: flex; flex-direction: column; align-items: center;
        }
        .exp-node {
          width: 10px; height: 10px; border-radius: 50%;
          border: 1px solid #6effc0;
          background: rgba(110,255,192,0.15);
          box-shadow: 0 0 8px rgba(110,255,192,0.25);
          flex-shrink: 0; margin-top: 0.15rem; position: relative; z-index: 1;
        }
        .exp-node-dim {
          border-color: #2c2c44;
          background: rgba(44,44,68,0.4);
          box-shadow: none;
        }
        .exp-line {
          flex: 1; width: 1px; margin-top: 4px;
        }
        .exp-line-active {
          background: linear-gradient(to bottom, rgba(110,255,192,0.35), rgba(110,255,192,0.08));
        }
        .exp-line-dim {
          background: linear-gradient(to bottom, #2c2c44, transparent);
        }

        /* Right — content */
        .exp-content { padding-bottom: 3rem; }
        .exp-role {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.5rem, 2.5vw, 2.2rem);
          color: #dddde8; line-height: 1; margin-bottom: 0.2rem;
          letter-spacing: 0.02em;
        }
        .exp-company {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem; letter-spacing: 0.12em;
          color: #6effc0; text-transform: uppercase; margin-bottom: 0.15rem;
        }
        .exp-division {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.08em;
          color: #88889a; margin-bottom: 1.1rem;
        }
        .exp-tags {
          display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;
        }
        .exp-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: #6effc0;
          background: rgba(110,255,192,0.06);
          border: 1px solid rgba(110,255,192,0.18);
          padding: 0.18rem 0.6rem;
        }
        .exp-highlights {
          display: flex; flex-direction: column; gap: 0.55rem;
          list-style: none; margin: 0; padding: 0;
        }
        .exp-highlight {
          display: flex; align-items: baseline; gap: 0.7rem;
          font-size: 0.92rem; color: #88889a; line-height: 1.65;
        }
        .exp-highlight-arrow {
          color: #6effc0; font-family: 'IBM Plex Mono', monospace;
          font-size: 0.6rem; flex-shrink: 0;
        }

        /* ── Certifications ── */
        .exp-certs-title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: #55556a;
          margin-bottom: 1.25rem; position: relative; z-index: 1;
        }
        .exp-certs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* 4 certs in 1 row */
          gap: 1px; background: #1e1e30;
          border: 1px solid #1e1e30;
          position: relative; z-index: 1;
        }
        .exp-cert-card {
          background: #080810; padding: 1.5rem;
          display: flex; flex-direction: column; gap: 0.4rem;
          transition: background 0.2s ease;
        }
        .exp-cert-card:hover { background: rgba(110,255,192,0.03); }
        .exp-cert-year {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.15em;
          color: #6effc0; text-transform: uppercase;
        }
        .exp-cert-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem; color: #dddde8;
          letter-spacing: 0.03em; line-height: 1.1;
        }
        .exp-cert-issuer {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.58rem; color: #55556a; letter-spacing: 0.08em;
        }

        /* ── RESPONSIVE ── */
        @media (min-width: 1440px) { .exp-section { padding: 8rem 8rem; } }
        @media (max-width: 1280px) { .exp-section { padding: 8rem 3rem; } }
        @media (max-width: 1024px) {
          .exp-section { padding: 7rem 2.5rem; }
          .exp-item { grid-template-columns: 170px 1px 1fr; gap: 0 2rem; }
          .exp-role { font-size: clamp(1.3rem, 2.5vw, 1.9rem); }
          /* 2x2 on tablet */
          .exp-certs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 820px) {
          .exp-section { padding: 6rem 2rem; }
          .exp-item { grid-template-columns: 1px 1fr; gap: 0 1.5rem; }
          .exp-period-col { display: none; }
          .exp-title { margin-bottom: 2rem; }
          .exp-certs-grid { grid-template-columns: repeat(2, 1fr); }
          .exp-period-inline {
            display: block !important;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.65rem; letter-spacing: 0.1em;
            color: #6effc0; margin-bottom: 0.5rem;
          }
        }
        @media (min-width: 821px) {
          .exp-period-inline { display: none; }
        }
        @media (max-width: 600px) {
          .exp-section { padding: 5rem 1.5rem; }
          .exp-role { font-size: 1.4rem; }
          .exp-highlight { font-size: 0.85rem; }
          .exp-cert-card { padding: 1.25rem; }
          .exp-certs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .exp-section { padding: 5rem 1.25rem; }
          .exp-role { font-size: 1.25rem; }
          .exp-highlight { font-size: 0.82rem; }
          .exp-item { gap: 0 1.1rem; }
          .exp-certs-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 360px) {
          .exp-section { padding: 5rem 1rem; }
          .exp-role { font-size: 1.1rem; }
          .exp-highlight { font-size: 0.78rem; }
          .exp-certs-grid { grid-template-columns: 1fr; }
        }
        @media (max-height: 640px) and (orientation: landscape) {
          .exp-section { padding: 5rem 2.5rem; }
          .exp-title { margin-bottom: 1.5rem; }
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px #6effc0; }
          50%       { opacity: 0.5; box-shadow: 0 0 8px #6effc0; }
        }
      `}</style>

      <section ref={sectionRef} className="exp-section" id="experience">
        <CircuitCanvas gridSize={100} pulseCount={4} pulseSpeed={0.003} nodeOpacity={0.2} lineOpacity={0.04} />

        <p className="exp-label" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <span className="exp-label-line" />Career
        </p>

        <h2 className="exp-title" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          Experience &amp;<br />Certifications
        </h2>

        {/* Timeline */}
        <div className="exp-timeline">
          {experience.map((job, i) => (
            <div key={i} className="exp-item" style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.7s ease ${0.2 + i * 0.12}s, transform 0.7s ease ${0.2 + i * 0.12}s`,
            }}>
              <div className="exp-period-col">
                <span className="exp-period">{job.period}</span>
                {job.current && (
                  <span className="exp-current-badge">
                    <span className="exp-current-dot" />
                    Current
                  </span>
                )}
              </div>

              <div className="exp-line-col">
                <div className={`exp-node${job.current ? '' : ' exp-node-dim'}`} />
                <div className={`exp-line${job.current ? ' exp-line-active' : ' exp-line-dim'}`} />
              </div>

              <div className="exp-content">
                <span className="exp-period-inline">{job.period}{job.current ? ' · Current' : ''}</span>
                <h3 className="exp-role">{job.role}</h3>
                <p className="exp-company">{job.company}</p>
                <p className="exp-division">{job.division}</p>
                <div className="exp-tags">
                  {job.tags.map(tag => (
                    <span key={tag} className="exp-tag">{tag}</span>
                  ))}
                </div>
                <ul className="exp-highlights">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="exp-highlight">
                      <span className="exp-highlight-arrow">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <p className="exp-certs-title" style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.7s ease 0.55s',
        }}>
          Certifications
        </p>
        <div className="exp-certs-grid" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s',
        }}>
          {certifications.map((cert) => (
            <div key={cert.name} className="exp-cert-card">
              <span className="exp-cert-year">{cert.year}</span>
              <span className="exp-cert-name">{cert.name}</span>
              <span className="exp-cert-issuer">{cert.issuer}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Experience