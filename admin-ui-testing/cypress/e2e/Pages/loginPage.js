class loginPage {

    usernameInput() {
        return cy.get('[id="username"]')
    }

    passwordInput() {
        return cy.get('[id="password"]')
    }

    loginBtn() {
        return cy.xpath('//*[text()="Sign in"]')
    }
}
export default loginPage