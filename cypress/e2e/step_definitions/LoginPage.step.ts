import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

Given("I open the login page", () => {
    LoginPage.visit();
});

When("I login with valid credentials", () => {
    LoginPage.login();
});

When("I login with username {string} and password {string}", (username: string, password: string) => {
    LoginPage.loginWithCredentialsCheck(username, password);
});

// For VALID credentials
Then("I should see the dashboard", () => {
    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard").should("be.visible");
    cy.wait(5000);
    cy.screenshot({capture: "viewport"});
});

// For INVALID credentials
Then("I should see an error message {string}", (message: string) => {
    cy.wait(5000);
    cy.contains(message).should("be.visible");
    cy.screenshot({capture: "viewport"});
});

