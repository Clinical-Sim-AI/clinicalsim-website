export interface Author {
  id: string
  name: string
  credentials?: string
  title: string
  bio: string
  colorVariant: "accent" | "navy" | "blue" | "light-blue"
  /**
   * Real off-site identity URLs (LinkedIn, ORCID, institutional profile) used
   * for the Person JSON-LD `sameAs`, strengthening E-E-A-T. Populate only with
   * verified URLs, never fabricate. A wrong `sameAs` tells search engines that
   * this person and some other page are the same human, which is worse than
   * omitting the field. Omit when none are available.
   */
  sameAs?: string[]
}

export const TEAM_AUTHOR_ID = "clinicalsim-team"

const authors: Author[] = [
  {
    id: TEAM_AUTHOR_ID,
    name: "ClinicalSim Team",
    title: "ClinicalSim",
    bio: "The ClinicalSim team combines expertise in medical simulation, clinical communication research, and healthcare technology.",
    colorVariant: "blue",
  },
  {
    id: "ben-conway",
    name: "Ben Conway",
    title: "Chief Executive Officer, ClinicalSim",
    bio: "Ben Conway is a second-time founder. He co-founded VNTANA and spent 14 years building it for customers including Johnson & Johnson, Pfizer, and Accenture, raising more than $18 million along the way. He works on ClinicalSim full time.",
    colorVariant: "accent",
  },
  {
    id: "lauren-rissman",
    name: "Lauren Rissman",
    credentials: "MD",
    title: "Chief Medical Officer, ClinicalSim",
    bio: "Dr. Lauren Rissman is a pediatric intensivist and palliative care physician. She is a named author on the Society of Critical Care Medicine's 2026 End-of-Life Care Guidelines and lead author of the review that found under 6% of a decade's PICU education research covered palliative care training, which is the gap ClinicalSim was built to close. She sits on the editorial board of Pediatric Critical Care Medicine.",
    colorVariant: "navy",
  },
  {
    id: "will-meyer",
    name: "Will Meyer",
    title: "Chief Technology Officer, ClinicalSim",
    bio: "Will Meyer co-founded Troops, which Salesforce acquired, and then spent two years architecting Salesforce AI infrastructure, including Slackbot.",
    colorVariant: "blue",
  },
  {
    id: "vinod-havalad",
    name: "Vinod Havalad",
    credentials: "MD",
    title: "Chief Clinical Partnerships Officer, ClinicalSim",
    bio: "Dr. Vinod Havalad is a pediatric critical care physician and Director of the Pediatric Critical Care Medicine Fellowship at Advocate Children's Hospital, where he has led physician education since 2012. He is the principal investigator of a national pediatric critical care simulation curriculum and an early voice on integrating generative AI into medical education.",
    colorVariant: "navy",
  },
  {
    id: "gillian-brennan",
    name: "Gillian Brennan",
    credentials: "MB BCh BAO",
    title: "VP of Clinical Research & Education, ClinicalSim",
    bio: "Dr. Gillian Brennan is an Associate Professor of Pediatrics at the University of Chicago, Program Director of the Neonatology Fellowship, Associate Program Director of the Pediatric Residency, and Director of Neonatal Simulation. Over fourteen years she has educated and supervised more than 500 clinicians.",
    colorVariant: "light-blue",
  },
  {
    id: "jacqueline-ponczek",
    name: "Jacqueline Ponczek",
    credentials: "MD, MS, FAAP",
    title: "VP of MedEd: Quality & Standards, ClinicalSim",
    bio: "Dr. Jacqueline W. Ponczek is a board-certified pediatrician and a Clinical Assistant Professor of Pediatrics in primary care at Northwestern University Feinberg School of Medicine and Ann & Robert H. Lurie Children's Hospital of Chicago. Her background in hospital-based medicine informs the simulation curricula she has designed and led since 2020 for learners at every level, from medical students to practicing physicians. She is a repeat recipient of Feinberg's Teaching Pin and a contributing author to McGraw Hill's Comprehensive Pediatric Hospital Medicine (2026).",
    colorVariant: "light-blue",
  },
]

export function getAuthorById(id: string): Author | undefined {
  return authors.find((author) => author.id === id)
}

export function getAllAuthors(): Author[] {
  return authors.filter((author) => author.id !== TEAM_AUTHOR_ID)
}
