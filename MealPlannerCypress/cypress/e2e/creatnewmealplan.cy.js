import testdata from '../fixtures/testdata.json';
import createmealplantestdata from '../fixtures/createmealplantestdata.json';

describe('Create new meal plan', function () {
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

    

    it('create new meal plan', function () {
        // cy.xpath('//*[@id="root"]/div/div/div[1]/button').click({ multiple: true })
        // cy.get('[id="nameEn"]').type("Keto Meal Plan")
        // cy.get('[id="nameFr"]').type("Plan de repas Keto")

        // cy.get('[id="descriptionEn"]').type("Focus on high fat, low carb foods like eggs, meats")
        // cy.get('[id="descriptionFr"]').type("Concentrez-vous sur les aliments riches en graisses et faibles en glucides comme les œufs, la viande")

        // cy.get('[placeholder="add tag"]').type("low-carbs{enter}")

        // cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
         cy.createnewmealplan(createmealplantestdata)
    })
    it('Validate successful Logout', function () {
        cy.logout()
    })
})