import type { Metadata } from "next"
import { getComparisonBySlug } from "@/lib/comparisons"
import { ComparisonPageLayout } from "@/components/comparison-page-layout"

const comparison = getComparisonBySlug(
  "voice-vs-text-virtual-patient-simulation"
)!

export const metadata: Metadata = {
  title: comparison.metaTitle,
  description: comparison.metaDescription,
  openGraph: {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    url: "https://clinicalsim.ai/compare/voice-vs-text-virtual-patient-simulation",
  },
  twitter: {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
  },
  alternates: {
    canonical:
      "https://clinicalsim.ai/compare/voice-vs-text-virtual-patient-simulation",
  },
}

export default function VoiceVsTextSimulationPage() {
  return <ComparisonPageLayout comparison={comparison} />
}
