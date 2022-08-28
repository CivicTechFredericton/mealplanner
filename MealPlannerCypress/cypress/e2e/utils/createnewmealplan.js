import loginPage from "../pages/loginPage.js";
const login = new loginPage();
import logoutPage from "../pages/logoutPage.js";
const logout = new logoutPage();
import createnewmealplanPage from "../pages/createnewmealplanPage.js";
const createnewmealplan = new createnewmealplanPage();

Cypress.Commands.add("createnewmealplan", (data, uniqueId, userOption) => {
  let user;
  userOption ? (user = userOption) : (user = data.user);

  createnewmealplan.createnewmealplanBtn().click();

  createnewmealplan.mealplannameEnInput().type(uniqueId);
  createnewmealplan.mealplannameFrInput().type(data.mealplannameFr);
  createnewmealplan
    .mealplandescriptionEnInput()
    .type(data.mealplandescriptionEn);
  createnewmealplan
    .mealplandescriptionFrInput()
    .type(data.mealplandescriptionFr);
  createnewmealplan.addTagInput().type(data.addTag);
  createnewmealplan.assignUserInput().click();
  cy.get(".css-bckmzb-MuiAutocomplete-popper").contains(user).click();
  createnewmealplan.clickcreateBtn().click();
});
