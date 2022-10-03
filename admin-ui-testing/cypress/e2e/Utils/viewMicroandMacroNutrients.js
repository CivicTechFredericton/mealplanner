import viewMicroandMacroNutrientsPage from "../Pages/viewMicroandMacroNutrientsPage";
const viewMicroandMacroNutrients = new viewMicroandMacroNutrientsPage();

Cypress.Commands.add('viewMicroMacroNutrientsList', () => {
    viewMicroandMacroNutrients.clickNutritiononMenu().click()

    cy.get("table tbody tr").wait(1000).contains('tr', 'coriander coconut chutney').within(() => {

        //click on ExpandMoreIcon to view Micro and Macro Nutrients
        // cy.get('td').eq(0).click()  //click on Expandmore
        viewMicroandMacroNutrients.clickexpandmoreIcon().click()
        // cy.contains("MACRO NUTRIENTS").click()
        // cy.wait(1000)
        // cy.contains("Micro Nutrients").click()
        // cy.wait(1000)
     

    })
    
})