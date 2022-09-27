class mealplancalendarPage {

    selectmealPlan(uniqueId) {

        return cy.get(`[data-testid="${uniqueId}-mealcard"]`)

    }

    searchmealInput() {

        return cy.get('[data-testid="search-meal"] input')
    }

    selectMeal() {
        return cy.get('[data-testid="select-meal"]')
    }

    clearselectedMeal() {
        return cy.get('[data-testid="clearSelectedMeal"]')
    }

    addTuesdayBreakfast() {

        return cy.xpath('(//*[@data-testid="mealplancalendar"]//following-sibling::td[1])[1]')

    }

    addMondayLunch() {
        return cy.xpath('(//*[@data-testid="mealplancalendar"]//following-sibling::tr[1]/td[1])[1]')
        
    }

    addWednesdayDinner() {
        return cy.xpath('(//*[@data-testid="mealplancalendar"]//following-sibling::tr[2]/td[3])[1]')

    }

    addFridaySnack()
    {
        return cy.xpath('(//*[@data-testid="mealplancalendar"]//following-sibling::tr[3]/td[5])[1]')
    }

    addThurdaySnack()
    {
        return cy.xpath('(//*[@data-testid="mealplancalendar"]//following-sibling::tr[3]/td[4])[1]')
    }

    addThursdaySnack2()
    {
        return cy.xpath('(//*[@data-testid="mealplancalendar"]//following-sibling::tr[3]/td[4])[1]')
    }

    deleteThursdaySnack2()
    {
        return cy.xpath('//*[@data-testid="mealplancalendar"]//following-sibling::tr[3]/td[4]/div[2]')
    }

    addSaturdayLunch()
    {
        return cy.xpath('(//*[@data-testid="mealplancalendar"]//following-sibling::tr[1]/td[6])[1]')
    }

    addSaturdayLunch2()
    {
        return cy.xpath('(//*[@data-testid="mealplancalendar"]//following-sibling::tr[1]/td[6])[1]')
    }

    deleteSaturdayLunch2()
    {
        return cy.xpath('//*[@data-testid="mealplancalendar"]//following-sibling::tr[1]/td[6]/div[2]')
    }

    addTuesdayDinner()
    {
        return cy.xpath('//*[@data-testid="mealplancalendar"]//following-sibling::tr[2]/td[2]/div[2]')
    }

    mousehover()
    {
        return cy.get('[data-testid="onmouse-hover"]')
    }

    clickDeleteIcon()
    {
        return cy.get('[data-testid="display-deleteIcon"]')
    }

    clickPrintIcon()
    {
        return cy.get('[data-testid="PrintIcon"]')
    }

}
export default mealplancalendarPage