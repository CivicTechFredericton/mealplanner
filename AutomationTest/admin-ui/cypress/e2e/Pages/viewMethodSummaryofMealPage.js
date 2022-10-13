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

    visitPage6()
    {
      return cy.xpath('//*[@aria-label="Go to page 6"]')
    }

    selectcheckbox()
    {
      return cy.get('[data-testid="CheckBoxOutlineBlankIcon"]')
    }

    clickKeyboardLeftArrowBtn()
    {
      //return cy.xpath('//*[@data-testid="KeyboardArrowLeftIcon"]')
  
      return cy.get('[data-testid="KeyboardArrowLeftIcon"]')
    }
  
    clickKeyboardRightArrowBtn()
    {
     // return cy.xpath('//*[@data-testid="KeyboardArrowRightIcon"]')
  
      return cy.get('[data-testid="KeyboardArrowRightIcon"]')
    }

}
export default viewMethodSummaryofMealPage