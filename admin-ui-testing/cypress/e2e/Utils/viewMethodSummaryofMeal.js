import viewMethodSummaryofMealPage from "../Pages/viewMethodSummaryofMealPage";
const viewMethodSummaryofMeal = new viewMethodSummaryofMealPage();



Cypress.Commands.add('viewMethodandSummary', () => {


    cy.get("table tbody tr").contains('tr', 'Banana Bread').within(() => {

        //click on ExpandMoreIcon to view the Nutrition information of a meal
        // viewMethodSummaryofMeal.clickexpandmoreIcon().click()
        
        // viewMethodSummaryofMeal.viewMethod().click()
        // cy.wait(1000)
        // viewMethodSummaryofMeal.viewSummary().click()

        // viewMethodSummaryofMeal.viewNutrition().click()

        // viewMethodSummaryofMeal.clickexpandmoreIcon().click()

        viewMethodSummaryofMeal.selectcheckbox().click({force:true})

       

    })

    // cy.get("table tbody tr").contains('tr', 'Millet Dosa').within(() => {

       

       

    // })

    
})