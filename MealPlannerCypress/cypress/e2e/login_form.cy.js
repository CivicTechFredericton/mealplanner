import testdata from '../fixtures/testdata.json';

describe('Validate Login', function () {
    beforeEach(function () {
        cy.fixture("testdata").then(function (testdata) {
            this.testdata = testdata
        })
    });

    it('Validate successful Login', function () {
        cy.login(this.testdata)
    });

    it('Validate successful Logout', function () {
        cy.logout()
    })

})