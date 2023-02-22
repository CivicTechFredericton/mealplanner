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
    cy.contains('Macaroni and Cheese').scrollIntoView()
     cy.wait(2000)
     searchmeal.selectMeal().contains('Macaroni and Cheese').click()
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
     cy.wait(1000)
     cy.contains('Macaroni and Cheese').scrollIntoView()
     cy.wait(1000)
     cy.contains('Cucumber Dill Salad').scrollIntoView()
     cy.wait(1000)



})