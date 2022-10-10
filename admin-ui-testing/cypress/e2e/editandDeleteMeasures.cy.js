import testdata from '../fixtures/testdata.json';
import editMeasurestestdata from '../fixtures/editMeasurestestdata.json';

describe('testEditandDeleteMeasuresofaProductforMeal', () => {
  beforeEach(function () {
    cy.login(testdata);
  });

  it('edittheproductdetails', function () {
    cy.OpenMeasure();
    cy.EditMeasure(editMeasurestestdata);
  });

    it('edittheproductdetails', function () {

        cy.OpenMeasureToEdit();
        cy.EditMeasure(editMeasurestestdata)

    });

    it('DoNotDeleteTheMeasures', function() {
        cy.SelectCheckboxToDeleteMeasure()
        cy.UnSelectCheckboxOfaMeasure()
    })

    // it('deletetheMeasures', function() {
    //     cy.SelectCheckboxToDeleteMeasure()
    //     cy.ClickDeleteIconToDeleteaMeasure()
    // })

    it('Validate successful Logout', function () {
        cy.logout()
    })
    
})
