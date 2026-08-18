import nextConfig from "eslint-config-next"

const eslintConfig = [
  // Flat config stopped ignoring dot-directories by default in ESLint 9, so
  // anything generated under a dotfolder now gets linted. Agent worktrees under
  // .claude/worktrees each carry their own .next build output, and linting that
  // compiled JS produced hundreds of errors that had nothing to do with our
  // source. Build output and local tooling directories are never our code.
  {
    ignores: [
      ".claude/**",
      ".playwright-mcp/**",
      ".vercel/**",
      "**/.next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  ...nextConfig,
]

export default eslintConfig
