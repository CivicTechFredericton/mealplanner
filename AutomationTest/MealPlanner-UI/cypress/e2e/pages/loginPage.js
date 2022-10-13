class loginPage {

    usernameInput() {
        return cy.get('[data-testid="username-textField"] input')
    }

    passwordInput() {
        return cy.get('[data-testid="password-textField"] input')
    }

    loginBtn() {
        return cy.get('[data-testid="login-button"]')
    }

    clickexpandIcononmealplan() {
        return cy.get('[data-testid="ExpandMoreIcon"]')
    }

}
export default loginPage