class registerUsersPage {
    clickonUsersMenu() {
        return cy.xpath('(//*[@data-testid="ViewListIcon"])[5]')
    }

    clickRegisterBtn() {
        return cy.xpath('//*[@aria-label="Register"]')
    }

    InputFullName() {
        return cy.xpath('//*[text()="Full Name"]')
    }

    InputEmail() {
        return cy.xpath('//*[text()="Email"]')
    }

    InputPassword() {
        return cy.xpath('//*[text()="Password"]')
    }

    clickVisibilityIcon() {
        return cy.get('[data-testid="VisibilityIcon"]')
    }

    InputConfirmPassword() {
        return cy.xpath('//*[text()="Confirm Password"]')
    }

    clickToRegisterUser() {
        return cy.xpath('//*[text()="Register"]')
    }

    clickExport() {
        return cy.get('[data-testid="GetAppIcon"]')
    }

}
export default registerUsersPage