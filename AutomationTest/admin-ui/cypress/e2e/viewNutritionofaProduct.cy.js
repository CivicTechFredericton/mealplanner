import testdata from "../fixtures/testdata.json";

describe('clickEpandMoretoViewNutritionofaProduct', () => {

    beforeEach(function () {
        cy.login(testdata);
    });

    it('clickEpandMoretoViewNutritionofaProduct', function () {
        cy.ClickOnExpandMoreIconOfaProduct()
        cy.ViewNutritionOfaProduct()

    });

    it('Validate successful Logout', function () {
        cy.logout()
    })

    
})