import loginPage from '../pages/loginPage.js'
const login = new loginPage();
import logoutPage from '../pages/logoutPage.js'
const logout = new logoutPage();
import deletemealPage from '../pages/deletemealPage.js';
const deleteMeal = new deletemealPage();

Cypress.Commands.add('deleteMeal', () => {
    
    deleteMeal.clickdeleteBtn().click({multiple:true})
    
})