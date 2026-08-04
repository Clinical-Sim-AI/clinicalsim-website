"use client"

import { Citation, ConfidenceChip } from "@/components/roi/Citation"
import { readString } from "@/lib/roi/constants"
import {
  formatCurrency,
  formatCurrencyRange,
  formatHours,
  formatHoursRange,
  formatNumber,
  formatPercent,
} from "@/lib/roi/format"
import type { BandALine, Result } from "@/lib/roi/types"

/**
 * Assessment first, remediation second. Assessment applies to every trainee;
 * remediation applies to three to five. A program with no active remediation
 * case still gets a number, which is most programs on any given day.
 */
export function BandA({ result }: { result: Result }) {
  const [a1, a2] = result.bandA

  return (
    <section className="rounded-xl border border-cs-gray/60 bg-white p-6 md:p-8">
      <h2 className="text-2xl font-light text-cs-dark-blue md:text-3xl">
        Faculty time, <span className="font-medium">your own budget</span>
      </h2>
      <p className="mt-2 text-sm font-light leading-relaxed text-cs-dark-gray">
        Two lines, both hours you already pay for. This is the entire ROI claim.
      </p>

      {/* This has to be visible next to the number, not buried in a panel the
          reader may never open. A CFO will find the double count either way,
          and better from us. */}
      {result.inputs.hourlyBasis === "clinical" && (
        <p className="mt-4 rounded-md border border-cs-dark-blue/20 bg-cs-cloud px-4 py-3 text-sm font-light leading-relaxed text-cs-dark-blue/85">
          You are valuing these hours at the displaced-clinical rate. That
          denominator already excludes 360 hours of teaching and administrative
          time, so if the hours freed come out of that bucket, this figure
          double counts. Use it only where faculty are genuinely pulled off a
          billable clinical assignment.
        </p>
      )}

      <div className="mt-6 space-y-6">
        <AssessmentLine line={a1} shortcut={result.bandC.shortcutFinding} />
        <RemediationLine line={a2} result={result} />
      </div>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-cs-gray/50 pt-5">
        <span className="text-base font-medium text-cs-dark-blue">
          Band A total
        </span>
        <span className="text-right">
          <span className="block text-2xl font-bold tracking-tight text-cs-dark-blue">
            {formatCurrency(result.bandATotal.point)}
          </span>
          <span className="block text-sm font-light text-cs-dark-gray">
            {formatCurrencyRange(result.bandATotal)}
          </span>
        </span>
      </div>
      <p className="mt-3 text-xs font-light leading-relaxed text-cs-dark-gray">
        The range varies one assumption at a time from the point estimate and
        takes the envelope. Multiplying every low bound together would compound
        conservatism into a floor nobody believes.
      </p>
    </section>
  )
}

function LineShell({
  line,
  children,
}: {
  line: BandALine
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-cs-gray/50 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-lg font-medium text-cs-dark-blue">{line.label}</h3>
        <span className="text-right">
          <span className="block text-xl font-bold tracking-tight text-cs-dark-blue">
            {formatCurrency(line.dollars.point)}
          </span>
          <span className="block text-xs font-light text-cs-dark-gray">
            {formatCurrencyRange(line.dollars)}
          </span>
        </span>
      </div>
      {children}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <ConfidenceChip confidence={line.confidence} />
      </div>
    </div>
  )
}

