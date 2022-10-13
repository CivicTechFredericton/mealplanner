import testdata from '../fixtures/testdata.json';
import editUserstestdata from '../fixtures/editUserstestdata.json';

describe('EditUserDetails', () => {

    beforeEach(function () {
        cy.login(testdata)
    });

    it('EditUserDetails', function () {
        cy.ClickEdit()
        cy.EditUser(editUserstestdata)
    })

    it('CreateNewPasswordForUser', function() {
        cy.ClickResetPassword()
        cy.CreateNewPassword(editUserstestdata)
    })

    it('DoNotDeletetheUser', function() {
        cy.SelectCheckboxToDeleteUser()
        cy.UnSelectCheckbox()
    })

    it('DeleteUser', function () {
        cy.SelectCheckboxToDeleteUser()
        cy.ClickDeleteIcontoDeleteUser()
    })

    it('Validate successful Logout', function () {
        cy.logout()
    })
})