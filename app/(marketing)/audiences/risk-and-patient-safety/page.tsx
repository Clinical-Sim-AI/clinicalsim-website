import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("risk-and-patient-safety")!

export const metadata: Metadata = {
  title: "For Risk & Patient Safety Leaders: Communication Claim Exposure",
  description:
    "Communication failure is a factor in 40% of malpractice cases, up from 30% a decade ago (Candello 2025), with average indemnity of $386,000 to $944,000 before defense costs (CRICO 2015). ClinicalSim gives clinicians voice-based practice on those conversations, with a timestamped record of every session.",
  openGraph: {
    title: "For Risk & Patient Safety Leaders | ClinicalSim.ai",
    description:
      "40% of malpractice cases involve a communication failure. Practice the conversations claims start in, with a per-clinician record a carrier review can use.",
    url: "https://clinicalsim.ai/audiences/risk-and-patient-safety",
  },
  twitter: {
    title: "For Risk & Patient Safety Leaders | ClinicalSim.ai",
    description:
      "Average indemnity on a communication-failure case runs $386,000 to $944,000 before defense costs (CRICO 2015). That behavior is trainable.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/risk-and-patient-safety",
  },
}

export default function RiskAndPatientSafetyPage() {
  return <AudiencePageLayout audience={audience} />
}
