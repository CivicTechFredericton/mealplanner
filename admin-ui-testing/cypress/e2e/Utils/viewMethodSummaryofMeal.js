import viewMethodSummaryofMealPage from "../Pages/viewMethodSummaryofMealPage";
const viewMethodSummaryofMeal = new viewMethodSummaryofMealPage();

// import createmealPage from "../Pages/createmealPage";
// const createmeal = new createmealPage();

Cypress.Commands.add('viewMethodandSummary', () => {

    viewMethodSummaryofMeal.clickexpandmoreIcon().click()

    viewMethodSummaryofMeal.viewSummary().click()

    viewMethodSummaryofMeal.viewNutrition().click()
    
    viewMethodSummaryofMeal.viewMethod().click()

    viewMethodSummaryofMeal.clickexpandmoreIcon().click()
})