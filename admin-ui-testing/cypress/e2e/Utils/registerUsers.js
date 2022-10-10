import registerUserPage from "../Pages/registerUsersPage";
const registerUsers = new registerUserPage();

Cypress.Commands.add('RegisterUser', (data) => {

    registerUsers.clickonUsersMenu().click()
    cy.url().should('include', "/people")

    registerUsers.clickRegisterBtn().click()
    cy.url().should('include', "/register")

    registerUsers.InputFullName().type(data.FullName)
    registerUsers.InputEmail().type(data.Email)
    registerUsers.InputPassword().type(data.Password)
    registerUsers.clickVisibilityIcon().click()
    cy.wait(500)
    registerUsers.clickVisibilityIcon().click()
    registerUsers.InputConfirmPassword().type(data.ConfirmPassword)
    registerUsers.clickToRegisterUser().click()
    //  cy.contains("Element created").should("be.visible")
});

Cypress.Commands.add('DownloadUsers', () => {

    registerUsers.clickonUsersMenu().click()
    cy.url().should('include', "/people")
    registerUsers.clickExport().click()
    cy.verifyDownload('people', {contains:true})
});

