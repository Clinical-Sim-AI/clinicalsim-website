import { describe, expect, it } from "vitest"

import { getAudiencesByMarket } from "./audiences"
import { getHomepageSolutionGroups, getSolutionsByMarket } from "./solutions"
import {
  ASSESSMENT_ENTRY,
  CATEGORY_DEFINITION,
  CATEGORY_LINE,
  MEASUREMENT_CLAIM,
  MISSION_STATEMENT,
  MISSION_STATEMENT_BODY,
  MISSION_STATEMENT_LEAD,
  POSITIONING_AUDIENCE,
  POSITIONING_LONG,
  POSITIONING_ONE_LINER,
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

  it("positions the company as measuring communication, entered through an assessment", () => {
    expect(POSITIONING_ONE_LINER).toMatch(/measures/i)
    expect(POSITIONING_ONE_LINER).toMatch(/AI patients/i)
    expect(POSITIONING_ONE_LINER).toMatch(/practice/i)
    expect(ASSESSMENT_ENTRY).toMatch(/assessment/i)
    for (const copy of [
      ASSESSMENT_ENTRY,
      CATEGORY_DEFINITION,
      CATEGORY_LINE,
      MEASUREMENT_CLAIM,
      POSITIONING_AUDIENCE,
      POSITIONING_LONG,
      POSITIONING_ONE_LINER,
      POSITIONING_SUPPORT,
    ]) {
      expect(copy).not.toMatch(/[\u2013\u2014]/)
      expect(copy).not.toMatch(/fix what|breaks down|fell short/i)
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

  it("names staging backed rubrics on consent and disclosure pages", () => {
    const informedConsent = getSolutionsByMarket("health-system").find(
      (solution) => solution.slug === "informed-consent",
    )
    const errorDisclosure = getSolutionsByMarket("health-system").find(
      (solution) => solution.slug === "error-disclosure",
    )

    expect(informedConsent?.frameworks?.map((framework) => framework.name)).toContain(
      "Informed consent: Consent discussion",
    )
    expect(errorDisclosure?.frameworks?.map((framework) => framework.name)).toContain(
      "AHRQ CANDOR: Disclosure communication",
    )
    expect(informedConsent?.frameworks?.map((framework) => framework.name)).not.toContain(
      "Braddock's elements of informed decision making",
    )
    expect(errorDisclosure?.frameworks?.map((framework) => framework.name)).not.toContain(
      "NQF Safe Practice on disclosure",
    )
  })
})

/**
 * The mission statement is approved copy, not editable prose. It is the one
 * published string on the site that keeps its em dashes, so a well meant pass
 * of the brand voice rules would quietly rewrite it. This locks the wording
 * character for character instead.
 */
describe("mission statement", () => {
  it("matches the approved wording exactly", () => {
    expect(MISSION_STATEMENT).toBe(
      "Our mission is to improve clinical communication to improve patient care\u2014and make an extraordinarily hard job a little less hard. Medicine measures how patients experience communication, but rarely the communication itself: what clinicians say, how they say it, and how they can improve. We send clinicians into some of the hardest conversations of a family's life with little practice or feedback, and both patients and clinicians bear the consequences. ClinicalSim aims to change that by making communication a skill we can practice, measure, and improve\u2014so what is said and what is understood are finally the same thing.",
    )
  })

  it("reassembles from the parts /about renders", () => {
    expect(
      [MISSION_STATEMENT_LEAD, ...MISSION_STATEMENT_BODY].join(" "),
    ).toBe(MISSION_STATEMENT)
  })

  it("keeps the claim an intention rather than a result", () => {
    expect(MISSION_STATEMENT).toContain("aims to change that")
  })
})
