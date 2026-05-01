import MotionSection from "./MotionSection"
import { proofStats } from "../data/portfolio"

function ProofBar() {
  return (
    <section
      className="border-t border-stonegrid-300 bg-stonegrid-200 px-4 py-12 sm:px-6 sm:py-14 lg:py-16"
      aria-label="NetSuite diagnostic focus areas"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <MotionSection type="up">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brandgreen-500">
                NetSuite Focus Areas
              </p>

              <h2 className="mt-2 max-w-2xl text-[clamp(1.9rem,8vw,3.1rem)] font-extrabold leading-none tracking-[-0.055em] text-stonegrid-950">
                The areas I commonly diagnose and improve.
              </h2>
            </div>

            <p className="max-w-md text-[0.96rem] leading-7 text-stonegrid-600">
              These are the technical and business-system areas behind my support,
              consulting, and development direction.
            </p>
          </div>
        </MotionSection>

        <div className="grid overflow-hidden rounded-[24px] border border-stonegrid-300 bg-white/80 shadow-glow backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
          {proofStats.map((item, index) => (
            <MotionSection
              key={item.label}
              type="up"
              delay={index * 0.08}
              className="border-b border-stonegrid-300 last:border-b-0 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <div className="relative h-full overflow-hidden p-5 sm:p-6">
                <div className="absolute -bottom-8 -right-8 h-20 w-20 rotate-12 rounded-2xl border border-brandyellow-500/25 bg-brandyellow-500/10" />

                <span className="relative z-10 block text-[clamp(1.5rem,6vw,2.15rem)] font-extrabold leading-none tracking-[-0.055em] text-brandgreen-500">
                  {item.value}
                </span>

                <span className="relative z-10 mt-3 block text-[0.95rem] leading-6 text-stonegrid-600">
                  {item.label}
                </span>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProofBar