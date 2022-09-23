class createmealPage {

    clickeditIcon()
    {
        return cy.xpath('(//*[@data-testid="CreateIcon"])[1]')
    }

    InputMealCode() {
        return cy.get('[id="code"]')
    }

    InputMealNameEn() {
        return cy.get('[id="nameEn"]')
    }

    InputMealNameFr() {
        return cy.get('[name="nameFr"]')
    }

    InputMealDescriptionEn() {
        return cy.get('[id="descriptionEn"]')
    }

    InputMealDescriptionFr() {
        return cy.get('[id="descriptionFr"]')
    }


    clickSave() {
        return cy.get('[data-testid="SaveIcon"]')
    }

    
}
export default createmealPage