import testdata from "../fixtures/testdata.json";
import createNutritiontestdata from "../fixtures/createNutritiontestdata.json";

describe('createNutritionforaProduct', () => {

    beforeEach(function () {
        cy.login(testdata)
    });

    it('createNutritionListforaProduct', function () {
        cy.createNutritionList(createNutritiontestdata)
    })

    it('DownloadNutritionList', function () {
        cy.exportNutrition()
    })

    it('Validate successful Logout', function () {
        cy.logout()
    })
})