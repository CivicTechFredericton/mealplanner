class createMeasuresPage {
    clickMeasuresonMenu() {
        return cy.xpath('(//*[@data-testid="ViewListIcon"])[3]')
    }

    clickCreateBtn() {

        return cy.xpath('//*[text()="Create"]')
    }

    InputmeasuringQunatity() {
        return cy.get('[id="quantity"]')
    }

    InputmeasuringUnit() {
        return cy.get('[id="unit"]')
    }

    InputProduct() {
        return cy.get('[id="productId"]')
    }

    selectProduct() {
        return cy.get('[data-value="24"]')
    }

    InputMeal() {
        return cy.get('[id="mealId"]')
    }

    SelectMeal() {
        return cy.get('[data-value="1"]')
    }

    clickSaveBtn() {
        return cy.get('[data-testid="SaveIcon"]')
    }

    clickExport() {
        return cy.get('[data-testid="GetAppIcon"]')
    }

}
export default createMeasuresPage