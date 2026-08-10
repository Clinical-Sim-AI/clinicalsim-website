import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("quality-and-patient-experience")!

export const metadata: Metadata = {
  title: "Quality and patient experience leaders: HCAHPS communication",
  description:
    "Patient experience is 25% of the Medicare value-based purchasing score, and five of the eight HCAHPS measures Medicare pays on are communication measures, about 15.6% of the total (CMS FY2026 IPPS). ClinicalSim gives clinicians voice-based practice on those conversations, with a rubric-scored record of every session.",
  openGraph: {
    title: "Quality and patient experience leaders | ClinicalSim.ai",
    description:
      "Five of the eight HCAHPS measures tied to payment assess communication. ClinicalSim provides voice-based practice and does not predict HCAHPS outcomes.",
    url: "https://clinicalsim.ai/audiences/quality-and-patient-experience",
  },
  twitter: {
    title: "Quality and patient experience leaders | ClinicalSim.ai",
    description:
      "Practice teach-back, discharge, diagnosis, and family conversations with a rubric-scored record from each simulated encounter.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/quality-and-patient-experience",
  },
}

export default function QualityAndPatientExperiencePage() {
  return <AudiencePageLayout audience={audience} />
}
