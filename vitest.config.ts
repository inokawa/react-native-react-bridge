import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    root: "src",
    environment: "node",
    clearMocks: true,
  },
});
