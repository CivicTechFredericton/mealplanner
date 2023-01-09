import loginPage from '../pages/loginPage.js'
const login = new loginPage();
import logoutPage from '../pages/logoutPage.js'
const logout = new logoutPage();
import cancelcreatingnewmealplanPage from '../pages/cancelcreatingnewmealplanPage.js';
const cancelcreatingnewmealplan = new cancelcreatingnewmealplanPage();

Cypress.Commands.add('cancelcreatingnewmealplan', (data, uniqueId) => {
    
    cancelcreatingnewmealplan.createnewmealplanBtn().click()

    cancelcreatingnewmealplan.assignuser().type(data.userassignedformealplan)

    cancelcreatingnewmealplan.selectoption().each(function ($ele, index, $list) {



        if ($ele.text().includes("Admin")) {

            cy.wrap($ele).click()
            cy.wait(2000)

        }
        else {
            cy.log($ele.text())
        }
    })
    cancelcreatingnewmealplan.mealplannameEnInput().type(data.mealplannameEn)
    cancelcreatingnewmealplan.mealplannameFrInput().type(data.mealplannameFr)
    cancelcreatingnewmealplan.mealplandescriptionEnInput().type(data.mealplandescriptionEn)
    cancelcreatingnewmealplan.mealplandescriptionFrInput().type(data.mealplandescriptionFr)
    cancelcreatingnewmealplan.addTagInput().type(data.addTag)
    cancelcreatingnewmealplan.clickcancelBtn().click()
   // cy.contains(uniqueId).should("not.exist");

})
