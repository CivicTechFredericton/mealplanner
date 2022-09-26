import editMealPlanPage from "../pages/editMealPlanPage";
const editMealPlan = new editMealPlanPage();

Cypress.Commands.add(
  "checkDescriptionAndTags",
  (uniqueId, dataOld, dataNew) => {
    // click meal plan to go to calender page
    editMealPlan.selectmealPlan(uniqueId).click();
    // click arrow to reveal tags and description
    editMealPlan.clickkeyboardarrowdownIcon().click();
    // checks old data is replaced with new data
    cy.contains(dataOld.mealplandescriptionEn).should("not.exist");
    cy.contains(dataNew.editmealplandescription).should("exist");

    cy.contains(dataOld.tag).should("not.exist");
    cy.contains(dataNew.tag).should("exist");
  }
);
