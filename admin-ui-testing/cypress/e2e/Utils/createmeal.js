import createmealPage from "../Pages/createmealPage";
const createmeal = new createmealPage();

Cypress.Commands.add('createMeal', (data, uniqueId) => {
  createmeal.clickCreateBtn().click()
  cy.url().should('include', '/create')
  // if (createmeal.clickSave() == "isdisabled") {
    createmeal.InputMealCode().type(data.Mealcode)
    createmeal.InputMealNameEn().type(data.MealNameEn)
    createmeal.InputMealNameFr().type(data.MealNameFr)
    createmeal.InputMealTags().type(data.MealTags)
    createmeal.InputMealDescriptionEn().type(data.MealDescriptionEn)
    createmeal.InputMealDescriptionFr().type(data.MealDescriptionFr)
    createmeal.checkMealBreakfast().check()
    createmeal.checkMealLunch().check()
    createmeal.checkMealDinner().check()
    createmeal.checkMealLunch().uncheck()
    createmeal.InputMealPhotoURL().type(data.PhotoURL)
    createmeal.InputVideoURL().type(data.VideoURL)
    createmeal.InputCookingDuration().type(data.CookingDuration)
    createmeal.InputServes().type(data.Serves)
    createmeal.InputTotalCost().type(data.TotalCost)
    createmeal.InputServingCost().type(data.ServingCost)
    createmeal.InputServingSize().type(data.ServingsSize)
    createmeal.InputServingSizeUnit().type(data.ServingsSizeUnit)
    createmeal.InputNutrionRating().type(data.NutritionRating)
    createmeal.InputMealMethod().type(data.Method)
    createmeal.InputMealTips().type(data.Tips)
    createmeal.clickSave().click()
    // cy.contains(uniqueId).should("exist")
    cy.contains("Element created").should("be.visible")
  // }
  // else {
  //   cy.contains("Please fill the required fields")
  // }

});

//Export meals file
Cypress.Commands.add('exportMeals', (data) => {
  createmeal.clickExport().click()
 
})

