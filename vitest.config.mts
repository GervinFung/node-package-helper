import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    env: {
      NODE_PACKAGE_HELPER: "true",
    },
  },
});
