import MotionSection from "./MotionSection"
import { navLinks, socialLinks } from "../data/portfolio"

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-stonegrid-300 bg-stonegrid-950 px-4 py-12 text-stonegrid-100 sm:px-6">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <MotionSection type="up">
          <div>
            <p className="font-mono font-bold tracking-[0.12em]">Jomar Philip Balane</p>
            <p className="mt-2 max-w-xl text-sm text-stonegrid-100/70">
              NetSuite Consultant & NetSuite Developer focused on ERP support, automation,
              and practical business systems.
            </p>
          </div>
        </MotionSection>

        <MotionSection type="up" delay={0.12}>
          <div className="flex flex-wrap gap-4">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-semibold text-stonegrid-100/70 transition hover:text-brandyellow-500"
              >
                {item.label}
              </a>
            ))}

            {socialLinks.map((item) => {
              const isEmail = item.href.startsWith("mailto:")

              return (
                <a
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noreferrer"}
                  className="font-semibold text-stonegrid-100/70 transition hover:text-brandyellow-500"
                >
                  {item.label}
                </a>
              )
            })}

            <button
              className="font-semibold text-stonegrid-100/70 transition hover:text-brandyellow-500"
              type="button"
              onClick={scrollToTop}
            >
              Back to top
            </button>
          </div>
        </MotionSection>
      </div>
    </footer>
  )
}

export default Footer