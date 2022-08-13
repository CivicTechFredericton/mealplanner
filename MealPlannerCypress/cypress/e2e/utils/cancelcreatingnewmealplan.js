import loginPage from '../pages/loginPage.js'
const login = new loginPage();
import logoutPage from '../pages/logoutPage.js'
const logout = new logoutPage();
import cancelcreatingnewmealplanPage from '../pages/cancelcreatingnewmealplanPage.js';
const cancelcreatingnewmealplan = new cancelcreatingnewmealplanPage();

Cypress.Commands.add('cancelcreatingnewmealplan', (data) => {
    
    cancelcreatingnewmealplan.createnewmealplanBtn().click()
    cancelcreatingnewmealplan.mealplannameEnInput().type(data.mealplannameEn)
    cancelcreatingnewmealplan.mealplannameFrInput().type(data.mealplannameFr)
    cancelcreatingnewmealplan.mealplandescriptionEnInput().type(data.mealplandescriptionEn)
    cancelcreatingnewmealplan.mealplandescriptionFrInput().type(data.mealplandescriptionFr)
    cancelcreatingnewmealplan.addTagInput().type(data.addTag)
    cancelcreatingnewmealplan.clickcancelBtn().click()

})
