export interface PublishedFramework {
  name: string
  owner: string
  note: string
  featured?: boolean
  homepageName?: string
}

/**
 * Published frameworks with element level descriptions that can support a
 * spoken encounter rubric. A featured entry appears on the homepage.
 *
 * Deliberately excluded: the NCSBN Clinical Judgment Measurement Model, the
 * Lasater Clinical Judgment Rubric, the Casey Fink survey, the Patient
 * Activation Measure, and AIDET. Do not add them without a license or legal
 * approval.
 */
export const publishedFrameworks: PublishedFramework[] = [
  {
    name: "Braddock's elements of informed decision making",
    homepageName: "Braddock's informed decision elements",
    featured: true,
    owner: "Published in JAMA, quoted verbatim by AHRQ",
    note: "Seven elements, from discussing the patient's role in the decision through eliciting their preference. The scale researchers already use to score recorded surgical consent conversations.",
  },
  {
    name: "CMS well-designed informed consent process",
    owner: "CMS interpretive guidelines, public domain",
    note: "Names the material risks, the alternatives, the consequences of declining, and who will perform which parts of the operation. Every element is a spoken behavior.",
  },
  {
    name: "AHRQ ten strategies for informed consent",
    owner: "AHRQ, developed with The Joint Commission",
    note: "Prepare, use health literacy universal precautions, remove language barriers, use teach-back, offer choices, elicit goals and values, and seven more. Behavioral, named, and co-authored by the accreditor.",
  },
  {
    name: "AHRQ SHARE approach",
    homepageName: "AHRQ SHARE",
    featured: true,
    owner: "AHRQ, public domain",
    note: "Five steps of shared decision making: seek participation, help explore and compare options, assess values, reach a decision together, evaluate the decision.",
  },
  {
    name: "NQF Safe Practice on disclosure",
    homepageName: "NQF Safe Practice on disclosure",
    featured: true,
    owner: "National Quality Forum, public",
    note: "Names what a disclosure conversation contains, including an explicit expression of regret, a commitment to investigate, and feedback of the result. It also says the skill should be practiced.",
  },
  {
    name: "AHRQ CANDOR",
    owner: "AHRQ, public domain",
    note: "Eight modules across three phases, including response and disclosure communication and care for the caregiver.",
  },
  {
    name: "TeamSTEPPS Team Performance Observation Tool",
    owner: "AHRQ, public domain",
    note: "Twenty-five behavioral items across five sections, plus named speech acts a transcript can verify were said: SBAR, check-back, call-out, CUS, the two-challenge rule, DESC.",
  },
  {
    name: "OPTION-12",
    owner: "Elwyn et al., published in full",
    note: "Twelve observer-rated shared decision making behaviors on a 0 to 100 scale. Observer-scored, so it works on a transcript.",
  },
  {
    name: "Four Habits Coding Scheme",
    owner: "Krupat et al., published in full",
    note: "Twenty-three items on a five-point scale covering investing in the beginning, eliciting the patient's perspective, demonstrating empathy, and investing in the end.",
  },
  {
    name: "HCAHPS and CG-CAHPS item wording",
    owner: "CMS and AHRQ, public domain",
    note: "The exact questions a hospital is measured on, including listening carefully, explaining things in a way the patient could understand, and describing medication side effects.",
  },
  {
    name: "ACGME Milestones 2.0, interpersonal and communication skills",
    homepageName: "ACGME Milestones 2.0",
    featured: true,
    owner: "ACGME, published per specialty",
    note: "The subcompetency language a Clinical Competency Committee already uses. Cases map to it; scores read in the same words as the committee's own report.",
  },
  {
    name: "CMS community health integration and navigation competencies",
    owner: "CMS, CY2024 Physician Fee Schedule rule",
    note: "Seven named competencies for auxiliary personnel, the first of which is patient and family communication. CMS names them and names no curriculum, assessment, or passing standard.",
  },
]

export function getFeaturedFrameworks(): PublishedFramework[] {
  return publishedFrameworks.filter((framework) => framework.featured)
}
