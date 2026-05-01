import { ChangeEvent, FormEvent, useState } from "react"
import emailjs from "@emailjs/browser"
import { ArrowRight, Linkedin, Mail } from "lucide-react"
import SectionHeader from "./SectionHeader"
import MotionSection from "./MotionSection"
import { contactInfo, socialLinks } from "../data/portfolio"

type ContactStatus = "idle" | "sending" | "sent" | "error"

type ContactFormData = {
  name: string
  email: string
  message: string
}

type SocialItem = {
  label: string
  href: string
  type?: "email" | "linkedin"
  display?: string
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function getSocialIcon(item: SocialItem) {
  if (item.type === "linkedin" || item.label.toLowerCase().includes("linkedin")) {
    return Linkedin
  }

  return Mail
}

function getSocialDisplay(item: SocialItem) {
  if (item.display) return item.display

  if (item.href.startsWith("mailto:")) {
    return item.href.replace("mailto:", "")
  }

  return item.href.replace("https://", "").replace("http://", "")
}

function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  })

  const [status, setStatus] = useState<ContactStatus>("idle")

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error")
      return
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS environment variables are missing.")
      setStatus("error")
      return
    }

    setStatus("sending")

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      )

      setStatus("sent")
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error("EmailJS error:", error)
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <MotionSection type="up">
          <SectionHeader
            eyebrow="Contact"
            title="Need help with NetSuite, ERP troubleshooting, or business system work?"
            description="Send me a message if you need support with NetSuite process review, workflow troubleshooting, SuiteScript work, integration investigation, technical product systems, or frontend web app development."
          />
        </MotionSection>

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <MotionSection type="left" className="h-full">
            <aside className="h-full rounded-[18px] border border-stonegrid-300 bg-white/90 p-5 shadow-card sm:p-6">
              <p className="text-[0.98rem] leading-7 text-stonegrid-600">
                {contactInfo?.intro ||
                  "I am open to freelance projects, consulting-style work, and full-time opportunities where I can help improve NetSuite and business systems through practical technical execution."}
              </p>

              <div className="mt-6 grid gap-4">
                {(socialLinks as SocialItem[]).map((item) => {
                  const Icon = getSocialIcon(item)
                  const isEmail = item.href.startsWith("mailto:")

                  return (
                    <a
                      key={`${item.label}-${item.href}`}
                      className="flex items-center gap-3 break-all text-[0.98rem] font-semibold text-stonegrid-800 transition hover:text-brandgreen-500"
                      href={item.href}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noreferrer"}
                    >
                      <Icon className="shrink-0 text-brandgreen-500" size={18} />
                      {getSocialDisplay(item)}
                    </a>
                  )
                })}
              </div>
            </aside>
          </MotionSection>

          <MotionSection type="right" delay={0.12} className="h-full">
            <div className="rounded-[18px] border border-stonegrid-300 bg-white/90 p-5 shadow-card sm:p-6">
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label
                      className="text-[0.92rem] font-bold text-stonegrid-800"
                      htmlFor="name"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className="w-full rounded-2xl border border-stonegrid-300 bg-white/90 px-4 py-3 text-[0.96rem] outline-none transition focus:border-brandgreen-500 focus:ring-4 focus:ring-brandgreen-500/10"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label
                      className="text-[0.92rem] font-bold text-stonegrid-800"
                      htmlFor="email"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      autoComplete="email"
                      className="w-full rounded-2xl border border-stonegrid-300 bg-white/90 px-4 py-3 text-[0.96rem] outline-none transition focus:border-brandgreen-500 focus:ring-4 focus:ring-brandgreen-500/10"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label
                    className="text-[0.92rem] font-bold text-stonegrid-800"
                    htmlFor="message"
                  >
                    Project / Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me what you need help with..."
                    rows={7}
                    className="min-h-40 w-full resize-y rounded-2xl border border-stonegrid-300 bg-white/90 px-4 py-3 text-[0.96rem] outline-none transition focus:border-brandgreen-500 focus:ring-4 focus:ring-brandgreen-500/10"
                  />
                </div>

                {status === "sent" ? (
                  <p className="rounded-2xl border border-brandgreen-500/25 bg-brandgreen-500/10 px-4 py-3 text-[0.92rem] text-brandgreen-500">
                    Message sent successfully. I will get back to you soon.
                  </p>
                ) : null}

                {status === "error" ? (
                  <p className="rounded-2xl border border-red-900/20 bg-red-900/10 px-4 py-3 text-[0.92rem] text-red-900">
                    Please complete all fields, or try again if the message failed to send.
                  </p>
                ) : null}

                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brandgreen-500 px-6 py-3 text-[0.95rem] font-bold text-white transition hover:-translate-y-0.5 hover:bg-brandgreen-600 disabled:cursor-not-allowed disabled:opacity-70"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                  <ArrowRight size={17} />
                </button>
              </form>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  )
}

export default Contact