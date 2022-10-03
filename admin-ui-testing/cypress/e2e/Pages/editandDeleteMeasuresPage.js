class editandDeleteMeasuresPage {
    clickMeasuresonMenu() {
        return cy.xpath('(//*[@data-testid="ViewListIcon"])[3]')
    }

    selectcheckbox() {
        return cy.get('[data-testid="CheckBoxOutlineBlankIcon"]')

    }

    clickeditIcon() {

        return cy.get('[data-testid="CreateIcon"]')
    }

    InputmeasuringQunatity() {
        return cy.get('[id="quantity"]')
    }

    InputmeasuringUnit() {
        return cy.get('[id="unit"]')
    }

    SelectProduct() {
        return cy.get('[id="productId"]')
    }

    SelectMeal() {
        return cy.get('[id="mealId"]')
    }

    clickSaveBtn() {
        return cy.get('[data-testid="SaveIcon"]')
    }


}
export default editandDeleteMeasuresPage