export interface ReadyToUseFramework {
  name: string
  homepageName?: string
  owner: string
  note: string
  domain: string
  stagingKey: string
  featured?: boolean
}

/**
 * Scoring sources attached to at least one active, published simulation that
 * appears in the staging catalog. Most staging keys are rubric slugs. The
 * ACGME entry covers the specialty specific ICS set.
 */
export const readyToUseFrameworks: ReadyToUseFramework[] = [
  {
    name: "ACGME ICS Milestones 2.0",
    homepageName: "ACGME Milestones 2.0",
    featured: true,
    owner: "ACGME, published by specialty",
    note: "Specialty specific interpersonal and communication skills subcompetencies. A case uses only the subcompetencies the learner can show in that encounter.",
    domain: "Medical education",
    stagingKey: "acgme-ics-milestones",
  },
  {
    name: "NURSE: Empathic responses to emotion",
    homepageName: "NURSE",
    featured: true,
    owner: "Back, Arnold, Baile, Tulsky, Fryer-Edwards, and VitalTalk",
    note: "Naming, understanding, respecting, supporting, and exploring. The rubric scores how a clinician responds when a patient or family member shows emotion.",
    domain: "Serious news, emotion, and goals of care",
    stagingKey: "nurse-empathic-responses",
  },
  {
    name: "AHRQ CANDOR: Disclosure communication",
    homepageName: "AHRQ CANDOR",
    featured: true,
    owner: "Agency for Healthcare Research and Quality",
    note: "The disclosure checklist covers preparation, listening, an explanation without blame or speculation, apology, next steps, and follow up.",
    domain: "Error disclosure",
    stagingKey: "candor-disclosure-communication",
  },
  {
    name: "Informed consent: Consent discussion",
    homepageName: "Informed consent",
    owner: "AMA Code of Medical Ethics and StatPearls",
    note: "Six elements cover capacity, the proposed intervention, risks and benefits, alternatives, understanding, and a voluntary decision.",
    domain: "Information, decisions, and consent",
    stagingKey: "informed-consent-discussion",
  },
  {
    name: "SPIKES: Six step protocol for delivering bad news",
    homepageName: "SPIKES",
    featured: true,
    owner: "Baile and colleagues, The Oncologist, 2000",
    note: "Six steps cover setting, perception, invitation, knowledge, emotion, and strategy and summary.",
    domain: "Serious news, emotion, and goals of care",
    stagingKey: "spikes-breaking-bad-news",
  },
  {
    name: "REMAP: Goals of care conversation framework",
    owner: "Childers, Back, Tulsky, and Arnold, 2017",
    note: "Reframe the situation, expect emotion, map the future, align with values, and plan treatment around those values.",
    domain: "Serious news, emotion, and goals of care",
    stagingKey: "remap-goals-of-care",
  },
  {
    name: "Serious Illness Conversation Guide",
    owner: "Ariadne Labs",
    note: "Five steps cover setup, understanding and information preferences, prognosis, goals and tradeoffs, and a recommendation with follow up.",
    domain: "Serious news, emotion, and goals of care",
    stagingKey: "serious-illness-conversation-guide",
  },
  {
    name: "Ask, tell, ask and teach back",
    owner: "VitalTalk and the Agency for Healthcare Research and Quality",
    note: "Ask what the patient understands, explain in small pieces, ask what they heard, and use teach back to check the explanation.",
    domain: "Information, decisions, and consent",
    stagingKey: "ask-tell-ask-teach-back",
  },
  {
    name: "Motivational Interviewing: MITI global ratings",
    owner: "Miller and Rollnick; MITI 4.2.1 by Moyers, Manuel, and Ernst",
    note: "The rubric uses the MITI global ratings for change talk, sustain talk, partnership, and empathy, with a fifth rating for OARS skills.",
    domain: "Information, decisions, and consent",
    stagingKey: "motivational-interviewing",
  },
  {
    name: "Calgary-Cambridge Guide to the Medical Interview",
    owner: "Kurtz, Silverman, and Draper",
    note: "Five stages organize the visit, with providing structure and building the relationship scored throughout the encounter.",
    domain: "Clinical interview and assessment",
    stagingKey: "calgary-cambridge-medical-interview",
  },
  {
    name: "KEECC-A: Kalamazoo communication checklist",
    owner: "Makoul, 2001; adapted by Joyce and colleagues, 2010",
    note: "Seven tasks cover rapport, the opening, information gathering, the patient's perspective, information sharing, agreement, and closure.",
    domain: "Clinical interview and assessment",
    stagingKey: "keecc-a-communication-checklist",
  },
  {
    name: "SEGUE Framework: Communication skills",
    owner: "Makoul, 2001",
    note: "Five task sets follow the encounter from setting the stage through eliciting and giving information, understanding the patient, and closing.",
    domain: "Clinical interview and assessment",
    stagingKey: "segue-framework",
  },
  {
    name: "HEEADSSS: Adolescent psychosocial screening",
    owner: "Goldenring and Cohen; expanded by Goldenring and Rosen",
    note: "Eight domains structure a private adolescent interview: home, education, eating, activities, drugs, sexuality, suicide and depression, and safety.",
    domain: "Clinical interview and assessment",
    stagingKey: "heeadsss-adolescent-psychosocial",
  },
  {
    name: "SBAR: Structured communication",
    owner: "Agency for Healthcare Research and Quality, TeamSTEPPS",
    note: "Situation, background, assessment, and recommendation structure a concise clinical escalation or handoff.",
    domain: "Team communication",
    stagingKey: "sbar-structured-communication",
  },
  {
    name: "I-PASS: Handoff communication",
    owner: "I-PASS Study Group and Agency for Healthcare Research and Quality",
    note: "Illness severity, patient summary, action list, situation awareness and contingency planning, and synthesis by the receiver structure a handoff.",
    domain: "Team communication",
    stagingKey: "i-pass-handoff",
  },
  {
    name: "Interprofessional Collaborator Assessment Rubric",
    owner: "Curran and colleagues",
    note: "Six categories cover communication, collaboration, roles, patient and family centered work, team function, and conflict management.",
    domain: "Team communication",
    stagingKey: "icar-interprofessional-collaborator",
  },
  {
    name: "TeamSTEPPS: Teamwork and communication competencies",
    owner: "Agency for Healthcare Research and Quality and the US Department of Defense",
    note: "The rubric scores communication, team leadership, situation monitoring, and mutual support when the case gives one speaker a chance to show them.",
    domain: "Team communication",
    stagingKey: "teamstepps-teamwork-communication",
  },
  {
    name: "R2C2: Feedback and coaching conversation",
    owner: "Sargeant and colleagues",
    note: "Relationship, reactions, content, and coaching structure a feedback conversation between a supervisor and learner.",
    domain: "Feedback and coaching",
    stagingKey: "r2c2-feedback-coaching",
  },
]

export function getFeaturedFrameworks(): ReadyToUseFramework[] {
  return readyToUseFrameworks.filter((framework) => framework.featured)
}

export function getFrameworksByDomain(): {
  domain: string
  frameworks: ReadyToUseFramework[]
}[] {
  const domains = new Map<string, ReadyToUseFramework[]>()

  for (const framework of readyToUseFrameworks) {
    const frameworks = domains.get(framework.domain) ?? []
    frameworks.push(framework)
    domains.set(framework.domain, frameworks)
  }

  return Array.from(domains, ([domain, frameworks]) => ({ domain, frameworks }))
}
