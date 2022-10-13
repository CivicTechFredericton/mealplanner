import testdata from '../fixtures/testdata.json';
import createmealplantestdata from '../fixtures/createmealplantestdata.json';
import mealcalendardata from '../fixtures/mealcalendartestdata.json';
import { v4 as uuidv4 } from "uuid";

describe('createmealplancalendar', function () {
    const uniqueId = uuidv4();
    beforeEach(function () {
        cy.login(testdata);
    });


    it("Create Meal", function () {
        cy.createnewmealplan(createmealplantestdata, uniqueId);
        cy.contains(uniqueId);
    });

    it('createmealplancalendar', function () {
  
        cy.wait(1000)
        cy.mealCalendar(uniqueId, mealcalendardata)
        cy.url().should('include', '/mealplans')
        

        
    });

    it("Deletes Created Mealplan", function () {
        cy.deletenewmealplan(uniqueId);
        cy.contains(uniqueId).should("not.exist");
      });

    it('Validate successful Logout', function () {
        cy.logout()
    })

})
