class shoppinglistPage {
    shoppinglistIcon(string) {
      return cy.get(`[data-testid="${string}-shoppingListIcon"]`);
    }
  }
  export default shoppinglistPage;