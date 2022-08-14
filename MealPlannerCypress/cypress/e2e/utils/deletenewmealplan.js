Cypress.Commands.add("deletenewmealplan", (uniqueId) => {
  cy.contains(uniqueId).get(`[data-testid="${uniqueId}-delete"]`).click();
});
