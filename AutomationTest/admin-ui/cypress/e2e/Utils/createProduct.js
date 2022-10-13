import createProductPage from "../Pages/createproductPage";
const createProduct = new createProductPage();

Cypress.Commands.add('createProductlist', (data) => {
    createProduct.clickproductsMenu().click()
    cy.url().should('include', '/products')
    createProduct.clickCreateBtn().click()
    cy.url().should('include', '/products/create')
    createProduct.InputProductNameEn().type(data.ProductNameEn)
    createProduct.InputProductNameFr().type(data.ProductNameFr)
    createProduct.InputProductCode().type(data.ProductCode)
    createProduct.InputProductPrice().type(data.ProductPrice)
    createProduct.InputProductQuantity().type(data.ProductQuantity)
    createProduct.InputProductMeasuringUnit().type(data.ProductMeasuringUnit)
    createProduct.clickIsArchived().click()
    createProduct.InputProductUPC().type(data.ProductUPC)
    createProduct.InputProductSourceLink().type(data.ProductSourceLink)
    createProduct.InputProductTags().type(data.ProductTags)
    createProduct.clickSaveBtn().click()
    cy.contains("Element created").should("be.visible")


});

Cypress.Commands.add('exportProducts', (data) => {
    createProduct.clickproductsMenu().click()
    cy.url().should('include', '/products')
    createProduct.clickExport().click()
    cy.verifyDownload('products', {contains:true})
});