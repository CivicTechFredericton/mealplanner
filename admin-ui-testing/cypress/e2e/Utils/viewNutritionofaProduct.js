import viewNutritionofaProductPage from "../Pages/viewNutritionofaProductPage";
const viewNutritionofaProduct = new viewNutritionofaProductPage();

Cypress.Commands.add('nutritionofaProduct', () => {

    viewNutritionofaProduct.clickproductsMenu().click()

    cy.get("table tbody tr").each(($row) => {
        cy.wrap($row).within(() => {
            cy.get('td').each(($col) => {
                //  Cy.log($col.text())

                if ($col.text() == 'Ground Black Pepper') {
                    //click on ExpandMoreIcon to view the Nutrition information of a product
                    // cy.get('td').eq(0).click()  //click on Expandmore
                    viewNutritionofaProduct.clickexpandmoreIcon().click()

                    //lick on the link to view the product
                   // cy.get('td').shadow().eq(11).click()

                   // cy.get('td').shadow().eq(13).click() //locate edit button and click
                  // cy.get('td').find('[data-testid="CreateIcon"]').click()
                  cy.get('td').find('[data-testid="CreateIcon"]').invoke('show').click({force:"true"})
                  
                }
            })


        })
    })
})

