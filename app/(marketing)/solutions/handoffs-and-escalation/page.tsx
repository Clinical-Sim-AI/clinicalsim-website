import type { Metadata } from "next"
import { getSolutionBySlug } from "@/lib/solutions"
import { SolutionPageLayout } from "@/components/solution-page-layout"

const solution = getSolutionBySlug("handoffs-and-escalation")!

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  openGraph: {
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: "https://clinicalsim.ai/solutions/handoffs-and-escalation",
  },
  twitter: {
    title: solution.metaTitle,
    description: solution.metaDescription,
  },
  alternates: {
    canonical: "https://clinicalsim.ai/solutions/handoffs-and-escalation",
  },
}

export default function HandoffsAndEscalationPage() {
  return <SolutionPageLayout solution={solution} />
}
