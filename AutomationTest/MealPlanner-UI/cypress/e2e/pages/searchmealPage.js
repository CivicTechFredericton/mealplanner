class searchmealPage {

    selectmealPlan(uniqueId) {

        return cy.get(`[data-testid="${uniqueId}-mealcard"]`)

    }

    searchmealInput() {

        return cy.get('[data-testid="search-meal"] input')
    }

    selectMeal() {
        return cy.get('[data-testid="select-meal"]')
    }

    clearselectedMeal() {
        return cy.get('[data-testid="clearSelectedMeal"]')
    }

    clickonmealsmenu()
    {
        return cy.get('[data-testid="meals-menu"]')
    }


    clickonmealplansmenu()
    {
        return cy.get('[data-testid="mealplans-menu"]')
    }
}
export default searchmealPage