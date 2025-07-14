import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      baseUrl: "http://localhost:3000" // Adjust the base URL as needed
      // implement node event listeners here
    },
  },
});
