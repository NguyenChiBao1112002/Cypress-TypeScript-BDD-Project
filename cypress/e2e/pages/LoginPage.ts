class LoginPage{
    visit(){
        const baseUrl = Cypress.config("baseUrl");
        const loginPath = Cypress.env("loginPath"); 
        cy.visit(`${baseUrl}${loginPath}`);
        cy.wait(5000);
    }

    fillUsername(username: string){
        cy.get("input[name='username']").clear();
        if(username){
            cy.get("input[name='username']").type(username);
        }
    }
    
    fillPassword(password: string){
        cy.get("input[name='password']").clear();
        if(password){
            cy.get("input[name='password']").type(password);
        }
    }

    clickOnLoginButton(){
        cy.get("button[type='submit']").click();
    }

    login(){
        this.fillUsername(Cypress.env("username"));
        this.fillPassword(Cypress.env("password"));
        this.clickOnLoginButton();
    }

    loginWithCredentialsCheck(username: string, password: string){
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickOnLoginButton();
    }

    
}

export default new LoginPage();