import type { Metadata } from "next"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const audience = getAudienceBySlug("faculty-clinician-educators")!

export const metadata: Metadata = {
  title: { absolute: "Faculty and clinician educators: practice the conversations you lead" },
  description:
    "Rehearse corrective feedback, professionalism concerns, and bedside teaching in private, then review the rubric and transcript before leading the conversation in person.",
  openGraph: {
    title: "Faculty and clinician educators | ClinicalSim.ai",
    description:
      "Rehearse feedback, professionalism, and teaching conversations in a private setting, with rubric-scored feedback after each encounter.",
    url: "https://clinicalsim.ai/audiences/faculty-clinician-educators",
  },
  twitter: {
    title: "Faculty and clinician educators | ClinicalSim.ai",
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
