export const HOMEPAGE_SEO = {
  title: "AI clinical simulation for healthcare",
  description:
    "Clinicians use AI clinical simulation to practice healthcare communication with AI patients and get feedback tied to their own words after each conversation.",
} as const

export const HOMEPAGE_PUBLIC_COPY = {
  hero: {
    eyebrow: "Communication intelligence for healthcare",
    headline: "Clinical simulation for better patient conversations.",
    body: "ClinicalSim is an AI clinical simulation platform for healthcare communication. Clinicians, learners, and patient facing staff practice spoken conversations with AI patients. ClinicalSim scores each simulation against a published clinical framework or your institution's own standard and quotes the participant's words behind every score. Participants see what they did well and what to practice next, while leaders can see patterns across a cohort or unit. Residency, fellowship, and medical school programs use the same tool for competency assessment and OSCE practice.",
    primaryCta: "See how an assessment works",
    secondaryCta: "See example feedback",
    pilot:
      "More than 25 academic medical centers and children's hospitals are piloting ClinicalSim.",
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
    heading: "Watch one simulated conversation get measured",
    body: "A learner talks a hesitant parent through a two-month vaccine visit. The report then scores the conversation and quotes the lines that earned each score.",
  },
  howItStarts: {
    heading: "How a communication assessment works",
    intro: "Your standard becomes a clear guide for feedback and practice.",
    steps: [
      {
        title: "Send us the standard you already hold",
        body: "A service model, consent policy, disclosure policy, debrief framework, or rubric. We review which elements a spoken conversation can show before anyone records a word.",
      },
      {
        title: "One group runs a conversation or two",
        body: "Choose a group and a conversation where more consistent communication would help. Each person talks through the case with an AI patient by voice, from any device, with no observer in the room.",
      },
      {
        title: "See the pattern and plan the practice",
        body: "The report shows strengths and areas for focused practice, with the participants' words behind every score. The same cases give people another chance to practice, and formative scores stay out of personnel files.",
      },
    ],
    exampleLabel: "What one health system learned",
    example:
      "In one health system pilot, participants consistently opened conversations well. The report identified three elements to reinforce at the close: thanking the patient for raising a concern, reflecting the concern back, and summarizing the plan. Leaders could see those patterns in the transcripts and use the same cases for focused practice.",
  },
  scoring: {
    heading: "Measured against a standard you already trust",
    institutionTitle: "Your institution's own standard",
    institutionBody:
      "Bring the policy, service model, script, or rubric your institution already teaches. ClinicalSim scores the conversation element by element, as you wrote it.",
    readyTitle: "A published clinical framework",
    readyBody:
      "Start with a case built on a named, published framework that health care or medical education already uses.",
    sharedLine:
      "Either way, every score quotes the participant's own words, so participants and faculty can inspect the feedback.",
    conversationsHeading: "Conversations ready to measure today",
  },
  buyers: {
    healthSystemHeading: "For health systems",
    healthSystemBody:
      "ClinicalSim turns practice in consent, disclosure, debriefing, and patient service into feedback for each participant and measurable patterns for leaders. Each simulation uses your own service standard or policy, with the participant's words behind every score.",
    medicalEducationHeading:
      "For residency, fellowship, and medical school programs",
    medicalEducationBody:
      "Learners get repeatable practice between scheduled SP encounters. Faculty get rubric-scored feedback with the transcript behind every score, so they can inspect any case rather than trust a number.",
  },
  proofHeading: "From clinicians who have used ClinicalSim",
  closing: {
    heading: "Start with a conversation you want to strengthen.",
    body: "Tell us where leaders want more consistent communication or which conversation learners need to practice. We'll review your standard, or show you the closest ready to use case, before the assessment begins.",
    cta: "Start with an assessment",
  },
} as const
