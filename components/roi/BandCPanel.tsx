"use client"

import { ChevronRight } from "lucide-react"

import { Citation } from "@/components/roi/Citation"
import { formatCurrency, formatNumber, formatPercent } from "@/lib/roi/format"
import type { BandCPanel as BandCPanelData } from "@/lib/roi/types"

/**
 * "Documented properly."
 *
 * Equal visual weight to Band A and not one dollar anywhere in it. The base
 * rates for accreditation trouble are published and precise. The cost of that
 * trouble is published nowhere, including in the only peer-reviewed account of
 * a program working through probation. So this panel carries the mechanism,
 * the frequency, and the regulation numbers, and lets a DIO price it
 * themselves. Telling them what it costs would be both unsourceable and
 * slightly insulting.
 */
export function BandCPanel({
  panel,
  specialtyProse,
}: {
  panel: BandCPanelData
  /** The specialty written the way it reads mid-sentence. */
  specialtyProse: string
}) {
  // Block 3 drops out entirely for a specialty ACGME has not published a
  // citation rank for, so the rest renumber. A visible gap at 3 reads as a
  // missing section rather than a deliberate silence.
  const showsRank = panel.citationRank.kind !== "silent"
  const num = (n: number) => (showsRank || n < 3 ? n : n - 1)

  return (
    <section className="rounded-xl border border-cs-gray/60 bg-white p-6 md:p-8">
      <h2 className="text-2xl font-light text-cs-dark-blue md:text-3xl">
        <span className="font-medium">{panel.header}</span>
      </h2>
      <p className="mt-3 max-w-2xl text-base font-light leading-relaxed text-cs-dark-blue/85">
        {panel.subhead}
      </p>

      <div className="mt-8 space-y-8">
        <Block
          number={1}
          title="What ACGME still requires, and what we produce against it"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-cs-gray/60">
                  <th className="py-2 pr-4 text-xs font-medium uppercase tracking-wide text-cs-dark-gray">
                    Requirement
                  </th>
                  <th className="py-2 pr-4 text-xs font-medium uppercase tracking-wide text-cs-dark-gray">
                    What it demands
                  </th>
                  <th className="py-2 text-xs font-medium uppercase tracking-wide text-cs-dark-gray">
                    What ClinicalSim emits
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cs-gray/40">
                {panel.requirements.map((row) => (
                  <tr key={row.requirement} className="align-top">
                    <td className="py-3 pr-4 text-sm font-medium text-cs-dark-blue">
                      {row.requirement}
                    </td>
                    <td className="py-3 pr-4 text-sm font-light leading-relaxed text-cs-dark-blue/85">
                      {row.demands}
                    </td>
                    <td className="py-3 text-sm font-light leading-relaxed text-cs-dark-blue/85">
                      {row.artifact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs font-light text-cs-dark-gray">
            {panel.requirementsSource}.{" "}
            <a
              href={panel.requirementsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cs-dark-blue underline underline-offset-2"
            >
              Source
            </a>
          </p>
        </Block>

        <Block number={2} title="What reviewers actually look at">
          <blockquote className="border-l-2 border-cs-dark-blue pl-4 text-base font-light italic leading-relaxed text-cs-dark-blue/85">
            {panel.reviewersExamine.quote}
          </blockquote>
          <p className="mt-3 text-sm font-light leading-relaxed text-cs-dark-blue/85">
            Every clause in that is a documentation property, and it is ACGME&apos;s
            own language rather than ours.
          </p>
          <div className="mt-3">
            <Citation
              label="Guide to the CPRs, V.A.1"
              source={panel.reviewersExamine.cite}
              confidence="Confirmed"
              url={panel.reviewersExamine.url}
            />
          </div>
        </Block>

        {/* Specialty-aware. Pediatrics renders nothing here, because pediatrics
            does not appear in top citation themes and showing a program
            director someone else's rank would be showing them someone else's
            problem. */}
        {showsRank && (
          <Block number={3} title="Where evaluation ranks as a citation category">
            {panel.citationRank.kind === "specialty" ? (
              <p className="text-base font-light leading-relaxed text-cs-dark-blue/85">
                {panel.citationRank.rank !== null ? (
                  <>
                    In {specialtyProse}, evaluation of residents ranks{" "}
                    <span className="font-medium text-cs-dark-blue">
                      {panel.citationRank.rank}
                      {panel.citationRank.of
                        ? ` of ${panel.citationRank.of}`
                        : ""}
                    </span>{" "}
                    among citation categories, cited as{" "}
                    {panel.citationRank.detail}.
                  </>
                ) : (
                  <>
                    In {specialtyProse}, evaluation does not carry a numeric
                    rank but is a {panel.citationRank.theme}:{" "}
                    {panel.citationRank.detail}.
                  </>
                )}
              </p>
            ) : (
              <p className="text-base font-light leading-relaxed text-cs-dark-blue/85">
                {panel.citationRank.statement}
              </p>
            )}
            <p className="mt-3 text-sm font-light leading-relaxed text-cs-dark-gray">
              Worth being precise about what that means. The cited deficiencies
              are process ones: multiple and multisource evaluators, evaluation
              confidentiality, end-of-rotation timeliness, faculty completion,
              portfolio existence, and verification of readiness for autonomous
              practice. We address multisource evidence, timeliness, and
              defensible documentation of communication competencies. We do not
              address confidentiality architecture, faculty completion
              behavior, or evaluator diversity on our own. Milestones reporting
              and CCC function are absent from frequent citation categories, so
              we do not claim either.
            </p>
            <div className="mt-3">
              <Citation
                label="ACGME RC decks 2026"
                source="ACGME Review Committee 2026 Annual Educational Conference specialty update decks."
                year={2026}
                confidence="Confirmed"
              />
            </div>
          </Block>
        )}

        <Block number={num(4)} title="How often this actually happens">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                label: "Continued Accreditation with Warning",
                ...panel.baseRates.warning,
              },
              { label: "Probationary Accreditation", ...panel.baseRates.probation },
              {
                label: "Withdrawal of Accreditation",
                ...panel.baseRates.withdrawal,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-md border border-cs-gray/50 px-4 py-3"
              >
                <p className="text-2xl font-bold tracking-tight text-cs-dark-blue">
                  {formatPercent(row.share, 1)}
                </p>
                <p className="text-xs font-light leading-relaxed text-cs-dark-gray">
                  {formatNumber(row.count)} of{" "}
                  {formatNumber(panel.baseRates.totalPrograms)} programs.{" "}
                  {row.label}.
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-light leading-relaxed text-cs-dark-blue/85">
            Flat across four years: Warning{" "}
            {panel.baseRates.fourYearSeries.warning.join(", ")}; Probation{" "}
            {panel.baseRates.fourYearSeries.probation.join(", ")}; Withdrawal{" "}
            {panel.baseRates.fourYearSeries.withdrawal.join(", ")}. ACGME has{" "}
            {formatNumber(panel.baseRates.randomSiteVisitsThisYear)} random site
            visits scheduled for the current year, and roughly{" "}
            {formatPercent(panel.baseRates.adverseRateGivenVisit, 1)} of
            completed random visits produced an adverse outcome.
          </p>
          <p className="mt-3 text-sm font-light leading-relaxed text-cs-dark-gray">
            A citation is not an adverse action. Internal Medicine had 79
            programs cited and 339 citations in the same year that 2,857 of
            2,874 established IM programs still held plain Continued
            Accreditation.
          </p>
          <div className="mt-3">
            <Citation
              label="Data Resource Book"
              source={panel.baseRates.source}
              year={panel.baseRates.year}
              confidence="Confirmed"
              caveat="Cite the Data Resource Book, not the Annual Report. The Annual Report folds Warning into Continued Accreditation."
            />
          </div>
        </Block>

        <Block number={num(5)} title="What one program's Warning does to the institution">
          <ul className="space-y-4">
            {panel.machinery.map((item) => (
              <li key={item.requirement}>
                <span className="rounded-xs bg-cs-dark-blue px-2 py-0.5 text-xs font-medium text-white">
                  {item.requirement}
                </span>
                <p className="mt-2 text-sm font-light leading-relaxed text-cs-dark-blue/85">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-light leading-relaxed text-cs-dark-blue/85">
            So a single program&apos;s Warning creates a mandatory, documented,
            recurring institutional workload with a monitoring timeline attached.
            It is not a one-time event and it lands on the DIO&apos;s desk, not
            the program director&apos;s.
          </p>
          <p className="mt-3 text-xs font-light leading-relaxed text-cs-dark-gray">
            {panel.renumberingWarning}
          </p>
          <div className="mt-3">
            <Citation
              label="Institutional Requirements 2025"
              source={panel.machinerySource}
              confidence="Confirmed"
              url={panel.machineryUrl}
            />
          </div>
        </Block>

        <Block number={num(6)} title="Status is public. Citations are not.">
          <p className="text-base font-light leading-relaxed text-cs-dark-blue/85">
            Accreditation status is published on the ADS public site, and past
            statuses stay visible, so a cured Warning does not disappear from
            the record. Citations are confidential. ACGME&apos;s own words:
          </p>
          <blockquote className="mt-3 border-l-2 border-cs-dark-blue pl-4 text-sm font-light italic leading-relaxed text-cs-dark-blue/85">
            {panel.asymmetry.citationsQuote}
          </blockquote>
          <p className="mt-3 text-base font-light leading-relaxed text-cs-dark-blue/85">
            So an applicant sees the status and cannot see why.
          </p>
          <p className="mt-3 rounded-md bg-cs-cloud px-4 py-3 text-sm font-light leading-relaxed text-cs-dark-blue/85">
            And the honest gap: {panel.asymmetry.knownGap} We looked, five ways,
            and found nothing. Anyone who tells you an adverse status costs you
            recruits is telling you something nobody has measured.
          </p>
        </Block>

        <Collapsed number={num(7)} title="Hard fees, for scale">
          <p className="text-sm font-light leading-relaxed text-cs-dark-blue/85">
            {panel.hardFees.framing}
          </p>
          <dl className="mt-4 space-y-2 text-sm font-light text-cs-dark-blue/85">
            {panel.hardFees.items.map((item) => (
              <div key={item.label} className="flex justify-between gap-4">
                <dt>{item.label}</dt>
                <dd className="font-medium text-cs-dark-blue">
                  {formatCurrency(item.amount)}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs font-light leading-relaxed text-cs-dark-gray">
            {panel.hardFees.scaling} {panel.hardFees.year} schedule.{" "}
            <a
              href={panel.hardFees.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cs-dark-blue underline underline-offset-2"
            >
              ACGME fee schedule
            </a>
          </p>
        </Collapsed>

        <Collapsed number={num(8)} title="The tail, and how rare it is">
          {/* The base rate and the dollar figure sit in the same unit so
              neither can be read without the other. Nothing multiplies them. */}
          <div className="rounded-lg border border-cs-gray/50 p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-2xl font-bold tracking-tight text-cs-dark-blue">
                  {formatCurrency(panel.tail.twelveResidentExample)}
                </p>
                <p className="text-xs font-light leading-relaxed text-cs-dark-gray">
                  A year of Medicare GME forgone by a 12-resident program that
                  loses accreditation, at{" "}
                  {formatCurrency(panel.tail.medicareGmePerResidentYear)} per
                  resident per year (range{" "}
                  {formatCurrency(panel.tail.range[0])} to{" "}
                  {formatCurrency(panel.tail.range[1])},{" "}
                  {panel.tail.dollarYear} dollars).
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-cs-dark-blue">
                  {formatPercent(panel.tail.baseRateToShowAdjacent, 1)}
                </p>
                <p className="text-xs font-light leading-relaxed text-cs-dark-gray">
                  Of accredited programs had accreditation withdrawn in the most
                  recent year. Read the two figures together or not at all. We
                  are not going to multiply them for you, and neither should
                  anyone else.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm font-light leading-relaxed text-cs-dark-blue/85">
            The worked case is Hahnemann University Hospital in{" "}
            {panel.tail.hahnemann.year}:{" "}
            {formatNumber(panel.tail.hahnemann.displaced)} residents and fellows
            displaced across {panel.tail.hahnemann.programsClosed} closed
            programs, the largest single displacement on record. Its Medicare
            GME slots sold in bankruptcy for{" "}
            {formatCurrency(panel.tail.hahnemann.gmeSlotSale)}, roughly{" "}
            {formatCurrency(panel.tail.hahnemann.perSlot)} a slot, against a
            stalking-horse bid of{" "}
            {formatCurrency(panel.tail.hahnemann.stalkingHorseBid)} and over the
            opposition of CMS and DOJ. A consortium led by Thomas Jefferson
            absorbed {formatNumber(panel.tail.hahnemann.absorbedByConsortium)}{" "}
            former residents. {panel.tail.hahnemann.placementCostNote}
          </p>
          <p className="mt-3 text-sm font-light leading-relaxed text-cs-dark-blue/85">
            Crozer Health, {panel.tail.crozer.year}: {panel.tail.crozer.costNote}
          </p>
          <p className="mt-3 text-xs font-light leading-relaxed text-cs-dark-gray">
            Cap transfer on closure is {panel.tail.capTransferRule}
          </p>
        </Collapsed>
      </div>

      <p className="mt-8 border-t border-cs-gray/50 pt-5 text-sm font-light leading-relaxed text-cs-dark-gray">
        {panel.rationale}
      </p>
    </section>
  )
}

function Block({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="mb-4 flex items-baseline gap-3 text-lg font-medium text-cs-dark-blue">
        <span className="text-sm font-light text-cs-dark-gray">{number}</span>
        {title}
      </h3>
      {children}
    </div>
  )
}

function Collapsed({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <details className="group rounded-lg border border-cs-gray/50">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
        <span className="flex items-baseline gap-3 text-lg font-medium text-cs-dark-blue">
          <span className="text-sm font-light text-cs-dark-gray">{number}</span>
          {title}
        </span>
        <ChevronRight
          className="h-5 w-5 flex-shrink-0 text-cs-gray transition-transform group-open:rotate-90"
          aria-hidden="true"
        />
      </summary>
      <div className="px-5 pb-5">{children}</div>
    </details>
  )
}
