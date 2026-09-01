import { describe, expect, it } from "vitest"

import { getAudiencesByMarket } from "./audiences"
import { getHomepageSolutionGroups, getSolutionsByMarket } from "./solutions"
import {
  CATEGORY_DEFINITION,
  POSITIONING_LONG,
  POSITIONING_SUPPORT,
} from "./positioning"

describe("market positioning", () => {
  it("groups health system buyers separately from medical education buyers", () => {
    expect(
      getAudiencesByMarket("health-system").map((audience) => audience.slug),
    ).toEqual([
      "risk-and-patient-safety",
      "quality-and-patient-experience",
    ])

    expect(
      getAudiencesByMarket("medical-education").map(
        (audience) => audience.slug,
      ),
    ).toEqual([
      "program-directors",
      "dios-gme-leadership",
      "simulation-center-directors",
      "clinical-competency-committees",
      "medical-school-leadership",
      "faculty-clinician-educators",
    ])
  })

  it("publishes patient experience and debriefing as health system use cases", () => {
    expect(
      getSolutionsByMarket("health-system").map((solution) => solution.slug),
    ).toEqual([
      "patient-experience",
      "debriefing",
      "informed-consent",
      "error-disclosure",
    ])
  })

  it("requires system use cases to publish outcome and employment limits", () => {
    for (const solution of getSolutionsByMarket("health-system")) {
      expect(solution.claimBoundary?.formative, solution.slug).toBe(true)
      expect(solution.claimBoundary?.raterValidation, solution.slug).toBe(true)
      expect(solution.claimBoundary?.noOutcomePrediction, solution.slug).toBe(
        true,
      )
      expect(solution.claimBoundary?.noEmploymentUse, solution.slug).toBe(true)
    }
  })

  it("describes both scoring paths in shared positioning copy", () => {
    for (const copy of [
      CATEGORY_DEFINITION,
      POSITIONING_SUPPORT,
      POSITIONING_LONG,
    ]) {
      expect(copy).toMatch(/published clinical frameworks/i)
      expect(copy).toMatch(/institution/i)
      expect(copy).toMatch(/policy|service standard|script|rubric/i)
    }
  })

  it("keeps the homepage use cases in separate buyer groups", () => {
    expect(
      getHomepageSolutionGroups().map((group) => ({
        market: group.market,
        slugs: group.solutions.map((solution) => solution.slug),
      })),
    ).toEqual([
      {
        market: "health-system",
        slugs: [
          "patient-experience",
          "debriefing",
          "informed-consent",
          "error-disclosure",
        ],
      },
      {
        market: "medical-education",
        slugs: [
          "longitudinal-curriculum",
          "undergraduate-medical-education",
          "faculty-development",
        ],
      },
    ])

    expect(
      getHomepageSolutionGroups().flatMap((group) =>
        group.solutions.map((solution) => solution.slug),
      ),
    ).not.toContain("remediation")
  })
})
