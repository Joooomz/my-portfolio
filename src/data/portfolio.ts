export const ORACLE_START_DATE = "2022-09-01"

export function yearsSince(dateString: string): number {
  const start = new Date(dateString)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  const monthDiff = now.getMonth() - start.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years -= 1
  }

  return Math.max(years, 0)
}

export const navLinks = [
  { label: "Process", id: "process" },
  { label: "Services", id: "services" },
  { label: "Work", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Capabilities", id: "skills" },
  { label: "Contact", id: "contact" },
]

export const proofStats = [
  {
    value: "Workflow",
    label: "Troubleshooting approval flows, form behavior, and business process logic",
  },
  {
    value: "Reporting",
    label: "Saved searches, workbooks, dashboards, and operational data visibility",
  },
  {
    value: "Automation",
    label: "SuiteFlow, SuiteScript, custom records, fields, and repeatable ERP logic",
  },
  {
    value: "Integration",
    label: "REST, SOAP, RESTlet, payload mapping, and system behavior investigation",
  },
]

export const processSteps = [
  {
    title: "Diagnose",
    label: "Understand the issue",
    text: "I start by understanding the business process, user impact, NetSuite behavior, and where the issue appears.",
    points: ["Process review", "User impact", "System behavior"],
  },
  {
    title: "Build",
    label: "Apply the right solution",
    text: "I approach the fix through configuration, workflow, script, saved search, report, role, or integration-level checks.",
    points: ["Workflow", "Script", "Report / Integration"],
  },
  {
    title: "Clarify",
    label: "Document the path forward",
    text: "I explain what changed, why it matters, and how the team can avoid or diagnose similar issues in the future.",
    points: ["Clear notes", "Handoff", "Repeatable checks"],
  },
]

export const services = [
  {
    title: "NetSuite Consulting & Process Review",
    text: "I help review NetSuite processes, identify friction points, and translate business requirements into practical system improvements.",
    points: ["Business process review", "NetSuite configuration analysis", "Workflow recommendations"],
  },
  {
    title: "NetSuite Development & Automation",
    text: "I support SuiteScript, SuiteFlow, and NetSuite customization work focused on reducing manual tasks and improving system reliability.",
    points: ["SuiteScript 2.x support", "SuiteFlow automation", "Custom records, fields, and forms"],
  },
  {
    title: "NetSuite Support & Troubleshooting",
    text: "My strongest foundation is real NetSuite support experience, diagnosing customer issues across production ERP environments.",
    points: ["Workflow troubleshooting", "Saved search validation", "Permissions and roles investigation"],
  },
  {
    title: "Integration & API Support",
    text: "I help investigate integration behavior, validate payloads, review field mappings, and troubleshoot REST/SOAP-related concerns.",
    points: ["REST and SOAP investigation", "RESTlet troubleshooting", "Payload validation"],
  },
  {
    title: "Reporting & ERP Visibility",
    text: "I help teams improve the way they access, validate, and use NetSuite data for operational decision-making.",
    points: ["Saved searches", "Workbooks and reports", "Dashboard visibility"],
  },
  {
    title: "Frontend & Business Web Systems",
    text: "I also build clean frontend systems, dashboards, and product content structures that support business workflows outside NetSuite.",
    points: ["React web apps", "Shopify product systems", "Responsive business interfaces"],
  },
]

export const projects = [
  {
    type: "Web App Case Study",
    name: "Spendlr — Expense Splitting App",
    summary:
      "A modern expense-splitting web app designed for groups, shared trips, and settlement tracking.",
    problem:
      "Group expenses can become messy when balances, contributors, and settlements are tracked manually.",
    solution:
      "Built a React-based dashboard experience with structured group views, settlement logic, and a clean interface for tracking shared expenses.",
    outcome:
      "Demonstrates product thinking, state management, dashboard UX, and practical frontend architecture.",
    resultHighlights: ["Dashboard UX", "Settlement logic", "React + Supabase"],
    tags: ["React", "Supabase", "Dashboard UI", "Product Design"],
    link: "https://spendlrapp.vercel.app/",
  },
  {
    type: "ERP Workflow Concept",
    name: "NetSuite Case Resolution Toolkit",
    summary:
      "A private troubleshooting workflow concept for analyzing NetSuite case descriptions faster and more consistently.",
    problem:
      "ERP support cases often require fast triage across workflows, permissions, saved searches, scripts, integrations, and account configuration.",
    solution:
      "Designed a personal-use workflow where case details can be broken down into likely causes, diagnostic paths, and recommended NetSuite checks.",
    outcome:
      "Positions my NetSuite support experience around structured analysis, faster troubleshooting, and consultant-level thinking.",
    resultHighlights: ["Faster triage", "Diagnostic paths", "Support knowledge"],
    tags: ["NetSuite", "Troubleshooting", "AI Workflow", "ERP Support"],
    link: "",
  },
  {
    type: "E-commerce System",
    name: "Shopify Product Content Framework",
    summary:
      "A reusable HTML and SEO structure for technical product listings across premium e-commerce catalogs.",
    problem:
      "Technical products need accurate, scannable, SEO-friendly pages that help customers understand specs and buying decisions.",
    solution:
      "Created structured product page patterns with intro copy, feature sections, specs tables, CTA blocks, and guide links.",
    outcome:
      "Shows practical experience with Shopify content systems, conversion copy, and technical catalog presentation.",
    resultHighlights: ["Reusable HTML", "SEO structure", "Technical content"],
    tags: ["Shopify", "HTML", "SEO", "Product Content"],
    link: "",
  },
]

export type ExperienceItem = {
  role: string
  company: string
  division: string
  period: string
  current: boolean
  logo?: string
  logoAlt?: string
  logoText: string
  tags: string[]
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: "Technical Support Engineer",
    company: "Oracle NetSuite",
    division: "SuiteBuilder & SuiteCloud · Platinum Enterprise",
    period: "Sep 2024 — Present",
    current: true,
    logo: "https://www.svgrepo.com/show/342094/oracle-netsuite.svg",
    logoAlt: "Oracle NetSuite logo",
    logoText: "NS",
    tags: [
      "SuiteBuilder",
      "SuiteCloud",
      "SuiteFlow",
      "SuiteScript",
      "EBP",
      "REST/SOAP APIs",
      "Saved Searches",
    ],
    highlights: [
      "Diagnose and resolve NetSuite issues involving custom forms, fields, workflows, scripts, saved searches, permissions, and reporting behavior.",
      "Investigate ERP behavior across customer environments and provide clear, reproducible findings for technical and non-technical stakeholders.",
      "Troubleshoot Electronic Bank Payment templates and setup concerns affecting financial operations.",
    ],
  },
  {
    role: "Associate Technical Support Engineer",
    company: "Oracle NetSuite",
    division: "SuiteBuilder · General Operations",
    period: "Sep 2022 — Sep 2024",
    current: false,
    logo: "https://www.svgrepo.com/show/342094/oracle-netsuite.svg",
    logoAlt: "Oracle NetSuite logo",
    logoText: "NS",
    tags: [
      "SuiteBuilder",
      "SuiteFlow",
      "Saved Searches",
      "Custom Forms",
      "PDF Templates",
      "EBP",
    ],
    highlights: [
      "Supported customers with SuiteBuilder customization concerns, workflow behavior, reporting setup, and role-based access issues.",
      "Performed initial technical analysis and escalated complex cases with clear diagnostics and reproduction details.",
      "Created documentation and case notes that improved consistency and repeat issue handling.",
    ],
  },
  {
    role: "Computer System Technician",
    company: "CANORECO",
    division: "Network and Information Technology Division",
    period: "Jan 2021 — Sep 2022",
    current: false,
    logo: "https://ecpay.com.ph/sites/default/files/2023-11/CANORECO.png",
    logoAlt: "CANORECO logo",
    logoText: "CN",
    tags: ["Networking", "Hardware", "IT Support", "Documentation"],
    highlights: [
      "Maintained user systems, hardware, and network devices to support operational availability.",
      "Diagnosed software and hardware issues and provided practical fixes to reduce downtime.",
      "Documented recurring issues and resolutions to improve internal support efficiency.",
    ],
  },
]

