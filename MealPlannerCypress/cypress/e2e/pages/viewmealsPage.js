class viewmealsPage {

    clickonmealsmenu()
    {
        return cy.get('[data-testid="meals-menu"]')
    }

    clickonmealplansmenu()
    {
        return cy.get('[data-testid="mealplans-menu"]')
    }
}
export default viewmealsPage