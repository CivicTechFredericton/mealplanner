import testdata from '../fixtures/testdata.json';
import createmealplantestdata from '../fixtures/createmealplantestdata.json';

describe('Delete meal plan', function () {
    beforeEach(function () {
        cy.fixture("testdata").then(function (testdata) {
            this.testdata = testdata
        })

    })
    it('Validate successful Login', function () {
        cy.login(this.testdata)
    })
    it('delete meal plan', function () {
      //  cy.xpath('//*[@data-testid="DeleteTwoToneIcon"]').click({ multiple: true })

      
        cy.deleteMeal()
    })

    it('Validate successful Logout', function () {
        cy.logout()
    })
})