import editandDeletetheProductPage from "../Pages/editandDeletetheProductPage";
const editandDeletetheProduct = new editandDeletetheProductPage();

Cypress.Commands.add('EditProduct', (data) => {

    editandDeletetheProduct.clickproductsMenu().click()

    cy.get("table tbody tr").wait(1000).contains('tr', 'Ground Black Pepper').within(() => {

        //click 'Edit' of product
        cy.contains("Edit").click({ force: true });
        cy.url().should('include', "/products/")
        cy.wait(1000)
        editandDeletetheProduct.InputProductNameEn().clear().type(data.editProductNameEn)
        editandDeletetheProduct.InputProductNameFr().clear().type(data.editProductNameFr)
        editandDeletetheProduct.InputProductCode().clear().type(data.editProductCode)
        editandDeletetheProduct.InputProductPrice().clear().type(data.editProductPrice)
        editandDeletetheProduct.InputProductQuantity().clear().type(data.editProductQuantity)
        editandDeletetheProduct.InputProductMeasuringUnit().clear().type(data.editProductMeasuringUnit)
        editandDeletetheProduct.InputProductUPC().clear().type(data.InputProductSourceLink)
        editandDeletetheProduct.InputProductTags().clear().type(data.editProductUPC)
        editandDeletetheProduct.clickSaveBtn().click()
        cy.contains("Element updated").should('be.visible')
        

    })

});

Cypress.Commands.add('DeleteProduct', (data) => {

    editandDeletetheProduct.clickproductsMenu().click()

    cy.get("table tbody tr").wait(1000).contains('tr', 'Ground Black Pepper').within(() => {

        //Delete the product
        editandDeletetheProduct.selectcheckbox().click({force:true})

    })

})