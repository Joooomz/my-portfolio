import SectionHeader from "./SectionHeader"
import MotionSection from "./MotionSection"
import { skillGroups } from "../data/portfolio"

function Skills() {
  return (
    <section id="skills" className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <MotionSection type="up">
          <SectionHeader
            eyebrow="Capabilities"
            title="The NetSuite, ERP, and web capabilities I use to solve business problems."
            description="This section groups my skills by real working context: consulting, development, troubleshooting, integrations, and business-facing web systems."
          />
        </MotionSection>

        <div className="grid gap-4 lg:grid-cols-2">
          {skillGroups.map((group, index) => (
            <MotionSection
              key={group.title}
              type="blur"
              delay={index * 0.06}
              className="h-full"
            >
              <article className="relative h-full overflow-hidden rounded-[18px] border border-stonegrid-300 bg-white/90 p-5 shadow-card sm:p-6">
                <div className="absolute -bottom-8 -right-8 h-24 w-24 rotate-12 rounded-[22px] border border-brandyellow-500/30 bg-brandyellow-500/5" />

                <h3 className="relative z-10 text-[1.5rem] font-extrabold leading-tight tracking-[-0.035em] text-stonegrid-950">
                  {group.title}
                </h3>

                <p className="relative z-10 mt-3 text-[0.98rem] leading-7 text-stonegrid-600">
                  {group.text}
                </p>

                <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      className="rounded-full border border-stonegrid-300 bg-white/80 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-stonegrid-600"
                      key={skill}
                    >
                      {skill}
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

export default Skills