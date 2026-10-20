/**
 * Material-content dates shared by page schema and the sitemap.
 * Update a value only when the corresponding public page changes materially.
 *
 * Every static page's date belongs here. Nine of them used to be hardcoded
 * literals in app/sitemap.ts alongside the page's own separate constant, and
 * they had already drifted: /medical-educator-faq showed "Last updated July 7,
 * 2026" while the sitemap claimed 2026-08-10, and both were wrong after the
 * 2026-09-03 ACGME claim removal rewrote a third of its answers. A page's
 * WebPage `dateModified`, its visible "Last updated" line, and its sitemap
 * entry are the same fact, so they read it from the same place.
 */
export const PAGE_DATE_MODIFIED = {
  // Introduction and mission shortened; product sections combined.
  // Category line became "clinical communication intelligence" (2026-10-06).
  about: "2026-10-06",
  // Added the nursing leadership audience to the listing (2026-10-14).
  audiences: "2026-10-14",
  // New category page (2026-10-06).
  // Linked the health system cohort report (2026-10-20).
  clinicalCommunicationIntelligence: "2026-10-20",
  // Anonymized partner report, approved for publication 2026-10-20.
  cohortReport: "2026-10-20",
  compare: "2026-09-02",
  // New H1 and title; success message points to the cohort report (2026-10-20).
  contact: "2026-10-20",
  // Licensing section became engagements with no billing basis; added the
  // "How this fits with what you already run" section (2026-10-06).
  // Linked the cohort report from the engagement section (2026-10-20).
  evaluation: "2026-10-20",
  // Added "Find the answer for your role" and the cohort report (2026-10-20).
  evidence: "2026-10-20",
  // Linked the health system cohort report from the listing (2026-10-20).
  examples: "2026-10-20",
  // Licensing answer reworded without a billing basis; three program-fit
  // objections added (2026-10-06).
  faq: "2026-10-06",
  frameworks: "2026-09-03",
  glossary: "2026-08-18",
  // Category eyebrow, leader clause, single CTA, and the 29-pilot line.
  // Economics section and the cohort report link added (2026-10-20).
  home: "2026-10-20",
  // Added nursing leadership to the roles list (2026-10-14).
  // Linked the patient understanding and handoff use cases (2026-10-20).
  healthSystems: "2026-10-20",
  // New-cohort and wider-engagement answers added (2026-10-20).
  medicalEducation: "2026-10-20",
  // Added the communication remediation plan article to the listing.
  insights: "2026-09-24",
  // Rewritten by the 2026-09-03 ACGME claim removal (fadf4b5), which replaced
  // the milestone and Dreyfus-scale language across several answers.
  medicalEducatorFaq: "2026-09-03",
  methodology: "2026-09-03",
  // Gated download page for the nurse turnover brief (2026-10-12).
  nursingTurnoverBrief: "2026-10-14",
  privacy: "2026-03-16",
  research: "2026-09-03",
  // Patient understanding and handoffs use cases added (2026-10-20).
  solutions: "2026-10-20",
  // Same 2026-09-03 commit.
  trust: "2026-09-03",
} as const
