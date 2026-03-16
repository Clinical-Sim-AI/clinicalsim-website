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
    id: "vinod-havalad",
    name: "Vinod Havalad, MD",
    credentials: "MD",
    title: "Former Director of Simulation, Advocate Health System",
    bio: "Vinod designed simulation programs at one of the largest health systems in the Midwest. He brings direct experience building and running simulation centers that serve residency programs across multiple specialties.",
    colorVariant: "navy",
  },
  {
    id: "lauren-rissman",
    name: "Lauren Rissman, PhD",
    credentials: "PhD",
    title: "Communication Skills Researcher",
    bio: "Lauren is a published researcher in clinical communication with multiple peer-reviewed papers. Her research background means the platform's assessment frameworks are grounded in validated communication science, not ad hoc rubrics.",
    colorVariant: "warm",
  },
  {
    id: "gillian-brennan",
    name: "Gillian Brennan, MD",
    credentials: "MD",
    title: "Director of Simulation, University of Chicago",
    bio: "Gillian currently runs simulation at one of the country's top academic medical centers. Her role means ClinicalSim was designed by someone who lives the challenges program directors face daily — not by engineers guessing at what educators need.",
    colorVariant: "navy",
  },
  {
    id: "ben-conway",
    name: "Ben Conway",
    title: "Co-Founder & CEO",
    bio: "Ben leads ClinicalSim's business operations and market strategy. His focus is translating the team's clinical and educational expertise into a product that serves the institutions that need it.",
    colorVariant: "blue",
  },
  {
    id: "will-meyer",
    name: "Will Meyer",
    title: "Co-Founder & CTO",
    bio: "Will leads ClinicalSim's technical development, building the AI simulation platform that delivers voice-based clinical encounters at scale.",
    colorVariant: "blue",
  },
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
