class shoppinglistPage {

    
    shoppinglistIcon() {

        cy.contains("Vegetarian Meal Plan")
        return cy.get('[data-testid="ShoppingCartIcon"]')
    }



   
}
export default shoppinglistPage