import testdata from "../fixtures/testdata.json"
import createMealtestdata from "../fixtures/createMealtestdata.json";

describe('createnewmeal', () => {
    
    beforeEach(function () {
        cy.login(testdata);
    });

    it('createnewmeal', function () {
        cy.createMeal(createMealtestdata)
    });

    it('downloadMeals', function (){
        cy.exportMeals()
    })

    it('Validate successful Logout', function () {
        cy.logout()
    })

})
