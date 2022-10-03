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

    SelectProduct() {
        return cy.get('[id="productId"]')
    }

    SelectMeal() {
        return cy.get('[id="mealId"]')
    }

    clickSaveBtn() {
        return cy.get('[data-testid="SaveIcon"]')
    }

    clickExport() {
        return cy.get('[data-testid="GetAppIcon"]')
    }

}
export default createMeasuresPage