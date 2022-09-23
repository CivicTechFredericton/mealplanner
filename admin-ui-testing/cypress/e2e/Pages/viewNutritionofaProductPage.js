class viewNutritionofaProductPage{

    clickproductsMenu() {
        return cy.xpath('(//*[@data-testid="ViewListIcon"])[2]')
    
      }

    clickexpandmoreIcon()
    {
        return cy.xpath('(//*[@data-testid="ExpandMoreIcon"])[7]')
    }

    clickeditIcon()
    {
        return cy.xpath('(//*[@data-testid="CreateIcon"])[7]')
    }
}
export default viewNutritionofaProductPage