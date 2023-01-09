import loginPage from '../pages/loginPage.js'
const login = new loginPage();
import logoutPage from '../pages/logoutPage.js'
const logout = new logoutPage();
import createnewmealplanPage from '../pages/createnewmealplanPage.js'
const createnewmealplan = new createnewmealplanPage();
import cancelcreatingnewmealplanPage from '../pages/cancelcreatingnewmealplanPage.js';
const cancelcreatingnewmealplan = new cancelcreatingnewmealplanPage();
import editMealPlanPage from "../pages/editMealPlanPage";
const editMealPlan = new editMealPlanPage();
import deletenewmealplanPage from '../pages/deletenewmealplanPage.js'
const deletenewmealplan = new deletenewmealplanPage();
// import shoppinglistPage from "../pages/shoppinglistPage.js";
// const shoppinglist = new shoppinglistPage();
import searchmealPage from "../pages/searchmealPage";
const searchmeal = new searchmealPage();
import mealplancalendarPage from '../pages/mealplancalendarPage';
const mealcalendar = new mealplancalendarPage();
import viewmealsPage from "../pages/viewmealsPage";
const viewmeals = new viewmealsPage();
import shoppinglistPage from "../pages/shoppinglistPage.js";
const shoppinglist = new shoppinglistPage();



Cypress.Commands.add('smoketest', (data, uniqueId) => {
    cy.visit('/')
    login.usernameInput().type(data.username)
    login.passwordInput().type(data.password)
    login.loginBtn().click({ multiple: true })
    cy.url().should('include', '/mealplans')

    //create new mealplan
    createnewmealplan.createnewmealplanBtn().click()
    createnewmealplan.clickcreateBtn().should('be.disabled')
    createnewmealplan.assignuser().type(data.userassignedformealplan)

    createnewmealplan.selectoption().each(function ($ele, index, $list) {

        if ($ele.text().includes("Admin")) {

            cy.wrap($ele).click()
            cy.wait(2000)

        }
        else {
            cy.log($ele.text())
        }
    })

    createnewmealplan.mealplannameEnInput().type(uniqueId)
    createnewmealplan.clickcreateBtn().should('be.enabled')
    createnewmealplan.mealplannameFrInput().type(data.mealplannameFr)
    createnewmealplan.mealplandescriptionEnInput().type(data.mealplandescriptionEn)
    createnewmealplan.mealplandescriptionFrInput().type(data.mealplandescriptionFr)
    createnewmealplan.addTagInput().type(data.addTag)
    createnewmealplan.clickcreateBtn().click()
    cy.wait(1000)
    cy.contains(uniqueId).should("exist");



    //edit the mealplan description and tags
    //editMealPlan.selectmealPlan(uniqueId).click();
    cy.contains(uniqueId).click()

    editMealPlan.clickkeyboardarrowdownIcon().click()

    editMealPlan.editDescription().clear().type(data.editmealplandescription)

    editMealPlan.clickcancelIconofaddtag().click()
    editMealPlan.editaddtag().type(data.editaddtag)

    editMealPlan.clickkeyboardarrowupIcon().click()
    cy.url().should('include', '/mealplans')
    cy.wait(1000)

    editMealPlan.clickmealplansmenu().click()
    cy.url().should('include', '/mealplans')

    editMealPlan.clickexpandIcononmealplan().click({ multiple: true })

    //search meal
    searchmeal.selectmealPlan(uniqueId).click();

    searchmeal.searchmealInput().type(data.searchmealbreakfast)
    searchmeal.selectMeal().click({ multiple: true })
    searchmeal.selectMeal().should("exist")
    searchmeal.clearselectedMeal().click();
    searchmeal.clearselectedMeal().should("not.exist")

    //scrollintoview for selecting meal
    searchmeal.searchmealInput().clear().type(data.searchmeallunch)
    cy.contains('Macaroni and Cheese').scrollIntoView()
    cy.wait(1000)
    searchmeal.selectMeal().contains('Macaroni and Cheese').click()
    searchmeal.selectMeal().should("exist")
    searchmeal.clearselectedMeal().click();
    searchmeal.clearselectedMeal().should("not.exist")


    //create mealplan calendar
    mealcalendar.searchmealInput().clear().type(data.TuesdayBreakfast);
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

    //click on meals menu
    viewmeals.clickonmealsmenu().click();
    cy.url().should('include', '/meals')
    cy.wait(1000)
    cy.contains('Macaroni and Cheese').scrollIntoView()
    cy.wait(1000)
    cy.contains('Cucumber Dill Salad').scrollIntoView()
    cy.wait(1000)

    cy.contains('coriander coconut chutney').scrollIntoView()
    cy.wait(1000)
    cy.contains(' coriander coconut chutney').click()
    cy.contains('Tips').scrollIntoView()
    cy.wait(1000)
  //  viewmeals.clickPrintMeal().click()

    //click on mealplans menu
    viewmeals.clickonmealplansmenu().click();
    cy.url().should('include', '/mealplans')
    cy.contains('Meal Designer').scrollIntoView()
    cy.wait(1000)
    cy.contains('Admin').scrollIntoView()
    cy.wait(1000)

     //view shopping list
     cy.shoppinglist(uniqueId);
     // Ensures the page includes the english name and "shopping list" of the meal plan
     cy.contains(uniqueId).should("exist");
     cy.contains("Shopping List").should("exist");
     // Ensures ingredients from the meal are on the shopping list.
     cy.contains("COCONUT chunks").should("exist");
     cy.contains("2 tbsp").should("exist");
     cy.contains("200 g").should("exist");
     cy.contains("3.47").should("exist");
    // shoppinglist.clickPrintIcon().click()
     cy.go('back')
     cy.wait(1000)

    //delete the new mealplan
    cy.contains(uniqueId).get(`[data-testid="${uniqueId}-delete"]`).click();
    cy.contains(uniqueId).should('not.exist')

    //cancel creating new mealplan
    cancelcreatingnewmealplan.createnewmealplanBtn().click()
    cancelcreatingnewmealplan.mealplannameEnInput().type(data.mealplannameEn)
    cancelcreatingnewmealplan.mealplannameFrInput().type(data.mealplannameFr)
    cancelcreatingnewmealplan.mealplandescriptionEnInput().type(data.mealplandescriptionEn)
    cancelcreatingnewmealplan.mealplandescriptionFrInput().type(data.mealplandescriptionFr)
    cancelcreatingnewmealplan.addTagInput().type(data.addTag)
    cancelcreatingnewmealplan.clickcancelBtn().click()
   // cy.contains(uniqueId).should("not.exist");

    logout.logoutButton().click()
    login.usernameInput().should('be.visible')
})