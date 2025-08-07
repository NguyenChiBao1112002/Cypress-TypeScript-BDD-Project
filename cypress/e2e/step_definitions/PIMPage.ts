import { Given, When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

Given("I open the PIM page", () => {
  LoginPage.visit();
  LoginPage.login();
  cy.wait(2000);
});

When ("I add employee in PIM page", (datatable: DataTable) => {
    datatable.hashes().forEach((element)=>{
        cy.contains("span.oxd-main-menu-item--name", "PIM").click();
        cy.wait(2000);

        // Click on Add button to add Employee
        cy.contains("button.oxd-button--secondary", "Add").click();
        cy.contains("h6.orangehrm-main-title", "Add Employee").should("be.visible");
        cy.wait(4000);

        // Enter Employee Full Name Fields
        if(element.firstname){
            cy.get("input.orangehrm-firstname").type(element.firstname);
        }
        
        if(element.middlename){
            cy.get("input.orangehrm-middlename").type(element.middlename);
        }

        if(element.lastname){
            cy.get("input.orangehrm-lastname").type(element.lastname);
        }
        
        // Enter Employee Id
        cy.contains("label", "Employee Id").parent().next().find("input").type(element.employeeID);                            

        // Click on Save button
        cy.contains("button.oxd-button--secondary", "Save").click();

        // Check if Toast Message is displayed
        cy.get("#oxd-toaster_1").should("be.visible");
        cy.screenshot({capture: "viewport"});
    });
});

Then ("The system will switch to Personal Details Page", () => {
    cy.contains("h6.orangehrm-main-title", "Personal Details").should("be.visible");
    cy.wait(2500);
    cy.screenshot({capture: "viewport"});

});


