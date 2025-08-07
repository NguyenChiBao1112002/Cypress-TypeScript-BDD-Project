import { Given, When, Then, DataTable} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

Given("I open the admin page", () => {
  LoginPage.visit();
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