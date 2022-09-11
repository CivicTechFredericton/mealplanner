import loginPage from '../pages/loginPage.js'
const login = new loginPage();
import logoutPage from '../pages/logoutPage.js'
const logout = new logoutPage();

Cypress.Commands.add('login', (data) => {
    cy.visit('/')
    login.usernameInput().type(data.username)
    login.passwordInput().type(data.password)
    login.loginBtn().click({ multiple: true })
    cy.url().should('include', '/mealplans')

    // cy.contains('Vegetarian').scrollIntoView()
    // cy.wait(3000)
    // login.clickexpandIcononmealplan().click({ multiple: true })
    // cy.contains('Non-veg').scrollIntoView()
    // cy.wait(2000)
})