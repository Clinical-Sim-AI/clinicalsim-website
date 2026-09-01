import type { Metadata } from "next"
import { getSolutionBySlug } from "@/lib/solutions"
import { SolutionPageLayout } from "@/components/solution-page-layout"

const solution = getSolutionBySlug("patient-experience")!

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  openGraph: {
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: "https://clinicalsim.ai/solutions/patient-experience",
  },
  twitter: {
    title: solution.metaTitle,
    description: solution.metaDescription,
  },
  alternates: {
    canonical: "https://clinicalsim.ai/solutions/patient-experience",
  },
}

export default function PatientExperiencePage() {
  return <SolutionPageLayout solution={solution} />
}
