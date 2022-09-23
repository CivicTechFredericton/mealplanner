import testdata from "../fixtures/testdata.json";

describe('clickEpandMoretoViewNutritionofaProduct', () => {

    beforeEach(function () {
        cy.login(testdata);
    });

    it('clickEpandMoretoViewNutritionofaProduct', function () {
        cy.nutritionofaProduct()

    });

    
})