import testdata from "../fixtures/testdata.json";
import createMeasurestestdata from "../fixtures/createMeasurestestdata.json"

describe('createMeasuresOfaProductforMeal', () => {

    beforeEach(function () {
        cy.login(testdata)
    });

    it('createMeasuresOfaProductforMeal', function () {
        cy.createMeasureOfProduct(createMeasurestestdata)
    
    })

    it('DownloadProducts', function () {
        cy.exportMeasures()

    })

    it('Validate successful Logout', function () {
        cy.logout()
    })
})