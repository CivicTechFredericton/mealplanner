
class shoppinglistPage {
    shoppinglistIcon(string) {
      return cy.get(`[data-testid="${string}-shoppingListIcon"]`);
    }

    clickPrintIcon()
    {
        return cy.get('[data-testid="PrintIcon"]')
    }
  }
  export default shoppinglistPage;