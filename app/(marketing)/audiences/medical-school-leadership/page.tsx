import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("medical-school-leadership")!

export const metadata: Metadata = {
  title: "For Medical School & UME Leadership: Communication Across Four Years",
  description:
    "Sequence communication practice across all four years of medical school — from history-taking to delivering a diagnosis. Since Step 2 CS ended in 2021, schools have had no scalable communication assessment. ClinicalSim provides unlimited practice with a dashboard that follows students through clerkships.",
  openGraph: {
    title: "For Medical School & UME Leadership | ClinicalSim.ai",
    description:
      "A four-year communication arc — from history-taking to diagnosis disclosure — with unlimited practice between SP encounters and a longitudinal dashboard.",
    url: "https://clinicalsim.ai/audiences/medical-school-leadership",
  },
  twitter: {
    title: "For Medical School & UME Leadership | ClinicalSim.ai",
    description:
      "Sequence communication across all four years of medical school, with unlimited practice and a longitudinal dashboard.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/medical-school-leadership",
  },
}

export default function MedicalSchoolLeadershipPage() {
  return <AudiencePageLayout audience={audience} />
}
