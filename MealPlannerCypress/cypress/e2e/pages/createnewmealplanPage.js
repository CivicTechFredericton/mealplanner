class createnewmealplanPage {
  createnewmealplanBtn() {
    return cy.get('[data-testid="create-new-mealplan-button"');
  }

  mealplannameEnInput() {
    return cy.get('[id="nameEn" ]input');
  }

  mealplannameFrInput() {
    return cy.get('[id="nameFr"]');
  }

  mealplandescriptionEnInput() {
    return cy.get('[id="descriptionEn"]');
  }

  mealplandescriptionFrInput() {
    return cy.get('[id="descriptionFr"]');
  }

  addTagInput() {
    return cy.get('[placeholder="add tag"]');
  }

  assignUserInput() {
    return cy.get('[data-testid="assign-user"]');
  }

  clickcreateBtn() {
    return cy.get('[data-testid="submit-new-mealplan-button"]');
  }
}
export default createnewmealplanPage;
