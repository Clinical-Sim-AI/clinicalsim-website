"use client"

import { ChevronRight } from "lucide-react"

import { CONSTANTS_VERSION, readConstant } from "@/lib/roi/constants"
import type { Result } from "@/lib/roi/types"

type LeftOut = { item: string; reason: string }

type Row = {
  figure: string
  value: string
  unit: string
  source: string
  year: string
  confidence: string
}

/**
 * Generated from the constants, never hand-maintained. If a figure moves in
 * the JSON it moves here, which is the only way a methodology table stays true
 * more than one release.
 */
function buildRows(result: Result): Row[] {
  const { inputs } = result

  return [
    {
      figure: "Faculty hours per trainee per year on assessment",
      value: String(inputs.assessmentHoursPerTrainee),
      unit: "hours",
      source:
        "Goyal et al., Med Educ Online 2018. 23.5 faculty-hours a month across 42 trainees.",
      year: "2018",
      confidence: "Estimated",
    },
    {
      figure: "ICS and professionalism share of subcompetencies",
      value: `${(inputs.subcompetencyShare * 100).toFixed(0)}%`,
      unit: "share",
      source: "Roughly 6 to 7 of about 23 subcompetencies.",
      year: "2026",
      confidence: "Estimated",
    },
    {
      figure: "Depth of substitution",
      value: `${(inputs.depthOfSubstitution * 100).toFixed(0)}%`,
      unit: "share",
      source:
        "Nabors et al., Arch Med Sci 2017. Discounted because that was a full committee-process overhaul rather than a data feed.",
      year: "2017",
      confidence: "Inferred",
    },
    {
      figure: "Remediation cases resolved for this program",
      value: result.remediationCasesUsed.point.toFixed(2),
      unit: "cases per year",
      source:
        "Specialty rate per 100 trainees, floored at one case per program per year. Cases per program are flat at 0.93 to 1.04 across a 2.7x range of program size.",
      year: "2015 to 2025",
      confidence: "Estimated",
    },
    {
      figure: "Communication or professionalism share of cases",
      value: `${(inputs.commShare * 100).toFixed(0)}%`,
      unit: "share",
      source:
        "Rebedew 2024 and Silverberg 2015. Rebedew reports no ICS percentage, so none was synthesized.",
      year: "2024",
      confidence: "Inferred",
    },
    {
      figure: "Faculty hours per remediation case",
      value: String(inputs.hoursPerCase),
      unit: "hours",
      source:
        "Guerrasio & Aagaard 2014, mean 29.6 specialist contact hours. Excludes program director, CCC, coordinator, and legal time, so it is a floor.",
      year: "2014",
      confidence: "Estimated",
    },
    {
      figure: "Share of remediation hours the platform absorbs",
      value: `${(inputs.displacementFraction * 100).toFixed(0)}%`,
      unit: "share",
      source: "An assumption, labeled as one.",
      year: "2026",
      confidence: "Inferred",
    },
    {
      figure: "Faculty hourly value",
      value: `$${result.facultyHourly.point.toFixed(0)}`,
      unit: "USD per hour",
      source: `MGMA 2025 Academic Compensation, associate professor, ${
        inputs.hourlyBasis === "clinical" ? "1,456 clinical" : "2,080 total"
      } annual hours, ${(inputs.fringeRate * 100).toFixed(1)}% fringe. Eastern region only, so biased high by plausibly 10 to 20% against national.`,
      year: "2025",
      confidence: "Estimated",
    },
    {
      figure: "Marginal cost of one extended training year",
      value: `$${result.extendedYear.marginalCostPerYear.point.toLocaleString("en-US")}`,
      unit: "USD",
      source:
        "AAMC stipends effective 1 July 2025 plus fringe. RAND: at an existing program, one more resident-year does not move GME infrastructure or IME cost.",
      year: "2025",
      confidence: "Estimated",
    },
    {
      figure: "Modeled extensions per 100 trainees per year",
      value: result.extendedYear.modeledExtensionRatePer100.point.toFixed(1),
      unit: "extensions",
      source:
        "Published remediation prevalence times Yao & Wright's 18% per-case additional training time. A modeled figure, not an ACGME statistic. Context only, never a dollar claim.",
      year: "2000 to 2025",
      confidence: "Estimated",
    },
  ]
}

export function MethodologyDrawer({ result }: { result: Result }) {
  const rows = buildRows(result)
  const leftOut = readConstant<LeftOut[]>("deliberately_left_out")

  return (
    <details className="group rounded-xl border border-cs-gray/60 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 md:px-6">
        <span className="text-base font-medium text-cs-dark-blue">
          Methodology: every constant in this calculation
        </span>
        <ChevronRight
          className="h-5 w-5 flex-shrink-0 text-cs-gray transition-transform group-open:rotate-90"
          aria-hidden="true"
        />
      </summary>

      <div className="px-5 pb-6 md:px-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-cs-gray/60">
                {["Figure", "Value", "Source", "Year", "Confidence"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="py-2 pr-4 text-xs font-medium uppercase tracking-wide text-cs-dark-gray"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-cs-gray/40">
              {rows.map((row) => (
                <tr key={row.figure} className="align-top">
                  <td className="py-3 pr-4 text-sm font-medium text-cs-dark-blue">
                    {row.figure}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-4 text-sm font-light text-cs-dark-blue">
                    {row.value}{" "}
                    <span className="text-cs-dark-gray">{row.unit}</span>
                  </td>
                  <td className="py-3 pr-4 text-sm font-light leading-relaxed text-cs-dark-blue/85">
                    {row.source}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-4 text-sm font-light text-cs-dark-gray">
                    {row.year}
                  </td>
                  <td className="whitespace-nowrap py-3 text-sm font-light text-cs-dark-gray">
                    {row.confidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h3 className="text-base font-medium text-cs-dark-blue">
            How the range is built
          </h3>
          <p className="mt-2 text-sm font-light leading-relaxed text-cs-dark-blue/85">
            Each assumption varies one at a time from the point estimate, and we
            take the widest result in each direction. We do not multiply every
            low bound together, because five conservative assumptions compounded
            produce a floor that means nothing. The ICS and professionalism
            share of subcompetencies has no published band, so it is held fixed
            while the others move.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-base font-medium text-cs-dark-blue">
            What we deliberately left out
          </h3>
          <dl className="mt-3 space-y-3">
            {leftOut.map((entry) => (
              <div key={entry.item}>
                <dt className="text-sm font-medium text-cs-dark-blue">
                  {entry.item}
                </dt>
                <dd className="text-sm font-light leading-relaxed text-cs-dark-blue/85">
                  {entry.reason}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs font-light text-cs-dark-gray">
            Constants version {CONSTANTS_VERSION}. Nothing tagged unsourced
            renders on this page, and the code throws rather than guessing if it
            is asked for one.
          </p>
        </div>
      </div>
    </details>
  )
}
