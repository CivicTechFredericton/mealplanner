class logoutPage {

    clickAccountCircleIcon() {
        return cy.get('[data-testid="AccountCircleIcon"]')
    }

    clicklogout(){
        return cy.get('[data-testid="PowerSettingsNewIcon"]')
    }

}
export default logoutPage