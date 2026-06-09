import type { Metadata } from "next"
import { getComparisonBySlug } from "@/lib/comparisons"
import { ComparisonPageLayout } from "@/components/comparison-page-layout"

const comparison = getComparisonBySlug(
  "ai-clinical-simulation-vs-standardized-patients"
)!

export const metadata: Metadata = {
  title: comparison.metaTitle,
  description: comparison.metaDescription,
  openGraph: {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    url: "https://clinicalsim.ai/compare/ai-clinical-simulation-vs-standardized-patients",
  },
  twitter: {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
  },
  alternates: {
    canonical:
      "https://clinicalsim.ai/compare/ai-clinical-simulation-vs-standardized-patients",
  },
}

export default function AiVsStandardizedPatientsPage() {
  return <ComparisonPageLayout comparison={comparison} />
}
