import shoppinglistPage from "../pages/shoppinglistPage.js";
const shoppinglist = new shoppinglistPage();


Cypress.Commands.add("shoppinglist", (string) => {
  shoppinglist.shoppinglistIcon(string).click();
  cy.url().should("include", "/shopping-list");
});