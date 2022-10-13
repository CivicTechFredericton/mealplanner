import testdata from '../fixtures/testdata.json';

describe('viewmealspage', function () {

    beforeEach(function () {
        cy.login(testdata);
    });

    it('viewmealspage', function () {

        cy.viewMeals();
    });


    it('Validate successful Logout', function () {
        cy.logout()
    })
})