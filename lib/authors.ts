export interface Author {
  id: string
  name: string
  credentials?: string
  title: string
  bio: string
  colorVariant: "warm" | "navy" | "blue" | "success"
}

export const TEAM_AUTHOR_ID = "clinicalsim-team"

const authors: Author[] = [
  {
    id: TEAM_AUTHOR_ID,
    name: "ClinicalSim.ai Team",
    title: "ClinicalSim.ai",
    bio: "The ClinicalSim.ai team combines expertise in medical simulation, clinical communication research, and healthcare technology.",
    colorVariant: "blue",
  },
]

export function getAuthorById(id: string): Author | undefined {
  return authors.find((author) => author.id === id)
}

export function getAllAuthors(): Author[] {
  return authors.filter((author) => author.id !== TEAM_AUTHOR_ID)
}
