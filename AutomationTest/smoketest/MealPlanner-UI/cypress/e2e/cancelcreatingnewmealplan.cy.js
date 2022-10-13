import testdata from '../fixtures/testdata.json';
import createmealplantestdata from '../fixtures/createmealplantestdata.json';
import { v4 as uuidv4 } from "uuid";

describe('cancel creating new meal plan', function () {
    beforeEach(function () {
        cy.fixture("testdata").then(function (testdata) {
            this.testdata = testdata
        })

    })

    before(function () {
        cy.fixture("createmealplantestdata").then(function (data) {
          this.data = data;
        });

    })

    it('Validate successful Login', function () {
        cy.login(this.testdata)
    })

    it('cancel creating new meal plan', function () {

        //cy.cancelcreatingnewmealplan(createmealplantestdata)
        cy.cancelcreatingnewmealplan(createmealplantestdata)
        
    })
    it('Validate successful Logout', function () {
        cy.logout()
    })
})