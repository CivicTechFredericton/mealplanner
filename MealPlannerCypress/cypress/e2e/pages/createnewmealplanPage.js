class createnewmealplanPage {

    createnewmealplanBtn() {
        return cy.xpath('//*[@id="root"]/div/div/div[1]/button')
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
        return cy.get('[placeholder="add tag"]')
    }

    clickcreateBtn() {
        return cy.get('.MuiDialogActions-root > .MuiButton-contained')
    }
}
export default createnewmealplanPage