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

  it('deletetheproductdetails', function () {
    cy.DeleteMeasure();
  });

  //   it('Validate successful Logout', function () {
  //     cy.logout();
  //   });
});
