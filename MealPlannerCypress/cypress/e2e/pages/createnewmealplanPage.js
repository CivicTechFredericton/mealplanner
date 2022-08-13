class createnewmealplanPage {

    createnewmealplanBtn() {

        return cy.get('[data-testid="create-new-mealplan-button"]')     
    }

    assignuser(){
        return cy.get('[data-testid="Assign-user"]')
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

    clickcreateBtn() {
        return cy.get('[data-testid="submit-new-mealplan-button"]')
    }
}
export default createnewmealplanPage