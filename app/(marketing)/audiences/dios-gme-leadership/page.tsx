import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("dios-gme-leadership")!

export const metadata: Metadata = {
  title: "For DIOs & GME Leadership: Standardized Remediation Infrastructure",
  description: "Standardize communication remediation across every program in your institution. ClinicalSim costs less than a single PACE assessment ($15K-$19K per referral) and generates accreditation-ready documentation for every learner.",
  openGraph: {
    title: "For DIOs & GME Leadership | ClinicalSim.ai",
    description: "Standardize remediation documentation across every program. Costs less than a single PACE assessment with accreditation-ready infrastructure.",
    url: "https://clinicalsim.ai/audiences/dios-gme-leadership",
  },
  twitter: {
    title: "For DIOs & GME Leadership | ClinicalSim.ai",
    description: "Standardize communication remediation across programs. Less than a single PACE referral, with documentation for accreditation.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/dios-gme-leadership",
  },
}

export default function DIOsGMELeadershipPage() {
  return <AudiencePageLayout audience={audience} />
}
