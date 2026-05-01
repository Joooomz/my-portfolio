import { ExternalLink } from "lucide-react"
import SectionHeader from "./SectionHeader"
import MotionSection from "./MotionSection"
import { projects } from "../data/portfolio"

function Projects() {
  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <MotionSection type="up">
          <SectionHeader
            eyebrow="Selected Work"
            title="Case studies that show how I think, troubleshoot, and build."
            description="A closer look at the systems, workflows, and product thinking behind my NetSuite, frontend, and business-system projects."
          />
        </MotionSection>

        <div className="grid gap-5 lg:gap-6">
          {projects.map((project, index) => (
            <MotionSection
              key={project.name}
              type="up"
              delay={index * 0.08}
              className="h-full"
            >
              <article className="relative overflow-hidden rounded-[22px] border border-stonegrid-300 bg-white/90 p-4 shadow-card sm:p-5 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:gap-6 lg:p-6">
                <div className="absolute -right-20 -top-20 h-40 w-40 rotate-12 rounded-[32px] border border-brandyellow-500/25 bg-brandyellow-500/5" />

                <div className="relative z-10 rounded-[20px] border border-stonegrid-300 bg-stonegrid-100 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brandgreen-500">
                      Case Study {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="rounded-full border border-stonegrid-300 bg-white/80 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-stonegrid-600">
                      {project.type}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[clamp(1.75rem,8vw,2.45rem)] font-extrabold leading-none tracking-[-0.055em] text-stonegrid-950 lg:text-[clamp(2.1rem,3vw,2.55rem)]">
                    {project.name}
                  </h3>

                  <p className="mt-4 text-[1rem] leading-7 text-stonegrid-600">
                    {project.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        className="rounded-full border border-stonegrid-300 bg-white/80 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-stonegrid-600"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.link ? (
                    <a
                      className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-stonegrid-300 bg-white/90 px-5 py-3 text-[0.95rem] font-bold text-stonegrid-950 transition hover:-translate-y-0.5 hover:border-brandyellow-500 hover:text-brandyellow-600 sm:w-auto"
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View project <ExternalLink size={16} />
                    </a>
                  ) : null}
                </div>

                <div className="relative z-10 mt-5 lg:mt-0">
                  {[
                    ["Problem", project.problem],
                    ["Approach", project.solution],
                    ["Outcome", project.outcome],
                  ].map(([label, text]) => (
                    <div
                      key={label}
                      className="grid gap-2 border-b border-stonegrid-300 py-4 first:pt-0 last:border-b-0 lg:grid-cols-[112px_1fr]"
                    >
                      <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] text-brandyellow-600">
                        {label}
                      </span>

                      <p className="text-[0.98rem] leading-7 text-stonegrid-800">
                        {text}
                      </p>
                    </div>
                  ))}

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {project.resultHighlights.map((item) => (
                      <div
                        className="rounded-2xl border border-stonegrid-300 bg-white/75 p-4 text-[0.93rem] font-bold leading-6 text-stonegrid-800"
                        key={item}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects