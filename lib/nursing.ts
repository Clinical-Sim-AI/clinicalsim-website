// Product scope: /audiences/nursing-leadership, /solutions/patient-experience,
// /solutions/workforce-retention, and /help/roles-and-permissions.
// Practice topics describe program setup, not a ready-to-use case inventory.
export const nursingDescription =
  "Nursing communication training by voice with AI patients: patient and family practice, nurse residency conversations, and transcript-linked formative feedback."

export const nursingSections = [
  {
    id: "patient-and-family",
    heading: "Patient and family conversations nurses can practice",
    paragraphs: [
      "Nurses can rehearse explaining care, checking understanding with teach-back, and responding to a patient or family concern. They speak with an AI patient or family member in a simulated encounter, review what they did well and what to practice next, then try again.",
      "Start with a conversation that fits the nurse's role. Your educator and ClinicalSim agree on the case, the spoken behaviors it can assess, and the feedback standard before the group begins. Confirm the available cases for your program during setup.",
    ],
    links: [{ label: "Patient experience and service standards", href: "/solutions/patient-experience" }],
  },
  {
    id: "feedback",
    heading: "Feedback nurses can inspect and use",
    paragraphs: [
      "Each practice report scores the conversation against the rubric or hospital standard approved for that case and quotes the participant's words behind each score. Nurses can see strengths and choose a focus for the next attempt, without booking an actor, room, or faculty observer each time.",
      "A nurse educator can review the report during coaching. Before anyone takes part, agree on whether leaders see completion, named reports with agreed access, or anonymous unit and cohort results. Practice scores stay out of performance reviews and employment decisions.",
    ],
    links: [{ label: "Compare AI practice and standardized patients", href: "/compare/ai-clinical-simulation-vs-standardized-patients" }],
  },
  {
    id: "hcahps",
    heading: "HCAHPS nurse communication: practice the spoken behaviors",
    paragraphs: [
      "The CMS HCAHPS nurse communication questions ask patients how often nurses showed courtesy and respect, listened carefully, and explained information clearly during their hospital stay. The official HCAHPS question crosswalk lists these under Communication with Nurses.",
      "An educator can use those themes to choose a practice focus: acknowledge a concern, ask a follow-up question, or explain a plan in plain language and check understanding. ClinicalSim scores the simulated conversation against the case standard. It does not score a real patient encounter, predict HCAHPS results, or claim that practice raises survey scores.",
    ],
    links: [{ label: "CMS HCAHPS question crosswalk", href: "https://www.hcahpsonline.org/globalassets/hcahps/updated-hcahps-survey/crosswalk-of-updated-hcahps-survey-questions-to-sub-measures-.pdf" }],
  },
  {
    id: "magnet",
    heading: "Communication practice in Magnet hospitals",
    paragraphs: [
      "ANCC's Magnet Model describes professional development within nursing structural empowerment. Nursing educators can consider practice completion records and coaching discussions as part of their own professional development program, with the institution deciding what documentation it needs.",
      "ClinicalSim isn't affiliated with ANCC. Practice scores don't establish Magnet recognition or accreditation compliance, and the platform does not replace a hospital's evidence, review process, or professional judgment.",
    ],
    links: [{ label: "ANCC Magnet Model", href: "https://www.nursingworld.org/organizational-programs/magnet/magnet-model" }],
  },
  {
    id: "nurse-residency",
    heading: "Nurse residency practice for high-stakes conversations",
    paragraphs: [
      "New nurses can practice raising a safety concern, escalating to a physician, handing off a pending result, or answering a family question when they don't yet have the answer. The AI character plays the person on the other side of the conversation, including a colleague or family member.",
      "Place spoken practice between teaching sessions and preceptor coaching in the first year. Agree on the escalation policy, handoff tool, or other standard for each case, then use the nurse's feedback to guide the next coaching conversation. Confirm case availability and fit with the residency coordinator before assigning practice.",
      "ClinicalSim isn't affiliated with ANCC or Vizient. Practice scores don't establish nurse residency accreditation compliance or predict retention.",
    ],
    links: [{ label: "Nurse residency and workforce communication practice", href: "/solutions/workforce-retention" }],
  },
  {
    id: "example-feedback",
    heading: "Nursing example: a family waiting for answers",
    paragraphs: [
      "In the published case 48 Hours in the Hallway, an emergency department nurse speaks with the daughter of a patient who is waiting for a procedure and an inpatient bed. The nurse needs to acknowledge her frustration, explain what they know, and agree on a next step without promising a procedure time they cannot control.",
      "The example feedback recognizes empathy and a clear follow-up plan. It also asks the participant to find out what the daughter already understands and invite her to explain the plan back in her own words. Read the transcript and listen to the recording alongside the feedback. This is one simulated encounter, not evidence of nursing outcomes.",
    ],
    links: [{ label: "Read the nursing example, transcript, and feedback", href: "/examples/48-hours-in-the-hallway" }],
  },
]

export const nursingFaqs = [
  {
    question: "How does nursing communication training work?",
    answer: "Nurses speak with an AI patient, family member, or colleague in a simulated case and get feedback against the standard approved for that case. The report quotes their words behind each score and shows strengths and next practice steps. They can review the feedback and repeat the encounter.",
  },
  {
    question: "Can we use our hospital's own communication standard?",
    answer: "ClinicalSim works with your educator to choose the case and the hospital standard or published framework used for feedback. Agree on which spoken behaviors the case can assess and who can see results before anyone practices. The feedback is formative, and faculty-rater validation on a customer's own rubric has not been completed.",
  },
  {
    question: "Will this improve our HCAHPS nurse communication scores?",
    answer: "ClinicalSim does not predict HCAHPS scores, and no current evidence shows that its practice scores change them. Educators can choose practice behaviors related to listening, respect, and clear explanations, while any comparison with hospital survey data needs a separate study plan.",
  },
  {
    question: "Does ClinicalSim establish Magnet or nurse residency compliance?",
    answer: "ClinicalSim isn't affiliated with ANCC or Vizient, and practice scores don't establish Magnet recognition or accreditation compliance. Nursing educators decide how practice records fit their professional development program and institutional review process.",
  },
  {
    question: "What do nurses need to take part?",
    answer: "Nurses need a phone, tablet, or computer with a browser, internet access, microphone access, and a place where they can speak privately. Nothing needs installing, and institutional IT may need to allow the voice service. Practice is in English.",
  },
  {
    question: "Who sees a nurse's practice results?",
    answer: "Your institution sets access and reporting rules before nurses participate. Agree on completion reporting, coaching access, or anonymous unit and cohort results. Formative scores must not decide hiring, discipline, compensation, credentialing, privileging, or licensure.",
  },
]
