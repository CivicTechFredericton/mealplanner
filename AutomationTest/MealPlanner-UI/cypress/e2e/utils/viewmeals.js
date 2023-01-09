import viewmealsPage from "../pages/viewmealsPage";
const viewmeals = new viewmealsPage();

Cypress.Commands.add('viewMeals', () => {

    viewmeals.clickonmealsmenu().click();
    cy.url().should('include', '/meals')
    cy.wait(2000)
    cy.contains('Macaroni and Cheese').scrollIntoView()
    cy.wait(3000)
    cy.contains('Cucumber Dill Salad').scrollIntoView()
    cy.wait(2000)

    cy.contains('coriander coconut chutney').scrollIntoView()
    cy.wait(2000)
    cy.contains('coriander coconut chutney').click()
    cy.contains('Tips').scrollIntoView()
    cy.wait(1000)  
    viewmeals.clickPrintMeal().click() 

    viewmeals.clickArrowBackIcon().click()
    cy.url().should('include', '/meals') 

    viewmeals.clickonmealplansmenu().click();
    cy.url().should('include', '/mealplans')
    cy.contains('Meal Designer').scrollIntoView()
    cy.wait(3000)
    cy.contains('Admin').scrollIntoView()
    cy.wait(2000) 



})

