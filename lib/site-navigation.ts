import type { BrandIconName } from "@/components/brand-icon"
import { getAudiencesByMarket } from "@/lib/audiences"
import { getSolutionsByMarket } from "@/lib/solutions"

export type HeaderMenuId = "solutions" | "how-it-works" | "resources"
export type HeaderItemId = HeaderMenuId | "help" | "contact"

export interface HeaderLink {
  href: string
  label: string
  icon?: BrandIconName
}

interface GroupedHeaderMenu {
  id: HeaderMenuId
  label: string
  kind: "grouped"
  columns: Array<{
    label: string
    overviewHref: string
    groups: Array<{ label: string; items: HeaderLink[] }>
  }>
}

interface LinksHeaderMenu {
  id: HeaderMenuId
  label: string
  kind: "links"
  items: HeaderLink[]
}

export type HeaderMenu = GroupedHeaderMenu | LinksHeaderMenu

const marketGroups = [
  { id: "health-system", label: "Health systems" },
  { id: "medical-education", label: "Medical education" },
] as const

const useCaseGroups = marketGroups.map((market) => ({
  label: market.label,
  items: getSolutionsByMarket(market.id).map((solution) => ({
    href: `/solutions/${solution.slug}`,
    label: solution.title,
    icon: solution.icon,
  })),
}))

const audienceGroups = marketGroups.map((market) => ({
  label: market.label,
  items: getAudiencesByMarket(market.id).map((audience) => ({
    href: `/audiences/${audience.slug}`,
    label: audience.title,
    icon: audience.icon,
  })),
}))

export const HEADER_MENUS: HeaderMenu[] = [
  {
    id: "solutions",
    label: "Solutions",
    kind: "grouped",
    columns: [
      {
        label: "Use cases",
        overviewHref: "/solutions",
        groups: useCaseGroups,
      },
      {
        label: "Audiences",
        overviewHref: "/audiences",
        groups: audienceGroups,
      },
    ],
  },
  {
    id: "how-it-works",
    label: "How it works",
    kind: "links",
    items: [
      { href: "/examples", label: "Examples" },
      { href: "/frameworks", label: "Frameworks and standards" },
      { href: "/methodology", label: "Methodology" },
      { href: "/evaluation", label: "Evaluating ClinicalSim" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    kind: "links",
    items: [
      { href: "/insights", label: "Insights" },
      { href: "/research", label: "Research collaboration" },
      { href: "/about", label: "About ClinicalSim" },
      { href: "/faq", label: "FAQ" },
      { href: "/medical-educator-faq", label: "FAQ for Medical Educators" },
    ],
  },
]

export const HEADER_DIRECT_LINKS: HeaderLink[] = [{ href: "/help", label: "Help" }]
export const HEADER_ACTION: HeaderLink = { href: "/contact", label: "Talk with us" }

// The learner and admin app lives on its own subdomain, so these two stay
// absolute URLs and never take part in the active-route logic below.
export const PLATFORM_SIGN_IN: HeaderLink = {
  href: "https://platform.clinicalsim.ai/sign-in",
  label: "Sign in",
}
export const PLATFORM_SIGN_UP: HeaderLink = {
  href: "https://platform.clinicalsim.ai/sign-up",
  label: "Sign up",
}

export type HeaderMenuAction =
  | { type: "toggle" | "open"; menu: HeaderMenuId }
  | { type: "dismiss"; reason: "escape" | "outside" | "route" }

export function transitionHeaderMenu(
  current: HeaderMenuId | null,
  action: HeaderMenuAction
): HeaderMenuId | null {
  if (action.type === "dismiss") return null
  if (action.type === "open") return action.menu
  return current === action.menu ? null : action.menu
}

export function routeIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function getActiveHeaderItem(pathname: string): HeaderItemId | null {
  if (routeIsActive(pathname, HEADER_ACTION.href)) return "contact"
  if (HEADER_DIRECT_LINKS.some((link) => routeIsActive(pathname, link.href))) return "help"
  if (routeIsActive(pathname, "/solutions") || routeIsActive(pathname, "/audiences")) {
    return "solutions"
  }

  for (const menu of HEADER_MENUS) {
    if (
      menu.kind === "links" &&
      menu.items.some((item) => routeIsActive(pathname, item.href))
    ) {
      return menu.id
    }
  }

  return null
}
