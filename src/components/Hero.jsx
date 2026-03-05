import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CircuitCanvas from "./CircuitCanvas"

function Hero() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleScroll = (e, id) => {
    e.preventDefault()
    navigate(`/${id}`)
    setTimeout(() => {
      const target = document.querySelector(`#${id}`)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overflow-x: hidden; max-width: 100vw; }

        .hero-section {
          min-height: 100vh; width: 100%; max-width: 100vw;
          overflow-x: hidden;
          display: flex; align-items: center; justify-content: center;
          padding: 9rem 4rem 4rem;
          border-bottom: 1px solid #1e1e30;
          position: relative; overflow-y: visible;
        }
        .hero-content {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          position: relative; z-index: 1;
          width: 100%; max-width: min(760px, 90vw);
          overflow: hidden;
        }
        .hero-avatar-row {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.75rem; margin-bottom: 1.25rem; width: 100%;
        }
        .hero-avatar-box {
          width: 52px; height: 52px; flex-shrink: 0;
          border: 1px solid rgba(110,255,192,0.4);
          background: rgba(110,255,192,0.05);
          display: flex; align-items: center; justify-content: center;
          animation: avatarPulse 2.5s ease-in-out infinite;
        }
        .hero-avatar-initials {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem; color: #6effc0; letter-spacing: 0.05em;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem; letter-spacing: 0.08em;
          color: #6effc0; border: 1px solid #6effc0;
          border-radius: 999px; padding: 0.4rem 0.9rem;
          text-transform: uppercase; max-width: 100%;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #6effc0; box-shadow: 0 0 6px #6effc0;
          display: inline-block; flex-shrink: 0;
        }
        .hero-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: #6effc0; margin-bottom: 1rem;
        }
        .hero-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 7vw, 9rem);
          line-height: 0.92; color: #dddde8;
          margin-bottom: 1.25rem; width: 100%; word-break: break-word;
        }
        .hero-name-accent { color: #6effc0; }
        .hero-tagline {
          font-size: clamp(0.85rem, 1.8vw, 1.1rem);
          font-style: italic; color: #88889a;
          width: 100%; max-width: 520px; line-height: 1.7;
          margin-bottom: 2.5rem; text-align: center; word-break: break-word;
        }
        .hero-actions {
          display: flex; flex-direction: column;
          gap: 0.85rem; width: 100%; align-items: stretch;
        }
        .hero-btn-primary {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 0.9rem 2rem;
          background: #6effc0; color: #080810;
          border: 1px solid #6effc0; text-decoration: none;
          cursor: pointer; transition: background 0.2s, color 0.2s;
          text-align: center; display: block; width: 100%;
        }
        .hero-btn-primary:hover { background: transparent; color: #6effc0; }
        .hero-btn-outline {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 0.9rem 2rem;
          background: transparent; color: #88889a;
          border: 1px solid #2c2c44; text-decoration: none;
          cursor: pointer; transition: border-color 0.2s, color 0.2s;
          text-align: center; display: block; width: 100%;
        }
        .hero-btn-outline:hover { color: #6effc0; border-color: #6effc0; }
        .hero-btn-cv {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 0.9rem 2rem;
          background: transparent; color: #88889a;
          border: 1px solid #2c2c44; text-decoration: none;
          cursor: pointer; transition: border-color 0.2s, color 0.2s, background 0.2s;
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; width: 100%;
        }
        .hero-btn-cv:hover { color: #6effc0; border-color: #6effc0; background: rgba(110,255,192,0.04); }
        .hero-btn-cv-icon { font-size: 0.9rem; line-height: 1; }
        .hero-scroll {
          position: absolute; bottom: 2.5rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 0.5rem; z-index: 1;
        }
        .hero-scroll-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: #55556a;
        }
        .hero-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, #2c2c44, transparent);
          position: relative; overflow: hidden;
        }
        .hero-scroll-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: #6effc0; position: absolute; left: -1px; top: 0;
          animation: scrollBounce 1.6s ease-in-out infinite;
        }

        @media (min-width: 1024px) {
          .hero-section { padding: 9rem 4rem 4rem; }
          .hero-avatar-row { flex-direction: row; gap: 1rem; margin-bottom: 1.5rem; }
          .hero-badge { font-size: 0.7rem; letter-spacing: 0.1em; padding: 0.4rem 1rem; }
          .hero-name { font-size: clamp(4rem, 8vw, 9rem); margin-bottom: 1.5rem; }
          .hero-tagline { margin-bottom: 3rem; font-size: clamp(1rem, 1.8vw, 1.15rem); }
          .hero-actions { flex-direction: row; width: auto; align-items: center; gap: 1rem; }
          .hero-btn-primary, .hero-btn-outline, .hero-btn-cv { width: auto; }
          .hero-scroll { display: flex; }
        }
        @media (min-width: 1440px) { .hero-section { padding: 10rem 8rem 5rem; } }
        @media (min-width: 1000px) and (max-width: 1050px) and (max-height: 640px) {
          .hero-section { padding: 5rem 2.5rem 2rem; }
          .hero-name { font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 0.75rem; }
          .hero-tagline { font-size: 0.85rem; margin-bottom: 1.25rem; }
          .hero-avatar-box { width: 40px; height: 40px; }
          .hero-avatar-initials { font-size: 1rem; }
          .hero-badge { font-size: 0.58rem; padding: 0.3rem 0.7rem; }
          .hero-eyebrow { font-size: 0.65rem; margin-bottom: 0.5rem; }
          .hero-avatar-row { margin-bottom: 0.75rem; }
          .hero-scroll { display: none; }
        }
        @media (min-width: 1260px) and (max-width: 1310px) and (max-height: 820px) {
          .hero-section { padding: 5.5rem 3rem 2rem; }
          .hero-name { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 1rem; }
          .hero-tagline { font-size: 0.9rem; margin-bottom: 1.5rem; }
          .hero-badge { font-size: 0.62rem; }
          .hero-scroll { display: none; }
        }
        @media (min-width: 768px) and (max-width: 1024px) and (min-height: 900px) {
          .hero-section { padding: 6rem 3rem 3rem; }
          .hero-name { font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 1rem; }
          .hero-tagline { font-size: 0.95rem; margin-bottom: 2rem; }
          .hero-badge { font-size: 0.64rem; }
          .hero-scroll { display: none; }
        }
        @media (min-width: 900px) and (max-width: 930px) and (min-height: 1300px) {
          .hero-section { padding: 6rem 3rem 3rem; }
          .hero-name { font-size: clamp(2.8rem, 6vw, 5rem); margin-bottom: 1rem; }
          .hero-tagline { font-size: 1rem; margin-bottom: 2rem; }
          .hero-scroll { display: none; }
        }
        @media (min-width: 520px) and (max-width: 560px) and (min-height: 680px) {
          .hero-section { padding: 6rem 1.5rem 3rem; }
          .hero-name { font-size: clamp(2.2rem, 8vw, 3.5rem); margin-bottom: 0.75rem; }
          .hero-tagline { font-size: 0.88rem; margin-bottom: 1.5rem; }
          .hero-scroll { display: none; }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .hero-section { padding: 4.5rem 2rem 1.5rem; }
          .hero-name { font-size: clamp(1.8rem, 5vw, 3rem); margin-bottom: 0.5rem; }
          .hero-tagline { font-size: 0.8rem; margin-bottom: 1rem; }
          .hero-avatar-box { width: 36px; height: 36px; }
          .hero-avatar-initials { font-size: 0.9rem; }
          .hero-badge { font-size: 0.52rem; padding: 0.25rem 0.6rem; }
          .hero-eyebrow { font-size: 0.6rem; margin-bottom: 0.4rem; }
          .hero-avatar-row { margin-bottom: 0.5rem; gap: 0.5rem; }
          .hero-scroll { display: none; }
          .hero-btn-primary, .hero-btn-outline, .hero-btn-cv { padding: 0.6rem 1.25rem; font-size: 0.65rem; }
        }
        @media (max-width: 360px) {
          .hero-section { padding: 5.5rem 1rem 2.5rem; }
          .hero-badge { font-size: 0.52rem; padding: 0.3rem 0.65rem; letter-spacing: 0.06em; }
          .hero-name { font-size: clamp(2.2rem, 13vw, 3.5rem); }
          .hero-tagline { font-size: 0.85rem; }
          .hero-btn-primary, .hero-btn-outline, .hero-btn-cv { font-size: 0.68rem; padding: 0.8rem 1.5rem; }
        }
        @media (max-width: 320px) {
          .hero-section { padding: 5rem 0.85rem 2rem; }
          .hero-name { font-size: 2.1rem; }
          .hero-badge { font-size: 0.48rem; padding: 0.25rem 0.55rem; }
          .hero-btn-primary, .hero-btn-outline, .hero-btn-cv { font-size: 0.63rem; padding: 0.75rem 1rem; }
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.4; }
        }
        @keyframes avatarPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(110,255,192,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(110,255,192,0); }
        }
      `}</style>

      <section className="hero-section">
        <CircuitCanvas
          gridSize={80}
          pulseCount={12}
          pulseSpeed={0.004}
          nodeOpacity={0.4}
          lineOpacity={0.07}
          glowPulse={true}
        />

        <div className="hero-content" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}>
          <div className="hero-avatar-row">
            <div className="hero-avatar-box">
              <span className="hero-avatar-initials">JB</span>
            </div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Oracle · NetSuite TSE · 3 Years
            </div>
          </div>

          <p className="hero-eyebrow">Available for work</p>

          <h1 className="hero-name">
            Jomar Philip<br />
            <span className="hero-name-accent">Balane</span>
          </h1>

          <p className="hero-tagline">
            I automate the boring stuff so businesses can focus on what matters —
            built on NetSuite, Rails &amp; React.
          </p>

          <div className="hero-actions">
            {/* Fixed: uses React Router + smooth scroll instead of bare href */}
            <a href="/contact" className="hero-btn-primary"
              onClick={(e) => handleScroll(e, 'contact')}>
              Get in touch →
            </a>
            <a href="/about" className="hero-btn-outline"
              onClick={(e) => handleScroll(e, 'about')}>
              Learn more
            </a>
            <a
              href="/jomar-philip-balane-cv.pdf"
              download="Jomar_Philip_Balane_CV.pdf"
              className="hero-btn-cv"
            >
              <span className="hero-btn-cv-icon">↓</span>
              Download CV
            </a>
          </div>
        </div>

        <div className="hero-scroll" style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.2s ease 0.8s' }}>
          <span className="hero-scroll-text">scroll</span>
          <div className="hero-scroll-line">
            <div className="hero-scroll-dot" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero