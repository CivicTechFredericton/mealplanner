import editandDeletetheNutritionPage from "../Pages/editandDeletetheNutritionPage";
const editandDeleteNutrition = new editandDeletetheNutritionPage();

//Open Nutrition Edit
Cypress.Commands.add('OpenNutritionToEdit', () => {
    editandDeleteNutrition.clickNutritiononMenu().click()
    cy.url().should('include', '/nutrition')
    cy.get("table tbody tr").wait(1000).contains('tr', 'coriander coconut chutney').within(() => {

        //click 'Edit' of Nutrients
        cy.contains("Edit").click({ force: true });
        cy.url().should('include', "/nutrition/")

    })
});

//Changes Nutrition information
Cypress.Commands.add('EditNutritionList', (data) => {

    editandDeleteNutrition.selectNutritionTypeProduct().click()
    // editandDeleteNutrition.InputNutritionableID().type(data.editNutritionable)
    
    // editandDeleteNutrition.SelectNutritionableID().each(function ($ele, index, $list) {
    //     if($ele.text().includes("Bread")) {
    //         cy.wrap($ele).click()
    //     }
    //     else {
    //         cy.log($ele.text())
    //     }
    // })
    editandDeleteNutrition.InputServingSize().clear().type(data.editServingsize)
    editandDeleteNutrition.InputCalories().clear().type(data.editCalories)   
    editandDeleteNutrition.clickSaveBtn().click()
    cy.contains("Element updated").should('be.visible')

});

//Select Checkboc to Delete a Nutrition
Cypress.Commands.add('SelectCheckboxToDeleteaNutitionList', () => {
    editandDeleteNutrition.clickNutritiononMenu().click()
    cy.url().should('include', '/nutrition')
    cy.get("table tbody tr").wait(1000).contains('tr', 'coriander coconut chutney').within(() => {

         //Select checkbox of User and click Delete
         editandDeleteNutrition.selectcheckbox().click({ force: true })

    })

});

//Click CloseIcon To Select UnSelect Checkbox
Cypress.Commands.add('UnSelectCheckboxOfaNutitionList', () => {
    
         //clear(UnSelect) Delete Users
         editandDeleteNutrition.clickcloseIcon().click()

});

//Click DeleteIcon To Delete the Selected NutritionList
Cypress.Commands.add('ClickDeleteIconToDeleteaNutitionList', () => {
    
         editandDeleteNutrition.clickDeleteIcon().click()
         cy.contains("Element deleted").should('be.visible')

});

