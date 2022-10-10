import editandDeletetheProductPage from "../Pages/editandDeletetheProductPage";
const editandDeletetheProduct = new editandDeletetheProductPage();

//Open the Product Edit
Cypress.Commands.add('OpenProductToEdit', (data) => {

    editandDeletetheProduct.clickproductsMenu().click()
    cy.url().should('include', '/products')
    cy.get("table tbody tr").wait(1000).contains('tr', 'Ground Black Pepper').within(() => {

        //click 'Edit' of product
        cy.contains("Edit").click({ force: true });
        cy.url().should('include', "/products/")
    })

});

//Changes Product details
Cypress.Commands.add('EditProduct', (data) => {

    editandDeletetheProduct.InputProductNameEn().clear().type(data.editProductNameEn)
    editandDeletetheProduct.InputProductNameFr().clear().type(data.editProductNameFr)
    editandDeletetheProduct.InputProductCode().clear().type(data.editProductCode)
    editandDeletetheProduct.InputProductPrice().clear().type(data.editProductPrice)
    editandDeletetheProduct.InputProductQuantity().clear().type(data.editProductQuantity)
    editandDeletetheProduct.InputProductMeasuringUnit().clear().type(data.editProductMeasuringUnit)
    editandDeletetheProduct.clickIsArchived().click()
    editandDeletetheProduct.InputProductUPC().clear().type(data.editProductSourceLink)
    editandDeletetheProduct.InputProductTags().clear().type(data.editProductUPC)
    editandDeletetheProduct.clickSaveBtn().click()
    cy.contains("Element updated").should('be.visible')

});

//Click on the Product SourceLink
Cypress.Commands.add('OpenSorceLinkToViewProduct', (data) => {

    editandDeletetheProduct.clickproductsMenu().click()
    cy.url().should('include', '/products')
    cy.get("table tbody tr").wait(1000).contains('tr', 'Ground Black Pepper').within(() => {

        //click 'SourceLink' of product
        cy.get("a").click({multiple:true, force:true})
        cy.url().should('include', "walmart")
        cy.url().should("not.include", "/products")
    })

});

//Select the checkbox
Cypress.Commands.add('SelectCheckboxToDeleteProduct', (data) => {

    editandDeletetheProduct.clickproductsMenu().click()
    cy.url().should('include', '/products')
    cy.get("table tbody tr").wait(1000).contains('tr', 'Ground Black Pepper').within(() => {
        
        //Select checkbox of User and click Delete
        editandDeletetheProduct.selectcheckbox().click({ force: true })

    })

});

//click CloseIcon to UnSelect the Checkbox
Cypress.Commands.add('UnSelectCheckboxOfaProduct', (data) => {

        //clear(UnSelect) Delete Users
        editandDeletetheProduct.clickcloseIcon().click()

})

//Click DeleteIcon To Delete Product
Cypress.Commands.add('ClickDelectIconToDeleteaProduct', (data) => {

       //Select the user to Delete
    editandDeletetheProduct.clickDeleteIcon().click()
    cy.contains("Element deleted").should('be.visible')

})
