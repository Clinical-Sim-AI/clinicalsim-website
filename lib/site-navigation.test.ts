import { describe, expect, it } from "vitest"
import sitemap from "@/app/sitemap"
import nextConfig from "@/next.config.mjs"
import { getAllAudiences } from "./audiences"
import { getPublishedSolutions } from "./solutions"
import {
  FOOTER_GROUPS,
  getActiveHeaderItem,
  getMenuLinks,
  HEADER_ACTION,
  HEADER_MENUS,
  PLATFORM_SIGN_IN,
  PLATFORM_SIGN_UP,
  routeIsActive,
} from "./site-navigation"

const headerHrefs = [
  ...HEADER_MENUS.flatMap((menu) => [...(menu.href ? [menu.href] : []), ...getMenuLinks(menu).map(({ href }) => href)]),
  HEADER_ACTION.href,
]

describe("site navigation", () => {
  it("keeps four buyer-path menus and one contact action", () => {
    expect(HEADER_MENUS.map(({ href, label }) => ({ href, label }))).toEqual([
      { href: "/health-systems", label: "Health systems" },
      { href: "/medical-education", label: "Medical education" },
      { href: "/clinical-communication-intelligence", label: "How it works" },
      { href: undefined, label: "Resources" },
    ])
    expect(HEADER_ACTION).toEqual({ href: "/contact", label: "Talk with us" })
  })

  it("starts each hub menu with its hub page", () => {
    for (const menu of HEADER_MENUS.filter((item) => item.href)) {
      expect(getMenuLinks(menu)[0].href, menu.id).toBe(menu.href)
    }
  })

  it("lists every published use case and audience under its buyer path", () => {
    const pages = [
      ...getPublishedSolutions().map(({ slug, market }) => ({ href: `/solutions/${slug}`, market })),
      ...getAllAudiences().map(({ slug, market }) => ({ href: `/audiences/${slug}`, market })),
    ]
    for (const { href, market } of pages) {
      const id = market === "health-system" ? "health-systems" : "medical-education"
      const menu = HEADER_MENUS.find((item) => item.id === id)!
      expect(getMenuLinks(menu).map((link) => link.href), href).toContain(href)
      expect(getActiveHeaderItem(href), href).toBe(id)
    }
  })

  it("puts no page in two menus", () => {
    const hrefs = HEADER_MENUS.flatMap((menu) => getMenuLinks(menu).map(({ href }) => href))
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it("reaches every sitemap URL family from the header", () => {
    const families = new Set(
      sitemap().map(({ url }) => new URL(url).pathname.split("/")[1]).filter((segment) => segment && segment !== "privacy")
    )
    for (const family of families) {
      expect(headerHrefs.some((href) => href.split("/")[1] === family), family).toBe(true)
    }
  })

  it("links help and release notes from the header", () => {
    expect(headerHrefs).toContain("/help")
    expect(headerHrefs).toContain("/help/release-notes")
  })

  it.each([
    ["/health-systems", "health-systems"],
    ["/resources/nursing-turnover-brief", "health-systems"],
    ["/medical-education", "medical-education"],
    ["/medical-educator-faq", "medical-education"],
    ["/clinical-communication-intelligence", "how-it-works"],
    ["/frameworks", "how-it-works"],
    ["/examples/example-case", "how-it-works"],
    ["/methodology", "how-it-works"],
    ["/compare/example", "how-it-works"],
    ["/evidence", "resources"],
    ["/resources/cci-executive-brief", "resources"],
    ["/resources/cci-executive-brief/thank-you", "resources"],
    ["/insights/example-post", "resources"],
    ["/help/release-notes", "resources"],
    ["/trust", "resources"],
    ["/solutions", null],
    ["/contact", "contact"],
    ["/", null],
  ])("marks %s active under %s", (pathname, expected) => {
    expect(getActiveHeaderItem(pathname)).toBe(expected)
  })

  it("doesn't match a different route with the same prefix", () => {
    expect(routeIsActive("/evidence-other", "/evidence")).toBe(false)
    expect(getActiveHeaderItem("/solutions/informed-consent-other")).toBeNull()
  })

  it("keeps support, registration, and every header page in the grouped footer", () => {
    const footerLinks = FOOTER_GROUPS.flatMap(({ links }) => links)
    const hrefs = footerLinks.map(({ href }) => href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
    expect(footerLinks).toContainEqual(PLATFORM_SIGN_IN)
    expect(footerLinks).toContainEqual(PLATFORM_SIGN_UP)
    for (const href of ["/help", "/help/release-notes", "/solutions", "/audiences", "/faq", "/medical-educator-faq", "/trust", "/compare", "/glossary", "/resources/nursing-turnover-brief", "/resources/cci-executive-brief"]) {
      expect(hrefs).toContain(href)
    }
  })

  it("never links the header or footer to a redirected path", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? []
    const sources = new Set(redirects.filter((r) => !r.has).map((r) => r.source))
    const navHrefs = [...headerHrefs, ...FOOTER_GROUPS.flatMap(({ links }) => links.map(({ href }) => href))]
    expect(navHrefs.filter((href) => sources.has(href))).toEqual([])
  })
})
