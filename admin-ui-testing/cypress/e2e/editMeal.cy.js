import testdata from "../fixtures/testdata.json"
import editmealtestdata from "../fixtures/editmealtestdata.json";


describe('editmeal', () => {

    beforeEach(function () {
        cy.login(testdata);
    });

    it('editmeal', function () {

        cy.editMeal(editmealtestdata)
    });

    it('Validate successful Logout', function () {
        cy.logout()
    })

})