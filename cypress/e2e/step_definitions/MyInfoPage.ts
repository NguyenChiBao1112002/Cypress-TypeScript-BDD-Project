import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

Given("I open the My Info page", () => {
  LoginPage.visit();
  LoginPage.login();
  cy.wait(4000);

  cy.contains("span.oxd-main-menu-item--name", "My Info").click();
  cy.wait(2000);
});


When("the user updates their name to {string}", (fullName: string) => {
  const [first, middle, last] = fullName.split(" ");
  cy.get("input[name='firstName']", { timeout: 10000 }).should('be.visible');
  cy.get("input[name='firstName']").clear().type(first);
  cy.get("input[name='middleName']").clear().type(middle);
  cy.get("input[name='lastName']").clear().type(last);
});

When("updates employee ID to {string}", (empId: string) => {
  cy.get("label:contains('Employee Id')")
    .parent()
    .next()
    .find("input")
    .clear()
    .type(empId);
});

When("updates other ID to {string}", (otherId: string) => {
  cy.get("label:contains('Other Id')")
    .parent()
    .next()
    .find("input")
    .clear()
    .type(otherId);
});

When("sets the driver's license number to {string}", (license: string) => {
  cy.get("label:contains(\"Driver's License Number\")")
    .parent()
    .next()
    .find("input")
    .clear()
    .type(license);
});

When("sets nationality to {string}", (nationality: string) => {
  cy.get("label:contains('Nationality')")
    .parent()
    .next()
    .click();
  cy.contains(".oxd-select-dropdown > div", nationality).click();
});

When("sets marital status to {string}", (status: string) => {
  cy.get("label:contains('Marital Status')")
    .parent()
    .next()
    .click();
  cy.contains(".oxd-select-dropdown > div", status).click();
});

When("selects gender as {string}", (gender: string) => {
  const genderValue = gender === "Male" ? "1" : "2";
  cy.get(`input[type='radio'][value='${genderValue}']`).check({ force: true });
});

When("clicks the Save button", () => {
  cy.contains("button", "Save").click();
});

Then("the form should be submitted successfully", () => {
  // Adjust this to check for your system's actual success message
  cy.get(".oxd-toast").should("contain.text", "Success");
});
