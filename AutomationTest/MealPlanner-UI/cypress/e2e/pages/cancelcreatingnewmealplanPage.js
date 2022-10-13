class cancelcreatingnewmealplanPage {

    createnewmealplanBtn() {

        return cy.get('[data-testid="create-new-mealplan-button"]')     
    }

    assignuser(){
        return cy.get('[data-testid="assign-user"]')
    }

    selectoption(){
        return cy.get('[id="mui-5-option-0"]')
    }

    mealplannameEnInput() {
        return cy.get('[id="nameEn"]')
    }

    mealplannameFrInput() {
        return cy.get('[id="nameFr"]')
    }

    mealplandescriptionEnInput() {
        return cy.get('[id="descriptionEn"]')
    }

    mealplandescriptionFrInput() {
        return cy.get('[id="descriptionFr"]')
    }

    addTagInput() {
        return cy.get('[data-testid="add-tag"]')
    }

    clickcancelBtn() {
        return cy.get('[data-testid="cancel-new-mealplan-button"]')
    }
}
export default cancelcreatingnewmealplanPage