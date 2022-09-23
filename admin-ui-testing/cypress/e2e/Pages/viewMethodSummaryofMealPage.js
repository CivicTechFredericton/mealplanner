class viewMethodSummaryofMealPage
{
    clickexpandmoreIcon()
    {
        return cy.xpath('(//*[@data-testid="ExpandMoreIcon"])[1]')
    }

    viewMethod()
    {
       return cy.get('[data-testid="Method"]')
    }

    viewSummary()
    {
      return cy.get('[data-testid="Summary"]')
    }

    viewNutrition()
    {
      return cy.get('[data-testid="Nutrition"]')
    }

}
export default viewMethodSummaryofMealPage