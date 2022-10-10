import testdata from "../fixtures/testdata.json";
import editNutritiontestdata from "../fixtures/editNutritiontestdata.json";

describe('EditNutritionforaProduct', () => {

    beforeEach(function () {
        cy.login(testdata)
    });

    it('EditNutritionListforaProduct', function () {
        cy.OpenNutritionToEdit()
        cy.EditNutritionList(editNutritiontestdata)
    })

    it('DoNotDeleteNutritionList', function() {
        cy.SelectCheckboxToDeleteaNutitionList()
        cy.UnSelectCheckboxOfaNutitionList()
    })

    // it('DeleteNutritionList', function () {
    //     cy.SelectCheckboxToDeleteaNutitionList()
    //     cy.ClickDeleteIconToDeleteaNutitionList()
    // })

    it('Validate successful Logout', function () {
        cy.logout()
    })
})