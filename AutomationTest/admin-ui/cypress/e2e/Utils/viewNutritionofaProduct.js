import viewNutritionofaProductPage from "../Pages/viewNutritionofaProductPage";
const viewNutritionofaProduct = new viewNutritionofaProductPage();

//Click On ExpandMoreIcon of a Product
Cypress.Commands.add('ClickOnExpandMoreIconOfaProduct', () => {

    viewNutritionofaProduct.clickproductsMenu().click()

   
    cy.get("table tbody tr").wait(1000).contains('tr', 'Ground Black Pepper').within(() => {

        //click on ExpandMoreIcon to view the Nutrition information of a product
        // cy.get('td').eq(0).click()  //click on Expandmore
        viewNutritionofaProduct.clickexpandmoreIcon().click()

       
        //click on the link to view the product
        //cy.get("a").click({ force: true });
    })

});

//View Nutrition Of a Selected Product
Cypress.Commands.add('ViewNutritionOfaProduct', () => {

   cy.contains("Nutrition Information").should('be.visible')

})

