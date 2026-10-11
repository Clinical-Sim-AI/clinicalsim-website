import { describe, expect, it } from "vitest"
import { getAllAudiences } from "./audiences"
import { getPublishedSolutions } from "./solutions"
import {
  FOOTER_GROUPS,
  getActiveHeaderItem,
  HEADER_ACTION,
  HEADER_LINKS,
  PLATFORM_SIGN_IN,
  PLATFORM_SIGN_UP,
  routeIsActive,
} from "./site-navigation"

describe("site navigation", () => {
  it("keeps the first decision to four direct links and one contact action", () => {
    expect(HEADER_LINKS.map(({ href, label }) => ({ href, label }))).toEqual([
      { href: "/health-systems", label: "Health systems" },
      { href: "/medical-education", label: "Medical education" },
      { href: "/clinical-communication-intelligence", label: "How it works" },
      { href: "/evidence", label: "Evidence" },
    ])
    expect(HEADER_ACTION).toEqual({ href: "/contact", label: "Talk with us" })
  })

  it("keeps each published specialist page active under its buyer path", () => {
    const pages = [
      ...getPublishedSolutions().map(({ slug, market }) => ({ href: `/solutions/${slug}`, market })),
      ...getAllAudiences().map(({ slug, market }) => ({ href: `/audiences/${slug}`, market })),
    ]
    for (const { href, market } of pages) {
      expect(getActiveHeaderItem(href), href).toBe(
        market === "health-system" ? "health-systems" : "medical-education"
      )
    }
  })

  it.each([
    ["/health-systems", "health-systems"],
    ["/medical-education", "medical-education"],
    ["/clinical-communication-intelligence", "how-it-works"],
    ["/frameworks", "how-it-works"],
    ["/examples/example-case", "how-it-works"],
    ["/evaluation", "how-it-works"],
    ["/evidence", "evidence"],
    ["/methodology", "evidence"],
    ["/insights/example-post", "evidence"],
    ["/medical-educator-faq", "medical-education"],
    ["/help/release-notes", null],
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

  it("keeps support and registration accessible in the grouped footer", () => {
    const footerLinks = FOOTER_GROUPS.flatMap(({ links }) => links)
    const hrefs = footerLinks.map(({ href }) => href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
    expect(footerLinks).toContainEqual(PLATFORM_SIGN_IN)
    expect(footerLinks).toContainEqual(PLATFORM_SIGN_UP)
    for (const href of ["/help", "/help/release-notes", "/solutions", "/audiences", "/faq", "/medical-educator-faq", "/trust", "/compare", "/glossary"]) {
      expect(hrefs).toContain(href)
    }
  })
})
