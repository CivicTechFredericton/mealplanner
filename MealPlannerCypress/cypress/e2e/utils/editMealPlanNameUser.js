import editMealPlanPage from "../pages/editMealPlanPage.js";
const editMealPlan = new editMealPlanPage();

Cypress.Commands.add(
  "editMealPlanNameUser",
  (oldName, newName, oldUser, newUser) => {
    // To change old nameEn to new name using uuid
    cy.contains(oldName).click();
    editMealPlan
      .editmealPlanName()
      .click()
      .get(`input[value=${oldName}]`)
      .dblclick()
      .clear()
      .type(`${newName}{enter}`);
    //   A click off the input is needed to send the graphQL request
    cy.contains("Select Meal from the list").dblclick();

    // To change user
    editMealPlan.mealPlanHeader().contains(oldUser).click();
    editMealPlan.editmealPlanUser().click();
    cy.contains("Meal Designer").click();
  }
);