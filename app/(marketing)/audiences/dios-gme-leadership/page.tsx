import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("dios-gme-leadership")!

export const metadata: Metadata = {
  title: { absolute: "DIOs and GME leadership: shared communication remediation standards" },
  description: "Give programs shared case standards, milestone-aligned reports, and longitudinal practice records while each program director and CCC keeps authority over the remediation plan.",
  openGraph: {
    title: "DIOs and GME leadership | ClinicalSim.ai",
    description: "Shared case standards and reviewable communication remediation records across GME programs.",
    url: "https://clinicalsim.ai/audiences/dios-gme-leadership",
  },
  twitter: {
    title: "DIOs and GME leadership | ClinicalSim.ai",
    description: "Give every program the same starting point for communication remediation.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/dios-gme-leadership",
  },
}

export default function DIOsGMELeadershipPage() {
  return <AudiencePageLayout audience={audience} />
}
