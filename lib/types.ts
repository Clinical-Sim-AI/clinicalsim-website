export interface StatItem {
  value: string
  label: string
  source?: string
  variant: "accent" | "navy" | "blue" | "light-blue"
}

export interface EvidenceItem {
  studyTitle: string
  journal: string
  year: string
  summary: string
  link?: string
  badges?: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Citation {
  authors?: string
  title: string
  source: string
  year: string
  url?: string
  doi?: string
}
