import { useState } from "react"
import { motion } from "framer-motion"
import { techStack } from "../data/portfolio"
import MotionSection from "./MotionSection"

type TechStackItem = {
  name: string
  category: string
  description: string
  logo?: string
  fallback?: string
  variant?: string
}

function getFallbackText(item: TechStackItem) {
  if (item.fallback) return item.fallback

  return item.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function getLogoTone(item: TechStackItem) {
  if (item.variant === "netsuite") {
    return "border-brandgreen-500/20 bg-brandgreen-500/5"
  }

  if (item.variant === "frontend") {
    return "border-brandyellow-500/25 bg-brandyellow-500/5"
  }

  return "border-stonegrid-300 bg-white"
}

function LogoBadge({ item }: { item: TechStackItem }) {
  const [hasImageError, setHasImageError] = useState(false)
  const fallbackText = getFallbackText(item)

  return (
    <div
      className={[
        "grid h-16 w-16 shrink-0 place-items-center rounded-2xl border p-3 shadow-sm",
        getLogoTone(item),
      ].join(" ")}
    >
      {item.logo && !hasImageError ? (
        <img
          src={item.logo}
          alt={`${item.name} logo`}
          className="max-h-full max-w-full object-contain opacity-85"
          loading="lazy"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span className="font-mono text-sm font-extrabold text-brandgreen-500">
          {fallbackText}
        </span>
      )}
    </div>
  )
}

function TechStackCarousel() {
  const carouselItems = [...techStack, ...techStack] as TechStackItem[]

  return (
    <section className="overflow-hidden border-b border-stonegrid-300 bg-stonegrid-150 py-10 sm:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
        <MotionSection type="up">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brandgreen-500">
                Toolchain
              </p>

              <h2 className="mt-2 max-w-2xl text-[clamp(1.9rem,8vw,3.1rem)] font-extrabold leading-none tracking-[-0.055em] text-stonegrid-950">
                The platforms and tools behind my technical workflow.
              </h2>
            </div>

            <p className="max-w-md text-[0.96rem] leading-7 text-stonegrid-600">
              A practical stack built around NetSuite troubleshooting, ERP automation,
              frontend systems, and clean technical delivery.
            </p>
          </div>
        </MotionSection>
      </div>

      <MotionSection type="scale" delay={0.08}>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-stonegrid-150 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-stonegrid-150 to-transparent sm:w-24" />

          <div className="w-full overflow-hidden border-y border-stonegrid-300 bg-white/65 shadow-card backdrop-blur-sm">
            <motion.div
              className="flex w-max gap-4 px-4 py-4 sm:px-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 56,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {carouselItems.map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  className="flex w-[280px] shrink-0 items-center gap-4 rounded-[18px] border border-stonegrid-300 bg-white/90 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brandgreen-500/40 hover:bg-white hover:shadow-card sm:w-[330px]"
                >
                  <LogoBadge item={item} />

                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-[1.08rem] font-extrabold tracking-[-0.035em] text-stonegrid-950">
                        {item.name}
                      </h3>

                      <span className="rounded-full border border-stonegrid-300 bg-stonegrid-100 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-stonegrid-600">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-[0.92rem] leading-6 text-stonegrid-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </MotionSection>
    </section>
  )
}

export default TechStackCarousel