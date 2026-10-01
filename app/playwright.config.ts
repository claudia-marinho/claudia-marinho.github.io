import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:4173",
    channel: "msedge",
    // Keep useful diagnostics only when a test fails.
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    // Exercise the same built files that GitHub Pages publishes.
    command: "npm run build && npm run preview -- --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});
