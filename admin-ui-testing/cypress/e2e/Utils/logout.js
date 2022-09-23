import loginPage from '../Pages/loginPage.js';
const login = new loginPage();
import logoutPage from '../pages/logoutPage.js'
const logout = new logoutPage();

Cypress.Commands.add('logout', () => {

    logout.clickAccountCircleIcon().click()
    cy.wait(1000)
    logout.clicklogout().click({force:true})
    login.usernameInput().should('be.visible')
})