import testdata from "../fixtures/testdata.json";

describe('viewMethodandSummaryofaMeal', () => {

    beforeEach(function () {
        cy.login(testdata);
    });

    it('viewMethodandSummaryofaMeal', function () {
        cy.ClickOnExpandMoreIconOfaMeal();
        cy.ViewMethodSummaryNutritionOfaMeal();

    });

    it('Validate successful Logout', function () {
        cy.logout()
    })
    
})