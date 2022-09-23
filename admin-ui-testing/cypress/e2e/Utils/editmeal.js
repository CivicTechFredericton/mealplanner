import editmealPage from "../Pages/editmealPage";
const editmeal = new editmealPage();

Cypress.Commands.add('editMeal', (data) => {

  editmeal.clickeditIcon().click()

  editmeal.InputMealDescriptionEn().clear().type(data.editDescriptionEn)
  editmeal.InputMealDescriptionFr().clear().type(data.editDescriptionFr)
  editmeal.clickSave().click()
  
})