import createNutritionPage from "../Pages/createNutritionPage";
const createNutrition = new createNutritionPage();

Cypress.Commands.add('createNutritionList', (data) => {

    createNutrition.clickNutritiononMenu().click()
    cy.url().should('include', '/nutrition')
    createNutrition.clickCreateBtn().click()
    cy.url().should('include', '/nutrition/create')
    createNutrition.selectNutritionTypeProduct().click()
    createNutrition.InputNutritionableID().type(data.InputNutritionable)
    
    createNutrition.SelectNutritionableID().each(function ($ele, index, $list) {
        if($ele.text().includes("Bread")) {
            cy.wrap($ele).click()
        }
        else {
            cy.log($ele.text())
        }
    })
    createNutrition.InputServingSize().type(data.Servingsize)
    createNutrition.InputServingSizeUnit().type(data.ServingSizeUnit)
    createNutrition.InputservingSizeText().type(data.ServingSizeText)
    createNutrition.InputCalories().type(data.Calories)
    createNutrition.InputTotalFat().type(data.TotalFat)
    createNutrition.InputTotalFatUnit().type(data.TotalFatUnit)
    createNutrition.InputTotalFatPercent().type(data.TotalFatPercent)
    createNutrition.InputSaturatedFat().type(data.SaturatedFat)
    createNutrition.InputSaturatedFatUnit().type(data.SaturatedFatUnit)
    createNutrition.InputSaturatedFatPercent().type(data.SaturatedFatPercent)
    createNutrition.InputCholestrol().type(data.Cholestrol)
    createNutrition.InputCholestrolUnit().type(data.CholestrolUnit)
    createNutrition.InputDietaryFibre().type(data.DietaryFibre)
    createNutrition.InputProtein().type(data.Protein)
    createNutrition.InputVitaminA().type(data.VitaminA)
    createNutrition.InputVitaminC().type(data.VitaminC)
    createNutrition.InputIron().type(data.Iron)
    createNutrition.clickSaveBtn().click()
    cy.contains("Element created").should("be.visible")


});

Cypress.Commands.add('exportNutrition', (data) => {
    createNutrition.clickNutritiononMenu().click()
    cy.url().should('include', '/nutrition')
    createNutrition.clickExport().click()
    cy.verifyDownload('nutrition', {contains:true})
});