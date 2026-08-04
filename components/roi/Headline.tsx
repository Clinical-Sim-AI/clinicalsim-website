"use client"

import {
  formatCurrency,
  formatCurrencyRange,
  formatHours,
  formatHoursRange,
  formatNumber,
} from "@/lib/roi/format"
import type { Result } from "@/lib/roi/types"

/**
 * Program directors control schedules, not dollars, so the PD headline is
 * faculty hours returned. DIOs think in cost per resident per year, so that is
 * the DIO headline. Same model, two units.
 */
export function Headline({ result }: { result: Result }) {
  const isDio = result.lens === "dio"

  if (isDio) {
    const perResident = result.perResidentPerYear.point
    const exposurePerResident =
      result.inputs.trainees > 0
        ? result.bandATotal.point / result.inputs.trainees
        : 0
    const paybackMonths =
      result.bandATotal.point > 0
        ? (result.breakEven.contractPrice / result.bandATotal.point) * 12
        : 0

    return (
      <div className="rounded-xl border border-cs-gray/60 bg-white p-6 md:p-8">
        <p className="text-sm font-light text-cs-dark-gray">
          Cost per resident per year
        </p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-cs-dark-blue md:text-5xl">
          {formatCurrency(perResident)}
        </p>
        <p className="mt-4 text-base font-light leading-relaxed text-cs-dark-blue/85">
          Against {formatCurrency(exposurePerResident)} per resident of
          assessment and remediation faculty time, which is{" "}
          {formatCurrencyRange(result.bandATotal)} across{" "}
          {formatNumber(result.inputs.trainees)} trainees in{" "}
          {formatNumber(result.inputs.programs)} programs.
        </p>
        <p className="mt-2 text-sm font-light text-cs-dark-gray">
          Payback on faculty time alone:{" "}
          {paybackMonths > 0 && paybackMonths < 1200
            ? `${formatNumber(paybackMonths, 0)} months`
            : "beyond a single year at these inputs"}
          .
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-cs-gray/60 bg-white p-6 md:p-8">
      <p className="text-sm font-light text-cs-dark-gray">
        Faculty hours returned per year
      </p>
      <p className="mt-1 text-4xl font-bold tracking-tight text-cs-dark-blue md:text-5xl">
        {formatHours(result.facultyHoursReturned.point, 1)}
      </p>
      <p className="mt-1 text-sm font-light text-cs-dark-gray">
        Range {formatHoursRange(result.facultyHoursReturned, 1)} hours.
      </p>
      <p className="mt-4 text-2xl font-bold tracking-tight text-cs-dark-blue">
        {formatCurrency(result.bandATotal.point)}
      </p>
      <p className="mt-1 text-sm font-light text-cs-dark-gray">
        {formatCurrencyRange(result.bandATotal)} at your faculty hourly value.
      </p>
      <p className="mt-4 text-base font-light leading-relaxed text-cs-dark-blue/85">
        That is about{" "}
        {formatNumber(result.practiceRepsDelivered.point)} practice
        conversations at the 20-minute unit, which is the number your program
        cannot currently schedule.
      </p>
    </div>
  )
}
