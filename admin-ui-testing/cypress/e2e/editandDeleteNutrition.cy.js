import testdata from "../fixtures/testdata.json";
import editNutritiontestdata from "../fixtures/editNutritiontestdata.json";

describe('EditNutritionforaProduct', () => {

    beforeEach(function () {
        cy.login(testdata)
    });

    it('EditNutritionListforaProduct', function () {
        cy.EditNutritionList(editNutritiontestdata)
    })

    it('DeleteNutritionList', function () {
        cy.DeleteNutitionList()
    })

    it('Validate successful Logout', function () {
        cy.logout()
    })
})