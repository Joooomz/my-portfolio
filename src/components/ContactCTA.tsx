import { ArrowRight } from "lucide-react"
import MotionSection from "./MotionSection"

function ContactCTA() {
  return (
    <section className="bg-stonegrid-950 px-4 py-16 text-stonegrid-100 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <MotionSection type="scale">
          <div className="flex flex-col gap-8 rounded-[28px] border border-stonegrid-100/20 bg-white/[0.045] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-brandyellow-500">
                Ready to clarify the next step?
              </p>

              <h2 className="mt-3 max-w-3xl text-[clamp(2rem,4vw,3.8rem)] font-extrabold leading-none tracking-[-0.06em]">
                Have a NetSuite issue, workflow problem, or automation idea?
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-stonegrid-100/70">
                Let’s turn it into a clear technical plan with the right mix of process
                review, troubleshooting, configuration, and development.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brandgreen-500 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brandgreen-600"
            >
              Discuss a NetSuite project <ArrowRight size={17} />
            </a>
          </div>
        </MotionSection>
      </div>
    </section>
  )
}

export default ContactCTA