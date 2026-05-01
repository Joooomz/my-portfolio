import { CheckCircle2 } from "lucide-react"
import SectionHeader from "./SectionHeader"
import MotionSection from "./MotionSection"
import { processSteps } from "../data/portfolio"

function Process() {
  return (
    <section id="process" className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <MotionSection type="up">
          <SectionHeader
            eyebrow="How I Help"
            title="A practical process for turning NetSuite issues into clear technical direction."
            description="Clients do not only need code. They need someone who can understand the problem, isolate the system behavior, and explain what should happen next."
          />
        </MotionSection>

        <div className="grid gap-4 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <MotionSection
              key={step.title}
              type={index === 1 ? "scale" : "up"}
              delay={index * 0.1}
              className="h-full"
            >
              <article className="relative h-full overflow-hidden rounded-[18px] border border-stonegrid-300 bg-white/90 p-5 shadow-card sm:p-6">
                <div className="absolute right-5 top-5 h-11 w-11 rotate-12 rounded-2xl border border-brandyellow-500/30 bg-brandyellow-500/5" />

                <span className="font-mono text-xs font-bold tracking-[0.12em] text-brandyellow-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="mt-5 font-mono text-[0.74rem] font-bold uppercase tracking-[0.1em] text-brandgreen-500">
                  {step.label}
                </p>

                <h3 className="mt-2 text-[1.5rem] font-extrabold leading-tight tracking-[-0.04em] text-stonegrid-950">
                  {step.title}
                </h3>

                <p className="mt-4 text-[0.98rem] leading-7 text-stonegrid-600">
                  {step.text}
                </p>

                <div className="mt-5 grid gap-2">
                  {step.points.map((point) => (
                    <span
                      className="inline-flex items-center gap-2 text-[0.93rem] leading-6 text-stonegrid-800"
                      key={point}
                    >
                      <CheckCircle2 size={15} className="text-brandgreen-500" />
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process