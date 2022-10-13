class registerUsersPage {
    clickonUsersMenu() {
        return cy.xpath('(//*[@data-testid="ViewListIcon"])[5]')
      }
    
      clickRegisterBtn() {
        return cy.xpath('//*[@aria-label="Register"]')
      }
    
      InputFullName() {
        return cy.xpath('//*[text()="Full Name"]').closest('div').find('input')
      }
    
      InputEmail() {
        return cy.xpath('//*[text()="Email"]').closest('div').find('input')
      }
    
      InputPassword() {
        return cy.xpath('//*[text()="Password"]').closest('div').find('input')
      }
    
      clickVisibilityIcon() {
        return cy.get('button[aria-label="toggle password visibility"]')
      }
    
      InputConfirmPassword() {
        return cy
          .xpath('//*[text()="Confirm Password"]')
          .closest('div')
          .find('input')
      }
    
      clickToRegisterUser() {
        return cy.xpath('//*[text()="Register"]')
      }
    
      clickExport() {
        return cy.get('[data-testid="GetAppIcon"]')
      }
}
export default registerUsersPage