// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath')

import "cypress-real-events/support"
import '@4tw/cypress-drag-drop'

import '../e2e/utils/login.js'
import '../e2e/utils/logout.js'
import '../e2e/utils/createnewmealplan.js'
import '../e2e/utils/cancelcreatingnewmealplan.js'
import '../e2e/utils/deletenewmealplan.js'
import '../e2e/utils/shoppinglist.js'
import '../e2e/utils/searchmeal.js'
import '../e2e/utils/editmealplanHeader.js'
import '../e2e/utils/viewmeals.js'
import "../e2e/utils/mealplancalendar.js"
import "../e2e/utils/multipleuserslogin.js"
import "../e2e/utils/editMealPlanNameUser.js"
import "../e2e/utils/createMealPlanQuick.js"


// Alternatively you can use CommonJS syntax:
// require('./commands')