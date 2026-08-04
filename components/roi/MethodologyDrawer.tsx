"use client"

import { ChevronRight } from "lucide-react"

import {
  CONSTANTS_VERSION,
  readConstant,
  readString,
} from "@/lib/roi/constants"
import {
  formatCurrency,
  formatHours,
  formatPercent,
} from "@/lib/roi/format"
import type { Result } from "@/lib/roi/types"

type LeftOut = { item: string; reason: string }

/**
 * The row metadata as it sits in the constants: what the figure is called, its
 * unit, where it came from, the year, and the confidence tag.
 *
 * `source` is absent on the depth-of-substitution row, which composes its
 * citation out of the same constant Band A cites, and on the faculty-hourly row,
 * which has to interpolate the chosen basis and the user's fringe rate.
 */
type RowMeta = {
  figure: string
  unit: string
  source?: string
  source_suffix?: string
  source_template?: string
  basis_total?: string
  basis_clinical?: string
  year: string
  confidence: string
}

type Row = RowMeta & { id: string; value: string; source: string }

/**
 * Presentation order. The figures themselves, their sources, years, and
 * confidence tags all come out of `methodology_rows` in the constants; this
 * array decides only what order they appear in.
 */
const ROW_ORDER = [
  "assessment_hours",
  "subcompetency_share",
  "depth_of_substitution",
  "remediation_cases",
  "comm_share",
  "hours_per_case",
  "displacement_fraction",
  "faculty_hourly",
  "marginal_cost",
  "modeled_extensions",
] as const

/**
 * Actually generated from the constants now.
 *
 * The docstring here used to claim that, while `source`, `year`, and
 * `confidence` were hand-written literals in this file duplicating
 * DEFAULT_SOURCES. Only `value` tracked the JSON, so the table could drift from
 * the model it documents, which is the exact failure the claim promised to
 * prevent. Every column except `value` is now read; `value` is computed,
 * because it depends on the user's inputs.
 */
function buildRows(result: Result): Row[] {
  const { inputs } = result
  const meta = readConstant<Record<string, RowMeta>>("methodology_rows")

  // Percentages, hours, and dollars all format differently, and the value is
  // the one column that cannot come from a static file.
  const values: Record<string, string> = {
    assessment_hours: formatHours(inputs.assessmentHoursPerTrainee, 1),
    subcompetency_share: formatPercent(inputs.subcompetencyShare),
    depth_of_substitution: formatPercent(inputs.depthOfSubstitution),
    remediation_cases: formatHours(result.remediationCasesUsed.point, 2),
    comm_share: formatPercent(inputs.commShare),
    hours_per_case: formatHours(inputs.hoursPerCase),
    displacement_fraction: formatPercent(inputs.displacementFraction),
    faculty_hourly: formatCurrency(result.facultyHourly.point),
    marginal_cost: formatCurrency(
      result.extendedYear.marginalCostPerYear.point
    ),
    modeled_extensions: formatHours(
      result.extendedYear.modeledExtensionRatePer100.point,
      1
    ),
  }

  // One place the disputed Nabors year lives. The research file notes that the
  // v2 changeset gives Arch Med Sci 2016 while the v1 form carries 2017 with
  // volume and pages, and that it needs confirming before publication. Reading
  // the same `supporting` string Band A cites means confirming it once fixes it
  // everywhere rather than in whichever copy someone remembers.
  const depthSupporting = readString(
    "lever_a1_assessment_documentation.in_scope_slice.discount_2_depth_of_substitution.supporting"
  )

  const sourceFor = (id: string, row: RowMeta): string => {
    if (id === "depth_of_substitution") {
      return `${depthSupporting}. ${row.source_suffix ?? ""}`.trim()
    }
    if (id === "faculty_hourly" && row.source_template) {
      return row.source_template
        .replace(
          "{basis}",
          inputs.hourlyBasis === "clinical"
            ? (row.basis_clinical ?? "")
            : (row.basis_total ?? "")
        )
        .replace("{fringe}", formatPercent(inputs.fringeRate, 1))
    }
    return row.source ?? ""
  }

  return ROW_ORDER.map((id) => {
    const row = meta[id]
    return {
      ...row,
      id,
      value: values[id],
      source: sourceFor(id, row),
    }
  })
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
                <tr key={row.id} className="align-top">
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
