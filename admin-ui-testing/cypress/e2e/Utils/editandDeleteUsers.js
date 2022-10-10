import editandDeleteUsersPage from "../Pages/editandDeleteUsersPage";
const editandDeleteUsers = new editandDeleteUsersPage();

//Click Edit to edit user details
Cypress.Commands.add('ClickEdit', () => {
    editandDeleteUsers.clickonUsersMenu().click()
    cy.url().should('include', "/people")
    cy.get('table tbody tr')
        .wait(1000)
        .contains('tr', 'User Three')
        .within(() => {
            //click 'Edit' of Users
            cy.contains('Edit').click({ force: true });
            cy.url().should('include', '/people/');

        });
});

//Change User Details
Cypress.Commands.add('EditUser', (data) => {
    // editandDeleteUsers.clickSaveBtn.should('be.disabled')
    // editandDeleteUsers.InputFullName().clear().type(data.editFullName)
    // editandDeleteUsers.clickSaveBtn.should('be.visible')
    editandDeleteUsers.InputEmail().clear().type(data.editEmail,{force:true})
    editandDeleteUsers.AssignRole().clear().type(data.editRole)
    editandDeleteUsers.selectRoleClient().each(function ($ele, index, $list) {
        if ($ele.text().includes("Client")) {
            cy.wrap($ele).click()
        }
        else {
            cy.log($ele.text())
        }
    })
    editandDeleteUsers.clickSaveBtn().click()
    cy.contains("Element updated").should('be.visible')
})

//click Reset Passowrd of User
Cypress.Commands.add('ClickResetPassword', () => {

    editandDeleteUsers.clickonUsersMenu().click()
    cy.url().should('include', "/people")
    cy.get('table tbody tr')
        .wait(1000)
        .contains('tr', 'User Three')
        .within(() => {
            //click 'ResetPassword' of Users
            //editandDeleteUsers.clickResetPassword().click({ force: true })
            cy.contains('Reset password').click({ force: true });
            cy.url().should('include', "/reset")
        });
})

//create New Password
Cypress.Commands.add('CreateNewPassword', (data) => {

    editandDeleteUsers.InputNewPassword().type(data.NewPassword)
    editandDeleteUsers.clickNewPasswordVisibilityIcon().click()
    cy.wait(500)
    editandDeleteUsers.clickToSaveResetPassword().click()

})

//Select the checkbox of the User to delete
Cypress.Commands.add('SelectCheckboxToDeleteUser', () => {
    editandDeleteUsers.clickonUsersMenu().click()
    cy.url().should('include', "/people")
    cy.get('table tbody tr')
        .wait(1000)
        .contains('tr', 'User Three')
        .within(() => {
            //Select checkbox of User and click Delete
            editandDeleteUsers.selectcheckbox().click({ force: true })
           
        });

})

//click on closeIcon to unselect the checkbox
Cypress.Commands.add('UnSelectCheckbox', () => {
    //clear(UnSelect) Delete Users
    editandDeleteUsers.clickcloseIcon().click()

})

//click DeleteIcon to delete the user
Cypress.Commands.add('ClickDeleteIcontoDeleteUser', () => {
  
    //click DeleteIcon
    editandDeleteUsers.clickDeleteIcon().click()
    cy.contains("Element deleted").should('be.visible')

})

