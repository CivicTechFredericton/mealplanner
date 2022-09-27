class viewmealsPage {

    clickonmealsmenu()
    {
        return cy.get('[data-testid="meals-menu"]')
    }

    clickonmealplansmenu()
    {
        return cy.get('[data-testid="mealplans-menu"]')
    }

    clickPrintMeal()
    {
        return cy.get('[data-testid="PrintIcon"]')
    }
    
    clickArrowBackIcon()
    {
        return cy.get('[data-testid="ArrowBackIcon"]')
    }
}
export default viewmealsPage