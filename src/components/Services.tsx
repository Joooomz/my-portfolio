import {
  BarChart3,
  Code2,
  FileSearch,
  GitBranch,
  LifeBuoy,
  Workflow,
} from "lucide-react"
import SectionHeader from "./SectionHeader"
import MotionSection from "./MotionSection"
import { services } from "../data/portfolio"

const serviceIcons = [FileSearch, Code2, LifeBuoy, GitBranch, BarChart3, Workflow]

function Services() {
  return (
    <section
      id="services"
      className="border-y border-stonegrid-300 bg-stonegrid-150 px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <MotionSection type="up">
          <SectionHeader
            eyebrow="Services"
            title="NetSuite consulting, development, and support-minded technical execution."
            description="I focus on work that helps businesses reduce ERP friction: cleaner workflows, clearer reporting, better troubleshooting, practical automation, and more dependable NetSuite processes."
          />
        </MotionSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[index] || FileSearch

            return (
              <MotionSection
                key={service.title}
                type="scale"
                delay={index * 0.08}
                className="h-full"
              >
                <article className="relative flex h-full min-h-[285px] flex-col overflow-hidden rounded-[18px] border border-stonegrid-300 bg-white/90 p-5 shadow-card sm:p-6">
                  <div className="absolute bottom-5 left-0 top-5 w-1 rounded-full bg-brandgreen-500" />

                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-stonegrid-300 bg-stonegrid-150 text-brandgreen-500">
                    <Icon size={22} />
                  </div>

                  <span className="font-mono text-xs font-bold tracking-[0.12em] text-brandyellow-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-3 text-[1.45rem] font-extrabold leading-tight tracking-[-0.035em] text-stonegrid-950">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-[0.96rem] leading-7 text-stonegrid-600">
                    {service.text}
                  </p>

                  <ul className="mt-auto grid gap-2 pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="text-[0.93rem] leading-6 text-stonegrid-800 before:mr-2 before:text-brandgreen-500 before:content-['•']"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </MotionSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services