import loginPage from '../pages/loginPage.js'
const login = new loginPage();
import logoutPage from '../pages/logoutPage.js'
const logout = new logoutPage();
import createnewmealplanPage from '../pages/createnewmealplanPage.js';
const createnewmealplan = new createnewmealplanPage();

Cypress.Commands.add('logout', () => {

    logout.logoutButton().click()
  //  login.usernameInput().should('be.visible')
})