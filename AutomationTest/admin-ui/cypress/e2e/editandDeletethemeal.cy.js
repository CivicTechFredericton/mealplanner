import testdata from "../fixtures/testdata.json";
import editmealtestdata from "../fixtures/editmealtestdata.json";

describe('editandDeletetheMeal', () => {

    beforeEach(function () {
        cy.login(testdata);
    });

    it('editthemealdetails', function () {

        cy.OpenMealToEdit()
        cy.EditMeal(editmealtestdata)

    });

    it('DoNotDeletetheMeal', function() {
        cy.SelectCheckboxToDeleteMeal()
        cy.UnSelectCheckboxOfaMeal()
    })
    
    // it('deletethemeal', function() {
    //     cy.SelectCheckboxToDeleteMeal()
    //     cy.ClickDeleteIconToDeleteaMeal()
    // })

    it('Validate successful Logout', function () {
        cy.logout()
    })
    
})