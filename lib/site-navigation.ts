export type HeaderItemId =
  | "health-systems"
  | "medical-education"
  | "how-it-works"
  | "evidence"
  | "contact"

export interface HeaderLink {
  href: string
  label: string
}

export interface HeaderNavigationLink extends HeaderLink {
  id: Exclude<HeaderItemId, "contact">
}

// Keep the first decision small. New catalog entries don't add header links.
export const HEADER_LINKS: HeaderNavigationLink[] = [
  { id: "health-systems", href: "/health-systems", label: "Health systems" },
  { id: "medical-education", href: "/medical-education", label: "Medical education" },
  {
    id: "how-it-works",
    href: "/clinical-communication-intelligence",
    label: "How it works",
  },
  { id: "evidence", href: "/evidence", label: "Evidence" },
]

export const HEADER_ACTION: HeaderLink = { href: "/contact", label: "Talk with us" }

export const PLATFORM_SIGN_IN: HeaderLink = {
  href: "https://platform.clinicalsim.ai/sign-in",
  label: "Sign in",
}
export const PLATFORM_SIGN_UP: HeaderLink = {
  href: "https://platform.clinicalsim.ai/sign-up",
  label: "Sign up",
}

export const FOOTER_GROUPS: Array<{ label: string; links: HeaderLink[] }> = [
  {
    label: "Explore",
    links: [
      ...HEADER_LINKS,
      { href: "/solutions", label: "All use cases" },
      { href: "/audiences", label: "All audiences" },
      { href: "/examples", label: "Example feedback" },
    ],
  },
  {
    label: "Resources",
    links: [
      { href: "/frameworks", label: "Frameworks and standards" },
      { href: "/methodology", label: "Scoring methodology" },
      { href: "/evaluation", label: "Evaluating ClinicalSim" },
      { href: "/insights", label: "Insights" },
      { href: "/research", label: "Research collaboration" },
      { href: "/compare", label: "Compare approaches" },
      { href: "/glossary", label: "Glossary" },
    ],
  },
  {
    label: "Company and support",
    links: [
      { href: "/about", label: "About ClinicalSim" },
      { href: "/trust", label: "Trust and compliance" },
      { href: "/faq", label: "FAQ" },
      { href: "/medical-educator-faq", label: "Medical educator FAQ" },
      { href: "/help", label: "Help center" },
      { href: "/help/release-notes", label: "Release notes" },
      PLATFORM_SIGN_IN,
      PLATFORM_SIGN_UP,
    ],
  },
]

const relatedRoutes: Record<Exclude<HeaderItemId, "contact">, string[]> = {
  "health-systems": [
    "/solutions/patient-experience",
    "/solutions/debriefing",
    "/solutions/informed-consent",
    "/solutions/error-disclosure",
    "/solutions/workforce-retention",
    "/audiences/risk-and-patient-safety",
    "/audiences/quality-and-patient-experience",
  ],
  "medical-education": [
    "/solutions/longitudinal-curriculum",
    "/solutions/undergraduate-medical-education",
    "/solutions/faculty-development",
    "/solutions/remediation",
    "/audiences/program-directors",
    "/audiences/dios-gme-leadership",
    "/audiences/simulation-center-directors",
    "/audiences/clinical-competency-committees",
    "/audiences/medical-school-leadership",
    "/audiences/faculty-clinician-educators",
    "/medical-educator-faq",
  ],
  "how-it-works": ["/examples", "/frameworks", "/evaluation"],
  evidence: ["/methodology", "/insights", "/research"],
}

export function routeIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function getActiveHeaderItem(pathname: string): HeaderItemId | null {
  if (routeIsActive(pathname, HEADER_ACTION.href)) return "contact"
  for (const link of HEADER_LINKS) {
    if (
      routeIsActive(pathname, link.href) ||
      relatedRoutes[link.id].some((href) => routeIsActive(pathname, href))
    ) {
      return link.id
    }
  }
  return null
}
