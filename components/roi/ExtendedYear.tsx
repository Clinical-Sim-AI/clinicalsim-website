"use client"

import { Citation } from "@/components/roi/Citation"
import { readNumber } from "@/lib/roi/constants"
import {
  formatCurrency,
  formatCurrencyRange,
  formatNumber,
  formatPercent,
  formatYears,
} from "@/lib/roi/format"
import type { Result } from "@/lib/roi/types"

/**
 * A threshold, never a saving.
 *
 * The modeled extension rate renders here as separately labeled context. It
 * is deliberately not placed next to the threshold with an implied arrow
 * between them, not captioned as a share of it, and never multiplied by a
 * prevention rate. Two published figures do not license projecting prevented
 * extensions as dollars, and acceptance test 17 guards the boundary.
 */
export function ExtendedYear({ result }: { result: Result }) {
  const lever = result.extendedYear
  // Context only, and labeled as such. Never the numerator of an avoided-year
  // claim: it overstates the saving by roughly a factor of two.
  const fullyLoaded = readNumber(
    "lever_a3_extended_year.fully_loaded_average_context_only.default"
  )

  return (
    <section className="rounded-xl border border-cs-gray/60 bg-white p-6 md:p-8">
      <h2 className="text-2xl font-light text-cs-dark-blue md:text-3xl">
        The extended year,{" "}
        <span className="font-medium">as a threshold</span>
      </h2>

      <p className="mt-3 text-base font-light leading-relaxed text-cs-dark-blue/85">
        We show this as a threshold, not a saving. The published literature
        reports composite adverse outcomes rather than extension rates
        specifically, so we will not tell you how many extensions this prevents.
        We will tell you how few it would take to pay for itself.
      </p>

      <div className="mt-6 rounded-lg border border-cs-gray/50 p-5">
        <p className="text-sm font-light text-cs-dark-gray">
          Extended training years this would have to prevent
        </p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-cs-dark-blue">
          {formatYears(lever.yearsToBreakEven.point)}
        </p>
        <p className="mt-1 text-sm font-light text-cs-dark-gray">
          {formatYears(lever.yearsToBreakEven.low)} to{" "}
          {formatYears(lever.yearsToBreakEven.high)} across the cost band.
        </p>

        <dl className="mt-5 space-y-2 border-t border-cs-gray/50 pt-4 text-sm font-light text-cs-dark-blue/85">
          <div className="flex justify-between gap-4">
            <dt>Marginal cost of one extended year</dt>
            <dd className="text-right">
              {formatCurrency(lever.marginalCostPerYear.point)}
              <span className="block text-xs text-cs-dark-gray">
                {formatCurrencyRange(lever.marginalCostPerYear)}
              </span>
            </dd>
          </div>
          {lever.dgmeForgonePerYear && (
            <div className="flex justify-between gap-4">
              <dt>DGME forgone at the 0.5 weight</dt>
              <dd className="text-right">
                {formatCurrency(lever.dgmeForgonePerYear.point)}
              </dd>
            </div>
          )}
          <div className="flex justify-between gap-4 border-t border-cs-gray/50 pt-2 font-medium text-cs-dark-blue">
            <dt>Total</dt>
            <dd>{formatCurrency(lever.totalCostPerExtendedYear.point)}</dd>
          </div>
        </dl>

        <p className="mt-4 text-xs font-light leading-relaxed text-cs-dark-gray">
          Stipend and fringe only. RAND is direct about this: at an existing
          program, one more or one fewer resident-year does not move GME
          infrastructure or IME cost. The fully loaded average of about{" "}
          {formatCurrency(fullyLoaded)} includes supervision, coordinator time,
          space, and the DIO&apos;s office, none of which go away when one
          trainee finishes on time, and using it here would overstate the figure
          by roughly a factor of two.
        </p>
      </div>

      {/* Context, in its own box, with its own heading. Not a projection. */}
      <div className="mt-6 rounded-lg border border-cs-gray/50 bg-cs-cloud p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-cs-dark-gray">
          Separately: what the literature says about extensions
        </p>
        <p className="mt-3 text-base font-light leading-relaxed text-cs-dark-blue/85">
          When an internal medicine program formally intervenes on a struggling
          resident, roughly{" "}
          <span className="font-medium text-cs-dark-blue">
            {formatPercent(lever.perCaseAdditionalTrainingTime)}
          </span>{" "}
          end up needing additional training time, and{" "}
          {formatPercent(lever.perCaseFullRepeatYear, 1)} of remediated general
          surgery residents repeat a full clinical year.
        </p>
        <p className="mt-3 text-sm font-light leading-relaxed text-cs-dark-gray">
          Applying published remediation prevalence to that per-case probability
          gives a modeled rate of about{" "}
          {formatNumber(lever.modeledExtensionRatePer100.point, 1)} extensions
          per 100 trainees per year. That is a modeled figure derived from two
          published numbers. It is not an ACGME statistic, it is not a measured
          national rate, and we are not going to set it against the threshold
          above and imply the difference is yours to bank. ACGME publishes no
          extension, non-promotion, or probation field at all.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Citation
            label="Yao & Wright 2000"
            source="Yao DC, Wright SM. National Survey of Internal Medicine Residency Program Directors Regarding Problem Residents. JAMA 2000;284(9):1099-1104. 18% of formally remediated residents required additional training time."
            year={2000}
            confidence="Confirmed"
            caveat="The figure is in the Comment section of the full text rather than the abstract."
            url="https://jamanetwork.com/journals/jama/fullarticle/193039"
          />
          <Citation
            label="Yaghoubian 2012"
            source="Yaghoubian A, Galante J, Kaji A, et al. General Surgery Resident Remediation and Attrition: A Multi-institutional Study. Arch Surg 2012;147(9):829-833. 7 of 107 remediated residents repeated a full clinical year across 6 programs and 348 residents over 11 years."
            year={2012}
            confidence="Confirmed"
            url="https://jamanetwork.com/journals/jamasurgery/fullarticle/1358529"
          />
          <Citation
            label="AAMC stipends 2025"
            source="AAMC Survey of Resident/Fellow Stipends and Benefits, effective 1 July 2025. 350 nonprofit ACGME sponsoring institutions, 114,361 residents and fellows."
            year={2025}
            confidence="Confirmed"
          />
        </div>
      </div>
    </section>
  )
}
