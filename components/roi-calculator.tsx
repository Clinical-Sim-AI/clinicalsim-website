"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function formatCurrency(n: number) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return "$" + Math.round(n).toLocaleString()
  return "$" + Math.round(n)
}

function formatNumber(n: number) {
  return Math.round(n).toLocaleString()
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  description,
  formatValue,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  prefix?: string
  suffix?: string
  description?: string
  formatValue?: (v: number) => string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-1">
        <label className="text-sm font-light text-cs-dark-blue/85">{label}</label>
        <span className="font-bold tracking-tight text-base text-cs-navy">
          {formatValue ? formatValue(value) : (
            <>
              {prefix}
              {typeof value === "number" ? value.toLocaleString() : value}
              {suffix}
            </>
          )}
        </span>
      </div>
      {description && (
        <p className="text-xs font-light text-cs-dark-gray mb-1.5">{description}</p>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--cs-electric) 0%, var(--cs-electric) ${pct}%, #E5E7EB ${pct}%, #E5E7EB 100%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-cs-dark-gray">
          {formatValue ? formatValue(min) : (
            <>
              {prefix}
              {min.toLocaleString()}
              {suffix}
            </>
          )}
        </span>
        <span className="text-xs text-cs-dark-gray">
          {formatValue ? formatValue(max) : (
            <>
              {prefix}
              {max.toLocaleString()}
              {suffix}
            </>
          )}
        </span>
      </div>
    </div>
  )
}

function StatCard({
  value,
  label,
  variant = "accent",
  source,
}: {
  value: string
  label: string
  variant?: "accent" | "navy" | "light-blue" | "blue"
  source?: string
}) {
  const styles = {
    accent: "bg-cs-cloud border-cs-electric/40 [&_.stat-value]:text-cs-dark-blue",
    navy: "bg-cs-cloud border-cs-navy/20 [&_.stat-value]:text-cs-navy",
    "light-blue": "bg-cs-cloud border-cs-light-blue/40 [&_.stat-value]:text-cs-dark-blue",
    blue: "bg-cs-cloud border-cs-dark-blue/20 [&_.stat-value]:text-cs-dark-blue",
  }
  return (
    <div className={cn("rounded-2xl p-5 text-center border", styles[variant])}>
      <div className="stat-value font-bold tracking-tight text-3xl leading-tight">
        {value}
      </div>
      <div className="font-normal text-sm text-cs-dark-blue/85 mt-1.5 leading-snug">
        {label}
      </div>
      {source && (
        <div className="font-light italic text-xs text-cs-dark-gray mt-1">
          {source}
        </div>
      )}
    </div>
  )
}

function ComparisonBar({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  savings,
}: {
  leftLabel: string
  leftValue: number
  rightLabel: string
  rightValue: number
  savings: number
}) {
  const maxVal = Math.max(leftValue, rightValue)
  const leftPct = maxVal > 0 ? (leftValue / maxVal) * 100 : 0
  const rightPct = maxVal > 0 ? (rightValue / maxVal) * 100 : 0

  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-cs-dark-blue/85">{leftLabel}</span>
        <span className="font-bold tracking-tight text-sm text-cs-dark-blue/85">
          {formatCurrency(leftValue)}/yr
        </span>
      </div>
      <div className="h-7 bg-gray-100 rounded-lg overflow-hidden">
        <div
          className="h-full bg-cs-dark-blue/40 rounded-lg transition-all duration-300"
          style={{ width: `${leftPct}%` }}
        />
      </div>

      <div className="flex justify-between mb-1 mt-3">
        <span className="text-sm text-cs-dark-blue/85">{rightLabel}</span>
        <span className="font-bold tracking-tight text-sm text-cs-light-blue">
          {formatCurrency(rightValue)}/yr
        </span>
      </div>
      <div className="h-7 bg-gray-100 rounded-lg overflow-hidden">
        <div
          className="h-full bg-cs-electric rounded-lg transition-all duration-300"
          style={{ width: `${rightPct}%` }}
        />
      </div>

      {savings > 0 && (
        <div className="mt-3 px-4 py-2.5 bg-cs-cloud rounded-xl border border-cs-light-blue/20 flex justify-between items-center">
          <span className="text-sm text-cs-dark-blue/85">Annual savings</span>
          <span className="font-bold tracking-tight text-xl text-cs-light-blue">
            {formatCurrency(savings)}
          </span>
        </div>
      )}
    </div>
  )
}

