import editandDeletetheNutritionPage from "../Pages/editandDeletetheNutritionPage";
const editandDeleteNutrition = new editandDeletetheNutritionPage();

Cypress.Commands.add('EditNutritionList', (data) => {
    editandDeleteNutrition.clickNutritiononMenu().click()

    cy.get("table tbody tr").wait(1000).contains('tr', 'coriander coconut chutney').within(() => {

        //click 'Edit' of Nutrients
        cy.contains("Edit").click({ force: true });
        cy.url().should('include', "/nutrition/")
        cy.wait(1000)
        editandDeleteNutrition.InputServingSize().clear().type(data.editServingsize)
        editandDeleteNutrition.InputCalories().clear().type(data.editCalories)
        editandDeleteNutrition.clickSaveBtn().click()
        // cy.contains("Element updated").should('be.visible')

    })
});

Cypress.Commands.add('DeleteNutitionList', () => {
    editandDeleteNutrition.clickNutritiononMenu().click()

    cy.get("table tbody tr").wait(1000).contains('tr', 'coriander coconut chutney').within(() => {

       
        //Delete the measures
        editandDeleteNutrition.selectcheckbox().click({ force: true })

    })

})

