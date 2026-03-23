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
        <label className="text-sm font-light text-gray-700">{label}</label>
        <span className="font-mono font-bold text-base text-navy">
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
        <p className="text-xs font-light text-gray-500 mb-1.5">{description}</p>
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
          background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${pct}%, #E5E7EB ${pct}%, #E5E7EB 100%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">
          {formatValue ? formatValue(min) : (
            <>
              {prefix}
              {min.toLocaleString()}
              {suffix}
            </>
          )}
        </span>
        <span className="text-xs text-gray-500">
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
  variant = "warm",
  source,
}: {
  value: string
  label: string
  variant?: "warm" | "navy" | "success" | "blue"
  source?: string
}) {
  const styles = {
    warm: "bg-gradient-to-br from-orange-50 to-amber-50 border-warm/10 [&_.stat-value]:text-warm",
    navy: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-600/10 [&_.stat-value]:text-navy",
    success: "bg-gradient-to-br from-emerald-50 to-green-100 border-success/10 [&_.stat-value]:text-success",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-600/10 [&_.stat-value]:text-blue-600",
  }
  return (
    <div className={cn("rounded-2xl p-5 text-center border", styles[variant])}>
      <div className="stat-value font-mono font-bold text-3xl leading-tight">
        {value}
      </div>
      <div className="font-normal text-sm text-gray-700 mt-1.5 leading-snug">
        {label}
      </div>
      {source && (
        <div className="font-light italic text-xs text-gray-500 mt-1">
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
        <span className="text-sm text-gray-700">{leftLabel}</span>
        <span className="font-mono font-bold text-sm text-gray-700">
          {formatCurrency(leftValue)}/yr
        </span>
      </div>
      <div className="h-7 bg-gray-100 rounded-lg overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-lg transition-all duration-300"
          style={{ width: `${leftPct}%` }}
        />
      </div>

      <div className="flex justify-between mb-1 mt-3">
        <span className="text-sm text-gray-700">{rightLabel}</span>
        <span className="font-mono font-bold text-sm text-success">
          {formatCurrency(rightValue)}/yr
        </span>
      </div>
      <div className="h-7 bg-gray-100 rounded-lg overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg transition-all duration-300"
          style={{ width: `${rightPct}%` }}
        />
      </div>

      {savings > 0 && (
        <div className="mt-3 px-4 py-2.5 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-success/20 flex justify-between items-center">
          <span className="text-sm text-gray-700">Annual savings</span>
          <span className="font-mono font-bold text-xl text-success">
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
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 mb-6 border border-gray-200">
        <h3 className="text-lg font-light text-navy mb-5">
          Your <span className="text-warm font-medium">program</span>
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
          <div className="px-4 py-3.5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 flex justify-between items-center mb-5">
            <span className="text-sm text-gray-700">
              Your current annual SP cost
            </span>
            <span className="font-mono font-bold text-xl text-red-600">
              {formatCurrency(totalCurrentCost)}/yr
            </span>
          </div>
          <div className="p-6 bg-gradient-to-br from-navy via-blue-800 to-indigo-900 rounded-2xl text-center mb-6">
            <p className="text-base font-light text-white mb-1">
              For programs with 200+ learners
            </p>
            <p className="text-sm font-light text-blue-300 mb-4">
              We&apos;ll build a custom ROI analysis with enterprise pricing for
              your organization.
            </p>
            <Link href="/contact">
              <Button variant="warm-filled" size="lg">
                Request Enterprise Pricing
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-light text-navy mb-4">
              Cost <span className="text-warm font-medium">comparison</span>
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
              variant="success"
            />
            <StatCard
              value={`${practiceMultiplier}x`}
              label="More practice volume"
              variant="warm"
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
              variant="success"
              source="Based on est. usage"
            />
          </div>
        </div>
      )}

      {/* Framing note */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-600/10">
        <p className="text-sm font-light text-gray-700 leading-relaxed">
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
  const [rnCount, setRnCount] = useState(800)
  const [rnTurnoverRate, setRnTurnoverRate] = useState(16)
  const [physicianCount, setPhysicianCount] = useState(300)
  const [physicianTurnoverRate, setPhysicianTurnoverRate] = useState(6)
  const [commClaimsPerYear, setCommClaimsPerYear] = useState(3)
  const [avgClaimCost, setAvgClaimCost] = useState(238000)
  const [sentinelEvents, setSentinelEvents] = useState(2)

  const vbpExposure = medicareRevenue * 0.02 * 0.14
  const readmissionPenalty = medicareRevenue * 0.003
  const malpracticeExposure = commClaimsPerYear * avgClaimCost
  const costPerRnDeparture = 61110
  const rnTurnoverCost =
    rnCount * (rnTurnoverRate / 100) * costPerRnDeparture
  const costPerPhysicianDeparture = 500000
  const physicianTurnoverCost =
    physicianCount * (physicianTurnoverRate / 100) * costPerPhysicianDeparture
  const totalExposure =
    vbpExposure +
    readmissionPenalty +
    malpracticeExposure +
    rnTurnoverCost +
    physicianTurnoverCost

  // Estimated ClinicalSim investment (20% of clinical workforce at $30/user/mo)
  const totalWorkforce = rnCount + physicianCount
  const deploymentRate = 0.2
  const estimatedUsers = Math.round(totalWorkforce * deploymentRate)
  const investmentLow = estimatedUsers * 25 * 12
  const investmentHigh = estimatedUsers * 35 * 12
  const investmentMid = (investmentLow + investmentHigh) / 2
  const roiMultiple =
    investmentMid > 0 ? Math.round(totalExposure / investmentMid) : 0
  const paybackDays =
    totalExposure > 0
      ? Math.round((investmentMid / totalExposure) * 365)
      : 0

  const exposureItems = [
    {
      label: "HCAHPS / VBP penalty exposure",
      value: vbpExposure,
      source: "2% Medicare withhold \u00d7 14% HCAHPS weight (CMS FY2025)",
    },
    {
      label: "Readmission penalties",
      value: readmissionPenalty,
      source: "Avg 0.3% of Medicare revenue",
    },
    {
      label: "Malpractice risk (communication-related)",
      value: malpracticeExposure,
      source: `${commClaimsPerYear} claims \u00d7 ${formatCurrency(avgClaimCost)}/claim`,
    },
    {
      label: "RN turnover cost",
      value: rnTurnoverCost,
      source: `${formatNumber(Math.round(rnCount * rnTurnoverRate / 100))} departures \u00d7 $61,110 each (NSI, 2024)`,
    },
    {
      label: "Physician turnover cost",
      value: physicianTurnoverCost,
      source: `${formatNumber(Math.round(physicianCount * physicianTurnoverRate / 100))} departures \u00d7 $500K each (AMA, 2022)`,
    },
  ]

  return (
    <div>
      {/* Inputs */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 mb-6 border border-gray-200">
        <h3 className="text-lg font-light text-navy mb-5">
          Your <span className="text-warm font-medium">organization</span>
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
          label="Registered nurses"
          value={rnCount}
          onChange={setRnCount}
          min={100}
          max={5000}
          step={50}
        />
        <SliderInput
          label="RN turnover rate"
          value={rnTurnoverRate}
          onChange={setRnTurnoverRate}
          min={5}
          max={30}
          suffix="%"
          description="National avg: 16.4% (NSI, 2024)"
        />
        <SliderInput
          label="Physicians"
          value={physicianCount}
          onChange={setPhysicianCount}
          min={50}
          max={2000}
          step={25}
          description="Attending physicians and specialists"
        />
        <SliderInput
          label="Physician turnover rate"
          value={physicianTurnoverRate}
          onChange={setPhysicianTurnoverRate}
          min={2}
          max={15}
          suffix="%"
          description="National avg: 6.8% (AAMC)"
        />
        <SliderInput
          label="Communication-related malpractice claims per year"
          value={commClaimsPerYear}
          onChange={setCommClaimsPerYear}
          min={0}
          max={15}
          description="30-40% of all malpractice claims involve communication failure (CRICO)"
        />
        <SliderInput
          label="Average cost per claim"
          value={avgClaimCost}
          onChange={setAvgClaimCost}
          min={100000}
          max={500000}
          step={10000}
          prefix="$"
          description="National avg for communication-related claims: ~$238K (CRICO)"
        />
        <SliderInput
          label="Sentinel events per year"
          value={sentinelEvents}
          onChange={setSentinelEvents}
          min={0}
          max={10}
          description="80% involve communication failures (Joint Commission, 2024)"
        />
      </div>

      {/* Financial Exposure */}
      <div className="mb-6">
        <h3 className="text-lg font-light text-navy mb-4">
          Annual financial{" "}
          <span className="text-warm font-medium">exposure</span>
        </h3>
        <div className="flex flex-col gap-2 mb-4">
          {exposureItems.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-3 bg-white rounded-xl border border-gray-200"
            >
              <div className="mr-4">
                <div className="text-sm text-gray-700">{item.label}</div>
                <div className="text-xs font-light italic text-gray-500">
                  {item.source}
                </div>
              </div>
              <div className="font-mono font-bold text-base text-red-500 whitespace-nowrap">
                {formatCurrency(item.value)}
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center px-4 py-3.5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
            <div className="text-sm font-medium text-gray-900">
              Total annual exposure
            </div>
            <div className="font-mono font-bold text-2xl text-red-600">
              {formatCurrency(totalExposure)}
            </div>
          </div>
        </div>
      </div>

      {/* ROI & Break-even */}
      <div className="mb-6">
        <h3 className="text-lg font-light text-navy mb-4">
          Return on{" "}
          <span className="text-warm font-medium">investment</span>
        </h3>

        {/* Estimated investment */}
        <div className="px-4 py-3.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-600/10 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-700">
                Estimated annual investment
              </div>
              <div className="text-xs font-light italic text-gray-500">
                ~{formatNumber(estimatedUsers)} users (20% of workforce) at $25–35/user/mo
              </div>
            </div>
            <div className="font-mono font-bold text-base text-navy whitespace-nowrap">
              {formatCurrency(investmentLow)} – {formatCurrency(investmentHigh)}
            </div>
          </div>
          <p className="text-xs font-light text-gray-500 mt-2">
            Actual pricing is custom — contact us for a tailored quote.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatCard
            value={`${roiMultiple}x`}
            label="Potential return on investment"
            variant="warm"
            source="Total exposure ÷ est. investment"
          />
          <StatCard
            value={`${paybackDays} days`}
            label="To break even on training investment"
            variant="success"
            source="Based on estimated midpoint"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatCard
            value="< 1"
            label="Prevented malpractice claim pays for a year"
            variant="navy"
            source={`1 claim = ${formatCurrency(avgClaimCost)}`}
          />
          <StatCard
            value="< 1"
            label="Prevented physician departure pays for a year"
            variant="blue"
            source="$500K per physician (AMA, 2022)"
          />
        </div>

        {/* Sentinel events callout */}
        {sentinelEvents > 0 && (
          <div className="px-4 py-3.5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-warm/15 mb-4">
            <div className="flex items-start gap-3">
              <div className="font-mono font-bold text-2xl text-warm leading-none mt-0.5">
                {sentinelEvents}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Sentinel events per year
                </div>
                <div className="text-xs font-light text-gray-600 mt-0.5">
                  80% of sentinel events involve communication failures (Joint Commission, 2024). Each carries regulatory, reputational, and legal costs beyond malpractice exposure.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-3.5 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-success/20 text-center">
          <div className="text-sm font-light text-gray-700 mb-1">
            Your organization faces
          </div>
          <div className="font-mono font-bold text-3xl text-warm">
            {formatCurrency(totalExposure)}
          </div>
          <div className="text-sm font-light text-gray-700 mt-1">
            in annual communication-related financial exposure
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 bg-gradient-to-br from-navy via-blue-800 to-indigo-900 rounded-2xl text-center mb-6">
        <p className="text-base font-light text-white mb-1">
          Let us build your custom ROI analysis
        </p>
        <p className="text-sm font-light text-blue-300 mb-4">
          We&apos;ll map ClinicalSim.ai pricing to your specific workforce and
          exposure profile.
        </p>
        <Link href="/contact">
          <Button variant="warm-filled" size="lg">
            Request Enterprise Pricing
          </Button>
        </Link>
      </div>

      {/* Framing note */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-600/10">
        <p className="text-sm font-light text-gray-700 leading-relaxed">
          Communication failures drive 30–40% of malpractice claims
          (CRICO/Candello, 2025) and directly impact HCAHPS
          &ldquo;Communication with Doctors/Nurses&rdquo; domains — worth 14%
          of your VBP Total Performance Score (CMS FY2025). Even modest
          improvement in communication competency across your clinical
          workforce can prevent claims, reduce readmissions, and improve
          retention.
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
        <h2 className="text-3xl md:text-4xl font-light text-navy mb-2 leading-tight">
          ROI <span className="text-warm font-medium">Calculator</span>
        </h2>
        <p className="text-base font-light text-gray-700 leading-relaxed">
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
                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-medium shadow-md"
                : "text-gray-700 hover:text-gray-900 font-normal"
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
        <div className="mt-8 p-6 bg-gradient-to-br from-navy via-blue-800 to-indigo-900 rounded-2xl text-center">
          <p className="text-lg font-light text-white mb-1 leading-relaxed">
            Ready to see it in action?
          </p>
          <p className="text-sm font-light text-blue-300 mb-4">
            Request a pilot and we&apos;ll customize the experience for your
            program.
          </p>
          <Link href="/contact">
            <Button variant="warm-filled" size="lg">
              Request a Pilot
            </Button>
          </Link>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs font-light italic text-gray-500 text-center mt-4 leading-relaxed">
        Estimates based on published benchmarks. SP costs: $100–$200/encounter
        fully loaded. HCAHPS penalty data: CMS FY2025 VBP program.
        Malpractice data: CRICO/Candello CBS Report. RN turnover: NSI Nursing
        Solutions, 2024. Physician turnover: AMA/Mayo Clinic Proceedings,
        2022. Sentinel events: Joint Commission, 2024. Enterprise investment
        estimates are illustrative — contact us for custom pricing. Your
        actual costs and savings may vary.
      </p>
    </div>
  )
}
