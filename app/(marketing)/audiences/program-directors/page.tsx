import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("program-directors")!

export const metadata: Metadata = {
  title: "For Program Directors: Communication Remediation Toolkit",
  description: "In a CERA survey, 93% of family medicine programs reported resident remediation and 50% wanted an accessible toolkit. ClinicalSim provides structured practice with milestone-aligned feedback and CCC-ready documentation.",
  openGraph: {
    title: "For Program Directors | ClinicalSim.ai",
    description: "The remediation toolkit you told CERA you wanted. Structured practice mapped to ACGME Milestones 2.0 with CCC-ready documentation.",
    url: "https://clinicalsim.ai/audiences/program-directors",
  },
  twitter: {
    title: "For Program Directors | ClinicalSim.ai",
    description: "93% of programs face remediation. ClinicalSim provides structured practice with milestone-aligned feedback your CCC can use.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/program-directors",
  },
}

export default function ProgramDirectorsPage() {
  return <AudiencePageLayout audience={audience} />
}
