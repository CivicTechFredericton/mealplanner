import testdata from "../fixtures/testdata.json";
import createNutritiontestdata from "../fixtures/createNutritiontestdata.json";

describe('createNutritionforaMeal', () => {

    beforeEach(function () {
        cy.login(testdata)
    });

    it('createNutritionListforaMeal', function () {
        cy.createNutritionList(createNutritiontestdata)
    })

    it('DownloadNutritionList', function () {
        cy.exportNutrition()
    })

    it('Validate successful Logout', function () {
        cy.logout()
    })
})