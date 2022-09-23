class createmealPage {

    clickCreateBtn() {

        return cy.xpath('//*[text()="Create"]')
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

    InputMealTags() {
        return cy.get('[id="tags"]')
    }

    InputMealDescriptionEn() {
        return cy.get('[id="descriptionEn"]')
    }

    InputMealDescriptionFr() {
        return cy.get('[id="descriptionFr"]')
    }

    checkMealBreakfast() {
        return cy.get('[id="categories_BREAKFAST"]')
    }

    checkMealLunch() {
        return cy.get('[id="categories_LUNCH"]')
    }

    checkMealDinner() {
        return cy.get('[id="categories_DINNER"]')
    }

    checkMealSnack() {
        return cy.get('[id="categories_SNACK"]')
    }

    InputMealPhotoURL() {
        return cy.get('[id="photoUrl"]')
    }

    InputVideoURL() {
        return cy.get('[id="videoUrl"]')
    }

    InputCookingDuration() {
        return cy.get('[id="cookingDuration"]')
    }

    InputServes() {
        return cy.get('[id="serves"]')
    }

    InputTotalCost() {
        return cy.get('[id="totalCost"]')
    }

    InputServingCost() {
        return cy.get('[name="servingCost"]')
    }

    InputServingSize() {
        return cy.get('[id="servingsSize"]')
    }

    InputServingSizeUnit() {
        return cy.get('[id="servingsSizeUnit"]')
    }

    InputNutrionRating() {
        return cy.get('[id="nutritionRating"]')
    }

    clickArrowDropDownIcon() {
        return cy.get('[data-testid="ArrowDropDownIcon"]')
    }

    InputMealMethod() {
        return cy.get('[id="method"]')
    }

    InputMealTips() {
        return cy.get('[id="tips"]')
    }

    clickSave() {
        return cy.get('[data-testid="SaveIcon"]')
    }

    clickExport(){
        return cy.get('[data-testid="GetAppIcon"]')
    }
}
export default createmealPage