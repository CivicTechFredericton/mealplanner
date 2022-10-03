class viewNutritionofaProductPage {

    clickproductsMenu() {
        return cy.xpath('(//*[@data-testid="ViewListIcon"])[2]')

    }

    visitpage27()
    {
        return cy.xpath('//button[@aria-label="Go to page 28"]')
    }

    visitpage28()
    {
        return cy.xpath('//*[@aria-label="Go to page 27"]')
    }

    clickexpandmoreIcon() {
        return cy.xpath('(//*[@data-testid="ExpandMoreIcon"])[7]')
    }

    selectcheckbox() {
         return cy.get('[data-testid="CheckBoxOutlineBlankIcon"]')
      //  return cy.xpath('(//*[@data-testid="CheckBoxOutlineBlankIcon"])[2]')
    }


}
export default viewNutritionofaProductPage