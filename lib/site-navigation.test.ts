import { describe, expect, it } from "vitest"
import { getAllAudiences } from "./audiences"
import { getPublishedSolutions } from "./solutions"
import {
  getActiveHeaderItem,
  HEADER_ACTION,
  HEADER_DIRECT_LINKS,
  HEADER_MENUS,
  transitionHeaderMenu,
} from "./site-navigation"

const expectedUseCaseRoutes = {
  "Health systems": [
    "/solutions/patient-experience",
    "/solutions/debriefing",
    "/solutions/informed-consent",
    "/solutions/error-disclosure",
  ],
  "Medical education": [
    "/solutions/longitudinal-curriculum",
    "/solutions/undergraduate-medical-education",
    "/solutions/faculty-development",
    "/solutions/remediation",
  ],
}

const expectedAudienceRoutes = {
  "Health systems": [
    "/audiences/risk-and-patient-safety",
    "/audiences/quality-and-patient-experience",
  ],
  "Medical education": [
    "/audiences/program-directors",
    "/audiences/dios-gme-leadership",
    "/audiences/simulation-center-directors",
    "/audiences/clinical-competency-committees",
    "/audiences/medical-school-leadership",
    "/audiences/faculty-clinician-educators",
  ],
}

describe("header navigation", () => {
  it("publishes the required top-level navigation and one contact action", () => {
    expect(HEADER_MENUS.map(({ label }) => label)).toEqual([
      "Solutions",
      "How it works",
      "Resources",
    ])
    expect(HEADER_DIRECT_LINKS).toEqual([{ href: "/help", label: "Help" }])
    expect(HEADER_ACTION).toEqual({ href: "/contact", label: "Talk with us" })

    const menuHrefs = HEADER_MENUS.flatMap((menu) =>
      menu.kind === "grouped"
        ? menu.columns.flatMap((column) =>
            column.groups.flatMap((group) => group.items.map(({ href }) => href))
          )
        : menu.items.map(({ href }) => href)
    )
    const contactHrefs = [
      ...menuHrefs,
      ...HEADER_DIRECT_LINKS.map(({ href }) => href),
      HEADER_ACTION.href,
    ].filter((href) => href === "/contact")

    expect(contactHrefs).toEqual(["/contact"])
  })

  it("groups every published use case and audience once", () => {
    const solutionsMenu = HEADER_MENUS[0]
    expect(solutionsMenu.kind).toBe("grouped")
    if (solutionsMenu.kind !== "grouped") throw new Error("Solutions menu must be grouped")

    expect(
      Object.fromEntries(
        solutionsMenu.columns[0].groups.map((group) => [
          group.label,
          group.items.map(({ href }) => href),
        ])
      )
    ).toEqual(expectedUseCaseRoutes)
    expect(
      Object.fromEntries(
        solutionsMenu.columns[1].groups.map((group) => [
          group.label,
          group.items.map(({ href }) => href),
        ])
      )
    ).toEqual(expectedAudienceRoutes)

    const publishedRoutes = [
      ...getPublishedSolutions().map(({ slug }) => `/solutions/${slug}`),
      ...getAllAudiences().map(({ slug }) => `/audiences/${slug}`),
    ]
    const navigationRoutes = solutionsMenu.columns.flatMap((column) =>
      column.groups.flatMap((group) => group.items.map(({ href }) => href))
    )

    expect(navigationRoutes).toHaveLength(new Set(navigationRoutes).size)
    expect(navigationRoutes.toSorted()).toEqual(publishedRoutes.toSorted())
  })

  it("keeps the How it works and Resources route groups together", () => {
    const howItWorks = HEADER_MENUS[1]
    const resources = HEADER_MENUS[2]
    expect(howItWorks.kind).toBe("links")
    expect(resources.kind).toBe("links")
    if (howItWorks.kind !== "links" || resources.kind !== "links") {
      throw new Error("Link menus must use link navigation")
    }

    expect(howItWorks.items).toEqual([
      { href: "/examples", label: "Examples" },
      { href: "/frameworks", label: "Frameworks and standards" },
      { href: "/methodology", label: "Methodology" },
      { href: "/evaluation", label: "Evaluating ClinicalSim" },
    ])
    expect(resources.items).toEqual([
      { href: "/insights", label: "Insights" },
      { href: "/research", label: "Research collaboration" },
      { href: "/about", label: "About ClinicalSim" },
      { href: "/faq", label: "FAQ" },
      { href: "/medical-educator-faq", label: "FAQ for Medical Educators" },
    ])
  })

  it.each([
    ["/solutions/informed-consent", "solutions"],
    ["/audiences/program-directors", "solutions"],
    ["/frameworks", "how-it-works"],
    ["/evaluation", "how-it-works"],
    ["/insights/example-post", "resources"],
    ["/medical-educator-faq", "resources"],
    ["/help/release-notes", "help"],
    ["/contact", "contact"],
    ["/", null],
  ])("marks %s active under %s", (pathname, expected) => {
    expect(getActiveHeaderItem(pathname)).toBe(expected)
  })

  it("opens only the latest clicked or hovered menu", () => {
    expect(transitionHeaderMenu(null, { type: "toggle", menu: "solutions" })).toBe(
      "solutions"
    )
    expect(
      transitionHeaderMenu("solutions", { type: "toggle", menu: "resources" })
    ).toBe("resources")
    expect(
      transitionHeaderMenu("resources", { type: "open", menu: "how-it-works" })
    ).toBe("how-it-works")
    expect(
      transitionHeaderMenu("how-it-works", { type: "toggle", menu: "how-it-works" })
    ).toBeNull()
  })

  it.each(["escape", "outside", "route"] as const)(
    "closes an open menu after %s",
    (reason) => {
      expect(
        transitionHeaderMenu("solutions", { type: "dismiss", reason })
      ).toBeNull()
    }
  )
})
