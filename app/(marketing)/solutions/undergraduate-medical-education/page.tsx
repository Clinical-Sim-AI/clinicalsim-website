import type { Metadata } from "next"
import { getSolutionBySlug } from "@/lib/solutions"
import { JsonLd } from "@/components/json-ld"
import { ORGANIZATION } from "@/lib/positioning"
import { SolutionPageLayout } from "@/components/solution-page-layout"

const solution = getSolutionBySlug("undergraduate-medical-education")!

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  openGraph: {
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: "https://clinicalsim.ai/solutions/undergraduate-medical-education",
  },
  twitter: {
    title: solution.metaTitle,
    description: solution.metaDescription,
  },
  alternates: {
    canonical: "https://clinicalsim.ai/solutions/undergraduate-medical-education",
  },
}

export default function UndergraduateMedicalEducationPage() {
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Product",
      name: "ClinicalSim OSCE communication practice",
      // Describes the #osce-practice section it points at, not the four-year page around it.
      description: solution.context!.paragraphs.join(" "),
      url: "https://clinicalsim.ai/solutions/undergraduate-medical-education#osce-practice",
      brand: ORGANIZATION,
    }} />
    <SolutionPageLayout solution={solution} />
  </>
}
