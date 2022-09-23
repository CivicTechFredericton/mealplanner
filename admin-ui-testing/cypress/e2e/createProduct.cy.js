import testdata from "../fixtures/testdata.json";
import createProducttestdata from "../fixtures/createProducttestdata.json";

describe('createProductsforameal', () => {

    beforeEach(function() {
        cy.login(testdata)
    });

    it('createProductsforameal', function() {
        cy.createProductlist(createProducttestdata)
    })

    it('Validate successful Logout', function() {
        cy.logout()
    })
})