import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const navLinks = ["about", "skills", "projects", "contact"]
  const navigate = useNavigate()

  useEffect(() => {
    const observers = []
    const sectionMap = new Map()

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        sectionMap.set(entry.target.id, entry.intersectionRatio)
      })
      let best = null, bestRatio = 0
      sectionMap.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = id }
      })
      if (bestRatio > 0) setActiveSection(best)
      else setActiveSection(null)
    }

    navLinks.forEach(id => {
      const el = document.querySelector(`#${id}`)
      if (!el) return
      const obs = new IntersectionObserver(handleIntersect, {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -10% 0px',
      })
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = (e) => {
      if (!e.target.closest('[data-navbar]') && !e.target.closest('[data-mobile-menu]')) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleClick = (e, item) => {
    e.preventDefault()
    navigate(`/${item}`)
    setMenuOpen(false)
    setTimeout(() => {
      const target = document.querySelector(`#${item}`)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const isActive = (item) => activeSection === item

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .navbar {
          position: fixed; top: 0; left: 0; right: 0; width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 4rem;
          border-bottom: 1px solid #1e1e30;
          background: rgba(8,8,16,0.95);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          z-index: 1000;
        }
        .navbar-logo {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.85rem; letter-spacing: 0.15em;
          color: #6effc0; text-decoration: none;
          cursor: pointer; white-space: nowrap;
        }
        .navbar-links {
          display: flex; gap: 2.5rem;
          list-style: none; margin: 0; padding: 0;
        }
        .navbar-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.12em;
          color: #88889a;
          text-decoration: none; position: relative;
          padding-bottom: 4px; display: inline-block;
          transition: color 0.2s ease; white-space: nowrap;
        }
        .navbar-link:hover { color: #6effc0; }
        .navbar-link.active { color: #6effc0; }
        .navbar-link-underline {
          position: absolute; bottom: 0; left: 0;
          width: 100%; height: 1px; background: #6effc0;
          transform-origin: left; transition: transform 0.25s ease;
        }
        .navbar-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: transparent; border: none; cursor: pointer;
          padding: 6px; z-index: 1001;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .navbar-bar {
          display: block; width: 24px; height: 2px;
          background: #6effc0; border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
          pointer-events: none;
        }
        .mobile-menu {
          position: fixed; left: 0; right: 0;
          background: rgba(8,8,16,0.99);
          border-bottom: 1px solid #1e1e30;
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          z-index: 999; flex-direction: column; display: none;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.85rem; letter-spacing: 0.15em;
          color: #88889a;
          text-decoration: none; padding: 1.1rem 2rem;
          border-bottom: 1px solid #1e1e30;
          display: flex; align-items: center; gap: 0.75rem;
          -webkit-tap-highlight-color: transparent;
          transition: color 0.2s ease;
        }
        .mobile-menu-link:active { color: #6effc0; }
        .mobile-menu-link.active { color: #6effc0; }
        .mobile-menu-link.active .mobile-menu-arrow { opacity: 1; }
        .mobile-menu-arrow {
          color: #6effc0; font-size: 0.75rem; opacity: 0.5;
          transition: opacity 0.2s ease;
        }
        .mobile-active-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #6effc0; box-shadow: 0 0 5px #6effc0;
          margin-left: auto; flex-shrink: 0;
        }

        @media (min-width: 1440px) {
          .navbar { padding: 1.5rem 8rem; }
          .navbar-logo { font-size: 0.95rem; }
        }
        @media (max-width: 1280px) {
          .navbar { padding: 1.25rem 3rem; }
          .navbar-links { gap: 2rem; }
        }
        @media (max-width: 1024px) {
          .navbar { padding: 1.1rem 2rem; }
          .navbar-links { gap: 1.5rem; }
          .navbar-link { font-size: 0.7rem; }
        }
        @media (max-width: 768px) {
          .navbar {
            display: grid;
            grid-template-columns: 44px 1fr 44px;
            align-items: center;
            padding: 1rem 1.25rem;
          }
          .navbar-links { display: none; }
          .navbar-hamburger { display: flex; grid-column: 1; justify-self: start; }
          .navbar-logo { grid-column: 2; text-align: center; font-size: 0.8rem; }
          .mobile-menu { top: 54px; }
        }
        @media (max-width: 540px) {
          .navbar { grid-template-columns: 40px 1fr 40px; padding: 0.9rem 1rem; }
          .navbar-logo { font-size: 0.75rem; letter-spacing: 0.1em; }
        }
        @media (max-width: 430px) {
          .navbar { grid-template-columns: 38px 1fr 38px; padding: 0.85rem 0.9rem; }
          .navbar-logo { font-size: 0.72rem; letter-spacing: 0.09em; }
        }
        @media (max-width: 390px) {
          .navbar { grid-template-columns: 36px 1fr 36px; padding: 0.8rem 0.85rem; }
          .navbar-logo { font-size: 0.68rem; letter-spacing: 0.08em; }
        }
        @media (max-width: 360px) {
          .navbar { grid-template-columns: 34px 1fr 34px; padding: 0.8rem 0.75rem; }
          .navbar-logo { font-size: 0.64rem; letter-spacing: 0.07em; }
          .mobile-menu { top: 50px; }
          .mobile-menu-link { font-size: 0.78rem; padding: 1rem 1.5rem; }
        }
        @media (max-width: 320px) {
          .navbar { grid-template-columns: 32px 1fr 32px; padding: 0.75rem 0.7rem; }
          .navbar-logo { font-size: 0.6rem; letter-spacing: 0.06em; }
          .mobile-menu { top: 47px; }
          .mobile-menu-link { font-size: 0.72rem; padding: 0.9rem 1.25rem; }
        }
        @media (min-width: 1000px) and (max-width: 1030px) and (max-height: 640px) {
          .navbar { padding: 0.75rem 2rem; }
          .navbar-logo { font-size: 0.75rem; }
          .navbar-link { font-size: 0.65rem; }
          .navbar-links { gap: 1.25rem; }
        }
        @media (min-width: 1260px) and (max-width: 1300px) and (max-height: 850px) {
          .navbar { padding: 0.85rem 3rem; }
          .navbar-logo { font-size: 0.78rem; }
          .navbar-link { font-size: 0.68rem; }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .navbar { padding: 0.65rem 1.5rem; }
          .navbar-logo { font-size: 0.72rem; }
          .navbar-link { font-size: 0.65rem; }
          .navbar-links { gap: 1.25rem; }
        }
      `}</style>

      <nav data-navbar className="navbar">
        <button
          className="navbar-hamburger"
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
          aria-label="Toggle navigation menu"
        >
          <span className="navbar-bar" style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span className="navbar-bar" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="navbar-bar" style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>

        <a
          href="/"
          className="navbar-logo"
          onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          JOMARPHILIP.DEV
        </a>

        <ul className="navbar-links">
          {navLinks.map((item) => (
            <li key={item} style={{ position: 'relative' }}>
              <a
                href={`/${item}`}
                className={`navbar-link${isActive(item) ? ' active' : ''}`}
                style={hoveredLink === item ? { color: '#6effc0' } : {}}
                onClick={(e) => handleClick(e, item)}
                onMouseEnter={() => setHoveredLink(item)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item}
                <span
                  className="navbar-link-underline"
                  style={{ transform: (hoveredLink === item || isActive(item)) ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div data-mobile-menu className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map((item) => (
          <a
            key={item}
            href={`/${item}`}
            className={`mobile-menu-link${isActive(item) ? ' active' : ''}`}
            onClick={(e) => handleClick(e, item)}
          >
            <span className="mobile-menu-arrow">→</span>
            {item}
            {isActive(item) && <span className="mobile-active-dot" />}
          </a>
        ))}
      </div>
    </>
  )
}

export default Navbar