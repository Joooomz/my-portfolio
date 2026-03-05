import { useEffect, useRef, useState } from "react"
import CircuitCanvas from "./CircuitCanvas"

const CERTS = [
  "NetSuite Administrator",
  "SuiteFoundation",
  "OCI AI Foundations",
  "NetSuite AI Foundations",
]

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

function CountUp({ target, duration = 1200, suffix = "" }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

function Avatar({ inView }) {
  return (
    <div className="avatar-wrap" style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
    }}>
      <div className="avatar-ring">
        <svg width="240" height="240" style={{ display: 'block' }}>
          <circle cx="120" cy="120" r="110" fill="none" stroke="rgba(110,255,192,0.15)" strokeWidth="1" strokeDasharray="6 4" />
          <circle cx="120" cy="120" r="95" fill="none" stroke="rgba(110,255,192,0.08)" strokeWidth="1" />
        </svg>
      </div>
      <div className="avatar-box">
        <span className="avatar-initials">JB</span>
        <span className="avatar-sub">JPB.DEV</span>
      </div>
      {[{ top: 8, left: 8 }, { top: 8, right: 8 }, { bottom: 8, left: 8 }, { bottom: 8, right: 8 }].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', background: '#6effc0', boxShadow: '0 0 6px #6effc0', ...pos }} />
      ))}
      <div className="floating-tag" style={{ top: '-18px', left: '30px' }}>{'<dev />'}</div>
      <div className="floating-tag" style={{ bottom: '-18px', right: '20px' }}>{'{ ERP }'}</div>
      <div className="floating-tag" style={{ top: '50%', right: '-48px', transform: 'translateY(-50%)' }}>{'fn()'}</div>
      <div className="floating-tag" style={{ top: '50%', left: '-52px', transform: 'translateY(-50%)' }}>{'==>'}</div>
    </div>
  )
}

