import editMealPlanPage from "../pages/editMealPlanPage";
const editMealPlan = new editMealPlanPage();

Cypress.Commands.add('editmealplanHeader', (uniqueId, data) => {


    editMealPlan.selectmealPlan(uniqueId).click();

    editMealPlan.clickkeyboardarrowdownIcon().click()

    editMealPlan.editDescription().clear().type(data.editmealplandescription)

    editMealPlan.clickcancelIconofaddtag().click()
    editMealPlan.editaddtag().type(data.editaddtag)

    editMealPlan.clickkeyboardarrowupIcon().click()
    cy.url().should('include', '/mealplans')
    cy.wait(1000)

    editMealPlan.clickmealplansmenu().click()
    cy.url().should('include', '/mealplans')

    editMealPlan.clickexpandIcononmealplan().click({ multiple: true })

})
