import testdata from "../fixtures/testdata.json";

describe("Validate Login", function () {
  beforeEach(function () {
    cy.fixture("testdata").then(function (testdata) {
      this.testdata = testdata;
    });
  });

  it("Validate successful Login", function () {
    cy.login(this.testdata);
  });

  it("view shopping list", function () {
    cy.shoppinglist();

    //    cy.contains("Vegetarian Meal Plan").get('[data-testid="ShoppingCartIcon"]').click({ multiple: true })

    //     cy.get('[data-testid="ShoppingCartIcon"]').click({ multiple: true })
    //    cy.url().should('include', '/shopping-list')
  });

  // it('Validate successful Logout', function () {
  //     cy.logout()
  // })
});
