import createnewmealplanPage from '../pages/createnewmealplanPage.js'
const createnewmealplan = new createnewmealplanPage();

Cypress.Commands.add('createnewmealplan', (data, uniqueId) => {

    

    createnewmealplan.createnewmealplanBtn().click()
    createnewmealplan.clickcreateBtn().should('be.disabled')
    createnewmealplan.assignuser().type(data.userassignedformealplan)

    createnewmealplan.selectoption().each(function ($ele, index, $list) {

        if ($ele.text().includes("Admin")) {

            cy.wrap($ele).click()
           // cy.wait(2000)

        }
        else {
            cy.log($ele.text())
        }
    })

    createnewmealplan.mealplannameEnInput().type(uniqueId)
    createnewmealplan.clickcreateBtn().should('be.enabled')
    createnewmealplan.mealplannameFrInput().type(data.mealplannameFr)
    createnewmealplan.mealplandescriptionEnInput().type(data.mealplandescriptionEn)
    createnewmealplan.mealplandescriptionFrInput().type(data.mealplandescriptionFr)
    createnewmealplan.addTagInput().type(data.addTag)
    createnewmealplan.clickcreateBtn().click()
    cy.wait(1000)
    cy.contains(uniqueId).should("exist");
    
})