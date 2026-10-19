import { getAudiencesByMarket } from "@/lib/audiences"
import { getSolutionsByMarket } from "@/lib/solutions"
import type { Market } from "@/lib/positioning"

export type HeaderMenuId = "health-systems" | "medical-education" | "how-it-works" | "resources"
export type HeaderItemId = HeaderMenuId | "contact"

export interface HeaderLink {
  href: string
  label: string
}

export interface HeaderMenuGroup {
  label?: string
  items: HeaderLink[]
}

export interface HeaderNavigationMenu {
  id: HeaderMenuId
  label: string
  // The hub page the label itself links to. Resources has no hub, so its
  // label only opens the menu.
  href?: string
  groups: HeaderMenuGroup[]
}

function marketGroups(market: Market): HeaderMenuGroup[] {
  return [
    {
      label: "Use cases",
      items: getSolutionsByMarket(market).map((solution) => ({
        href: `/solutions/${solution.slug}`,
        label: solution.shortTitle,
      })),
    },
    {
      label: "Who it's for",
      items: getAudiencesByMarket(market).map((audience) => ({
        href: `/audiences/${audience.slug}`,
        label: audience.title,
      })),
    },
  ]
}

// Four buyer-path menus. Each label still links to its hub page, and the
// menu opens beside it so every specialist page is one step from the header.
export const HEADER_MENUS: HeaderNavigationMenu[] = [
  {
    id: "health-systems",
    label: "Health systems",
    href: "/health-systems",
    groups: [
      {
        label: "Start here",
        items: [
          { href: "/health-systems", label: "Health systems overview" },
          { href: "/resources/nursing-turnover-brief", label: "Nursing turnover brief" },
        ],
      },
      ...marketGroups("health-system"),
    ],
  },
  {
    id: "medical-education",
    label: "Medical education",
    href: "/medical-education",
    groups: [
      {
        label: "Start here",
        items: [
          { href: "/medical-education", label: "Medical education overview" },
          { href: "/medical-educator-faq", label: "Medical educator FAQ" },
        ],
      },
      ...marketGroups("medical-education"),
    ],
  },
  {
    id: "how-it-works",
    label: "How it works",
    href: "/clinical-communication-intelligence",
    groups: [
      {
        items: [
          { href: "/clinical-communication-intelligence", label: "Clinical communication intelligence" },
          { href: "/examples", label: "Example feedback" },
          { href: "/frameworks", label: "Frameworks and standards" },
          { href: "/methodology", label: "Scoring methodology" },
          { href: "/evaluation", label: "Evaluating ClinicalSim" },
          { href: "/compare", label: "Compare approaches" },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    groups: [
      {
        label: "Evidence and reading",
        items: [
          { href: "/evidence", label: "Evidence" },
          { href: "/insights", label: "Insights" },
          { href: "/research", label: "Research collaboration" },
          { href: "/glossary", label: "Glossary" },
        ],
      },
      {
        label: "Support and company",
        items: [
          { href: "/help", label: "Help center" },
          { href: "/help/release-notes", label: "Release notes" },
          { href: "/faq", label: "FAQ" },
          { href: "/about", label: "About ClinicalSim" },
          { href: "/trust", label: "Trust and compliance" },
        ],
      },
    ],
  },
]

export function getMenuLinks(menu: HeaderNavigationMenu): HeaderLink[] {
  return menu.groups.flatMap((group) => group.items)
}

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
      { href: "/health-systems", label: "Health systems" },
      { href: "/medical-education", label: "Medical education" },
      { href: "/clinical-communication-intelligence", label: "How it works" },
      { href: "/evidence", label: "Evidence" },
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
      { href: "/resources/nursing-turnover-brief", label: "Nursing turnover brief" },
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

export function routeIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

// A page keeps its buyer path underlined when it's the hub or any page in
// that menu. Menus are checked in header order, so the first match wins.
export function getActiveHeaderItem(pathname: string): HeaderItemId | null {
  if (routeIsActive(pathname, HEADER_ACTION.href)) return "contact"
  for (const menu of HEADER_MENUS) {
    const hrefs = [...(menu.href ? [menu.href] : []), ...getMenuLinks(menu).map((link) => link.href)]
    if (hrefs.some((href) => routeIsActive(pathname, href))) return menu.id
  }
  return null
}
