const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://computer-database.gatling.io/computers',
    specPattern: "cypress/e2e/testScenarios/**.*",
    defaultCommandTimeout: 3000,
    retries: 2,
  },
});