function ProgramDirectorView() {
  const [learners, setLearners] = useState(60)
  const [spEncounters, setSpEncounters] = useState(6)
  const [costPerEncounter, setCostPerEncounter] = useState(150)
  const [facultyHoursPerEncounter, setFacultyHoursPerEncounter] = useState(1)
  const [facultyHourlyRate, setFacultyHourlyRate] = useState(150)

  function getPublicPrice(n: number) {
    return n >= 10 ? 25 : 35
  }

  const showEnterprise = learners > 200
  const pricePerUser = getPublicPrice(learners)
  const currentSPCost = learners * spEncounters * costPerEncounter
  const facultyCost =
    learners * spEncounters * facultyHoursPerEncounter * facultyHourlyRate
  const totalCurrentCost = currentSPCost + facultyCost
  const clinicalSimAnnual = learners * pricePerUser * 12
  const savings = totalCurrentCost - clinicalSimAnnual
  const savingsPct =
    totalCurrentCost > 0
      ? Math.round((savings / totalCurrentCost) * 100)
      : 0

  const currentEncountersPerYear = spEncounters
  const estimatedAIEncountersPerYear = 120
  const practiceMultiplier =
    currentEncountersPerYear > 0
      ? Math.round(estimatedAIEncountersPerYear / currentEncountersPerYear)
      : 0

  const costPerCurrentEncounter =
    costPerEncounter + facultyHoursPerEncounter * facultyHourlyRate
  const costPerAIEncounter =
    (pricePerUser * 12) / estimatedAIEncountersPerYear

  return (
    <div>
      {/* Inputs */}
      <div className="bg-cs-cloud rounded-2xl p-6 mb-6 border border-cs-gray/50">
        <h3 className="text-lg font-light text-cs-navy mb-5">
          Your <span className="text-cs-dark-blue font-medium">program</span>
        </h3>
        <SliderInput
          label="Learners in program"
          value={learners}
          onChange={setLearners}
          min={1}
          max={300}
          description="Residents, fellows, or clinicians"
        />
        <SliderInput
          label="SP encounters per learner per year"
          value={spEncounters}
          onChange={setSpEncounters}
          min={1}
          max={20}
          description="Current standardized patient sessions"
        />
        <SliderInput
          label="Fully loaded cost per SP encounter"
          value={costPerEncounter}
          onChange={setCostPerEncounter}
          min={50}
          max={300}
          step={10}
          prefix="$"
          description="SP wage + training + overhead + facility (typical: $100-$200)"
        />
        <SliderInput
          label="Faculty assessment hours per encounter"
          value={facultyHoursPerEncounter}
          onChange={setFacultyHoursPerEncounter}
          min={0}
          max={3}
          step={0.5}
          suffix=" hrs"
          description="Time faculty spend observing and evaluating"
        />
        <SliderInput
          label="Faculty hourly rate"
          value={facultyHourlyRate}
          onChange={setFacultyHourlyRate}
          min={50}
          max={300}
          step={10}
          prefix="$"
          description="Loaded cost including benefits"
        />
      </div>

      {showEnterprise ? (
        <div>
          <div className="px-4 py-3.5 bg-cs-cloud rounded-xl border border-cs-gray flex justify-between items-center mb-5">
            <span className="text-sm text-cs-dark-blue/85">
              Your current annual SP cost
            </span>
            <span className="font-bold tracking-tight text-xl text-cs-dark-blue">
              {formatCurrency(totalCurrentCost)}/yr
            </span>
          </div>
          <div className="p-6 bg-cs-dark-blue rounded-2xl text-center mb-6">
            <p className="text-base font-light text-white mb-1">
              For programs with 200+ learners
            </p>
            <p className="text-sm font-light text-blue-300 mb-4">
              We&apos;ll build a custom ROI analysis with enterprise pricing for
              your organization.
            </p>
            <Link href="/contact">
              <Button variant="accent" size="lg">
                Request Enterprise Pricing
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-light text-cs-navy mb-4">
              Cost <span className="text-cs-dark-blue font-medium">comparison</span>
            </h3>
            <ComparisonBar
              leftLabel="Current SP program cost"
              leftValue={totalCurrentCost}
              rightLabel={`ClinicalSim.ai (${formatCurrency(pricePerUser)}/user/mo)`}
              rightValue={clinicalSimAnnual}
              savings={savings > 0 ? savings : 0}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <StatCard
              value={savingsPct > 0 ? `${savingsPct}%` : "\u2014"}
              label="Cost reduction"
              variant="light-blue"
            />
            <StatCard
              value={`${practiceMultiplier}x`}
              label="More practice volume"
              variant="accent"
              source="Est. 10 AI sessions/mo vs. current SP"
            />
            <StatCard
              value={formatCurrency(costPerCurrentEncounter)}
              label="Cost per SP encounter"
              variant="navy"
              source="Fully loaded + faculty"
            />
            <StatCard
              value={formatCurrency(costPerAIEncounter)}
              label="Cost per AI encounter"
              variant="light-blue"
              source="Based on est. usage"
            />
          </div>
        </div>
      )}

      {/* Framing note */}
      <div className="bg-cs-cloud rounded-xl p-4 border border-cs-dark-blue/10">
        <p className="text-sm font-light text-cs-dark-blue/85 leading-relaxed">
          ClinicalSim.ai extends your SP program — it doesn&apos;t replace it.
          SPs stay focused on high-stakes OSCEs and summative assessments.
          ClinicalSim gives learners the on-demand practice reps that are
          difficult to schedule with live SPs — no coordinator logistics, no
          actor availability bottlenecks — at a fraction of the cost per
          encounter.
        </p>
      </div>
    </div>
  )
}

