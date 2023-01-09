import createMeasuresPage from "../Pages/createMeasuresPage";
const createMeasures = new createMeasuresPage();

//Create Measures for a product
Cypress.Commands.add('createMeasureOfProduct', (data) => {

    createMeasures.clickMeasuresonMenu().click()
    cy.url().should('include', '/measures')
    createMeasures.clickCreateBtn().click()
    cy.url().should('include', '/measures/create')
    createMeasures.InputmeasuringQunatity().type(data.quantity)
    createMeasures.InputmeasuringUnit().type(data.unit)
    createMeasures.InputProduct().type(data.Product)
    createMeasures.selectProduct().each(function ($ele, index, $list){
        if($ele.text().includes("Nutrela 100% Vegetarian Soya Granule")) {
            cy.wrap($ele).click()
        }
        else {
            cy.log($ele.text())
        }
    })
    createMeasures.InputMeal().type(data.Meal, {force:true})
    createMeasures.SelectMeal().each(function ($ele, index, $list){
        if($ele.text().includes("coriander coconut chutney")) {
            cy.wrap($ele).click()
        }
        else {
            cy.log($ele.text())
        }
    })
    createMeasures.clickSaveBtn().click({force:true})
    //cy.contains("Element created").should("be.visible")

});

//Download Measures
Cypress.Commands.add('exportMeasures', (data) => {

    createMeasures.clickMeasuresonMenu().click()
    cy.url().should('include', '/measures')
    createMeasures.clickExport().click()
    //verify download by file extension
    cy.verifyDownload('.csv', {contains:true})

})
