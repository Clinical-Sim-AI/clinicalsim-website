import { PRIMARY_CTA } from "@/lib/positioning"

export const HOMEPAGE_SEO = {
  title: "AI clinical simulation for healthcare",
  description:
    "Clinicians use AI clinical simulation to practice healthcare communication with AI patients and get feedback tied to their own words after each conversation.",
} as const

export const HOMEPAGE_PUBLIC_COPY = {
  hero: {
    eyebrow: "Clinical communication intelligence",
    headline: "Clinical simulation for better patient conversations.",
    body: "Clinicians, staff, and trainees practice out loud with AI patients. Each clinical simulation shows what they did well and what to practice next against your standard, with their own words behind each score. Leaders can review patterns across a cohort or unit.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: "See a conversation",
    // Count confirmed by Ben, 2026-10-06. Before changing the institution
    // wording, confirm every pilot is an academic medical center or a
    // children's hospital.
    pilot:
      "29 academic medical centers and children's hospitals are piloting ClinicalSim.",
  },
  evidencePanel: [
    {
      label: "What we measure",
      value: "Spoken conversations, against your own standard",
    },
    {
      label: "What backs each score",
      value: "The participant's own words, quoted",
    },
    {
      label: "Who sees the pattern",
      value: "By person, cohort, or anonymous unit",
    },
  ],
  demo: {
    heading: "Inspect the conversation behind the feedback",
    body: "A learner talks a hesitant parent through a two-month vaccine visit. The report then scores the conversation and quotes the lines that earned each score.",
  },
  howItStarts: {
    heading: "Turn the standard you already teach into practice and review",
    intro: "In a communication assessment, participants practice with AI patients and get feedback based on your communication standard.",
    steps: [
      {
        title: "Send us your standard for communication",
        body: "Share your service model, consent or disclosure policy, debrief framework, or rubric. We'll review which parts we can assess in a simulated conversation before participants begin.",
      },
      {
        title: "Choose a group to practice with AI patients",
        body: "Choose who'll take part and which conversation they'll practice. Each participant speaks with an AI patient from their own device, with no observer in the room.",
      },
      {
        title: "Review the feedback and plan what to practice next",
        body: "Each participant sees what they did well and what to practice next, with quotes from their conversation supporting each score. Leaders can review results across the group and choose cases for further practice. Formative scores stay out of personnel files.",
      },
      {
        title: "Practice again and compare",
        body: "Participants repeat the case and compare their new scores with the earlier attempt. Leaders can review the group's results across attempts, and that review stays formative: it describes the group and never ranks one person against another.",
      },
    ],
    exampleLabel: "What one health system learned",
    // Matches the anonymized partner report at COHORT_REPORT_PATH (lib/cohort-report.ts).
    example:
      "In one health system's anonymized report, clinicians opened conversations well. The report named the steps at the close to practice next: reflecting the concern back, checking it was understood, asking what matters most, and thanking the family for raising it. Leaders could see those patterns in the transcripts and use the same cases for focused practice.",
    exampleLink: "Read the anonymized health system cohort report",
  },
  // No financial claim here. The white paper it links to explains why no ROI
  // figure is published and how a hospital can examine its own costs instead.
  economics: {
    heading: "Making the budget case without an invented number",
    body: "Someone in finance will ask what the program returns. We don't publish an ROI figure, because the published evidence on communication training doesn't support one. What a hospital can do is follow one communication pathway into the costs it already tracks, using its own data, and decide from there.",
    linkLabel: "Read the white paper on communication and hospital economics",
    href: "/insights/communication-and-hospital-economics",
  },
  scoring: {
    heading: "How we score each conversation",
    institutionTitle: "Your institution's own standard",
    institutionBody:
      "Bring the policy, service model, script, or rubric your institution already teaches. ClinicalSim scores the conversation element by element, as you wrote it.",
    readyTitle: "A published clinical framework",
    readyBody:
      "Start with a case built on a named, published framework that health care or medical education already uses.",
    sharedLine:
      "Either way, every score quotes the participant's own words, so participants and faculty can inspect the feedback.",
    conversationsHeading: "Conversations participants can practice",
  },
  buyers: {
    heading: "Start with a conversation your institution already cares about",
    intro:
      "Most institutions already know which conversation they want to strengthen, so the first assessment starts there rather than with a list of features.",
    healthSystemHeading: "For health systems",
    healthSystemBody:
      "Practice patient experience, consent and disclosure, and team conversations against your institution's own standards. Leaders review cohort or unit patterns alongside your existing healthcare simulation program.",
    medicalEducationHeading:
      "For residency, fellowship, and medical school programs",
    medicalEducationBody:
      "Give residents, fellows, and medical students repeatable communication practice between scheduled SP encounters. Add simulation training to your medical simulation curriculum, faculty development, or remediation plan.",
  },
  startingSteps: [
    { title: "Choose the priority", body: "Tell us which conversation your team wants to practice. We'll review your standard or help you choose a published framework." },
    { title: "Agree on the assessment", body: "Choose the participating group, cases, and access rules together. Each person practices in their browser and gets feedback." },
    { title: "Review and practice again", body: "Participants use their feedback for the next attempt. Leaders review group patterns and choose the next practice focus." },
  ],
  proofHeading: "From clinicians who have used ClinicalSim",
  closing: {
    heading: "Bring us a communication priority.",
    body: "Tell us what your team wants to practice. We'll show you a relevant case and talk through how a first assessment could work.",
    cta: PRIMARY_CTA,
  },
} as const
