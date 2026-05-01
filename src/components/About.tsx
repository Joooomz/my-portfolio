import SectionHeader from "./SectionHeader"
import MotionSection from "./MotionSection"

const aboutItems: Array<[string, string]> = [
  [
    "How I work",
    "I start by understanding the business process, then isolate the technical issue, validate behavior, and explain the fix clearly.",
  ],
  [
    "What I care about",
    "Cleaner NetSuite processes, less manual work, practical documentation, and solutions that users can trust after handoff.",
  ],
  [
    "Where I am growing",
    "NetSuite consulting, SuiteScript development, integrations, automation, frontend applications, and solution design.",
  ],
  [
    "Best fit",
    "NetSuite support, ERP troubleshooting, workflow optimization, NetSuite development, Shopify catalog systems, and business-focused web apps.",
  ],
]

function About() {
  return (
    <section
      id="about"
      className="border-y border-stonegrid-300 bg-stonegrid-150 px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <MotionSection type="up">
          <SectionHeader
            eyebrow="About"
            title="Built from NetSuite support experience, moving toward consultant and developer impact."
            description="My strongest advantage is that I have seen real ERP issues from the support side. I understand how NetSuite problems affect users, operations, reporting, approvals, and business confidence."
          />
        </MotionSection>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <MotionSection type="left" className="h-full">
            <article className="relative h-full overflow-hidden rounded-[18px] border border-stonegrid-300 bg-white/90 p-5 shadow-card sm:p-6">
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rotate-12 rounded-[32px] border border-brandgreen-500/20 bg-brandgreen-500/5" />

              <p className="relative z-10 text-[clamp(1.55rem,3vw,2.35rem)] font-extrabold leading-tight tracking-[-0.05em] text-stonegrid-950">
                I know how NetSuite issues appear to users, how to investigate them, and how
                to explain the path forward clearly.
              </p>

              <p className="relative z-10 mt-5 text-[0.98rem] leading-7 text-stonegrid-600">
                I am Jomar Philip Balane, a NetSuite Consultant and NetSuite Developer in
                progress, with a strong foundation in Oracle NetSuite technical support. My
                experience includes troubleshooting workflows, custom forms, custom fields,
                saved searches, reports, scripts, permissions, Electronic Bank Payments, and
                integration-related behavior.
              </p>

              <p className="relative z-10 mt-4 text-[0.98rem] leading-7 text-stonegrid-600">
                I am now building deeper development capability around SuiteScript,
                automation, integrations, frontend web apps, and AI-assisted troubleshooting
                workflows so I can deliver more complete solutions for clients and teams.
              </p>
            </article>
          </MotionSection>

          <MotionSection type="right" delay={0.12}>
            <ul className="grid gap-4">
              {aboutItems.map(([title, text], index) => (
                <MotionSection key={title} type="up" delay={index * 0.06}>
                  <li className="relative overflow-hidden rounded-[18px] border border-stonegrid-300 bg-white/80 p-5">
                    <div className="absolute -right-4 -top-4 h-12 w-12 rotate-12 rounded-2xl border border-brandyellow-500/25 bg-brandyellow-500/5" />

                    <strong className="relative z-10 block text-[1.05rem] text-stonegrid-950">
                      {title}
                    </strong>

                    <span className="relative z-10 mt-1 block text-[0.96rem] leading-7 text-stonegrid-600">
                      {text}
                    </span>
                  </li>
                </MotionSection>
              ))}
            </ul>
          </MotionSection>
        </div>
      </div>
    </section>
  )
}

export default About