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
  clinicalCommunicationIntelligence: "2026-10-11",
  compare: "2026-09-02",
  contact: "2026-10-11",
  // Licensing section became engagements with no billing basis; added the
  // "How this fits with what you already run" section (2026-10-06).
  evaluation: "2026-10-11",
  evidence: "2026-10-11",
  examples: "2026-10-11",
  // Licensing answer reworded without a billing basis; three program-fit
  // objections added (2026-10-06).
  faq: "2026-10-06",
  frameworks: "2026-09-03",
  glossary: "2026-08-18",
  // Category eyebrow, leader clause, single CTA, and the 29-pilot line.
  home: "2026-10-11",
  // Added nursing leadership to the roles list (2026-10-14).
  healthSystems: "2026-10-14",
  medicalEducation: "2026-10-11",
  // Added the communication remediation plan article to the listing.
  insights: "2026-09-24",
  // Rewritten by the 2026-09-03 ACGME claim removal (fadf4b5), which replaced
  // the milestone and Dreyfus-scale language across several answers.
  medicalEducatorFaq: "2026-09-03",
  methodology: "2026-09-03",
  // Gated download page for the nurse turnover brief (2026-10-12).
  nursingTurnoverBrief: "2026-10-12",
  privacy: "2026-03-16",
  research: "2026-09-03",
  solutions: "2026-10-11",
  // Same 2026-09-03 commit.
  trust: "2026-09-03",
} as const
