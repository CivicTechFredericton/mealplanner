import testdata from "../fixtures/testdata.json";

describe("Shopping list functionality", function () {
  beforeEach(function () {
    cy.login(testdata);
  });

  it("view shopping list", function () {
    const string = "Vegetarian Meal Plan";
    cy.shoppinglist(string);
    cy.contains(string).should("exist");
    cy.contains("Shopping List").should("exist");

    // cy.contains("Vegetarian Meal Plan")
    //   .get('[data-testid="ShoppingCartIcon"]')
    //   .click();

    // cy.get('[data-testid="ShoppingCartIcon"]').click({ multiple: true });
    // cy.url().should("include", "/shopping-list");
  });

  // it('Validate successful Logout', function () {
  //     cy.logout()
  // })
});
