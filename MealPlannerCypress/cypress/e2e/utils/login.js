import loginPage from '../pages/loginPage.js'
const login = new loginPage();
import logoutPage from '../pages/logoutPage.js'
const logout = new logoutPage();
// import createnewmealplanPage from '../pages/createnewmealplanPage.js';
// const createnewmealplan = new createnewmealplanPage();

Cypress.Commands.add('login', (data) => {
    cy.visit('/')
    login.usernameInput().type(data.username)
    login.passwordInput().type(data.password)
    login.loginBtn().click({ multiple: true })


    cy.url().should('include', '/mealplans')
})