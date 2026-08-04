"use client"

import { ChevronRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DEFAULT_SOURCES,
  PEER_COMPARISON_LINE,
  remediationPrefillLabel,
} from "@/lib/roi/defaults"
import { formatCurrency, formatPercent } from "@/lib/roi/format"
import type { FundingSource, Inputs, RemediationBand } from "@/lib/roi/types"

const selectClass =
  "h-10 w-full rounded-md border border-cs-gray bg-white px-3 text-sm font-light text-cs-dark-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cs-dark-blue focus-visible:ring-offset-2"

function RangeField({
  id,
  label,
  help,
  source,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: {
  id: string
  label: string
  help?: string
  source: string
  min: number
  max: number
  step: number
  value: number
  display: string
  onChange: (value: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id} className="font-light">
          {label}
        </Label>
        <span className="text-sm font-medium text-cs-dark-blue">{display}</span>
      </div>
      {help && (
        <p className="mt-1 text-xs font-light leading-relaxed text-cs-dark-gray">
          {help}
        </p>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        // No aria-label here. The visible <Label htmlFor> above is the accessible
        // name, and an aria-label would override it, so a screen reader user and
        // a sighted user would be working from different wording.
        aria-valuetext={display}
        aria-describedby={`${id}-source`}
        onChange={(event) => onChange(Number(event.target.value))}
        className="roi-range mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cs-dark-blue focus-visible:ring-offset-2"
        style={{
          background: `linear-gradient(to right, var(--cs-dark-blue) 0%, var(--cs-dark-blue) ${pct}%, var(--cs-gray) ${pct}%, var(--cs-gray) 100%)`,
        }}
      />
      <p
        id={`${id}-source`}
        className="mt-1 text-xs font-light leading-relaxed text-cs-dark-gray"
      >
        {source}
      </p>
    </div>
  )
}

function Group({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <fieldset className="border-t border-cs-gray/50 pt-5">
      <legend className="pr-3 text-sm font-medium uppercase tracking-wider text-cs-dark-gray">
        {title}
      </legend>
      <div className="mt-3 space-y-5">{children}</div>
    </fieldset>
  )
}

const REMEDIATION_OPTIONS: { value: RemediationBand; label: string }[] = [
  { value: "not_sure", label: "I'm not sure" },
  { value: "0", label: "0" },
  { value: "1-2", label: "1 to 2" },
  { value: "3-5", label: "3 to 5" },
  { value: "6-10", label: "6 to 10" },
  { value: "more_than_10", label: "More than 10" },
]

const FUNDING_OPTIONS: { value: FundingSource | ""; label: string }[] = [
  { value: "", label: "Tell us how this is funded" },
  { value: "medicare_under_cap", label: "Medicare teaching hospital, under cap" },
  { value: "medicare_over_cap", label: "Medicare teaching hospital, over cap" },
  { value: "chgme", label: "CHGME (children's hospital)" },
  { value: "other", label: "Other (Medicaid, VA, THCGME, state)" },
]

export function RefinePanel({
  inputs,
  onChange,
  facultyHourly,
}: {
  inputs: Inputs
  onChange: (patch: Partial<Inputs>) => void
  /**
   * `result.facultyHourly.point`, the figure the model actually prices hours at.
   *
   * This used to re-read the specialty table here, which quietly disagreed with
   * the model: `resolveFacultyHourly` rescales the table figure onto the user's
   * own fringe rate, so moving the fringe slider to 30% left this panel showing
   * $121 while every dollar on the page came off $129, and the methodology
   * drawer showed the $129. Two answers to "value of one faculty hour" on one
   * page is worse than either answer being wrong.
   */
  facultyHourly: number
}) {
  return (
    <details className="group rounded-xl border border-cs-gray/60 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 md:px-6">
        <span className="text-base font-medium text-cs-dark-blue">
          Refine these numbers
        </span>
        <ChevronRight
          className="h-5 w-5 flex-shrink-0 text-cs-gray transition-transform group-open:rotate-90"
          aria-hidden="true"
        />
      </summary>

      <div className="space-y-6 px-5 pb-6 md:px-6">
        {/* ---------------------------------------------------------------- */}
        <Group title="Assessment">
          <RangeField
            id="roi-assessment-hours"
            label="Faculty hours per trainee per year on assessment"
            display={`${inputs.assessmentHoursPerTrainee.toFixed(1)} hrs`}
            source={DEFAULT_SOURCES.assessmentHoursPerTrainee}
            min={1}
            max={15}
            step={0.1}
            value={inputs.assessmentHoursPerTrainee}
            onChange={(value) => onChange({ assessmentHoursPerTrainee: value })}
          />
          <RangeField
            id="roi-subcompetency-share"
            label="Share of subcompetencies that are ICS and professionalism"
            display={formatPercent(inputs.subcompetencyShare)}
            source={DEFAULT_SOURCES.subcompetencyShare}
            min={0.05}
            max={0.6}
            step={0.01}
            value={inputs.subcompetencyShare}
            onChange={(value) => onChange({ subcompetencyShare: value })}
          />
          <RangeField
            id="roi-depth"
            label="Depth of substitution"
            display={formatPercent(inputs.depthOfSubstitution)}
            source={DEFAULT_SOURCES.depthOfSubstitution}
            min={0.1}
            max={0.7}
            step={0.01}
            value={inputs.depthOfSubstitution}
            onChange={(value) => onChange({ depthOfSubstitution: value })}
          />
        </Group>

        {/* ---------------------------------------------------------------- */}
        <Group title="Remediation">
          {/* The peer figure sits above the field, not below it, so answering
              is a peer comparison rather than an admission. */}
          <p className="rounded-md bg-cs-cloud px-4 py-3 text-sm font-light leading-relaxed text-cs-dark-blue/85">
            {PEER_COMPARISON_LINE}
          </p>

          <div>
            <Label htmlFor="roi-cases" className="font-light">
              Remediation cases handled last year
            </Label>
            <select
              id="roi-cases"
              className={`mt-1.5 ${selectClass}`}
              value={inputs.remediationCases}
              onChange={(event) =>
                onChange({
                  remediationCases: event.target.value as RemediationBand,
                })
              }
            >
              {REMEDIATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="roi-expected" className="font-light">
              Cases you expect this year
            </Label>
            <select
              id="roi-expected"
              className={`mt-1.5 ${selectClass}`}
              value={inputs.remediationExpected}
              onChange={(event) =>
                onChange({
                  remediationExpected: event.target.value as RemediationBand,
                })
              }
            >
              {REMEDIATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs font-light leading-relaxed text-cs-dark-gray">
              Leave both on &quot;I&apos;m not sure&quot; and we use{" "}
              {remediationPrefillLabel(inputs.specialty, inputs.trainees)}.{" "}
              {DEFAULT_SOURCES.remediationCases}
            </p>
          </div>

          <RangeField
            id="roi-comm-share"
            label="Share that were communication or professionalism"
            display={formatPercent(inputs.commShare)}
            source={DEFAULT_SOURCES.commShare}
            min={0.1}
            max={0.8}
            step={0.01}
            value={inputs.commShare}
            onChange={(value) => onChange({ commShare: value })}
          />
          <RangeField
            id="roi-hours-per-case"
            label="Faculty hours per remediation case"
            display={`${inputs.hoursPerCase} hrs`}
            source={DEFAULT_SOURCES.hoursPerCase}
            min={5}
            max={100}
            step={1}
            value={inputs.hoursPerCase}
            onChange={(value) => onChange({ hoursPerCase: value })}
          />
          <RangeField
            id="roi-displacement"
            label="Share of those hours the platform absorbs"
            display={formatPercent(inputs.displacementFraction)}
            source={DEFAULT_SOURCES.displacementFraction}
            min={0.1}
            max={0.8}
            step={0.01}
            value={inputs.displacementFraction}
            onChange={(value) => onChange({ displacementFraction: value })}
          />
        </Group>

        {/* ---------------------------------------------------------------- */}
        <Group title="Faculty time">
          <div>
            <Label htmlFor="roi-hourly" className="font-light">
              Value of one faculty hour
            </Label>
            <Input
              id="roi-hourly"
              type="number"
              inputMode="numeric"
              min={0}
              step={1}
              className="mt-1.5 font-light"
              value={inputs.facultyHourlyOverride ?? Math.round(facultyHourly)}
              onChange={(event) =>
                onChange({
                  facultyHourlyOverride: Math.max(0, Number(event.target.value)),
                })
              }
            />
            <p className="mt-1.5 text-xs font-light leading-relaxed text-cs-dark-gray">
              Default is {formatCurrency(facultyHourly)} an hour at your fringe
              rate. {DEFAULT_SOURCES.facultyHourly}
              {inputs.facultyHourlyOverride !== null && (
                <>
                  {" "}
                  <button
                    type="button"
                    className="text-cs-dark-blue underline underline-offset-2"
                    onClick={() => onChange({ facultyHourlyOverride: null })}
                  >
                    Reset to the specialty figure
                  </button>
                </>
              )}
            </p>
          </div>

          <RangeField
            id="roi-fringe"
            label="Fringe and benefits rate"
            display={formatPercent(inputs.fringeRate, 1)}
            source={DEFAULT_SOURCES.fringeRate}
            min={0.1}
            max={0.4}
            step={0.005}
            value={inputs.fringeRate}
            onChange={(value) => onChange({ fringeRate: value })}
          />

          <div>
            <span id="roi-basis-label" className="text-sm font-light text-cs-dark-blue">
              Which hours are we freeing?
            </span>
            {/* A radiogroup, not a tablist. `role="tab"` promises a tabpanel
                these buttons do not control, and a screen reader announces
                "tab, 1 of 2" for what is a two-way choice between two values of
                one field. */}
            <div
              role="radiogroup"
              aria-labelledby="roi-basis-label"
              className="mt-2 flex gap-1 rounded-xl bg-cs-cloud p-1"
            >
              {(
                [
                  { id: "total", label: "Teaching and administrative time" },
                  { id: "clinical", label: "Displaced clinical time" },
                ] as const
              ).map((option) => {
                const selected = inputs.hourlyBasis === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      onChange({
                        hourlyBasis: option.id,
                        facultyHourlyOverride: null,
                      })
                    }
                    className={`flex-1 rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cs-dark-blue ${
                      selected
                        ? "bg-cs-dark-blue font-medium text-white"
                        : "font-light text-cs-dark-blue/70 hover:text-cs-dark-blue"
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-xs font-light leading-relaxed text-cs-dark-gray">
              The 1,456-hour clinical denominator already excludes 360 hours of
              teaching and administrative time, so applying it to hours that
              come out of that bucket double counts. A CFO will catch it. Use it
              only when faculty are pulled off a billable clinical assignment.
            </p>
          </div>
        </Group>

        {/* ---------------------------------------------------------------- */}
        {inputs.lens === "dio" && (
          <Group title="Funding">
            <div>
              <Label htmlFor="roi-funding" className="font-light">
                GME funding source
              </Label>
              <select
                id="roi-funding"
                className={`mt-1.5 ${selectClass}`}
                value={inputs.fundingSource ?? ""}
                onChange={(event) =>
                  onChange({
                    fundingSource:
                      event.target.value === ""
                        ? null
                        : (event.target.value as FundingSource),
                  })
                }
              >
                {FUNDING_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="roi-dgme" className="font-light">
                Your DGME payment per FTE
              </Label>
              <Input
                id="roi-dgme"
                type="number"
                inputMode="numeric"
                min={0}
                step={1000}
                placeholder="52392"
                className="mt-1.5 font-light"
                value={inputs.dgmePerFte ?? ""}
                onChange={(event) =>
                  onChange({
                    dgmePerFte:
                      event.target.value === ""
                        ? null
                        : Math.max(0, Number(event.target.value)),
                  })
                }
              />
              <p className="mt-1.5 text-xs font-light leading-relaxed text-cs-dark-gray">
                {DEFAULT_SOURCES.dgmePerFte}
              </p>
            </div>
          </Group>
        )}
      </div>
    </details>
  )
}
