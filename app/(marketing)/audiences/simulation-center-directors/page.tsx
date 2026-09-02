import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("simulation-center-directors")!

export const metadata: Metadata = {
  title: "Simulation center directors: extend your SP program",
  description: "ClinicalSim adds repeatable voice-based practice between scheduled standardized patient encounters. Live assessment and coaching stay with people.",
  openGraph: {
    title: "Simulation center directors | ClinicalSim.ai",
    description: "Give learners more practice without adding another SP session, while standardized patients stay focused on live assessment and coaching.",
    url: "https://clinicalsim.ai/audiences/simulation-center-directors",
  },
  twitter: {
    title: "Simulation center directors | ClinicalSim.ai",
    description: "Add voice-based practice between SP encounters, with transcript evidence for faculty review.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/simulation-center-directors",
  },
}

export default function SimulationCenterDirectorsPage() {
  return <AudiencePageLayout audience={audience} />
}
