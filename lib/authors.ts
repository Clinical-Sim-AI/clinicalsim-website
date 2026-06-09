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
   * verified URLs — never fabricate. Omit when none are available.
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
    id: "lauren-rissman",
    name: "Lauren Rissman",
    credentials: "MD",
    title: "Chief Medical Officer, ClinicalSim",
    bio: "Dr. Lauren Rissman is a pediatric critical care physician specializing in palliative care, communication science, and disparities in critical illness. Her research focuses on scalable, evidence-based approaches to communication training for high-stakes clinical conversations.",
    colorVariant: "navy",
  },
]

export function getAuthorById(id: string): Author | undefined {
  return authors.find((author) => author.id === id)
}

export function getAllAuthors(): Author[] {
  return authors.filter((author) => author.id !== TEAM_AUTHOR_ID)
}
