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
  // Mission statement added to the page on 2026-09-03.
  about: "2026-09-03",
  audiences: "2026-09-02",
  compare: "2026-09-02",
  contact: "2026-09-02",
  evaluation: "2026-09-02",
  examples: "2026-09-02",
  faq: "2026-09-03",
  frameworks: "2026-09-03",
  glossary: "2026-08-18",
  home: "2026-09-03",
  // Three posts left the listing and a fourth was retitled and
  // re-described in the 2026-09-03 consolidation.
  insights: "2026-09-03",
  // Rewritten by the 2026-09-03 ACGME claim removal (fadf4b5), which replaced
  // the milestone and Dreyfus-scale language across several answers.
  medicalEducatorFaq: "2026-09-03",
  methodology: "2026-09-03",
  privacy: "2026-03-16",
  research: "2026-09-03",
  solutions: "2026-09-02",
  // Same 2026-09-03 commit.
  trust: "2026-09-03",
} as const
