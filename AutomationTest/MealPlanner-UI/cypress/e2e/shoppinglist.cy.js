import testdata from "../fixtures/testdata.json";

describe("Shopping list functionality", function () {
    beforeEach(function () {
        cy.login(testdata);
    });

    it("view shopping list", function () {
        const string = "Vegetarian";
        cy.shoppinglist(string);
        cy.contains(string).should("exist");
        cy.contains("Shopping List").should("exist");

         cy.url().should("include", "/shopping-list");

    });

    it('Validate successful Logout', function () {
        cy.logout()
    })


});

