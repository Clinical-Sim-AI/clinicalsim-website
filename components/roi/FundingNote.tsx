"use client"

import { Citation } from "@/components/roi/Citation"
import { formatCurrency } from "@/lib/roi/format"
import type { Result } from "@/lib/roi/types"

/**
 * Four branches, hard. The rules here are the sharpest detail available to a
 * DIO-facing page, and a reimbursement director catches an error in seconds.
 *
 * Two things this deliberately does NOT say: that CHGME sites lose absolute
 * federal dollars from a weighted-count change (they lose share of a fixed
 * appropriation), and that primary care or OB/GYN are exempt from the 0.5
 * weight beyond the initial residency period (no such exemption exists).
 */
export function FundingNote({ result }: { result: Result }) {
  const funding = result.funding
  if (!funding) return null

  const isMedicare =
    funding.source === "medicare_under_cap" ||
    funding.source === "medicare_over_cap"

  return (
    <section className="rounded-xl border border-cs-gray/60 bg-white p-6 md:p-8">
      <h2 className="text-2xl font-light text-cs-dark-blue md:text-3xl">
        What an extended year does to{" "}
        <span className="font-medium">your federal funding</span>
      </h2>

      <p className="mt-3 text-base font-light leading-relaxed text-cs-dark-blue/85">
        {funding.copy}
      </p>

      {funding.showsDollarFigure && funding.dgmeForgone && (
        <dl className="mt-5 space-y-2 rounded-lg border border-cs-gray/50 p-5 text-sm font-light text-cs-dark-blue/85">
          <div className="flex justify-between gap-4">
            <dt>DGME forgone per extended year</dt>
            <dd className="font-medium text-cs-dark-blue">
              {formatCurrency(funding.dgmeForgone.point)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>IME forgone per extended year</dt>
            <dd className="font-medium text-cs-dark-blue">
              {formatCurrency(funding.imeForgone)}
            </dd>
          </div>
          {funding.dgmePerFteUsed === null &&
            funding.source === "medicare_under_cap" && (
              <p className="pt-2 text-xs font-light leading-relaxed text-cs-dark-gray">
                Computed off the national average of{" "}
                {formatCurrency(funding.dgmePerFtePlaceholder)} per FTE because
                you have not entered your own. Per-resident Medicare GME
                payments run {formatCurrency(funding.perResidentSpread[0])} to{" "}
                {formatCurrency(funding.perResidentSpread[1])}, a fourfold
                range, so a national average applied to a specific hospital will
                be wrong by a wide margin. Your figure belongs in the refine
                panel.
              </p>
            )}
        </dl>
      )}

      {/* CHGME renders no dollar figure at all. */}
      {funding.source === "chgme" && (
        <p className="mt-4 rounded-lg border border-cs-gray/50 bg-cs-cloud p-5 text-sm font-light leading-relaxed text-cs-dark-blue/85">
          The 0.5 weighting past the initial residency period still applies to
          you: HRSA adopted the amended 42 CFR 413.79 in whole in its May 2025
          notice. What changes is that the effect lands on your share rather
          than on a federal total, which is a different conversation with your
          CFO and not one we can put a number on.
        </p>
      )}

      {isMedicare && (
        <ul className="mt-5 space-y-3 border-t border-cs-gray/50 pt-5">
          {funding.sharpFacts.map((fact) => (
            <li
              key={fact}
              className="text-sm font-light leading-relaxed text-cs-dark-blue/85"
            >
              {fact}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Citation
          label="42 CFR 413.79"
          source="42 CFR 413.79(b)(2): the weighting factor is .50 thereafter, with no specialty carve-out. Primary care and OB/GYN appear only in (a)(5) combined-program IRP, (c)(2) separate cap scaling, and (d)(3) separate rolling average."
          confidence="Confirmed"
          caveat="There is no primary care or OB/GYN exemption from the 0.5 weight. A widely repeated claim to the contrary is wrong."
        />
        <Citation
          label="CRS IF13088"
          source="Congressional Research Service, Medicare Graduate Medical Education (2025). FY2023: total Medicare GME $21.2B, DGME $6.1B, IME $15.0B."
          year={2025}
          confidence="Confirmed"
        />
        <Citation
          label="GAO-21-391"
          source="GAO-21-391. Of 962 hospitals analyzed on 2018 cost reports, 70% were over at least one cap. Average Medicare GME per funded resident about $171,000, 5th to 95th percentile $68,000 to $279,000."
          year={2021}
          confidence="Confirmed"
          caveat="2018 data. GAO's own December 2025 report still uses it, which tells you no newer authoritative count exists."
        />
      </div>
    </section>
  )
}
