import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("nursing-leadership")!

const description =
  "For chief nursing officers and nursing professional development. Nurses practice the conversations behind patient experience, retention and safety, scored against your standards and reported by unit."

export const metadata: Metadata = {
  title: { absolute: "Communication practice and measurement for nurse leaders" },
  description,
  openGraph: {
    title: "Nursing leadership | ClinicalSim.ai",
    description,
    url: "https://clinicalsim.ai/audiences/nursing-leadership",
  },
  twitter: {
    title: "Nursing leadership | ClinicalSim.ai",
    description,
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/nursing-leadership",
  },
}

export default function NursingLeadershipPage() {
  return <AudiencePageLayout audience={audience} />
}
