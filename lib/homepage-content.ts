export const HOMEPAGE_PUBLIC_COPY = {
  hero: {
    eyebrow: "Communication intelligence for health systems",
    headline:
      "Measure how your clinicians and staff talk with patients. Then fix what you find.",
    body: "Patient complaints, consent, error disclosure, debriefs, and learner milestones all come down to what someone said in the room. ClinicalSim scores those spoken conversations against the standard your institution already holds, shows each person where they fell short in their own words, and gives them the practice to fix it. Residency, fellowship, and medical school programs use the same tool for milestones and OSCE practice.",
    primaryCta: "Start with an assessment",
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
    heading: "Watch one conversation get measured",
    body: "A learner talks a hesitant parent through a two-month vaccine visit. The report then scores the conversation and quotes the lines that earned each score.",
  },
  howItStarts: {
    heading: "How an assessment starts",
    intro: "You already have the standard and the people. We add the measurement.",
    steps: [
      {
        title: "Send us the standard you already hold",
        body: "A service model, consent policy, disclosure policy, debrief framework, or rubric. We review which elements a spoken conversation can show before anyone records a word.",
      },
      {
        title: "One group runs a conversation or two",
        body: "Pick the unit or program where the complaints are coming from. Each person talks through the case with an AI patient by voice, from any device, with no observer in the room.",
      },
      {
        title: "Read the report, then fix what it finds",
        body: "The report scores every element as you wrote it and quotes the words behind each score, by person and by cohort. The same cases then become the practice that closes the gap, and formative scores stay out of personnel files.",
      },
    ],
    exampleLabel: "What one report found",
    example:
      "In one health system pilot, participants opened conversations well and closed them poorly. Nobody thanked the patient for raising a concern, and reflecting the concern back and summarizing the plan were the weakest elements in the standard. The leaders who wrote that standard did not need a validation study to act on it. They needed the transcripts.",
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
      "Either way, every score quotes the participant's own words, so nobody has to take the number on faith.",
    conversationsHeading: "Conversations ready to measure today",
  },
  buyers: {
    healthSystemHeading: "For health systems",
    healthSystemBody:
      "Complaints, consent, disclosure, and debriefs are already tracked somewhere in your system. The conversation itself is not. ClinicalSim measures it against your own service standard or policy, person by person, and gives people practice on the exact elements they missed.",
    medicalEducationHeading:
      "For residency, fellowship, and medical school programs",
    medicalEducationBody:
      "Learners get repeatable practice between scheduled SP encounters. Faculty get milestone-aligned feedback with the transcript behind every score, so they can inspect any case rather than trust a number.",
  },
  proofHeading: "From clinicians who have used ClinicalSim",
  closing: {
    heading: "Start with the conversation that's going wrong.",
    body: "Tell us where the complaints are coming from, or which conversation your learners need to practice. We'll review your standard, or show you the closest ready to use case, before the assessment begins.",
    cta: "Start with an assessment",
  },
} as const
