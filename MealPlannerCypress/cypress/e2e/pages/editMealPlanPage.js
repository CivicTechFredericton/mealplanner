class editmealplanHeaderPage {
  selectmealPlan(uniqueId) {
    return cy.get(`[data-testid="${uniqueId}-mealcard"]`);
  }

  mealPlanHeader() {
    return cy.get('[data-testid="meal-plans-header"]');
  }

  editmealPlanName() {
    return cy.get('[data-testid="edit-meal-name-input"]');
  }

  editmealPlanUser() {
    return cy.get('[data-testid="edit-meal-user-input"]');
  }

  clickkeyboardarrowdownIcon() {
    return cy.get('[data-testid="KeyboardArrowDownIcon"]');
  }

  editDescription() {
    return cy.get('[data-testid="Edit-Description"]');
  }

  clickcancelIconofaddtag() {
    return cy.get('[data-testid="CancelIcon"]');
  }

  editaddtag() {
    return cy.get('[data-testid="edit-add-tag"]');
  }

  clickkeyboardarrowupIcon() {
    return cy.get('[data-testid="KeyboardArrowUpIcon"]');
  }

  clickmealplansmenu() {
    return cy.get('[data-testid="mealplans-menu"]');
  }

  clickexpandIcononmealplan() {
    return cy.get('[data-testid="ExpandMoreIcon"]');
  }
}
export default editmealplanHeaderPage;
