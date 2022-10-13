import viewMethodSummaryofMealPage from "../Pages/viewMethodSummaryofMealPage";
const viewMethodSummaryofMeal = new viewMethodSummaryofMealPage();


//Click On ExpandMoreIcon of a meal
Cypress.Commands.add('ClickOnExpandMoreIconOfaMeal', () => {

   cy.get("table tbody tr").contains('tr', 'Banana Bread').within(() => {

        //click on ExpandMoreIcon to view the Nutrition information of a meal
         viewMethodSummaryofMeal.clickexpandmoreIcon().click()

    })

});

//View Method, Summary and Nutrition of a meal
Cypress.Commands.add('ViewMethodSummaryNutritionOfaMeal', () => {
        
         viewMethodSummaryofMeal.viewMethod().click()
         cy.wait(1000)
         viewMethodSummaryofMeal.viewSummary().click()
 
         viewMethodSummaryofMeal.viewNutrition().click
 
 });