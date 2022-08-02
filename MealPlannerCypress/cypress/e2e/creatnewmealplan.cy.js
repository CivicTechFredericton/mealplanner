import testdata from '../fixtures/testdata.json';
import createmealplantestdata from '../fixtures/createmealplantestdata.json';

describe('Validate Login', function () {
    beforeEach(function () {
        cy.fixture("testdata").then(function (testdata) {
            this.testdata = testdata
        })

    })

    // cy.fixture("createmealplantestdata").then(function(createmealplantestdata) {
    //     this.createmealplantestdata = createmealplantestdata
    // })

    describe('createnewmealplan', () => {

        it('Validate successful Login', function () {
            cy.login(this.testdata)
        })

        describe('Some Test', () => {
            before(function () {
              cy.fixture('createmealplantestdata').then(function (data) {
                this.data=data;
              });
            });

        it('create new meal plan', function () {
            // cy.fixture("createmealplantestdata").then(function (createmealplantestdata) {
            //     this.createmealplantestdata = createmealplantestdata
            // })
            cy.createnewmealplan(this.data.createmealplantestdata)

           
        })
    })
        it('Validate successful Logout', function () {
            cy.logout()
        })
    })
})