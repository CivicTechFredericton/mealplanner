import loginPage from '../pages/loginPage.js'
const login = new loginPage();
import logoutPage from '../pages/logoutPage.js'
const logout = new logoutPage();

Cypress.Commands.add('logout', () => {

    logout.logoutButton().click()
    login.usernameInput().should('be.visible')
})