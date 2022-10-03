import testdata from "../fixtures/testdata.json";
import editmealtestdata from "../fixtures/editmealtestdata.json";

describe('editandDeletetheMeal', () => {

    beforeEach(function () {
        cy.login(testdata);
    });

    it('editthemealdetails', function () {
        cy.EditMeal(editmealtestdata)

    });
    
    it('deletethemeal', function() {
        cy.DeleteMeal()
    })

    it('Validate successful Logout', function () {
        cy.logout()
    })
    
})