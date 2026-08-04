import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("quality-and-patient-experience")!

export const metadata: Metadata = {
  title: "For Quality & Patient Experience Leaders: HCAHPS Communication",
  description:
    "Patient experience is 25% of the Medicare value-based purchasing score, and five of the eight HCAHPS measures Medicare pays on are communication measures, about 15.6% of the total (CMS FY2026 IPPS). ClinicalSim gives clinicians voice-based practice on those conversations, with a rubric-scored record of every session.",
  openGraph: {
    title: "For Quality & Patient Experience Leaders | ClinicalSim.ai",
    description:
      "Five of the eight HCAHPS measures Medicare pays on are communication measures. Doctor communication is also the domain that has moved least since 2007.",
    url: "https://clinicalsim.ai/audiences/quality-and-patient-experience",
  },
  twitter: {
    title: "For Quality & Patient Experience Leaders | ClinicalSim.ai",
    description:
      "Teach-back cut heart failure readmissions with an odds ratio of 0.40. Give clinicians reps on the measures Medicare pays for.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/quality-and-patient-experience",
  },
}

export default function QualityAndPatientExperiencePage() {
  return <AudiencePageLayout audience={audience} />
}
