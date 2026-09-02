import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("program-directors")!

export const metadata: Metadata = {
  title: { absolute: "Program directors: a repeatable communication remediation structure" },
  description: "In a survey of 267 family medicine program directors, 93% reported at least one resident in remediation during the prior three years. ClinicalSim scores each conversation against the milestone language your CCC already uses and quotes the learner's own words under every score.",
  openGraph: {
    title: "Program directors | ClinicalSim.ai",
    description: "Give each learner a clear next step between coaching sessions, with milestone-aligned feedback and transcript evidence for CCC review.",
    url: "https://clinicalsim.ai/audiences/program-directors",
  },
  twitter: {
    title: "Program directors | ClinicalSim.ai",
    description: "Milestone-aligned scores, the learner's own words under each one, and targeted practice for communication remediation.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/program-directors",
  },
}

export default function ProgramDirectorsPage() {
  return <AudiencePageLayout audience={audience} />
}