export const certifications = [
  "NetSuite Administrator",
  "SuiteFoundation",
  "NetSuite AI Foundations",
  "OCI AI Foundations",
]

export const skillGroups = [
  {
    title: "NetSuite Consulting",
    text: "Business-facing NetSuite capabilities focused on process understanding, issue analysis, and system improvement.",
    skills: [
      "Business Process Review",
      "Workflow Analysis",
      "Requirement Clarification",
      "ERP Troubleshooting",
      "Documentation",
    ],
  },
  {
    title: "NetSuite Development",
    text: "Platform tools and technical areas I use for ERP customization, automation, and development-focused troubleshooting.",
    skills: ["SuiteScript 2.x", "SuiteFlow", "SuiteBuilder", "SuiteCloud", "SDF", "RESTlets", "SuiteTalk"],
  },
  {
    title: "ERP Support & Diagnostics",
    text: "Areas I commonly investigate when resolving customer-facing business system issues.",
    skills: ["Saved Searches", "Advanced PDF/HTML", "Roles & Permissions", "Electronic Bank Payments", "Workbooks"],
  },
  {
    title: "Frontend & Business Web Systems",
    text: "Frontend tools I use for building clean portfolio projects, dashboards, and digital interfaces.",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "Tailwind CSS", "Supabase", "Vercel"],
  },
]

