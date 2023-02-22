import mealplancalendarPage from '../pages/mealplancalendarPage';
const mealcalendar = new mealplancalendarPage();

Cypress.Commands.add('mealCalendar', (uniqueId, data) => {

    mealcalendar.selectmealPlan(uniqueId).click();

    mealcalendar.searchmealInput().type(data.TuesdayBreakfast);
    mealcalendar.selectMeal().first().click()
    mealcalendar.selectMeal().should("exist")
    mealcalendar.addTuesdayBreakfast().click({ multiple: true });
    mealcalendar.clearselectedMeal().click();
    mealcalendar.clearselectedMeal().should("not.exist")
    mealcalendar.mousehover().invoke('show')
    cy.wait(1000)

    mealcalendar.searchmealInput().clear().type(data.MondayLunch);
    mealcalendar.selectMeal().contains("Macaroni and Cheese").click();
    mealcalendar.selectMeal().should("exist")
    mealcalendar.addMondayLunch().click({ multiple: true });
    mealcalendar.clearselectedMeal().click();
    mealcalendar.clearselectedMeal().should("not.exist")
    mealcalendar.mousehover().invoke('show')
    cy.wait(1000)


    mealcalendar.searchmealInput().clear().type(data.ThurdaySnack);
    mealcalendar.selectMeal().contains("Cucumber Dill Salad").click();
    mealcalendar.selectMeal().should("exist")
    mealcalendar.addThurdaySnack().click({ multiple: true });
    mealcalendar.clearselectedMeal().click();
    mealcalendar.clearselectedMeal().should("not.exist")
    mealcalendar.mousehover().invoke('show') 


    //add meal to mealplan calendar
    mealcalendar.searchmealInput().clear().type(data.SaturdayLunch);
    mealcalendar.selectMeal().contains("coriander coconut chutney").click();
    mealcalendar.selectMeal().should("exist")
    mealcalendar.addSaturdayLunch().click({ multiple: true });
    mealcalendar.clearselectedMeal().click();
    mealcalendar.clearselectedMeal().should("not.exist")
    mealcalendar.mousehover().invoke('show')
    cy.wait(1000) 

    //add second meal Thursday snack to mealplan calendar
    mealcalendar.searchmealInput().clear().type(data.ThurdaySnack2);
    mealcalendar.selectMeal().first().click()
    mealcalendar.selectMeal().should("exist")
    mealcalendar.addThursdaySnack2().click({ multiple: true });
    mealcalendar.clearselectedMeal().click();
    mealcalendar.clearselectedMeal().should("not.exist")
    mealcalendar.mousehover().invoke('show')
    //delete the meal from mealplan calendar
    mealcalendar.deleteThursdaySnack2().click()
    cy.wait(1000)
    mealcalendar.clickDeleteIcon().click()
    mealcalendar.clickDeleteIcon().should("not.exist")
    mealcalendar.deleteThursdaySnack2().should("not.exist") 

    mealcalendar.searchmealInput().clear().type(data.SaturdayLunch2);
    mealcalendar.selectMeal().contains("Breakfast Burrito").click()
    mealcalendar.selectMeal().should("exist")
    mealcalendar.addSaturdayLunch2().click({ multiple: true });
    mealcalendar.clearselectedMeal().click();
    mealcalendar.clearselectedMeal().should("not.exist")
    mealcalendar.mousehover().invoke('show')
    mealcalendar.deleteSaturdayLunch2().click()
    cy.wait(1000)
    mealcalendar.clickDeleteIcon().click()
    mealcalendar.clickDeleteIcon().should("not.exist")
    mealcalendar.deleteSaturdayLunch2().should("not.exist") 

    //Print Meal Calendar
  // mealcalendar.clickPrintIcon().click()

})