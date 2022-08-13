class shoppinglistPage {
 
    shoppinglistIcon() {

        cy.contains("Vegetarian Meal Plan")
        cy.wait(1000)
        return cy.get('[data-testid="ShoppingCartIcon"]')
    }   
}
export default shoppinglistPage