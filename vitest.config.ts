import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    passWithNoTests: true,
    dir: "tests",
    coverage: {
      include: ["src/domain/**/*.{ts,tsx}"],
      exclude: ["src/domain/**/index.{ts,tsx}", "src/domain/gateways/**/*.{ts,tsx}"],
    },
  },
});
