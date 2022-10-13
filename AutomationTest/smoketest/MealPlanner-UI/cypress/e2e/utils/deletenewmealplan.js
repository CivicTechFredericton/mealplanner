// import deletenewmealplanPage from '../pages/deletenewmealplanPage.js'
// const deletenewmealplan = new deletenewmealplanPage();

Cypress.Commands.add('deletenewmealplan', (uniqueId) => {
    
    //  cy.contains("Keto Meal Plan4").clickDeleteIcon().click();
     cy.contains(uniqueId).get(`[data-testid="${uniqueId}-delete"]`).click();
  
    
});