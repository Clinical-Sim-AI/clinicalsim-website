import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("risk-and-patient-safety")!

export const metadata: Metadata = {
  title: { absolute: "Risk and patient safety leaders: communication in malpractice claims" },
  description:
    "Candello found communication factors in 40% of asserted malpractice cases from 2014 through 2024. ClinicalSim provides voice-based practice records and has not been studied against claims.",
  openGraph: {
    title: "Risk and patient safety leaders | ClinicalSim.ai",
    description:
      "Practice diagnosis disclosure, goals of care, family meetings, and de-escalation, with a timestamped record of each simulated encounter.",
    url: "https://clinicalsim.ai/audiences/risk-and-patient-safety",
  },
  twitter: {
    title: "Risk and patient safety leaders | ClinicalSim.ai",
    description:
      "ClinicalSim does not predict malpractice risk or claim outcomes. It provides simulated practice records for a risk reduction program to review.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/risk-and-patient-safety",
  },
}

export default function RiskAndPatientSafetyPage() {
  return <AudiencePageLayout audience={audience} />
}
