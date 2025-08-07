import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { allureCypress } from "allure-cypress/reporter";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

export default defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    env: {
      loginPath: "/web/index.php/auth/login",
      stepDefinitions: "cypress/e2e/step_definitions/**/*.ts",
    },
    async setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Custom task để đọc file PDF
      on("task", {
        readPDF({ type }: { type: "actual" | "expected" }) {
          const downloadsFolder = config.downloadsFolder;
          const filePath =
            type === "actual"
              ? path.join("cypress", "downloads-mock", "actualPDFfile.pdf")
              : path.join("cypress", "fixtures", "PDFs", "expectedPDFfile.pdf");

          const fileBuffer = fs.readFileSync(filePath);
          return pdf(fileBuffer).then((data) => data.text.trim());
        },
      });

      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      on("after:run", () => {
        const resultsDir = path.join(__dirname, "allure-results");

        if (!fs.existsSync(resultsDir)) {
          fs.mkdirSync(resultsDir, { recursive: true });
        }

        // 1. environment.properties
        const environmentContent = `
          Browser=Chrome
          BaseURL=${config.baseUrl}
          Environment=Production
          Tester="Bao Chi Nguyen"
          `.trim();

        fs.writeFileSync(
          path.join(resultsDir, "environment.properties"),
          environmentContent,
          "utf8"
        );

        // 2. categories.json
        const categories = [
          {
            name: "Assertion Error",
            matchedStatuses: ["failed"],
            messageRegex: ".*AssertionError.*",
          },
          {
            name: "Timeout",
            matchedStatuses: ["failed"],
            messageRegex: ".*Timed out.*",
          },
          {
            name: "Element Not Found",
            matchedStatuses: ["failed"],
            messageRegex: ".*expected .* to exist.*",
          },
        ];

        fs.writeFileSync(
          path.join(resultsDir, "categories.json"),
          JSON.stringify(categories, null, 2),
          "utf8"
        );

        // 3. executor.json
        const executor = {
          name: "Auto Test",
          type: "Automation",
          url: config.baseUrl, 
          buildOrder: 1,
          buildUrl: config.baseUrl,
          reportUrl: "http://localhost/allure-report",
        };

        fs.writeFileSync(
          path.join(resultsDir, "executor.json"),
          JSON.stringify(executor, null, 2),
          "utf8"
        );

        console.log("Allure metadata files created in allure-results/");
      });


      return config;
    },
    specPattern: "cypress/e2e/**/*.feature",
    downloadsFolder: "cypress/downloads",
    screenshotsFolder: "cypress/screenshots",
  },
});
