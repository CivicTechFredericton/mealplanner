import viewMicroandMacroNutrientsPage from "../Pages/viewMicroandMacroNutrientsPage";
const viewMicroandMacroNutrients = new viewMicroandMacroNutrientsPage();

//Click On ExpandMoreIcon of a NutritionList
Cypress.Commands.add('ClickOnExpandMoreIconOfaNutritionList', () => {
    viewMicroandMacroNutrients.clickNutritiononMenu().click()

    cy.get("table tbody tr").wait(1000).contains('tr', 'coriander coconut chutney').within(() => {

        //click on ExpandMoreIcon to view Micro and Macro Nutrients
        // cy.get('td').eq(0).click()  //click on Expandmore
        viewMicroandMacroNutrients.clickexpandmoreIcon().click()
    })
    
});

//View Micro and Macro NutritionList Of a Selected Nutrition
Cypress.Commands.add('viewMicroMacroNutrientsList', () => {
    
        viewMicroandMacroNutrients.clickMicroNutrients().click()
        viewMicroandMacroNutrients.clickMacroNutrients().click()
  
});