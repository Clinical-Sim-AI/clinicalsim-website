import type { Metadata } from "next"
import { getComparisonBySlug } from "@/lib/comparisons"
import { ComparisonPageLayout } from "@/components/comparison-page-layout"

const comparison = getComparisonBySlug(
  "ai-patient-simulation-vs-avatar-role-play-platforms"
)!

export const metadata: Metadata = {
  title: comparison.metaTitle,
  description: comparison.metaDescription,
  openGraph: {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    url: "https://clinicalsim.ai/compare/ai-patient-simulation-vs-avatar-role-play-platforms",
  },
  twitter: {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
  },
  alternates: {
    canonical:
      "https://clinicalsim.ai/compare/ai-patient-simulation-vs-avatar-role-play-platforms",
  },
}

export default function AiPatientSimulationVsAvatarRolePlayPage() {
  return <ComparisonPageLayout comparison={comparison} />
}
