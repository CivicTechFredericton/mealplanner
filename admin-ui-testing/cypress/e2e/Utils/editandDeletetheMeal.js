import editandDeletetheMealPage from "../Pages/editandDeletetheMealPage";
const editandDeleteMeal = new editandDeletetheMealPage();

//Open the Meal Edit
Cypress.Commands.add('OpenMealToEdit', (data) => {
    
    cy.get("table tbody tr").wait(1000).contains('tr', 'Cucumber Dill Salad').within(() => {

        //click 'Edit' of meal
        cy.contains("Edit").click({ force: true });
        cy.url().should('include', "/meals/")

    })
});

//Changes the Meal details
Cypress.Commands.add('EditMeal', (data) => {

        editandDeleteMeal.InputMealCode().clear().type(data.editMealcode)
        editandDeleteMeal.InputMealNameEn().clear().type(data.editMealNameEn)
        editandDeleteMeal.InputMealNameFr().type(data.editnameFr)
        editandDeleteMeal.InputMealDescriptionEn().type(data.editMealDescriptionEn)
        editandDeleteMeal.InputMealDescriptionFr().type(data.editMealDescriptionFr)
        editandDeleteMeal.InputServes().clear().type(data.editServes)
        editandDeleteMeal.InputCookingDuration().clear().type(data.editCookingDuration)
        editandDeleteMeal.clickSave().click()
        cy.contains("Element updated").should('be.visible')

});

//Select Checkbox to Delete Meal
Cypress.Commands.add('SelectCheckboxToDeleteMeal', (data) => {

    cy.get("table tbody tr").wait(1000).contains('tr', 'Cucumber Dill Salad').within(() => {
        
         //Select checkbox of User and click Delete
         editandDeleteMeal.selectcheckbox().click({ force: true })

    })
})

//Click CloseIcon To Select UnSelect Checkbox of a Selected Nutrition
Cypress.Commands.add('UnSelectCheckboxOfaMeal', (data) => {
        
         //clear(UnSelect) Delete Users
         editandDeleteMeal.clickcloseIcon().click()
});

//Click DeleteIcon To Delete the Selected Meal
Cypress.Commands.add('ClickDeleteIconToDeleteaMeal', (data) => {

         editandDeleteMeal.clickDeleteIcon().click()
         cy.contains("Element deleted").should('be.visible')

});

