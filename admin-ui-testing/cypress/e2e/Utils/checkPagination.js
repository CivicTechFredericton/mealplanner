import paginationButtons from '../Pages/paginationButtons';
const pagination = new paginationButtons();

Cypress.Commands.add('checkPagination', (itemsPerPage) => {
  pagination.contents().then(($text) => {
    // get last 2 items of string, which is total number of items.
    const totalItems = $text.text().slice(-2);
    // converts to number
    const itemsNum = Number(totalItems);
    // get number of clicks
    const clicks = Math.floor(itemsNum / itemsPerPage);

    // This assumes coriander coconut chutney will always be on first page.
    // We should find a better way to validate
    cy.contains('coriander coconut chutney').should('exist');

    // Previous button should be disabled
    pagination.prevBtn().should('be.disabled');

    // Loops over number of clicks, I added wait to visually see it
    for (let i = 0; i < clicks; i++) {
      pagination.nextBtn().click();
      cy.wait(1000);
    }

    // After given number of clicks, the next button should be disabled
    pagination.nextBtn().should('be.disabled');

    // Again, we should find a better way to validate
    cy.contains('coriander coconut chutney').should('not.exist');

    // Travels back to first page
    for (let j = 0; j < clicks; j++) {
      pagination.prevBtn().click();
      cy.wait(1000);
    }

    // Re-verifys that we have the first element.
    cy.contains('coriander coconut chutney').should('exist');
  });
});
