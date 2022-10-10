import testdata from "../fixtures/testdata.json";

describe('checkPagination', () => {
    beforeEach(function () {
      cy.login(testdata);
    });
    
    it('Check next and previous pagination', () => {
      // With default pagination of 10
      cy.checkPagination(10);
    });

    it('Validate successful Logout', function () {
        cy.logout()
    })
  });