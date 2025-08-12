import { Given, When, Then, DataTable} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

Given("I open the admin page", () => {
  LoginPage.visit();
    LoginPage.login();
    cy.wait(4000);
  
    cy.contains("span.oxd-main-menu-item--name", "Admin").click();
    cy.wait(2000);
});

When("I download the admin report PDF", () => {
  cy.log("Download PDF here");
  cy.wait(3000); 
  cy.log("Downloaded successfully")
});

Then("The downloaded PDF should exactly match the expected file", () => {
  cy.task("readPDF", { type: "actual" }).then((actualText) => {
    cy.task("readPDF", { type: "expected" }).then((expectedText) => {
      expect(actualText).to.eq(expectedText);
    });
  });
});

Then("The downloaded PDF should contain the expected content", (datatable: DataTable) => {
  datatable.hashes().forEach((element)=>{
    cy.task("readPDF", {type: "acxtual"}).then((actualText) => {
        expect(actualText).to.include(element.expectedcontent);
    });
  });
});

When('I enter Username as {string}', (username: string) => {
  cy.get('label:contains("Username")')
    .parent()
    .parent()
    .find('input.oxd-input')
    .clear()
    .type(username);
});

When('I select User Role as {string}', (role: string) => {
  cy.get('label:contains("User Role")')
    .parent()
    .parent()
    .find('.oxd-select-text')
    .click();
  cy.get('.oxd-select-dropdown').contains(role).click();
});

When('I enter Employee Name as {string}', (employeeName: string) => {
  cy.get('label:contains("Employee Name")')
    .parent()
    .parent()
    .find('input[placeholder="Type for hints..."]')
    .clear()
    .type(employeeName);
  // Chọn suggestion đầu tiên
  cy.get('.oxd-autocomplete-dropdown')
    .find('.oxd-autocomplete-option')
    .first()
    .click();
});

When('I select Status as {string}', (status: string) => {
  cy.get('label:contains("Status")')
    .parent()
    .parent()
    .find('.oxd-select-text')
    .click();
  cy.get('.oxd-select-dropdown').contains(status).click();
});

// When('I click on Search button', () => {
//   cy.get('button[type="submit"]').contains('Search').click();
// });

Then('I should see Users matching the entered criteria', () => {
  cy.get('.oxd-table-body').find('.oxd-table-row').should('have.length.at.least', 1);
});