function CMOView() {
  const [medicareRevenue, setMedicareRevenue] = useState(300000000)
  const [licensedBeds, setLicensedBeds] = useState(350)
  const [commClaimsPerYear, setCommClaimsPerYear] = useState(3)
  const [avgLOS, setAvgLOS] = useState(5.0)

  // Derived workforce estimates
  const avgClaimCost = 237600 // CRICO, 2025
  const estimatedRNs = Math.round(licensedBeds * 2.2)
  const estimatedPhysicians = Math.round(licensedBeds * 0.75)
  const totalClinicalWorkforce = estimatedRNs + estimatedPhysicians

  // Bucket 1: HCAHPS / VBP penalty exposure
  // 2% Medicare withhold × 25% HCAHPS domain weight
  const vbpExposure = medicareRevenue * 0.02 * 0.25

  // Bucket 2: Readmission penalties
  // Avg 0.43% penalty (CMS FY2024 actual data)
  const readmissionPenalty = medicareRevenue * 0.0043

  // Bucket 3: Malpractice risk (communication-related)
  const malpracticeExposure = commClaimsPerYear * avgClaimCost

  // Penalty subtotal
  const penaltySubtotal = vbpExposure + readmissionPenalty + malpracticeExposure

  // Bucket 4: Length-of-stay / throughput opportunity
  const costPerDay = 3100 // KFF, 2024
  const occupancyRate = 0.65 // national avg
  const losReductionDays = 0.5 // conservative estimate from communication interventions
  const annualDischarges = Math.round(
    (licensedBeds * occupancyRate * 365) / avgLOS
  )
  const throughputOpportunity = annualDischarges * losReductionDays * costPerDay

  // Total financial impact
  const totalExposure = penaltySubtotal + throughputOpportunity

  // Estimated ClinicalSim investment (20% of clinical workforce at $25-35/user/mo)
  const deploymentRate = 0.2
  const estimatedUsers = Math.round(totalClinicalWorkforce * deploymentRate)
  const investmentLow = estimatedUsers * 25 * 12
  const investmentHigh = estimatedUsers * 35 * 12
  const investmentMid = (investmentLow + investmentHigh) / 2
  const roiMultiple =
    investmentMid > 0 ? Math.round(totalExposure / investmentMid) : 0
  const paybackDays =
    totalExposure > 0
      ? Math.round((investmentMid / totalExposure) * 365)
      : 0

  // Turnover secondary benefit (not included in totals)
  const costPerRnDeparture = 61110
  const turnoverSavingsPerPoint = Math.round(estimatedRNs * 0.01 * costPerRnDeparture)

  const penaltyItems = [
    {
      label: "HCAHPS / VBP penalty exposure",
      value: vbpExposure,
      source: "2% Medicare withhold \u00d7 25% HCAHPS domain weight (CMS FY2025)",
    },
    {
      label: "Readmission penalties",
      value: readmissionPenalty,
      source: "Avg 0.43% penalty; 70%+ hospitals penalized (CMS FY2024)",
    },
    {
      label: "Malpractice risk (communication-related)",
      value: malpracticeExposure,
      source: `${commClaimsPerYear} claims \u00d7 $237,600/claim (CRICO, 2025)`,
    },
  ]

  return (
    <div>
      {/* Inputs */}
      <div className="bg-cs-cloud rounded-2xl p-6 mb-6 border border-cs-gray/50">
        <h3 className="text-lg font-light text-cs-navy mb-5">
          Your <span className="text-cs-dark-blue font-medium">organization</span>
        </h3>
        <SliderInput
          label="Annual Medicare inpatient revenue"
          value={medicareRevenue}
          onChange={setMedicareRevenue}
          min={10000000}
          max={800000000}
          step={5000000}
          prefix="$"
          description="Total Medicare IPPS revenue (check your cost report)"
          formatValue={(v) => formatCurrency(v)}
        />
        <SliderInput
          label="Licensed beds"
          value={licensedBeds}
          onChange={setLicensedBeds}
          min={50}
          max={1200}
          step={25}
          description="Used to estimate throughput impact and workforce size"
        />
        <SliderInput
          label="Communication-related malpractice claims per year"
          value={commClaimsPerYear}
          onChange={setCommClaimsPerYear}
          min={0}
          max={15}
          description="30% of all malpractice claims involve communication failure (CRICO)"
        />
        <SliderInput
          label="Average length of stay"
          value={avgLOS}
          onChange={setAvgLOS}
          min={3}
          max={8}
          step={0.1}
          suffix=" days"
          description="National average: 5.4 days (AHA, 2023)"
        />
      </div>

      {/* Financial Exposure */}
      <div className="mb-6">
        <h3 className="text-lg font-light text-cs-navy mb-4">
          Annual financial{" "}
          <span className="text-cs-dark-blue font-medium">impact</span>
        </h3>

        {/* Penalty buckets */}
        <div className="flex flex-col gap-2 mb-2">
          {penaltyItems.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-3 bg-white rounded-xl border border-cs-gray/50"
            >
              <div className="mr-4">
                <div className="text-sm text-cs-dark-blue/85">{item.label}</div>
                <div className="text-xs font-light italic text-cs-dark-gray">
                  {item.source}
                </div>
              </div>
              <div className="font-bold tracking-tight text-base text-cs-dark-blue whitespace-nowrap">
                {formatCurrency(item.value)}
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center px-4 py-3 bg-cs-cloud rounded-xl border border-cs-gray">
            <div className="text-sm font-medium text-cs-dark-blue">
              Penalty exposure subtotal
            </div>
            <div className="font-bold tracking-tight text-xl text-cs-dark-blue">
              {formatCurrency(penaltySubtotal)}
            </div>
          </div>
        </div>

        {/* Throughput opportunity */}
        <div className="flex flex-col gap-2 mb-2 mt-4">
          <div className="flex justify-between items-center px-4 py-3 bg-white rounded-xl border border-cs-gray/50">
            <div className="mr-4">
              <div className="text-sm text-cs-dark-blue/85">
                Length-of-stay / throughput opportunity
              </div>
              <div className="text-xs font-light italic text-cs-dark-gray">
                0.5-day LOS reduction \u00d7 {formatNumber(annualDischarges)}{" "}
                annual discharges \u00d7 $3,100/day (KFF, 2024)
              </div>
            </div>
            <div className="font-bold tracking-tight text-base text-cs-navy whitespace-nowrap">
              {formatCurrency(throughputOpportunity)}
            </div>
          </div>
        </div>

        {/* Total financial impact */}
        <div className="flex justify-between items-center px-4 py-3.5 bg-cs-cloud rounded-xl border border-cs-electric/20 mt-4">
          <div className="text-sm font-medium text-cs-dark-blue">
            Total annual financial impact
          </div>
          <div className="font-bold tracking-tight text-2xl text-cs-dark-blue">
            {formatCurrency(totalExposure)}
          </div>
        </div>
      </div>

      {/* Secondary turnover benefit */}
      <div className="px-4 py-3 bg-cs-cloud rounded-xl border border-cs-gray/50 mb-6">
        <div className="text-sm font-medium text-cs-dark-blue/85 mb-1">
          Additional workforce benefit
        </div>
        <div className="text-xs font-light text-cs-dark-blue/70 leading-relaxed">
          Communication training also reduces nursing turnover — each RN
          departure costs $61,110 (NSI, 2024). For a hospital your size
          (~{formatNumber(estimatedRNs)} RNs), even a 1-point reduction in
          turnover rate saves{" "}
          <span className="font-medium tracking-tight text-cs-navy">
            {formatCurrency(turnoverSavingsPerPoint)}
          </span>{" "}
          annually — not included in the totals above.
        </div>
      </div>

      {/* ROI & Break-even */}
      <div className="mb-6">
        <h3 className="text-lg font-light text-cs-navy mb-4">
          Return on{" "}
          <span className="text-cs-dark-blue font-medium">investment</span>
        </h3>

        {/* Estimated investment */}
        <div className="px-4 py-3.5 bg-cs-cloud rounded-xl border border-cs-dark-blue/10 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-cs-dark-blue/85">
                Estimated annual investment
              </div>
              <div className="text-xs font-light italic text-cs-dark-gray">
                ~{formatNumber(estimatedUsers)} users (20% of clinical
                workforce) at $25–35/user/mo
              </div>
            </div>
            <div className="font-bold tracking-tight text-base text-cs-navy whitespace-nowrap">
              {formatCurrency(investmentLow)} – {formatCurrency(investmentHigh)}
            </div>
          </div>
          <p className="text-xs font-light text-cs-dark-gray mt-2">
            Actual pricing is custom — contact us for a tailored quote.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatCard
            value={`${roiMultiple}x`}
            label="Potential return on investment"
            variant="accent"
            source="Total impact \u00f7 est. investment"
          />
          <StatCard
            value={`${paybackDays} days`}
            label="To break even on training investment"
            variant="light-blue"
            source="Based on estimated midpoint"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatCard
            value="< 1"
            label="Prevented malpractice claim pays for a year"
            variant="navy"
            source="1 claim = $237,600 (CRICO, 2025)"
          />
          <StatCard
            value="0.5 day"
            label="LOS reduction pays for itself many times over"
            variant="blue"
            source={`$3,100/day \u00d7 ${formatNumber(annualDischarges)} discharges`}
          />
        </div>

        <div className="px-4 py-3.5 bg-cs-cloud rounded-xl border border-cs-light-blue/20 text-center">
          <div className="text-sm font-light text-cs-dark-blue/85 mb-1">
            Your organization faces
          </div>
          <div className="font-bold tracking-tight text-3xl text-cs-dark-blue">
            {formatCurrency(totalExposure)}
          </div>
          <div className="text-sm font-light text-cs-dark-blue/85 mt-1">
            in annual communication-related financial impact
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 bg-cs-dark-blue rounded-2xl text-center mb-6">
        <p className="text-base font-light text-white mb-1">
          Let us build your custom ROI analysis
        </p>
        <p className="text-sm font-light text-blue-300 mb-4">
          We&apos;ll map ClinicalSim.ai pricing to your specific workforce and
          exposure profile.
        </p>
        <Link href="/contact">
          <Button variant="accent" size="lg">
            Request Enterprise Pricing
          </Button>
        </Link>
      </div>

      {/* Framing note */}
      <div className="bg-cs-cloud rounded-xl p-4 border border-cs-dark-blue/10">
        <p className="text-sm font-light text-cs-dark-blue/85 leading-relaxed">
          Communication failures drive 30% of malpractice claims (CRICO, 2025),
          contribute to 80% of sentinel events (Joint Commission, 2024), and
          directly impact HCAHPS &ldquo;Communication with Doctors/Nurses&rdquo;
          domains — worth 25% of your VBP Total Performance Score (CMS FY2025).
          Discharge communication interventions reduce readmissions by up to 31%
          (JAMA) and length of stay by 0.5+ days. Even modest improvement in
          communication competency compounds across every category above.
        </p>
      </div>
    </div>
  )
}

export function ROICalculator() {
  const [activeTab, setActiveTab] = useState<"program" | "cmo">("program")

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-2 leading-tight">
          ROI <span className="text-cs-dark-blue font-medium">Calculator</span>
        </h2>
        <p className="text-base font-light text-cs-dark-blue/85 leading-relaxed">
          See what communication training costs today — and what it could save
          tomorrow.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-7 bg-gray-100 rounded-xl p-1">
        {(
          [
            { key: "program", label: "Program / Sim Director" },
            { key: "cmo", label: "CMO / VP Quality" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex-1 px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
              activeTab === tab.key
                ? "bg-cs-dark-blue text-white font-medium shadow-md"
                : "text-cs-dark-blue/85 hover:text-cs-dark-blue font-normal"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "program" ? <ProgramDirectorView /> : <CMOView />}

      {/* Footer CTA — only on Program tab */}
      {activeTab === "program" && (
        <div className="mt-8 p-6 bg-cs-dark-blue rounded-2xl text-center">
          <p className="text-lg font-light text-white mb-1 leading-relaxed">
            Ready to see it in action?
          </p>
          <p className="text-sm font-light text-blue-300 mb-4">
            Request a pilot and we&apos;ll customize the experience for your
            program.
          </p>
          <Link href="/contact">
            <Button variant="accent" size="lg">
              Request a Pilot
            </Button>
          </Link>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs font-light italic text-cs-dark-gray text-center mt-4 leading-relaxed">
        Estimates based on published benchmarks. SP costs: $100–$200/encounter
        fully loaded. HCAHPS penalty data: CMS FY2025 VBP program.
        Readmission penalties: CMS FY2024 HRRP data. Malpractice data:
        CRICO/Candello CBS Report, 2025. Hospital cost per day: KFF State
        Health Facts, 2024. LOS national average: AHA, 2023. RN turnover:
        NSI Nursing Solutions, 2024. Sentinel events: Joint Commission, 2024.
        Enterprise investment estimates are illustrative — contact us for
        custom pricing. Your actual costs and savings may vary.
      </p>
    </div>
  )
}
