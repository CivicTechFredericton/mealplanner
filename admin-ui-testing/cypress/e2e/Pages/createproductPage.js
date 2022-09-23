class createProductsPage {

  clickproductsMenu() {
    return cy.xpath('(//*[@data-testid="ViewListIcon"])[2]')

  }

  clickCreateBtn() {

    return cy.xpath('//*[text()="Create"]')
  }

  InputProductNameEn() {
    return cy.get('[id="nameEn"]')
  }

  InputProductNameFr() {
    return cy.get('[id="nameFr"]')
  }

  InputProductCode() {
    return cy.get('[id="code"]')
  }

  InputProductPrice() {
    return cy.get('[id="price"]')
  }

  InputProductQuantity() {
    return cy.get('[id="quantity"]')
  }

  InputProductMeasuringUnit() {
    return cy.get('[id="unit"]')
  }

  InputProductUPC() {
    return cy.get('[id="upc"]')
  }

  InputProductSourceLink() {
    return cy.get('[id="sourceLink"]')
  }

  InputProductTags() {
    return cy.get('[id="tags"]')
  }

  clickSaveBtn() {
    return cy.get('[data-testid="SaveIcon"]')
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
export default createProductsPage