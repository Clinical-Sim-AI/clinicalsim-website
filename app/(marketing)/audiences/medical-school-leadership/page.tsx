import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("medical-school-leadership")!

export const metadata: Metadata = {
  title: "Medical school and UME leadership: communication across four years",
  description:
    "Sequence communication practice across all four years of medical school, from history-taking to delivering a diagnosis. Step 2 CS ended in 2021 with no national successor for assessing clinical communication. ClinicalSim adds on-demand practice with a dashboard that follows students through clerkships.",
  openGraph: {
    title: "Medical school and UME leadership | ClinicalSim.ai",
    description:
      "A four-year communication sequence from history taking to diagnosis disclosure, with repeatable practice between SP encounters.",
    url: "https://clinicalsim.ai/audiences/medical-school-leadership",
  },
  twitter: {
    title: "Medical school and UME leadership | ClinicalSim.ai",
    description:
      "Sequence communication across all four years of medical school and review each student's work across clerkships.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/medical-school-leadership",
  },
}

export default function MedicalSchoolLeadershipPage() {
  return <AudiencePageLayout audience={audience} />
}
