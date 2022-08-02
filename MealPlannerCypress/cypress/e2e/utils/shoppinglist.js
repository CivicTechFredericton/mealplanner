import loginPage from '../pages/loginPage.js'
const login = new loginPage();
import logoutPage from '../pages/logoutPage.js'
const logout = new logoutPage();
import shoppinglistPage from '../pages/shoppinglistPage.js'
const shoppinglist = new shoppinglistPage();


// import shoppinglistPage from '../pages/shoppinglistPage.js'
// const shoppinglist = new shoppinglistPage();

Cypress.Commands.add('shoppinglist', () => {
    

    shoppinglist.shoppinglistIcon().click({ multiple: true })
    cy.url().should('include', '/shopping-list')
})