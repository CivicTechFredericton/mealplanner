import loginPage from "../pages/loginPage.js";
const login = new loginPage();
import logoutPage from "../pages/logoutPage.js";
const logout = new logoutPage();
import createnewmealplanPage from "../pages/createnewmealplanPage.js";
const createnewmealplan = new createnewmealplanPage();

Cypress.Commands.add("createnewmealplan", (data, uniqueId) => {
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
  createnewmealplan.clickcreateBtn().click();
});
