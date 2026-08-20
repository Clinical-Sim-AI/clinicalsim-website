import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("clinical-competency-committees")!

export const metadata: Metadata = {
  title: { absolute: "Clinical competency committees: communication evidence for CCC review" },
  description: "ClinicalSim practice reports map observed behavior to relevant milestones and cite the learner's words for review alongside faculty observation and other CCC evidence.",
  openGraph: {
    title: "Clinical competency committees | ClinicalSim.ai",
    description: "Milestone-aligned practice reports with transcript evidence for review alongside a CCC's existing sources.",
    url: "https://clinicalsim.ai/audiences/clinical-competency-committees",
  },
  twitter: {
    title: "Clinical competency committees | ClinicalSim.ai",
    description: "Give your CCC another source of communication evidence without replacing faculty judgment.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/clinical-competency-committees",
  },
}

export default function ClinicalCompetencyCommitteesPage() {
  return <AudiencePageLayout audience={audience} />
}
