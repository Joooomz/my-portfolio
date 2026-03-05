import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Linkedin, ArrowUp } from "lucide-react"
import { FaGithub } from "react-icons/fa"

const navLinks = [
  { label: "About",    id: "about" },
  { label: "Skills",   id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact",  id: "contact" },
]

const socialLinks = [
  { label: "Email",    href: "mailto:jomarphilip.balane@gmail.com", Icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com/in/jomar-balane",  Icon: Linkedin },
  { label: "GitHub",   href: "https://github.com/Joooomz",            Icon: FaGithub },
]

function Footer() {
  const [hoveredNav, setHoveredNav] = useState(null)
  const [hoveredSocial, setHoveredSocial] = useState(null)
  const [hoveredTop, setHoveredTop] = useState(false)
  const navigate = useNavigate()

  const handleNavClick = (e, id) => {
    e.preventDefault()
    navigate(`/${id}`)
    setTimeout(() => {
      const target = document.querySelector(`#${id}`)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const scrollToTop = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .footer {
          padding: 3rem 4rem;
          border-top: 1px solid #1e1e30;
          background: #080810;
          width: 100%; overflow-x: hidden;
        }
        .footer-top {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem; gap: 1.5rem;
        }
        .footer-logo {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.85rem; letter-spacing: 0.15em;
          color: #6effc0; text-decoration: none;
          white-space: nowrap; flex-shrink: 0; cursor: pointer;
        }
        .footer-nav {
          display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;
        }
        .footer-nav-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.08em;
          color: #88889a; text-decoration: none;
          transition: color 0.2s ease;
          border-bottom: 1px solid transparent; padding-bottom: 2px;
          white-space: nowrap; -webkit-tap-highlight-color: transparent;
        }
        .footer-nav-link:hover { color: #6effc0; border-bottom-color: #6effc0; }
        .footer-top-btn {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.08em;
          color: #88889a; background: transparent;
          border: 1px solid #2c2c44; padding: 0.5rem 1rem; cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease;
          white-space: nowrap; flex-shrink: 0;
          display: flex; align-items: center; gap: 0.4rem;
          -webkit-tap-highlight-color: transparent;
        }
        .footer-top-btn:hover { color: #6effc0; border-color: #6effc0; }
        .footer-divider { width: 100%; height: 1px; background: #1e1e30; margin-bottom: 2rem; }
        .footer-bottom {
          display: flex; align-items: center;
          justify-content: space-between; gap: 1rem; flex-wrap: wrap;
        }
        .footer-copy {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.1em; color: #55556a;
        }
        .footer-socials { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .footer-social-link {
          display: flex; align-items: center; gap: 0.4rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.08em;
          color: #88889a; text-decoration: none;
          transition: color 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .footer-social-link:hover { color: #6effc0; }
        .footer-social-icon { color: #6effc0; display: flex; align-items: center; }

        @media (min-width: 1440px) { .footer { padding: 3rem 8rem; } }
        @media (max-width: 1280px) { .footer { padding: 3rem 3rem; } }
        @media (max-width: 1024px) { .footer { padding: 2.5rem 2rem; } .footer-nav { gap: 1.5rem; } }
        @media (max-width: 820px) {
          .footer { padding: 2.5rem 2rem; }
          .footer-top { flex-direction: column; align-items: center; text-align: center; gap: 1.25rem; }
          .footer-nav { gap: 1.25rem; justify-content: center; }
          .footer-bottom { flex-direction: column; align-items: center; text-align: center; gap: 1rem; }
          .footer-socials { justify-content: center; }
        }
        @media (max-width: 600px) { .footer { padding: 2rem 1.5rem; } .footer-nav { gap: 1rem; } .footer-logo { font-size: 0.78rem; } }
        @media (max-width: 480px) {
          .footer { padding: 2rem 1.25rem; }
          .footer-nav { gap: 0.85rem; }
          .footer-nav-link { font-size: 0.65rem; }
          .footer-top-btn { font-size: 0.65rem; padding: 0.45rem 0.85rem; }
          .footer-copy { font-size: 0.6rem; }
          .footer-social-link { font-size: 0.6rem; }
          .footer-socials { gap: 1.1rem; }
        }
        @media (max-width: 360px) {
          .footer { padding: 1.75rem 1rem; }
          .footer-logo { font-size: 0.7rem; letter-spacing: 0.1em; }
          .footer-nav { gap: 0.75rem; }
          .footer-nav-link { font-size: 0.6rem; }
          .footer-copy { font-size: 0.55rem; }
          .footer-social-link { font-size: 0.55rem; }
          .footer-socials { gap: 0.85rem; }
        }
        @media (max-width: 320px) {
          .footer-logo { font-size: 0.65rem; letter-spacing: 0.08em; }
          .footer-nav { gap: 0.6rem; }
          .footer-nav-link { font-size: 0.55rem; letter-spacing: 0.06em; }
        }
        @media (max-height: 640px) and (orientation: landscape) {
          .footer { padding: 1.5rem 2rem; }
          .footer-top { margin-bottom: 1.25rem; }
          .footer-divider { margin-bottom: 1.25rem; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-top">
          <a href="/" className="footer-logo" onClick={(e) => { e.preventDefault(); scrollToTop() }}>
            JOMARPHILIP.DEV
          </a>

          <nav className="footer-nav">
            {navLinks.map((l) => (
              <a key={l.label} href={`/${l.id}`} className="footer-nav-link"
                style={hoveredNav === l.label ? { color: '#6effc0', borderBottomColor: '#6effc0' } : {}}
                onClick={(e) => handleNavClick(e, l.id)}
                onMouseEnter={() => setHoveredNav(l.label)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button className="footer-top-btn"
            style={hoveredTop ? { color: '#6effc0', borderColor: '#6effc0' } : {}}
            onClick={scrollToTop}
            onMouseEnter={() => setHoveredTop(true)}
            onMouseLeave={() => setHoveredTop(false)}
          >
            <ArrowUp size={13} strokeWidth={2} /> Back to top
          </button>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Jomar Philip Balane. All rights reserved.
          </p>

          <div className="footer-socials">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href}
                target={s.label !== 'Email' ? '_blank' : undefined}
                rel="noreferrer" className="footer-social-link"
                style={hoveredSocial === s.label ? { color: '#6effc0' } : {}}
                onMouseEnter={() => setHoveredSocial(s.label)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <span className="footer-social-icon"><s.Icon size={13} /></span>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer