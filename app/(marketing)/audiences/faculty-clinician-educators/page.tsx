import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("faculty-clinician-educators")!

export const metadata: Metadata = {
  title: "For Faculty & Clinician Educators: Practice What You Model",
  description:
    "Attendings and clinician educators are expected to give difficult feedback, address professionalism concerns, and teach at the bedside, even though they were rarely trained to lead those conversations. ClinicalSim provides structured practice for the skills faculty are expected to model.",
  openGraph: {
    title: "For Faculty & Clinician Educators | ClinicalSim.ai",
    description:
      "Rehearse feedback, professionalism, and teaching conversations in a private setting, with rubric-scored feedback after each encounter.",
    url: "https://clinicalsim.ai/audiences/faculty-clinician-educators",
  },
  twitter: {
    title: "For Faculty & Clinician Educators | ClinicalSim.ai",
    description:
      "Practice the feedback, professionalism, and teaching conversations faculty are expected to model, with rubric-scored feedback after each encounter.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences/faculty-clinician-educators",
  },
}

export default function FacultyClinicianEducatorsPage() {
  return <AudiencePageLayout audience={audience} />
}
