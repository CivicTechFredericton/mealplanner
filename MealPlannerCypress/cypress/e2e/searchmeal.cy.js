import testdata from '../fixtures/testdata.json';


describe('searchMeal', function () {
    beforeEach(function () {
        cy.fixture("testdata").then(function (testdata) {
            this.testdata = testdata
        })
    });

    it('Validate successful Login', function () {
        cy.login(this.testdata)
    });

    it('searchMeal', function(){
        cy.get('[data-testid="meal-card"]').contains("Vegetarian Meal Plan").click()
        cy.url().should('include', '/mealplans/1')
        //cy.get('[data-testid="Search-for-meals"] input').type("breakfast")

    })

    // it('Validate successful Logout', function () {
    //     cy.logout()
    // })

})