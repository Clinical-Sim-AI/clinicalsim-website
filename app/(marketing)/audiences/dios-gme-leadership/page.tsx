import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("dios-gme-leadership")!

export const metadata: Metadata = {
  title: "For DIOs & GME Leadership: Standardized Remediation Infrastructure",
  description: "Standardize communication remediation across every program with milestone-aligned assessment records and longitudinal progress tracking for every learner.",
  openGraph: {
    title: "For DIOs & GME Leadership | ClinicalSim.ai",
    description: "Standardize communication remediation and documentation across every program, with milestone-aligned records from each practice session.",
    url: "https://clinicalsim.ai/audiences/dios-gme-leadership",
  },
  twitter: {
    title: "For DIOs & GME Leadership | ClinicalSim.ai",
    description: "Standardize communication remediation across programs with milestone-aligned documentation and longitudinal progress tracking.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/dios-gme-leadership",
  },
}

export default function DIOsGMELeadershipPage() {
  return <AudiencePageLayout audience={audience} />
}
