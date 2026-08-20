import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("program-directors")!

export const metadata: Metadata = {
  title: { absolute: "Program directors: a repeatable communication remediation structure" },
  description: "In a survey of 267 family medicine program directors, 93% reported at least one resident in remediation during the prior three years. ClinicalSim adds structured practice and transcript evidence.",
  openGraph: {
    title: "Program directors | ClinicalSim.ai",
    description: "Give a learner repeatable practice between coaching sessions and bring transcript evidence to your CCC.",
    url: "https://clinicalsim.ai/audiences/program-directors",
  },
  twitter: {
    title: "Program directors | ClinicalSim.ai",
    description: "Structured practice, milestone-aligned reports, and transcript evidence for communication remediation.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/program-directors",
  },
}

export default function ProgramDirectorsPage() {
  return <AudiencePageLayout audience={audience} />
}
