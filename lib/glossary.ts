export interface GlossaryTerm {
  /** Anchor id used in the URL fragment, e.g. "epa" -> /glossary#epa */
  slug: string
  /** Full term, e.g. "Entrustable Professional Activities (EPAs)" */
  term: string
  /** Short form, e.g. "EPA" — used as the DefinedTerm termCode */
  abbreviation?: string
  /** 2–3 self-contained, answer-first sentences. */
  definition: string
  /**
   * Attribution ONLY when a standard, framework, or figure is cited. Leave
   * undefined for plain definitional content. Never fabricate a source.
   */
  source?: string
  sourceUrl?: string
  /** Slugs of related terms for cross-linking. */
  relatedSlugs?: string[]
}

// Definitional vocabulary drawn from ACGME, AAMC, and SSH terminology. These
// are factual definitions of established concepts — no statistics are invented.
// Where a definition references a standard or governing body, the source field
// names it; purely definitional entries leave source empty.
export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "cbme",
    term: "Competency-Based Medical Education (CBME)",
    abbreviation: "CBME",
    definition:
      "Competency-based medical education is an approach to training that organizes curricula and assessment around demonstrated abilities (competencies) rather than time spent in training. Learners progress as they prove they can perform the activities expected of a physician, which makes assessment of observable behavior central to the model.",
    source: "ACGME / AAMC",
    relatedSlugs: ["epa", "milestones", "ccc"],
  },
  {
    slug: "epa",
    term: "Entrustable Professional Activities (EPAs)",
    abbreviation: "EPA",
    definition:
      "Entrustable Professional Activities are the units of professional work that a trainee can be trusted to perform once they have demonstrated the necessary competence. EPAs translate abstract competencies into concrete, observable tasks — such as obtaining a history or giving a patient a diagnosis — and are assessed through entrustment decisions about how much supervision a learner still requires.",
    source: "AAMC",
    relatedSlugs: ["cbme", "milestones", "clinical-reasoning"],
  },
  {
    slug: "ccc",
    term: "Clinical Competency Committee (CCC)",
    abbreviation: "CCC",
    definition:
      "A Clinical Competency Committee is a group of faculty that reviews assessment data for each resident or fellow and makes recommendations about progression, milestone ratings, and remediation. The ACGME requires accredited programs to convene a CCC, which synthesizes multiple data sources to reach defensible judgments about a learner's development.",
    source: "ACGME",
    relatedSlugs: ["milestones", "remediation", "gme"],
  },
  {
    slug: "milestones",
    term: "Milestones (ACGME)",
    abbreviation: "Milestones",
    definition:
      "ACGME Milestones are specialty-specific descriptions of the abilities a resident or fellow is expected to develop across training, organized by competency domain and described in progressive levels. Milestones 2.0 includes harmonized Interpersonal and Communication Skills (ICS) sub-competencies, giving programs a shared framework for rating communication development over time.",
    source: "ACGME Milestones 2.0",
    relatedSlugs: ["ccc", "cbme", "epa"],
  },
  {
    slug: "osce",
    term: "Objective Structured Clinical Examination (OSCE)",
    abbreviation: "OSCE",
    definition:
      "An Objective Structured Clinical Examination is a performance-based assessment in which learners rotate through a series of timed stations, each presenting a standardized clinical task scored against a predefined rubric. Because every learner encounters the same scenarios and is scored on the same criteria, the OSCE is a structured way to assess clinical and communication skills more objectively than unstructured observation.",
    relatedSlugs: ["standardized-patient", "clinical-reasoning"],
  },
  {
    slug: "standardized-patient",
    term: "Standardized Patient (SP)",
    abbreviation: "SP",
    definition:
      "A standardized patient is a person trained to portray a patient's history, symptoms, and emotional state consistently so learners can practice and be assessed on clinical encounters. SPs allow communication and examination skills to be rehearsed and scored in a controlled, repeatable setting, and are widely used in OSCEs and simulation programs.",
    relatedSlugs: ["osce", "virtual-patient-simulation", "deliberate-practice"],
  },
  {
    slug: "clinical-reasoning",
    term: "Clinical Reasoning",
    definition:
      "Clinical reasoning is the cognitive process by which clinicians gather and interpret information, generate and refine hypotheses, and arrive at diagnostic and management decisions. It combines pattern recognition with analytical thinking and is a core competency that simulation and case-based practice are designed to develop.",
    relatedSlugs: ["epa", "osce", "virtual-patient-simulation"],
  },
  {
    slug: "deliberate-practice",
    term: "Deliberate Practice",
    definition:
      "Deliberate practice is a structured method of skill development in which a learner works on focused tasks with clear objectives, repeats them, and receives immediate, specific feedback aimed at correcting performance. In medical education it underpins simulation-based training, where repeated rehearsal with feedback builds skills that lectures alone do not.",
    relatedSlugs: ["standardized-patient", "virtual-patient-simulation", "remediation"],
  },
  {
    slug: "dio",
    term: "Designated Institutional Official (DIO)",
    abbreviation: "DIO",
    definition:
      "A Designated Institutional Official is the individual with institutional authority and responsibility for the oversight and administration of an organization's ACGME-accredited graduate medical education programs. The DIO ensures programs meet accreditation requirements and is accountable to the institution's Graduate Medical Education Committee (GMEC).",
    source: "ACGME",
    relatedSlugs: ["gme", "ccc", "remediation"],
  },
  {
    slug: "gme",
    term: "Graduate Medical Education (GME)",
    abbreviation: "GME",
    definition:
      "Graduate medical education is the phase of physician training that follows medical school, comprising residency and fellowship programs in which physicians train in a specialty under supervision. In the United States, GME programs are accredited by the ACGME and culminate in eligibility for board certification.",
    source: "ACGME",
    relatedSlugs: ["dio", "ccc", "milestones"],
  },
  {
    slug: "remediation",
    term: "Remediation",
    definition:
      "Remediation is the structured process of identifying a learner who is not meeting expected competency standards and providing targeted instruction, practice, and reassessment to close the gap. In communication remediation specifically, learners practice the conversational skills they struggle with and are reassessed against defined criteria, with the process documented for the competency committee.",
    relatedSlugs: ["ccc", "milestones", "deliberate-practice"],
  },
  {
    slug: "virtual-patient-simulation",
    term: "Virtual Patient Simulation",
    definition:
      "Virtual patient simulation uses interactive software to represent a patient that learners can interview, examine, or counsel, often through text or voice. It enables on-demand, repeatable practice of clinical and communication skills without scheduling a standardized patient, and can deliver structured feedback after each encounter.",
    relatedSlugs: ["standardized-patient", "clinical-reasoning", "deliberate-practice"],
  },
]

export function getAllGlossaryTerms(): GlossaryTerm[] {
  return glossaryTerms
}

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug)
}
