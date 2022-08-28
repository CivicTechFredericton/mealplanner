class editMealPlanPage {
  mealPlanHeader() {
    return cy.get('[data-testid="meal-plans-header"]');
  }
  mealPlanName() {
    return cy.get('[data-testid="edit-meal-name-input"]');
  }
  mealPlanUser() {
    return cy.get('[data-testid="edit-meal-user-input"]');
  }
}

export default editMealPlanPage;
