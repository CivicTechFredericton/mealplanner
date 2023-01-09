import shoppinglistPage from "../pages/shoppinglistPage.js";
const shoppingList = new shoppinglistPage();


Cypress.Commands.add("shoppinglist", (string) => {
  shoppingList.shoppinglistIcon(string).click();
  cy.url().should("include", "/shopping-list");
 // shoppingList.clickPrintIcon().click()

});