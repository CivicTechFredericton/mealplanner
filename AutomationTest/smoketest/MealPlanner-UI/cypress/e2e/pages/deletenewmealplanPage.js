class deletenewmealplanPage {

    deletenewmealplanIcon() {

        return cy.get(`[data-testid="${uniqueId}-delete"]`)     
    }

    clickDeleteIcon()
    {
        return cy.get('[data-testid="DeleteTwoToneIcon"]')
    }
}
export default deletenewmealplanPage