function AssessmentLine({
  line,
  shortcut,
}: {
  line: BandALine
  shortcut: Result["bandC"]["shortcutFinding"]
}) {
  const [subcompetency, depth] = line.discounts

  return (
    <LineShell line={line}>
      {/* The burden and the claim, always together. Showing only the claim
          hides how much of the burden we are declining to price; showing only
          the burden would be a number we have not earned. */}
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-cs-cloud px-4 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-cs-dark-gray">
            Hours your faculty spend on this
          </dt>
          <dd className="mt-1 text-2xl font-bold tracking-tight text-cs-dark-blue">
            {formatHours(line.hoursCurrent.point)}
          </dd>
          <dd className="text-xs font-light text-cs-dark-gray">
            {formatHoursRange(line.hoursCurrent)} hours a year. We do not price
            this line.
          </dd>
        </div>
        <div className="rounded-md border border-cs-dark-blue/20 px-4 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-cs-dark-gray">
            Hours we claim against
          </dt>
          <dd className="mt-1 text-2xl font-bold tracking-tight text-cs-dark-blue">
            {formatHours(line.hoursAddressable.point, 1)}
          </dd>
          <dd className="text-xs font-light text-cs-dark-gray">
            {formatHoursRange(line.hoursAddressable, 1)} hours a year.
          </dd>
        </div>
      </dl>

      {/* Both discounts, explicitly. A program director who watches us
          voluntarily cut to 30% of 30% has a reason to trust the rest. */}
      <div className="mt-4 rounded-md border border-cs-gray/50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-cs-dark-gray">
          How we get from one to the other
        </p>
        <ol className="mt-3 space-y-3">
          <li className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="rounded-xs bg-cs-dark-blue px-2 py-0.5 text-xs font-medium text-white">
              &times; {formatPercent(subcompetency.value)}
            </span>
            <span className="text-sm font-medium text-cs-dark-blue">
              {subcompetency.label}
            </span>
            <span className="w-full text-xs font-light leading-relaxed text-cs-dark-gray">
              {subcompetency.basis}
            </span>
          </li>
          <li className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="rounded-xs bg-cs-dark-blue px-2 py-0.5 text-xs font-medium text-white">
              &times; {formatPercent(depth.value)}
            </span>
            <span className="text-sm font-medium text-cs-dark-blue">
              {depth.label}
            </span>
            <span className="w-full text-xs font-light leading-relaxed text-cs-dark-gray">
              {depth.basis}
            </span>
          </li>
        </ol>
      </div>

      <p className="mt-4 text-sm font-light leading-relaxed text-cs-dark-blue/85">
        {line.note}
      </p>

      <p className="mt-3 text-sm font-light leading-relaxed text-cs-dark-blue/85">
        In the one program that measured it, a full milestone assessment took{" "}
        {shortcut.fullMinutes} minutes and the fast version took{" "}
        {shortcut.adHocMinutes}. The catch is that {shortcut.agreement}, so the
        shortcut is a defensibility problem rather than a time saving.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Citation
          label="Goyal 2018"
          source="Goyal N, Folt J, Jaskulka B, Baliga S, Slezak M, Schultz LR, Vallee P. Assessment methods and resource requirements for milestone reporting by an emergency medicine clinical competency committee. Med Educ Online 2018;23(1):1538925"
          year={2018}
          confidence="Confirmed"
          caveat="Single emergency medicine program, one specialty, one site. The 4.5 to 8.5 band accounts for it."
          url="https://scholarlycommons.henryford.com/emergencymedicine_articles/28/"
        />
        {/* Read, not retyped. The research file flags the year as unsettled (the
            v2 changeset says Arch Med Sci 2016, the v1 form says 2017 and
            carries volume and pages) and says to confirm before publication.
            This chip and the methodology drawer now quote the same constant, so
            confirming it is one edit rather than a hunt for every copy. */}
        <Citation
          label="Nabors"
          source={readString(
            "lever_a1_assessment_documentation.in_scope_slice.discount_2_depth_of_substitution.supporting"
          )}
          confidence="Confirmed"
          caveat="A full committee-process overhaul, not a data feed, which is why depth of substitution is discounted rather than taken at the published reduction."
        />
      </div>
    </LineShell>
  )
}

function RemediationLine({
  line,
  result,
}: {
  line: BandALine
  result: Result
}) {
  const [comm, displacement] = line.discounts

  return (
    <LineShell line={line}>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-cs-cloud px-4 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-cs-dark-gray">
            Remediation faculty hours
          </dt>
          <dd className="mt-1 text-2xl font-bold tracking-tight text-cs-dark-blue">
            {formatHours(line.hoursCurrent.point)}
          </dd>
          <dd className="text-xs font-light text-cs-dark-gray">
            {formatNumber(result.remediationCasesUsed.point, 1)} cases a year at{" "}
            {formatHours(result.inputs.hoursPerCase)} hours each.
          </dd>
        </div>
        <div className="rounded-md border border-cs-dark-blue/20 px-4 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-cs-dark-gray">
            Hours we claim against
          </dt>
          <dd className="mt-1 text-2xl font-bold tracking-tight text-cs-dark-blue">
            {formatHours(line.hoursAddressable.point, 1)}
          </dd>
          <dd className="text-xs font-light text-cs-dark-gray">
            {formatHoursRange(line.hoursAddressable, 1)} hours a year.
          </dd>
        </div>
      </dl>

      <div className="mt-4 rounded-md border border-cs-gray/50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-cs-dark-gray">
          How we get from one to the other
        </p>
        <ol className="mt-3 space-y-3">
          {[comm, displacement].map((discount) => (
            <li
              key={discount.id}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
            >
              <span className="rounded-xs bg-cs-dark-blue px-2 py-0.5 text-xs font-medium text-white">
                &times; {formatPercent(discount.value)}
              </span>
              <span className="text-sm font-medium text-cs-dark-blue">
                {discount.label}
              </span>
              <span className="w-full text-xs font-light leading-relaxed text-cs-dark-gray">
                {discount.basis}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-4 text-sm font-light leading-relaxed text-cs-dark-blue/85">
        {line.note}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Citation
          label="Guerrasio 2014"
          source="Guerrasio J, Aagaard EM. J Gen Intern Med 2014;29(12):1607-1614. Mean 29.6 faculty hours (median 18, range 2 to 100) across 53 learners with clinical reasoning deficits."
          year={2014}
          confidence="Confirmed"
          caveat="Remediation specialist contact time only. It excludes planning, assessment, preparation, and all program director, CCC, coordinator, and legal time, so it is a floor."
        />
        <Citation
          label="Nelsen 2025"
          source="Nelsen A et al. Academic Pediatrics 2025;25:102776. 4.7% of pediatric residents remediated, 288 cases across 99 programs, 91% success."
          year={2025}
          confidence="Confirmed (abstract)"
          caveat="Lookback period is not stated in the free abstract."
        />
        <Citation
          label="Frazier 2021"
          source="Frazier B et al. Family Medicine, Oct 2021 (CERA 2017). 93% of family medicine programs had at least one resident in remediation over three years, 267 of 503 program directors responding."
          year={2021}
          confidence="Confirmed"
        />
      </div>
    </LineShell>
  )
}
