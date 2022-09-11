import testdata from '../fixtures/testdata.json';
import createmealplantestdata from '../fixtures/createmealplantestdata.json';
import editmealplanHeadertestdata from '../fixtures/editmealplanheadertestdata.json';
import { v4 as uuidv4 } from "uuid";

describe('editmealplanHeader', function () {
    const uniqueId = uuidv4();
    
    beforeEach(function () {
        cy.login(testdata);
    });


    it("Create Meal", function () {
        cy.createnewmealplan(createmealplantestdata, uniqueId);
        cy.contains(uniqueId);
    });

    it('editmealplanHeader', function () {
  
        cy.editmealplanHeader(uniqueId, editmealplanHeadertestdata)
    });

    it("Deletes Created Mealplan", function () {
        cy.deletenewmealplan(uniqueId);
        cy.contains(uniqueId).should("not.exist");
      });

    it('Validate successful Logout', function () {
        cy.logout()
    })

})