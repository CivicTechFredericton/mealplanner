import createProductPage from "../Pages/createproductPage";
const createProduct = new createProductPage();

Cypress.Commands.add('createProductlist', (data) => {
    createProduct.clickproductsMenu().click()

    createProduct.clickCreateBtn().click()

    createProduct.InputProductNameEn().type(data.ProductNameEn)
    createProduct.InputProductNameFr().type(data.ProductNameFr)
    createProduct.InputProductCode().type(data.ProductCode)
    createProduct.InputProductPrice().type(data.ProductPrice)
    createProduct.InputProductQuantity().type(data.ProductQuantity)
    createProduct.InputProductMeasuringUnit().type(data.ProductMeasuringUnit)
    createProduct.InputProductUPC().type(data.ProductUPC)
    createProduct.InputProductSourceLink().type(data.ProductSourceLink)
    createProduct.InputProductTags().type(data.ProductTags)
    createProduct.clickSaveBtn().click()

    
})