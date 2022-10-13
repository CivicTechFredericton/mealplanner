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

    InputProduct() {
        return cy.get('[id="productId"]')
    }
    
    selectProduct() {
        return cy.get('[data-value="296"]')
    }

    InputMeal() {
        return cy.get('[id="mealId"]')
    }

    SelectMeal() {
        return cy.get('[data-value="49"]')
    }

    clickSaveBtn() {
        return cy.get('[data-testid="SaveIcon"]')
    }

    clickcloseIcon()
   {
    return cy.get('[data-testid="CloseIcon"]')
   }

   clickDeleteIcon()
   {
    return cy.get('[data-testid="DeleteIcon"]')
   }


}
export default editandDeleteMeasuresPage