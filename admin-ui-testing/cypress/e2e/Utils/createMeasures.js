import createMeasuresPage from "../Pages/createMeasuresPage";
const createMeasures = new createMeasuresPage();

Cypress.Commands.add('createMeasureOfProduct', (data) => {

    createMeasures.clickMeasuresonMenu().click()
    createMeasures.clickCreateBtn().click()
    cy.url().should('include', '/create')
    createMeasures.InputmeasuringQunatity().type(data.quantity)
    createMeasures.InputmeasuringUnit().type(data.unit)
   // createMeasures.SelectProduct().select('296').should('have.value', '296')
    createMeasures.SelectMeal().select('Soys Chunks Cutlet').should('have.value', 'Soys Chunks Cutlet')
    createMeasures.clickSaveBtn().click()
    cy.contains("Element created").should("be.visible")

});

Cypress.Commands.add('exportMeasures', (data) => {
    createmeal.clickExport().click()
   
  })
