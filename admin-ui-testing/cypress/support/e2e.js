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

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
    })

import '../e2e/Utils/login.js'
import '../e2e/Utils/logout.js'
import '../e2e/Utils/createmeal.js'
import '../e2e/Utils/viewMethodSummaryofMeal.js'
import '../e2e/Utils/createProduct.js'
import '../e2e/Utils/viewNutritionofaProduct.js'
import '../e2e/Utils/editandDeletetheMeal.js'
import '../e2e/Utils/editandDeletetheProduct.js'
import '../e2e/Utils/createMeasures.js'
import '../e2e/Utils/editandDeleteMeasures.js'
import '../e2e/Utils/createNutrition.js'
import '../e2e/Utils/viewMicroandMacroNutrients.js'
import '../e2e/Utils/editandDeleteNutrition.js'



// Alternatively you can use CommonJS syntax:
// require('./commands')