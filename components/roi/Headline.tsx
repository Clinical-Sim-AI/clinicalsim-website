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
    const paybackMonths = result.monthsToPayBackOnFacultyTime

    return (
      <div className="rounded-xl border border-cs-gray/60 bg-white p-6 md:p-8">
        <p className="text-sm font-light text-cs-dark-gray">
          Cost per resident per year
        </p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-cs-dark-blue md:text-5xl">
          {formatCurrency(perResident)}
        </p>
        <p className="mt-4 text-base font-light leading-relaxed text-cs-dark-blue/85">
          Against {formatCurrency(result.bandAPerTrainee)} per resident of
          assessment and remediation faculty time, which is{" "}
          {formatCurrencyRange(result.bandATotal)} across{" "}
          {formatNumber(result.inputs.trainees)} trainees in{" "}
          {formatNumber(result.inputs.programs)} programs.
        </p>
        {/* A 65-month payback on a subscription billed yearly is not a payback,
            it is a shortfall wearing a payback's clothes. Past twelve months we
            say the plain thing instead of printing the number. */}
        <p className="mt-2 text-sm font-light text-cs-dark-gray">
          {paybackMonths > 0 && paybackMonths <= 12
            ? `Payback on faculty time alone: ${formatNumber(paybackMonths, 0)} months.`
            : "Faculty time alone does not pay this back inside a year at these inputs."}
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
      {/* The old sentence read these hours as practice conversations delivered.
          They are not the same quantity: the platform's repetitions do not
          consume the faculty hours it frees, and nothing measures how many reps
          a program actually runs. What the arithmetic supports is what that much
          faculty time would buy at the 20-minute unit, so that is what it says.
          The claim that the program "cannot currently schedule" them came with
          no source and is gone. */}
      <p className="mt-4 text-base font-light leading-relaxed text-cs-dark-blue/85">
        That is about what{" "}
        {formatNumber(result.practiceRepsDelivered.point)} faculty-led practice
        conversations cost at the 20-minute unit these sessions run on.
      </p>
    </div>
  )
}
