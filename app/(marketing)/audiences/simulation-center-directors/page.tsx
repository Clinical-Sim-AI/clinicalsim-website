import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("simulation-center-directors")!

export const metadata: Metadata = {
  title: "For Simulation Center Directors: Extend Your SP Program",
  description: "ClinicalSim extends standardized patient programs with on-demand communication practice between scheduled encounters and milestone-aligned assessment data from every session.",
  openGraph: {
    title: "For Simulation Center Directors | ClinicalSim.ai",
    description: "Extend your SP program with on-demand practice. Assessment data your CCC can use, at the volume struggling learners need.",
    url: "https://clinicalsim.ai/audiences/simulation-center-directors",
  },
  twitter: {
    title: "For Simulation Center Directors | ClinicalSim.ai",
    description: "Extend your SP program with on-demand practice volume and milestone-aligned assessment data from every session.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/simulation-center-directors",
  },
}

export default function SimulationCenterDirectorsPage() {
  return <AudiencePageLayout audience={audience} />
}