export const contactInfo = {
  email: "jomarphilip.balane@gmail.com",
  intro:
    "I am open to freelance projects, consulting-style work, and full-time opportunities where I can help improve NetSuite and business systems through practical technical execution.",
}

export type SocialLinkType = "email" | "linkedin"

export type SocialLink = {
  label: string
  href: string
  type: SocialLinkType
  display: string
}

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:jomarphilip.balane@gmail.com",
    type: "email",
    display: "jomarphilip.balane@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jomar-balane",
    type: "linkedin",
    display: "linkedin.com/in/jomar-balane",
  },
]

export const techStack = [
  {
    name: "NetSuite",
    category: "ERP Platform",
    description: "ERP troubleshooting, configuration, workflows, reporting, and support analysis",
    logo: "https://www.svgrepo.com/show/342094/oracle-netsuite.svg",
    fallback: "NS",
    variant: "netsuite",
  },
  {
    name: "SuiteScript 2.x",
    category: "Development",
    description: "NetSuite scripting, automation logic, and technical customization",
    logo: "https://www.svgrepo.com/show/342094/oracle-netsuite.svg",
    fallback: "SS",
    variant: "netsuite",
  },
  {
    name: "SuiteFlow",
    category: "Automation",
    description: "Workflow behavior, approval flows, conditions, and process automation",
    logo: "https://www.svgrepo.com/show/342094/oracle-netsuite.svg",
    fallback: "SF",
    variant: "netsuite",
  },
  {
    name: "SuiteTalk REST / SOAP",
    category: "Integration",
    description: "API investigation, payload validation, and integration behavior analysis",
    logo: "https://www.svgrepo.com/show/342094/oracle-netsuite.svg",
    fallback: "API",
    variant: "netsuite",
  },
  {
    name: "Saved Searches",
    category: "Reporting",
    description: "Search logic, filters, results, dashboards, and operational visibility",
    logo: "https://www.svgrepo.com/show/342094/oracle-netsuite.svg",
    fallback: "SS",
    variant: "netsuite",
  },
  {
    name: "React",
    category: "Frontend",
    description: "Modern interface development for dashboards and business web systems",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg",
    fallback: "R",
    variant: "frontend",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Safer component logic, typed data structures, and maintainable UI code",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/typescript.svg",
    fallback: "TS",
    variant: "frontend",
  },
  {
    name: "Tailwind CSS",
    category: "UI System",
    description: "Mobile-first responsive layouts with consistent design tokens",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tailwindcss.svg",
    fallback: "TW",
    variant: "frontend",
  },
  {
    name: "Supabase",
    category: "Backend",
    description: "Authentication, database structure, realtime data, and app prototyping",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/supabase.svg",
    fallback: "SB",
    variant: "backend",
  },
  {
    name: "Vercel",
    category: "Deployment",
    description: "Fast deployment workflow for portfolio projects and web applications",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vercel.svg",
    fallback: "VC",
    variant: "deployment",
  },
  {
    name: "Shopify",
    category: "E-commerce",
    description: "Product content systems, storefront structure, and technical catalog presentation",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/shopify.svg",
    fallback: "SH",
    variant: "commerce",
  },
]