import editandDeletetheMealPage from "../Pages/editandDeletetheMealPage";
const editandDeleteMeal = new editandDeletetheMealPage();

Cypress.Commands.add('EditMeal', (data) => {

    cy.get("table tbody tr").wait(1000).contains('tr', 'Cucumber Dill Salad').within(() => {

        //click 'Edit' of meal
        cy.contains("Edit").click({ force: true });
        cy.url().should('include', "/meals/")
        cy.wait(1000)
        editandDeleteMeal.InputMealCode().clear().type(data.editMealcode)
        editandDeleteMeal.InputMealNameEn().clear().type(data.editMealNameEn)
        editandDeleteMeal.InputMealNameFr().type(data.editnameFr)
        editandDeleteMeal.InputMealDescriptionEn().type(data.editMealDescriptionEn)
        editandDeleteMeal.InputMealDescriptionFr().type(data.editMealDescriptionFr)
        editandDeleteMeal.InputServes().clear().type(data.editServes)
        editandDeleteMeal.InputCookingDuration().clear().type(data.editCookingDuration)
        editandDeleteMeal.clickSave().click()
        cy.contains("Element updated").should('be.visible')

    })
});

Cypress.Commands.add('DeleteMeal', (data) => {

    cy.get("table tbody tr").wait(1000).contains('tr', 'Cucumber Dill Salad').within(() => {

        //Delete the meal
        editandDeleteMeal.selectcheckbox().click({ force: true })

    })
})