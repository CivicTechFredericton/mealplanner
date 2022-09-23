import loginPage from "../Pages/loginPage";
const login = new loginPage();

Cypress.Commands.add('login', (data) => {
    cy.visit('/')
    login.usernameInput().type(data.username)
    login.passwordInput().type(data.password)
    login.loginBtn().click({ multiple: true })
    cy.url().should('include', '/meals') 
})