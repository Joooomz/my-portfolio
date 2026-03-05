import { useEffect, useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import CircuitCanvas from "./CircuitCanvas"

const EMAILJS_SERVICE_ID  = "service_2gbjeu6"
const EMAILJS_TEMPLATE_ID = "template_hu07br7"
const EMAILJS_PUBLIC_KEY  = "4xtL9xu-SaT-Fulle"

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

function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef)

  const [formData, setFormData]   = useState({ name: "", email: "", message: "" })
  const [status, setStatus]       = useState("idle")
  const [focused, setFocused]     = useState(null)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [btnHovered, setBtnHovered]   = useState(false)

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return
    setStatus("sending")

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  formData.name,
          from_email: formData.email,
          message:    formData.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus("sent")
    } catch (err) {
      console.error("EmailJS error:", err)
      setStatus("error")
    }
  }

  const links = [
    { key: "email",    icon: "✉", label: "jomarphilip.balane@gmail.com", href: "mailto:jomarphilip.balane@gmail.com" },
    { key: "linkedin", icon: "◈", label: "linkedin.com/in/jomar-balane",  href: "https://linkedin.com/in/jomar-balane" },
    { key: "github",   icon: "⌥", label: "github.com/Joooomz",            href: "https://github.com/Joooomz" },
  ]

  const isSending = status === "sending"

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .contact-section {
          width: 100%; overflow-x: hidden;
          display: flex; flex-direction: column; justify-content: center;
          padding: 8rem 4rem;
          border-bottom: 1px solid #1e1e30;
          position: relative;
        }
        .contact-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: #6effc0;
          margin-bottom: 1rem; position: relative; z-index: 1;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .contact-label-line {
          display: inline-block; width: 24px; height: 1px;
          background: #6effc0; flex-shrink: 0;
        }
        .contact-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          line-height: 0.95; color: #dddde8;
          margin-bottom: 3rem; position: relative; z-index: 1;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 5rem; align-items: start;
          position: relative; z-index: 1;
        }
        .contact-left { display: flex; flex-direction: column; gap: 2rem; }
        .contact-intro { font-size: 1.05rem; color: #88889a; line-height: 1.8; }
        .contact-links { display: flex; flex-direction: column; gap: 1rem; }
        .contact-link {
          display: flex; align-items: center; gap: 0.75rem;
          text-decoration: none; transition: gap 0.2s ease;
        }
        .contact-link:hover { gap: 1rem; }
        .contact-link-icon {
          font-family: 'IBM Plex Mono', monospace;
          color: #6effc0; font-size: 1rem; flex-shrink: 0;
        }
        .contact-link-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; color: #88889a;
          letter-spacing: 0.05em; transition: color 0.2s ease;
          border-bottom: 1px solid transparent; padding-bottom: 1px;
          word-break: break-all;
        }
        .contact-link:hover .contact-link-text { color: #6effc0; border-bottom-color: #6effc0; }
        .contact-right { display: flex; flex-direction: column; }
        .contact-form {
          display: flex; flex-direction: column;
          gap: 1px; background: #1e1e30; border: 1px solid #1e1e30;
        }
        .contact-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
        .contact-field {
          background: #080810; padding: 1.25rem 1.5rem;
          display: flex; flex-direction: column; gap: 0.4rem;
          border-bottom: 2px solid transparent; transition: border-color 0.2s ease;
        }
        .contact-field.focused { border-bottom-color: #6effc0; }
        .contact-field-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.12em;
          color: #55556a;
        }
        .contact-input {
          background: none; border: none; outline: none;
          color: #dddde8; font-family: 'Crimson Pro', serif;
          font-size: 1rem; width: 100%;
        }
        .contact-textarea {
          background: none; border: none; outline: none;
          color: #dddde8; font-family: 'Crimson Pro', serif;
          font-size: 1rem; width: 100%; resize: none; line-height: 1.6;
        }
        .contact-btn {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.1em;
          padding: 1rem 2rem;
          background: #6effc0; color: #080810;
          border: 1px solid #6effc0; cursor: pointer;
          text-align: right; width: 100%;
          transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
          -webkit-tap-highlight-color: transparent;
          display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem;
        }
        .contact-btn:hover:not(:disabled) { background: transparent; color: #6effc0; }
        .contact-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .contact-btn-spinner {
          width: 12px; height: 12px;
          border: 1.5px solid rgba(8,8,16,0.4);
          border-top-color: #080810;
          border-radius: 50%;
          animation: btnSpin 0.7s linear infinite;
          flex-shrink: 0;
        }
        .contact-btn:hover:not(:disabled) .contact-btn-spinner {
          border-color: rgba(110,255,192,0.3);
          border-top-color: #6effc0;
        }
        .contact-success {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem; color: #6effc0;
          letter-spacing: 0.1em; padding: 1.5rem;
          border: 1px solid rgba(110,255,192,0.25);
          background: rgba(110,255,192,0.05);
          display: flex; align-items: center; gap: 0.75rem;
        }
        .contact-success-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #6effc0; box-shadow: 0 0 6px #6effc0; flex-shrink: 0;
        }
        .contact-error {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem; color: #ff6e6e;
          letter-spacing: 0.08em; padding: 0.75rem 1rem;
          border: 1px solid rgba(255,110,110,0.2);
          background: rgba(255,110,110,0.05);
          display: flex; align-items: center; gap: 0.5rem;
        }
        .contact-error-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #ff6e6e; flex-shrink: 0;
        }

        @media (min-width: 1440px) { .contact-section { padding: 8rem 8rem; } }
        @media (max-width: 1280px) { .contact-section { padding: 8rem 3rem; } .contact-grid { gap: 3.5rem; } }
        @media (max-width: 1024px) {
          .contact-section { padding: 7rem 2.5rem; }
          .contact-grid { gap: 2.5rem; }
          .contact-intro { font-size: 0.95rem; }
        }
        @media (max-width: 820px) {
          .contact-section { padding: 6rem 2rem; }
          .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .contact-title { margin-bottom: 2rem; }
          .contact-intro { font-size: 0.95rem; }
          .contact-link-text { font-size: 0.7rem; }
        }
        @media (max-width: 600px) {
          .contact-section { padding: 5rem 1.5rem; }
          .contact-grid { gap: 2rem; }
          .contact-intro { font-size: 0.9rem; }
          .contact-link-text { font-size: 0.68rem; }
          .contact-field { padding: 1rem 1.25rem; }
          .contact-btn { font-size: 0.7rem; padding: 0.9rem 1.5rem; }
        }
        @media (max-width: 480px) {
          .contact-section { padding: 5rem 1.25rem; }
          .contact-row { grid-template-columns: 1fr; }
          .contact-field { padding: 1rem; }
          .contact-intro { font-size: 0.88rem; }
          .contact-link-text { font-size: 0.65rem; }
          .contact-input { font-size: 0.95rem; }
          .contact-textarea { font-size: 0.95rem; }
        }
        @media (max-width: 360px) {
          .contact-section { padding: 5rem 1rem; }
          .contact-field { padding: 0.85rem; }
          .contact-link-text { font-size: 0.6rem; }
          .contact-field-label { font-size: 0.55rem; }
          .contact-btn { font-size: 0.65rem; padding: 0.85rem 1.25rem; }
        }
        @media (min-width: 1000px) and (max-width: 1050px) and (max-height: 640px) {
          .contact-section { padding: 5rem 2rem; }
          .contact-title { margin-bottom: 1.5rem; }
          .contact-grid { gap: 2rem; }
          .contact-intro { font-size: 0.85rem; line-height: 1.6; }
          .contact-field { padding: 0.9rem 1.25rem; }
        }
        @media (min-width: 1260px) and (max-width: 1310px) and (max-height: 820px) {
          .contact-section { padding: 5rem 3rem; }
          .contact-title { margin-bottom: 2rem; }
          .contact-grid { gap: 3rem; }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .contact-section { padding: 4.5rem 2rem; }
          .contact-title { margin-bottom: 1.25rem; }
          .contact-grid { gap: 2rem; }
          .contact-intro { font-size: 0.82rem; line-height: 1.5; }
          .contact-field { padding: 0.75rem 1rem; }
          .contact-btn { padding: 0.75rem 1.5rem; font-size: 0.68rem; }
        }

        @keyframes btnSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <section ref={sectionRef} className="contact-section" id="contact">
        <CircuitCanvas gridSize={100} pulseCount={4} pulseSpeed={0.003} nodeOpacity={0.2} lineOpacity={0.04} />

        <p className="contact-label" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <span className="contact-label-line" />Contact
        </p>

        <h2 className="contact-title" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          Let's Work<br />Together
        </h2>

        <div className="contact-grid" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
        }}>
          <div className="contact-left">
            <p className="contact-intro">
              I'm open to new opportunities — freelance projects,
              full-time roles, or just a good conversation about building things.
            </p>
            <div className="contact-links">
              {links.map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  target={l.key !== 'email' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="contact-link"
                  onMouseEnter={() => setHoveredLink(l.key)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span className="contact-link-icon">{l.icon}</span>
                  <span className="contact-link-text">{l.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-right">
            {status === "sent" ? (
              <div className="contact-success">
                <span className="contact-success-dot" />
                Message sent — I'll be in touch soon!
              </div>
            ) : (
              <div className="contact-form">
                <div className="contact-row">
                  <div className={`contact-field${focused === 'name' ? ' focused' : ''}`}>
                    <label className="contact-field-label">Name</label>
                    <input
                      name="name" placeholder="Your name"
                      value={formData.name} onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className="contact-input"
                      disabled={isSending}
                    />
                  </div>
                  <div className={`contact-field${focused === 'email' ? ' focused' : ''}`}>
                    <label className="contact-field-label">Email</label>
                    <input
                      name="email" placeholder="you@email.com"
                      value={formData.email} onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className="contact-input"
                      disabled={isSending}
                    />
                  </div>
                </div>

                <div className={`contact-field${focused === 'message' ? ' focused' : ''}`}>
                  <label className="contact-field-label">Message</label>
                  <textarea
                    name="message" placeholder="What are you working on?"
                    value={formData.message} onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    rows={5} className="contact-textarea"
                    disabled={isSending}
                  />
                </div>

                {status === "error" && (
                  <div className="contact-error">
                    <span className="contact-error-dot" />
                    Something went wrong — please try again or email me directly.
                  </div>
                )}

                <button
                  className="contact-btn"
                  style={btnHovered && !isSending ? { background: 'transparent', color: '#6effc0' } : {}}
                  onClick={handleSubmit}
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <span className="contact-btn-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>Send Message →</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact