import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"

import CohortReportPage, { metadata } from "../app/(marketing)/examples/health-system-cohort-report/page"
import {
  FORMATIVE_USE_LIMITATION,
  NO_OUTCOME_PREDICTION_LIMITATION,
  RATER_VALIDATION_LIMITATION,
} from "./claim-discipline"
import { COHORT_REPORT_ELEMENTS, COHORT_REPORT_SCENARIOS } from "./cohort-report"
import { PRIMARY_CTA } from "./positioning"

const html = renderToStaticMarkup(createElement(CohortReportPage))
const text = html.replace(/<[^>]+>/g, " ").replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")

describe("health system cohort report", () => {
  it("has one H1 and a <title> that differs from it", () => {
    const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/g) ?? []
    expect(h1s).toHaveLength(1)
    const h1 = (h1s[0] ?? "").replace(/<[^>]+>/g, "").trim()
    expect(metadata.title).not.toBe(h1)
  })

  it("matches the partner report's counts", () => {
    const scenarioTotal = COHORT_REPORT_SCENARIOS.reduce((sum, s) => sum + s.conversations, 0)
    expect(scenarioTotal).toBe(82)
    const commRows = COHORT_REPORT_ELEMENTS.flatMap((g) => g.elements).filter((e) => e.framework === "Comm")
    expect(commRows.map((e) => e.n)).toEqual([82, 81, 82])
  })

  it("publishes the shared limitations verbatim", () => {
    for (const limit of [RATER_VALIDATION_LIMITATION, FORMATIVE_USE_LIMITATION, NO_OUTCOME_PREDICTION_LIMITATION]) {
      expect(text).toContain(limit)
    }
  })

  it("leaves out what Ben withheld on 2026-10-20", () => {
    for (const withheld of [/1\.8/, /4\.8/, /malpractice/i, /90.day/i, /Ben Conway/, /per.clinician/i]) {
      expect(text).not.toMatch(withheld)
    }
  })

  it("uses the primary call to action", () => {
    expect(text).toContain(PRIMARY_CTA)
  })
})
