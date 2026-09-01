import { describe, expect, it } from "vitest"

import { getAudiencesByMarket } from "./audiences"
import { getSolutionsByMarket } from "./solutions"

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
})
