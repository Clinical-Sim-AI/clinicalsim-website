import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("clinical-competency-committees")!

export const metadata: Metadata = {
  title: "For Clinical Competency Committees: Milestone-Aligned Assessment Data",
  description: "1 in 5 GME stakeholders don't know how to assess ICS milestones. ClinicalSim generates objective, milestone-aligned communication data from every practice session — longitudinal tracking and CCC-ready reports for confident progression decisions.",
  openGraph: {
    title: "For Clinical Competency Committees | ClinicalSim.ai",
    description: "Objective ICS milestone data from every practice session. Longitudinal tracking and CCC-ready reports for learner reviews.",
    url: "https://clinicalsim.ai/audiences/clinical-competency-committees",
  },
  twitter: {
    title: "For Clinical Competency Committees | ClinicalSim.ai",
    description: "Milestone-aligned assessment data from every practice session. Longitudinal tracking for confident progression decisions.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/clinical-competency-committees",
  },
}

export default function ClinicalCompetencyCommitteesPage() {
  return <AudiencePageLayout audience={audience} />
}
