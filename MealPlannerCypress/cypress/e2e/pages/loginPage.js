class loginPage {

    usernameInput() {
        return cy.get('[id="mui-1"]')
    }

    passwordInput() {
        return cy.get('[id="mui-2"]')
    }

    loginBtn() {
        return cy.get('[type="button"]')
    }
}
export default loginPage