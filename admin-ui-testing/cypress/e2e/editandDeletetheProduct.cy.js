import testdata from "../fixtures/testdata.json";
import editProducttestdata from "../fixtures/editProducttestdata.json";

describe('testEditandDeleteofaProdut', () => {

    beforeEach(function () {
        cy.login(testdata);
    });

    it('edittheproductdetails', function () {
        cy.EditProduct(editProducttestdata)

    });

    it('deletetheproduct', function() {
        cy.DeleteProduct()
    })

    it('Validate successful Logout', function () {
        cy.logout()
    })
    
})