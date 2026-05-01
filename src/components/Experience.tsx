import { useState } from "react"
import SectionHeader from "./SectionHeader"
import MotionSection from "./MotionSection"
import {
  certifications,
  experience,
  type ExperienceItem,
} from "../data/portfolio"

function getLogoText(item: ExperienceItem) {
  if (item.logoText) return item.logoText

  if (item.company.toLowerCase().includes("netsuite")) return "NS"
  if (item.company.toLowerCase().includes("canoreco")) return "CN"

  return item.company.slice(0, 2).toUpperCase()
}

function ExperienceLogo({ item }: { item: ExperienceItem }) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <div className="mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-stonegrid-300 bg-white p-3 shadow-sm">
      {item.logo && !hasImageError ? (
        <img
          src={item.logo}
          alt={item.logoAlt || `${item.company} logo`}
          className="max-h-full max-w-full object-contain opacity-90"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span className="font-mono text-sm font-bold text-brandgreen-500">
          {getLogoText(item)}
        </span>
      )}
    </div>
  )
}

function Experience() {
  return (
    <section
      id="experience"
      className="border-y border-stonegrid-300 bg-stonegrid-150 px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <MotionSection type="up">
          <SectionHeader
            eyebrow="Experience"
            title="Built from real NetSuite support, troubleshooting, and ERP customer work."
            description="My foundation is customer-facing NetSuite support. I have worked through real production issues involving workflows, forms, reports, scripts, permissions, EBP, and integrations."
          />
        </MotionSection>

        <div className="grid gap-4">
          {experience.map((item, index) => (
            <MotionSection
              key={`${item.role}-${item.company}-${item.period}`}
              type="up"
              delay={index * 0.08}
              className="h-full"
            >
              <article className="relative grid gap-6 overflow-hidden rounded-[18px] border border-stonegrid-300 bg-white/90 p-5 shadow-card backdrop-blur-sm sm:p-6 lg:grid-cols-[240px_1fr]">
                <div className="absolute bottom-6 left-0 top-6 w-1 rounded-full bg-brandgreen-500" />

                <div className="relative z-10">
                  <ExperienceLogo item={item} />

                  <p className="font-mono text-xs font-bold tracking-[0.08em] text-brandgreen-500">
                    {item.period}
                  </p>

                  {item.current ? (
                    <span className="mt-3 inline-flex rounded-full bg-brandgreen-500/10 px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.08em] text-brandgreen-500">
                      Current
                    </span>
                  ) : null}
                </div>

                <div className="relative z-10">
                  <h3 className="text-[clamp(1.55rem,3vw,2.2rem)] font-extrabold leading-tight tracking-[-0.045em] text-stonegrid-950">
                    {item.role}
                  </h3>

                  <p className="mt-1 text-[0.98rem] font-semibold text-stonegrid-600">
                    {item.company} · {item.division}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        className="rounded-full border border-stonegrid-300 bg-white/80 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-stonegrid-600"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-5 list-disc space-y-2 pl-5 text-[0.98rem] leading-7 text-stonegrid-800">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </MotionSection>
          ))}
        </div>

        <MotionSection type="up" delay={0.12}>
          <div className="mt-10">
            <h3 className="mb-4 text-xl font-bold tracking-[-0.02em] text-stonegrid-950">
              Certifications
            </h3>

            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <MotionSection key={cert} type="scale" delay={index * 0.06}>
                  <span className="inline-flex rounded-full border border-stonegrid-300 bg-white/80 px-4 py-3 text-[0.95rem] text-stonegrid-800">
                    {cert}
                  </span>
                </MotionSection>
              ))}
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  )
}

export default Experience