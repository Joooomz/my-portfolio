import { MouseEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { navLinks } from "../data/portfolio"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen)

    return () => {
      document.body.classList.remove("menu-open")
    }
  }, [menuOpen])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const sectionMap = new Map<string, number>()

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        sectionMap.set(entry.target.id, entry.intersectionRatio)
      })

      let best = ""
      let bestRatio = 0

      sectionMap.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = id
        }
      })

      setActiveSection(bestRatio > 0 ? best : "")
    }

    navLinks.forEach((item) => {
      const element = document.querySelector(`#${item.id}`)

      if (!element) return

      const observer = new IntersectionObserver(handleIntersect, {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-15% 0px -20% 0px",
      })

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    navigate(`/#${id}`)
    setMenuOpen(false)

    window.setTimeout(() => {
      const target = document.querySelector(`#${id}`)
      target?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 grid h-[76px] grid-cols-[44px_1fr_44px] items-center border-b border-stonegrid-300 bg-stonegrid-150/90 px-4 backdrop-blur-xl lg:flex lg:justify-between lg:px-16">
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-stonegrid-300 bg-white/80 lg:hidden"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="flex flex-col gap-[5px]">
            <span
              className={[
                "h-0.5 w-5 rounded-full bg-stonegrid-950 transition",
                menuOpen ? "translate-y-[7px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-0.5 w-5 rounded-full bg-stonegrid-950 transition",
                menuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-0.5 w-5 rounded-full bg-stonegrid-950 transition",
                menuOpen ? "-translate-y-[7px] -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>

        <a
          href="/#hero"
          className="col-start-2 text-center font-mono text-xs font-bold tracking-[0.14em] text-stonegrid-950 lg:text-left lg:text-[0.82rem]"
          onClick={(event) => handleClick(event, "hero")}
        >
          Jomar Philip Balane
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <li key={item.id}>
              <a
                href={`/#${item.id}`}
                className={[
                  "relative text-sm font-semibold text-stonegrid-600 transition after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brandgreen-500 after:transition hover:text-brandgreen-500 hover:after:scale-x-100",
                  activeSection === item.id ? "text-brandgreen-500 after:scale-x-100" : "",
                ].join(" ")}
                onClick={(event) => handleClick(event, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden rounded-full bg-brandgreen-500 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brandyellow-500 hover:text-stonegrid-950 lg:inline-flex"
          onClick={(event) => handleClick(event, "contact")}
        >
          Work with me
        </a>
      </nav>

      <div
        className={[
          "fixed left-4 right-4 top-[84px] z-40 hidden flex-col rounded-[18px] border border-stonegrid-300 bg-white/95 p-3 shadow-soft",
          menuOpen ? "flex" : "",
        ].join(" ")}
      >
        {navLinks.map((item) => (
          <a
            key={item.id}
            href={`/#${item.id}`}
            className={[
              "rounded-xl px-4 py-3 font-bold text-stonegrid-800",
              activeSection === item.id ? "bg-brandgreen-500/10 text-brandgreen-500" : "",
            ].join(" ")}
            onClick={(event) => handleClick(event, item.id)}
          >
            {item.label}
          </a>
        ))}

        <a
          href="/#contact"
          className="mt-2 rounded-full bg-brandgreen-500 px-4 py-3 text-center text-sm font-bold text-white"
          onClick={(event) => handleClick(event, "contact")}
        >
          Discuss a NetSuite project
        </a>
      </div>
    </>
  )
}

export default Navbar