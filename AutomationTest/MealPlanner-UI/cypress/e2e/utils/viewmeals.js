import viewmealsPage from "../pages/viewmealsPage";
const viewmeals = new viewmealsPage();

Cypress.Commands.add('viewMeals', () => {

    viewmeals.clickonmealsmenu().click();
    cy.url().should('include', '/meals')
    cy.wait(2000)
    cy.contains('Hamburger Soup').scrollIntoView()
    cy.wait(3000)
    cy.contains('Tuna Salad Sandwich').scrollIntoView()
    cy.wait(2000)

    cy.contains('Pickled Red Onions').scrollIntoView()
    cy.wait(2000)
    cy.contains('Pickled Red Onions').click()
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

