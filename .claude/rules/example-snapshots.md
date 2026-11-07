---
paths:
  - "lib/examples/**"
  - "public/examples/**"
---

# Example snapshots

- Example files in `lib/examples/` are snapshots of real ClinicalSim encounters, registered in `lib/examples/index.ts`. They are the site's strongest first-hand material, so keep their transcripts, rubric rationale, and learner quotes verbatim.
- `scripts/snapshot-example.mjs` in the `clinical-sim-app-deux` repo builds them, and it reads staging only.
- A production conversation (a `platform.clinicalsim.ai` link) is not in staging. Read it through the Supabase MCP on `ClinicalSim-Prod` inside `begin read only; ... commit;` and assemble the file with the script's logic. The production storage bucket is private, so ask Ben for the recording. Mark the file header `// Source: production conversation <id>`.
- On a re-snapshot, keep the hand-edited copy fields (`title`, `metaTitle`, `summary`, briefing text) and replace dashes the way the existing files do. When a run replaces an earlier recording, name the new audio `audio-<first 8 chars of the conversation id>.mp3`.
- Example pages emit AudioObject schema from the snapshot through `components/audio-object-schema.tsx`. See `.claude/rules/seo-and-schema.md` for the `absolute` title rules that examples follow.
