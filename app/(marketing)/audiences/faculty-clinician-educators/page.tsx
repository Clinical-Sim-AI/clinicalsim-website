import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("faculty-clinician-educators")!

export const metadata: Metadata = {
  title: "For Faculty & Clinician Educators: Practice What You Model",
  description:
    "Attendings and clinician educators are expected to give difficult feedback, address professionalism concerns, and teach at the bedside — conversations they were rarely trained to lead. ClinicalSim turns the same rubric-scored simulation that trains residents toward the skills faculty model.",
  openGraph: {
    title: "For Faculty & Clinician Educators | ClinicalSim.ai",
    description:
      "Rehearse feedback, professionalism, and teaching conversations with objective, rubric-scored feedback — in a private, low-stakes setting.",
    url: "https://clinicalsim.ai/audiences/faculty-clinician-educators",
  },
  twitter: {
    title: "For Faculty & Clinician Educators | ClinicalSim.ai",
    description:
      "Practice the conversations faculty are expected to model — feedback, professionalism, and teaching — with objective feedback.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/faculty-clinician-educators",
  },
}

export default function FacultyClinicianEducatorsPage() {
  return <AudiencePageLayout audience={audience} />
}