function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef)

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .about-section {
          min-height: 100vh; width: 100%; overflow-x: hidden;
          display: flex; flex-direction: column; justify-content: center;
          padding: 8rem 4rem;
          border-bottom: 1px solid #1e1e30;
          position: relative;
        }
        .about-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: #6effc0;
          margin-bottom: 1rem; position: relative; z-index: 1;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .about-label-line {
          display: inline-block; width: 24px; height: 1px; background: #6effc0;
        }
        .about-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          line-height: 0.95; color: #dddde8;
          margin-bottom: 3rem; position: relative; z-index: 1;
        }
        .about-top-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 4rem; align-items: start;
          margin-bottom: 3rem;
          position: relative; z-index: 1;
        }
        .avatar-wrap {
          position: relative; width: 240px; height: 240px;
          display: flex; align-items: center; justify-content: center;
          margin: 30px auto;
        }
        .avatar-ring {
          position: absolute; top: -20px; left: -20px;
          animation: rotateSlow 20s linear infinite;
        }
        .avatar-box {
          width: 150px; height: 150px;
          border: 1px solid rgba(110,255,192,0.4);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: rgba(110,255,192,0.04);
          animation: avatarPulse 3s ease-in-out infinite;
          position: relative; z-index: 1; gap: 0.25rem;
        }
        .avatar-initials {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4rem; color: #6effc0; line-height: 1; letter-spacing: 0.05em;
        }
        .avatar-sub {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.5rem; letter-spacing: 0.2em;
          color: rgba(110,255,192,0.5); text-transform: uppercase;
        }
        .floating-tag {
          position: absolute;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.65rem; color: rgba(110,255,192,0.5);
          letter-spacing: 0.08em;
          animation: floatTag 3s ease-in-out infinite;
          white-space: nowrap;
        }
        .about-bio {
          display: flex; flex-direction: column; gap: 1.25rem;
          position: relative; z-index: 1;
        }
        .about-bio-text { font-size: 1.05rem; color: #88889a; line-height: 1.8; }
        .about-certs {
          display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;
        }
        .cert-badge {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: #6effc0;
          border: 1px solid #1e1e30; border-radius: 999px;
          padding: 0.3rem 0.75rem;
        }
        .cert-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #6effc0; box-shadow: 0 0 4px #6effc0;
          display: inline-block; flex-shrink: 0;
        }
        .about-counters {
          display: flex; align-items: center; gap: 2rem;
          margin-top: 1rem; padding-top: 1.5rem;
          border-top: 1px solid #1e1e30;
        }
        .counter { display: flex; flex-direction: column; gap: 0.25rem; }
        .counter-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem; color: #6effc0; line-height: 1;
        }
        .counter-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #88889a;
        }
        .counter-divider { width: 1px; height: 40px; background: #1e1e30; flex-shrink: 0; }
        .about-stats { border: 1px solid #1e1e30; position: relative; z-index: 1; }
        .stat-row {
          display: flex; justify-content: space-between;
          align-items: baseline; padding: 1rem 1.5rem;
          border-bottom: 1px solid #1e1e30; gap: 1rem;
        }
        .stat-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #55556a; flex-shrink: 0;
        }
        .stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem; color: #6effc0;
          letter-spacing: 0.05em; text-align: right;
        }

        /* RESPONSIVE BREAKPOINTS */
        @media (min-width: 1440px) { .about-section { padding: 8rem 8rem; } }
        @media (max-width: 1280px) { .about-section { padding: 8rem 3rem; } .about-top-grid { gap: 3rem; } }
        @media (max-width: 1024px) {
          .about-section { padding: 7rem 2.5rem; }
          .about-top-grid { grid-template-columns: 220px 1fr; gap: 2.5rem; }
          .avatar-wrap { width: 200px; height: 200px; }
          .avatar-ring svg { width: 200px; height: 200px; }
          .avatar-box { width: 125px; height: 125px; }
          .avatar-initials { font-size: 3.2rem; }
        }
        @media (max-width: 820px) {
          .about-section { padding: 6rem 2rem; }
          .about-top-grid { grid-template-columns: 1fr; gap: 2rem; }
          .avatar-wrap { width: 180px; height: 180px; margin: 20px auto; }
          .avatar-ring svg { width: 200px; height: 200px; }
          .avatar-box { width: 115px; height: 115px; }
          .avatar-initials { font-size: 2.8rem; }
          .floating-tag { display: none; }
          .about-bio-text { font-size: 0.95rem; }
          .stat-value { font-size: 1rem; }
        }
        @media (max-width: 600px) {
          .about-section { padding: 5rem 1.5rem; }
          .about-title { margin-bottom: 2rem; }
          .about-counters { gap: 1.25rem; }
          .counter-num { font-size: 2rem; }
          .stat-row { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
          .stat-value { text-align: left; font-size: 0.95rem; }
        }
        @media (max-width: 480px) {
          .about-section { padding: 5rem 1.25rem; }
          .avatar-wrap { width: 160px; height: 160px; }
          .avatar-ring svg { width: 180px; height: 180px; }
          .avatar-box { width: 100px; height: 100px; }
          .avatar-initials { font-size: 2.5rem; }
          .about-bio-text { font-size: 0.9rem; }
          .cert-badge { font-size: 0.6rem; padding: 0.25rem 0.6rem; }
          .about-counters { flex-wrap: wrap; gap: 1rem; }
          .counter-divider { display: none; }
          .counter-num { font-size: 1.8rem; }
          .counter-label { font-size: 0.55rem; }
        }
        @media (max-width: 360px) {
          .about-section { padding: 5rem 1rem; }
          .about-bio-text { font-size: 0.85rem; }
          .stat-label { font-size: 0.65rem; }
          .stat-value { font-size: 0.85rem; }
        }
        @media (max-height: 640px) and (orientation: landscape) {
          .about-section { padding: 5rem 2.5rem; }
          .about-top-grid { gap: 2rem; }
          .avatar-wrap { width: 160px; height: 160px; }
          .avatar-ring svg { width: 180px; height: 180px; }
          .avatar-box { width: 100px; height: 100px; }
          .avatar-initials { font-size: 2.5rem; }
          .floating-tag { display: none; }
          .about-bio-text { font-size: 0.85rem; line-height: 1.6; }
        }

        @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes avatarPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(110,255,192,0.3), inset 0 0 30px rgba(110,255,192,0.05); }
          50% { box-shadow: 0 0 0 12px rgba(110,255,192,0), inset 0 0 30px rgba(110,255,192,0.1); }
        }
        @keyframes floatTag {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 0.7; }
        }
      `}</style>

      <section ref={sectionRef} className="about-section" id="about">
        {/* Lighter circuit for About — larger grid, fewer pulses */}
        <CircuitCanvas
          gridSize={100}
          pulseCount={4}
          pulseSpeed={0.003}
          nodeOpacity={0.2}
          lineOpacity={0.04}
        />

        <p className="about-label" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          position: 'relative', zIndex: 1,
        }}>
          <span className="about-label-line" />About Me
        </p>

        <h2 className="about-title" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          position: 'relative', zIndex: 1,
        }}>
          ERP Automation Engineer.<br />NetSuite Specialist.
        </h2>

        <div className="about-top-grid">
          <Avatar inView={inView} />
          <div className="about-bio" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}>
            <p className="about-bio-text">
              I'm Jomar Philip — a NetSuite specialist and developer based in the Philippines.
              I work with SuiteBuilder, SuiteFlow, and SuiteCloud to design automation,
              custom business logic, and scalable ERP solutions for organizations using Oracle NetSuite.
            </p>
            <p className="about-bio-text">
              Over the past 3+ years at Oracle NetSuite, I've resolved more than 1,000 complex cases
              involving workflows, scripts, and system customization — gaining deep insight into
              how businesses operate inside ERP platforms.
            </p>
            <p className="about-bio-text">
              Today, I focus on building end-to-end solutions that connect ERP systems with
              modern applications using React and APIs — bridging business operations
              with clean, scalable software.
            </p>
            <div className="about-certs">
              {CERTS.map((cert) => (
                <span key={cert} className="cert-badge">
                  <span className="cert-dot" />{cert}
                </span>
              ))}
            </div>
            <div className="about-counters">
              {[
                { target: 3, suffix: '+', label: 'Years at Oracle NetSuite' },
                { target: 4, suffix: '', label: 'Certifications' },
                { target: 1000, suffix: '+', label: 'Cases Resolved' },
              ].map((c, i) => (
                <div key={c.label} style={{ display: 'contents' }}>
                  {i > 0 && <div className="counter-divider" />}
                  <div className="counter">
                    <span className="counter-num"><CountUp target={c.target} suffix={c.suffix} /></span>
                    <span className="counter-label">{c.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-stats" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s',
        }}>
          {[
            { label: "Location",   value: "Philippines" },
            { label: "Role",       value: "NetSuite Developer / ERP Automation Engineer" },
            { label: "NetSuite",   value: "SuiteScript 2.x · SuiteQL · SuiteFlow · SuiteBuilder" },
            { label: "Tech Stack", value: "React · JavaScript · REST APIs · SOAP · HTML · CSS" },
            { label: "Status",     value: "Open to Work" },
          ].map((stat) => (
            <div key={stat.label} className="stat-row">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default About