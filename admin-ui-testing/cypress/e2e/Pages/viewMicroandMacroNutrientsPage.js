class viewMicroandMacroNutrientsPage
{
    clickNutritiononMenu() {
        return cy.xpath('(//*[@data-testid="ViewListIcon"])[4]')
    }

    clickexpandmoreIcon() {
        // return cy.xpath('(//*[@data-testid="ExpandMoreIcon"])[7]')
        return cy.get('[data-testid="ExpandMoreIcon"]')
    }

}
export default viewMicroandMacroNutrientsPage