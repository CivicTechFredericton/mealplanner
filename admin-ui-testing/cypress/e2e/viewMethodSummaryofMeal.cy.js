import testdata from "../fixtures/testdata.json";

describe('viewMethodandSummaryofaMeal', () => {

    beforeEach(function () {
        cy.login(testdata);
    });

    it('viewMethodandSummaryofaMeal', function () {
        cy.viewMethodandSummary();

    });

    
})