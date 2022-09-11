import testdata from '../fixtures/testdata.json';
import createmealplantestdata from '../fixtures/createmealplantestdata.json';
import searchmealdata from '../fixtures/searchmealdata.json';
import { v4 as uuidv4 } from "uuid";



describe('searchMeal', function () {
    const uniqueId = uuidv4();
    beforeEach(function () {
        cy.login(testdata);
    });


    it("Create Meal", function () {
        cy.createnewmealplan(createmealplantestdata, uniqueId);
        cy.contains(uniqueId);
    });

   
    it('searchMeal', function () {
  
        cy.wait(1000)
        cy.searchMeal(uniqueId, searchmealdata)
        cy.url().should('include', '/mealplans')

    });

    it('clickonmealsmenu', function(){
        cy.wait(1000)
        cy.clickonmealsinsearchMeal(uniqueId, searchmealdata)
        cy.url().should('include', '/meals')
    })

    it("Deletes Created Mealplan", function () {
        cy.deletenewmealplan(uniqueId);
        cy.contains(uniqueId).should("not.exist");
      });

    it('Validate successful Logout', function () {
        cy.logout()
    })

})
