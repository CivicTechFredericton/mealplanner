import viewNutritionofaProductPage from "../Pages/viewNutritionofaProductPage";
const viewNutritionofaProduct = new viewNutritionofaProductPage();

Cypress.Commands.add('nutritionofaProduct', () => {

    viewNutritionofaProduct.clickproductsMenu().click()

   
    cy.get("table tbody tr").wait(1000).contains('tr', 'Ground Black Pepper').within(() => {

        //click on ExpandMoreIcon to view the Nutrition information of a product
        // cy.get('td').eq(0).click()  //click on Expandmore
        viewNutritionofaProduct.clickexpandmoreIcon().click()

       
        //click on the link to view the product
        //cy.get("a").click({ force: true });

        //Delete the Product
        viewNutritionofaProduct.selectcheckbox().click({force:true})

        //click 'Edit' of product
       // cy.contains("Edit").click({ force: true });

    })

})

