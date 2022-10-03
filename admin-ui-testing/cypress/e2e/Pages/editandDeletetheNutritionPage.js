class editandDeletetheNutritionPage
{
    clickNutritiononMenu() {
        return cy.xpath('(//*[@data-testid="ViewListIcon"])[4]')
    }

    selectcheckbox() {
        return cy.get('[data-testid="CheckBoxOutlineBlankIcon"]')

    }

    clickeditIcon() {

        return cy.get('[data-testid="CreateIcon"]')
    }
    
    selectMeal() {
        return cy.get('[data-testid="RadioButtonUncheckedIcon"]')
    }

    selectProduct() {
        return cy.get('[data-testid="RadioButtonUncheckedIcon"]')
    }

    clickArrowDownIcon() {
        return cy.get('[data-testid="ArrowDropDownIcon"]')
    }

    InputServingSize() {
        return cy.get('[id="servingSize"]')
    }

    InputServingSizeUnit() {
        return cy.get('[id="servingSizeUnit"]')
    }

    InputservingSizeText() {
        return cy.get('[id="servingSizeText"]')
    }

    InputCalories() {
        return cy.get('[id="calories"]')
    }

    InputTotalFat() {
        return cy.get('[id="totalFat"]')
    }

    InputTotalFatUnit() {
        return cy.get('[id="totalFatUnit"]')
    }

    InputTotalFatPercent() {
        return cy.get('[id="totalFatPercent"]')
    }

    InputSaturatedFat() {
        return cy.get('[id="saturatedFat"]')
    }

    InputSaturatedFatUnit() {
        return cy.get('[id="saturatedFatUnit"]')
    }

    InputSaturatedFatPercent() {
        return cy.get('[id="saturatedFatPercent"]')
    }

    InputTransFat() {
        return cy.get('[id="transFat"]')
    }

    InputTransFatUnit() {
        return cy.get('[id="transFatUnit"]')
    }

    InputTransFatPercent() {
        return cy.get('[id="transFatPercent"]')
    }

    InputCholestrol() {
        return cy.get('[id="cholestrol"]')
    }

    InputCholestrolUnit() {
        return cy.get('[id="cholestrolUnit"]')
    }

    InputCholestrolPercent() {
        return cy.get('[id="cholestrolPercent"]')
    }

    InputSodium() {
        return cy.get('[id="sodium"]')
    }

    InputSodiumUnit() {
        return cy.get('[id="sodiumUnit"]')
    }

    InputSodiumPercent() {
        return cy.get('[id="sodiumPercent"]')
    }

    InputCarboHydrate() {
        return cy.get('[id="carbohydrate"]')
    }

    InputCarboHydrateUnit() {
        return cy.get('[id="carbohydrateUnit"]')
    }

    InputCarboHydratePercent() {
        return cy.get('[id="carbohydratePercent"]')
    }

    InputDietaryFibre() {
        return cy.get('[id="dietaryFibre"]')
    }

    InputDietaryFibreUnit() {
        return cy.get('[id="dietaryFibreUnit"]')
    }

    InputDietaryFibrePercent() {
        return cy.get('[id="dietaryFibrePercent"]')
    }

    TotalSugar() {
        return cy.get('[id="totalSugar"]')
    }

    TotalSugarUnit() {
        return cy.get('[id="totalSugarUnit"]')
    }

    TotalSugarPercent() {
        return cy.get('[id="totalSugarPercent"]')
    }

    InputProtein() {
        return cy.get('[id="protein"]')
    }

    InputProteinUnit() {
        return cy.get('[id="proteinUnit"]')
    }

    InputProteinPercent() {
        return cy.get('[id="proteinPercent"]')
    }

    InputVitaminA() {
        return cy.get('[id="vitA"]')
    }

    InputVitaminC() {
        return cy.get('[id="vitC"]')
    }

    InputVitaminD() {
        return cy.get('[id="vitD"]')
    }

    InputVitaminB6() {
        return cy.get('[id="vitB6"]')
    }

    InputVitaminB12() {
        return cy.get('[id="vitB12"]')
    }

    InputVitaminK() {
        return cy.get('[id="vitK"]')
    }

    InputVitaminE() {
        return cy.get('[id="vitE"]')
    }

    InputCalcium() {
        return cy.get('[id="calcium"]')
    }


    InputIron() {
        return cy.get('[id="iron"]')
    }


    InputPotassium() {
        return cy.get('[id="potassium"]')
    }

    clickSaveBtn() {
        return cy.get('[data-testid="SaveIcon"]')
    }
}
export default editandDeletetheNutritionPage