import testdata from "../fixtures/testdata.json";
import editProducttestdata from "../fixtures/editProducttestdata.json";

describe('testEditandDeleteofaProdut', () => {

    beforeEach(function () {
        cy.login(testdata);
    });

    it('edittheproductdetails', function () {
        cy.OpenProductToEdit()
        cy.EditProduct(editProducttestdata)

    });

    it('DoNotDeleteTheProduct', function() {
        cy.SelectCheckboxToDeleteProduct()
        cy.UnSelectCheckboxOfaProduct()
    })

    // it('deletetheproduct', function() {
    //     cy.SelectCheckboxToDeleteProduct()
    //     cy.ClickDelectIconToDeleteaProduct()
    // })

    it('Validate successful Logout', function () {
        cy.logout()
    })
    
})