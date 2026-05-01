import { lazy, Suspense } from "react"
import Navbar from "./components/Navbar"

const Hero = lazy(() => import("./components/Hero"))
const ProofBar = lazy(() => import("./components/Proofbar"))
const TechStackCarousel = lazy(() => import("./components/TechStackCarousel"))
const Process = lazy(() => import("./components/Process"))
const Services = lazy(() => import("./components/Services"))
const Projects = lazy(() => import("./components/Projects"))
const Experience = lazy(() => import("./components/Experience"))
const Skills = lazy(() => import("./components/Skills"))
const About = lazy(() => import("./components/About"))
const ContactCTA = lazy(() => import("./components/ContactCTA"))
const Contact = lazy(() => import("./components/Contact"))
const Footer = lazy(() => import("./components/Footer"))

function SectionFallback() {
  return (
    <div className="grid min-h-[32vh] place-items-center" aria-label="Loading section">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-stonegrid-300 border-t-brandyellow-500" />
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <Suspense fallback={<SectionFallback />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ProofBar />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TechStackCarousel />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Process />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ContactCTA />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App