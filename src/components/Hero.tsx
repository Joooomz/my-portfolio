import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"
import { ORACLE_START_DATE, yearsSince } from "../data/portfolio"

const diagnosticSteps = [
  "Client Issue",
  "NetSuite Behavior",
  "Root Cause Path",
  "Clear Handoff",
]

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const yearsAtOracle = yearsSince(ORACLE_START_DATE)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  })

  const nameScale = useTransform(progress, [0, 0.75], [1, 1.015])
  const nameY = useTransform(progress, [0, 0.75], [0, -6])
  const nameColor = useTransform(
    progress,
    [0, 0.45, 1],
    ["#102033", "#215D86", "#102033"]
  )

  const panelY = useTransform(progress, [0, 1], [0, -10])
  const panelBorder = useTransform(
    progress,
    [0, 0.55, 1],
    ["#CDD7DF", "#215D86", "#6FAFD2"]
  )

  const gridY = useTransform(progress, [0, 1], [0, 34])
  const shapeY = useTransform(progress, [0, 1], [0, -28])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen overflow-hidden px-4 pt-[76px] sm:px-6 lg:h-screen lg:min-h-screen"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{ y: gridY }}
      />

      <div className="absolute inset-x-0 bottom-0 z-0 h-[38%] border-t border-stonegrid-300 bg-stonegrid-200 lg:inset-y-[76px] lg:left-auto lg:right-0 lg:h-[calc(100vh-76px)] lg:w-[34%] lg:border-l lg:border-t-0" />

      <motion.div
        style={{ y: shapeY }}
        className="pointer-events-none absolute right-[9%] top-[22%] z-[1] hidden h-[120px] w-[120px] rotate-12 rounded-[30px] border border-brandyellow-500/30 bg-brandyellow-500/5 lg:block"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-8 py-10 sm:py-12 lg:h-[calc(100vh-76px)] lg:grid-cols-[minmax(0,1.02fr)_minmax(340px,0.78fr)] lg:gap-14 lg:py-0">
        <div className="w-full max-w-[760px]">
          <motion.div
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-stonegrid-300 bg-white/80 px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-stonegrid-600 shadow-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brandyellow-500" />
            NetSuite Consultant & NetSuite Developer
          </motion.div>

          <motion.div style={{ y: nameY, scale: nameScale, transformOrigin: "left center" }}>
            <p className="mb-1 text-sm font-semibold text-stonegrid-600 sm:text-base">
              Hi, I’m
            </p>

            <h1 className="max-w-full text-[clamp(3.35rem,14vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.07em] text-stonegrid-950 lg:text-[clamp(4.6rem,5.4vw,5.9rem)] xl:text-[clamp(5rem,5.5vw,6.25rem)]">
              <motion.span style={{ color: nameColor }} className="inline-block">
                Jomar Philip
              </motion.span>
              <span className="text-brandgreen-500"> Balane</span>
            </h1>

            <div className="mt-4 h-[3px] w-[clamp(64px,18vw,108px)] rounded-full bg-brandyellow-500" />
          </motion.div>

          <p className="mt-5 max-w-2xl text-[clamp(1.12rem,4vw,1.42rem)] font-bold leading-snug tracking-[-0.032em] text-stonegrid-950 lg:text-[clamp(1.18rem,1.35vw,1.38rem)]">
            I help businesses troubleshoot NetSuite issues, improve workflows, and build
            practical ERP automation.
          </p>

          <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-stonegrid-600 sm:text-[1.04rem] sm:leading-8">
            My NetSuite support background gives me real exposure to workflows, forms,
            saved searches, scripts, permissions, reporting, and integrations — then I turn
            that investigation experience into clearer consultant and developer-level
            solutions.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brandgreen-500 px-6 py-3 text-[0.95rem] font-bold text-white shadow-[0_14px_34px_rgba(33,93,134,0.22)] transition hover:-translate-y-0.5 hover:bg-brandgreen-600"
            >
              Discuss a NetSuite project <ArrowRight size={17} />
            </a>

            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-stonegrid-300 bg-white/80 px-6 py-3 text-[0.95rem] font-bold text-stonegrid-950 transition hover:-translate-y-0.5 hover:border-brandyellow-500 hover:text-brandyellow-600"
            >
              View case studies
            </a>

            <a
              href="/jomar-philip-balane-cv.pdf"
              download="Jomar_Philip_Balane_CV.pdf"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-stonegrid-300 bg-white/80 px-6 py-3 text-[0.95rem] font-bold text-stonegrid-950 transition hover:-translate-y-0.5 hover:border-brandyellow-500 hover:text-brandyellow-600"
            >
              <Download size={17} />
              Download CV
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              [`${yearsAtOracle}+`, "Years at Oracle NetSuite"],
              ["1k+", "ERP cases handled"],
              ["4", "Oracle / NetSuite certifications"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-stonegrid-300 bg-white/75 px-4 py-3"
              >
                <strong className="block text-lg leading-none text-brandgreen-500">
                  {value}
                </strong>
                <span className="mt-1.5 block text-[0.82rem] leading-5 text-stonegrid-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.aside
          style={{ y: panelY, borderColor: panelBorder }}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden rounded-3xl border border-stonegrid-300 bg-white/[0.92] p-4 shadow-glow backdrop-blur-sm lg:max-w-[440px] lg:justify-self-end xl:max-w-[460px]"
        >
          <div className="absolute -right-14 -top-14 h-36 w-36 rotate-12 rounded-[34px] border border-brandyellow-500/25 bg-brandyellow-500/5" />

          <div className="relative z-10 flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[17px] bg-stonegrid-950 font-mono text-sm font-bold tracking-wider text-white shadow-[inset_0_-5px_0_rgba(111,175,210,0.34)]">
              JB
            </div>

            <div>
              <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brandgreen-500">
                Diagnostic Flow
              </p>

              <h2 className="mt-1 max-w-md text-[clamp(1.15rem,4vw,1.35rem)] font-extrabold leading-tight tracking-[-0.035em] text-stonegrid-950">
                From issue intake to clear handoff.
              </h2>
            </div>
          </div>

          <div className="relative z-10 mt-5 grid gap-2">
            {diagnosticSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.32 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={[
                  "flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-[0.93rem] font-bold",
                  index === 0
                    ? "border-brandgreen-500/25 bg-brandgreen-500/10 text-brandgreen-500"
                    : index === diagnosticSteps.length - 1
                      ? "border-brandyellow-500/30 bg-brandyellow-500/10 text-brandyellow-600"
                      : "border-stonegrid-300 bg-stonegrid-100 text-stonegrid-800",
                ].join(" ")}
              >
                <span className="font-mono text-[0.7rem] tracking-wider text-stonegrid-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </motion.div>
            ))}
          </div>

          <p className="relative z-10 mt-4 text-[0.96rem] leading-7 text-stonegrid-600">
            I combine support investigation, process understanding, and development
            thinking to explain what is happening, why it matters, and what should happen
            next.
          </p>

          <div className="relative z-10 mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-stonegrid-300 bg-stonegrid-100/90 p-3">
              <span className="block text-[0.78rem] text-stonegrid-600">Focus</span>
              <strong className="mt-1 block text-[0.92rem] text-stonegrid-950">
                ERP troubleshooting
              </strong>
            </div>

            <div className="rounded-2xl border border-stonegrid-300 bg-stonegrid-100/90 p-3">
              <span className="block text-[0.78rem] text-stonegrid-600">Method</span>
              <strong className="mt-1 block text-[0.92rem] text-stonegrid-950">
                Diagnose → Build → Clarify
              </strong>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}

export default Hero