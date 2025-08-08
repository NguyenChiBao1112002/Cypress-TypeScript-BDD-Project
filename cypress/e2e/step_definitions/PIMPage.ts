import { Given, When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

Given("I open the PIM page", () => {
  LoginPage.visit();
  LoginPage.login();
  cy.wait(4000);
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
    cy.wait(4000);
    cy.contains("h6.orangehrm-main-title", "Personal Details").should("be.visible");
    cy.wait(2500);
    cy.screenshot({capture: "viewport"});

});

When ("I enter Emloyee Information to search Employee", (datatable: DataTable)=> {
    datatable.hashes().forEach((element) => {
        cy.contains("span.oxd-main-menu-item--name", "PIM").click();
        cy.wait(2000);

        // Enter Employee Name
        if(element.empl_name){
            cy.get('label').contains('Employee Name').parents('.oxd-input-group').find('input').type(element.empl_name);
        }
        
        // Enter Employee Id
        if(element.empl_id){
            cy.get('label').contains('Employee Id').parents('.oxd-input-group').find('input').type(element.empl_id);
        }

        // Enter Supervisor Name
        if(element.supervisor_name){
            cy.get('label').contains('Supervisor Name').parents('.oxd-input-group').find('input').type(element.supervisor_name);
        }
    
        // Select Job Title
        if(element.job_title){
            cy.get('.oxd-input-group').contains('Job Title').parents('.oxd-input-group').find('.oxd-select-text').click();
            cy.get('.oxd-select-dropdown').contains(element.job_title).click();
        }
        
        // Select Sub Unit
        if(element.sub_unit){
            cy.get('.oxd-input-group').contains('Sub Unit').parents('.oxd-input-group').find('.oxd-select-text').click();
            cy.get('.oxd-select-dropdown').contains(element.sub_unit).click();
        }
    });
});

When ("I click on Search button", ()=> {
    cy.wait(1500);
    cy.get('button').contains('Search').click();
});

Then ("I should see employees matching the entered criteria", () => {
    cy.wait(5000)
    console.log("Results matched the entered criteria")
});

