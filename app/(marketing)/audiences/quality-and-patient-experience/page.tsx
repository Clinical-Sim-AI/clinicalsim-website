import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("quality-and-patient-experience")!

export const metadata: Metadata = {
  title: { absolute: "Patient experience communication training for health systems" },
  description:
    "Start with one unit and one service standard. Staff practice with AI patients, and leaders review named cohorts or anonymous unit results with transcript evidence behind each score.",
  openGraph: {
    title: "Quality and patient experience leaders | ClinicalSim.ai",
    description:
      "Staff practice against the service standards the institution already uses. ClinicalSim provides named cohort or anonymous unit reports and does not predict patient outcomes.",
    url: "https://clinicalsim.ai/audiences/quality-and-patient-experience",
  },
  twitter: {
    title: "Quality and patient experience leaders | ClinicalSim.ai",
    description:
      "Practice listening, explanation, teach back, and service behaviors with transcript evidence behind each score.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/quality-and-patient-experience",
  },
}

export default function QualityAndPatientExperiencePage() {
  return <AudiencePageLayout audience={audience} />
}
