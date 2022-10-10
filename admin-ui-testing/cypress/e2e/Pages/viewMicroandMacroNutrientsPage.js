class viewMicroandMacroNutrientsPage
{
    clickNutritiononMenu() {
        return cy.xpath('(//*[@data-testid="ViewListIcon"])[4]')
    }

    clickexpandmoreIcon() {
        // return cy.xpath('(//*[@data-testid="ExpandMoreIcon"])[7]')
        return cy.get('[data-testid="ExpandMoreIcon"]')
    }

    clickMacroNutrients()
    {
        return cy.get('[data-testid="Macro-Nutrients"]')
    }

    clickMicroNutrients()
    {
        return cy.get('[data-testid="Micro-Nutrients"]')
    }

}
export default viewMicroandMacroNutrientsPage