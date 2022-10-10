class editandDeleteUsersPage {
    clickonUsersMenu() {
        return cy.xpath('(//*[@data-testid="ViewListIcon"])[5]')
    }

    selectcheckbox() {
        return cy.get('[data-testid="CheckBoxOutlineBlankIcon"]')

    }

    clickeditIcon() {

        return cy.get('[data-testid="CreateIcon"]')
    }

    InputFullName() {
        return cy.xpath('//*[text()="Full Name"]')
    }

    InputEmail() {
        return cy.xpath('//*[text()="Email"]')
    }

   AssignRole()
   {
    return cy.get('[id="role"]')
   }

   selectRoleClient()
   {
    return cy.get('[data-value="APP_USER"]')
   }

   clickSaveBtn()
   {
    return cy.get('[data-testid="SaveIcon"]')
   }

   clickDeleteIcon()
   {
    return cy.get('[data-testid="DeleteIcon"]')
   }

   clickResetPassword()
   {
    return cy.xpath('//*[text()="Reset password"]')
   }

   InputNewPassword()
   {
    return cy.xpath('//*[text()="New Password"]')
   }

   clickNewPasswordVisibilityIcon()
   {
    return cy.get('[data-testid="VisibilityIcon"]')
   }

   clickToSaveResetPassword()
   {
    return cy.xpath('//*[text()="Reset Password"]')
   }

   clickcloseIcon()
   {
    return cy.get('[data-testid="CloseIcon"]')
   }

}
export default editandDeleteUsersPage