import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("risk-and-patient-safety")!

export const metadata: Metadata = {
  title: { absolute: "Risk and patient safety leaders: communication in malpractice claims" },
  description:
    "Give clinicians private practice in disclosure and other high-stakes safety conversations with AI patients. ClinicalSim does not monitor patient care or predict claims.",
  openGraph: {
    title: "Risk and patient safety leaders | ClinicalSim.ai",
    description:
      "Clinicians practice disclosure, goals of care, family meetings, and de-escalation with AI patients, then review strengths and areas for practice.",
    url: "https://clinicalsim.ai/audiences/risk-and-patient-safety",
  },
  twitter: {
    title: "Risk and patient safety leaders | ClinicalSim.ai",
    description:
      "ClinicalSim gives clinicians private simulated practice and gives leaders aggregate patterns under institution-defined access rules. It does not predict claims.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/risk-and-patient-safety",
  },
}

export default function RiskAndPatientSafetyPage() {
  return <AudiencePageLayout audience={audience} />
}
