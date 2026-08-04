import { defineConfig } from "vitest/config"

export default defineConfig({
  // Resolves the `@/*` alias out of tsconfig.json. Vite does this natively
  // now, so no vite-tsconfig-paths plugin is needed.
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
})
