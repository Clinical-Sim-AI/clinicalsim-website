"use client"

import {
  formatCurrency,
  formatCurrencyRange,
  formatHours,
  formatNumber,
  formatYears,
} from "@/lib/roi/format"
import type { Result } from "@/lib/roi/types"

/**
 * The break-even comes first because it is the most checkable claim on the
 * page. Rendering the threshold before the result is deliberate: it puts the
 * reader in the position of judging plausibility rather than judging whether
 * we are exaggerating.
 *
 * Dark Blue ground, so the emphasised figures can be Electric. On a white card
 * they could not be.
 */
export function BreakEven({
  result,
  onSwitchToDio,
}: {
  result: Result
  onSwitchToDio: () => void
}) {
  const { breakEven, bandATotal, extendedYear, inputs } = result
  const covered = breakEven.coveredByBandA

  return (
    <section className="rounded-xl bg-cs-dark-blue px-6 py-8 text-white md:px-10 md:py-10">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-cs-electric">
        Break-even
      </p>

      <p className="text-2xl font-light leading-snug md:text-3xl lg:text-4xl">
        At{" "}
        <span className="font-medium text-cs-electric">
          {formatNumber(inputs.trainees)} trainees
        </span>
        , {formatCurrency(breakEven.contractPrice)} a year pays for itself if it
        frees{" "}
        <span className="font-medium text-cs-electric">
          {formatHours(breakEven.facultyHoursNeeded)} faculty hours a year
        </span>{" "}
        or prevents{" "}
        <span className="font-medium text-cs-electric">
          {formatYears(breakEven.extendedYearsNeeded)}
        </span>{" "}
        extended training years.
      </p>

      <p className="mt-6 text-base font-light leading-relaxed text-cs-cloud md:text-lg">
        Your inputs put the faculty time at{" "}
        <span className="font-medium text-white">
          {formatCurrencyRange(bandATotal)}
        </span>
        , which is {covered ? "above" : "below"} that threshold.
      </p>

      {!covered && (
        <div className="mt-6 border-t border-white/20 pt-6">
          <p className="text-base font-light leading-relaxed text-cs-cloud md:text-lg">
            Faculty time alone does not cover the contract at this program size.
            {/* No claim about how many cases it takes. That depends on the
                inputs (0.32 of a case at 50 trainees, closer to three at 400),
                and the next paragraph prints the actual threshold, so asserting
                a direction here would be wrong for half the program sizes. */}
            What could cover it is the extended-year cost, quantified just
            below, and the practice every trainee who is not in remediation
            gets, which this calculator does not price.
          </p>
          <p className="mt-4 text-sm font-light leading-relaxed text-cs-cloud/80">
            One extended or repeated training year costs{" "}
            {formatCurrency(extendedYear.totalCostPerExtendedYear.point)} in
            stipend and fringe alone, so the threshold is{" "}
            {formatYears(breakEven.extendedYearsNeeded)} of one.
          </p>
          {inputs.lens === "pd" && (
            <button
              type="button"
              onClick={onSwitchToDio}
              className="mt-5 rounded-md bg-cs-electric px-5 py-2.5 text-sm font-bold text-cs-dark-blue transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-cs-dark-blue"
            >
              See the institution-wide view
            </button>
          )}
        </div>
      )}
    </section>
  )
}
