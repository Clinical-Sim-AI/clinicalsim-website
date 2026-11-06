import type { Metadata } from "next"
import { getSolutionBySlug } from "@/lib/solutions"
import { SolutionPageLayout } from "@/components/solution-page-layout"

const solution = getSolutionBySlug("osce-preparation")!

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  openGraph: {
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: "https://clinicalsim.ai/solutions/osce-preparation",
  },
  twitter: {
    title: solution.metaTitle,
    description: solution.metaDescription,
  },
  alternates: {
    canonical: "https://clinicalsim.ai/solutions/osce-preparation",
  },
}

export default function OscePreparationPage() {
  return <SolutionPageLayout solution={solution} />
}
