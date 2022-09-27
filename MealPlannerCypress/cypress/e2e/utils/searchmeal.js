import searchmealPage from "../pages/searchmealPage";
const searchmeal = new searchmealPage();


Cypress.Commands.add('searchMeal', (uniqueId, data) => {

     searchmeal.selectmealPlan(uniqueId).click();

     searchmeal.searchmealInput().type(data.searchmealbreakfast)
     searchmeal.selectMeal().click({ multiple: true })
     searchmeal.selectMeal().should("exist")
     searchmeal.clearselectedMeal().click();
     searchmeal.clearselectedMeal().should("not.exist")

     //scrollintoview for selecting meal
     searchmeal.searchmealInput().clear().type(data.searchmeallunch)
     cy.contains('Baked Potatoes').scrollIntoView()
     cy.wait(2000)
     searchmeal.selectMeal().contains('Baked Potatoes').click()
     searchmeal.selectMeal().should("exist")
     searchmeal.clearselectedMeal().click();
     searchmeal.clearselectedMeal().should("not.exist")


     searchmeal.clickonmealplansmenu().click();
     cy.url().should('include', '/mealplans')
     cy.contains('Meal Designer').scrollIntoView()
     cy.wait(3000)
     cy.contains('Admin').scrollIntoView()
     cy.wait(2000)

})

Cypress.Commands.add('clickonmealsinsearchMeal', (uniqueId, data) => {


     searchmeal.selectmealPlan(uniqueId).click();

     searchmeal.searchmealInput().type(data.searchmealbreakfast)
     searchmeal.selectMeal().click({ multiple: true });
     searchmeal.clearselectedMeal().click();

     searchmeal.clickonmealsmenu().click();
     cy.url().should('include', '/meals')
     cy.wait(2000)
     cy.contains('Hamburger Soup').scrollIntoView()
     cy.wait(3000)
     cy.contains('Tuna Salad Sandwich').scrollIntoView()
     cy.wait(2000)



})