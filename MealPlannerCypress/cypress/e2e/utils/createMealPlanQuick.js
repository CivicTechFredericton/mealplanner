import createnewmealplanPage from "../pages/createnewmealplanPage.js";
const createnewmealplan = new createnewmealplanPage();

Cypress.Commands.add("createmealplanquick", (user, uniqueId) => {
  createnewmealplan.createnewmealplanBtn().click();
  createnewmealplan.clickcreateBtn().should("be.disabled");
  createnewmealplan.assignuser().click();
  cy.get(".css-bckmzb-MuiAutocomplete-popper").contains(user).click();
  createnewmealplan.mealplannameEnInput().type(uniqueId);
  createnewmealplan.clickcreateBtn().should("be.enabled");
  createnewmealplan.clickcreateBtn().click();
  cy.contains(uniqueId).should("exist");
});
