import testdata from "../fixtures/testdata.json";
import createmealplantestdata from "../fixtures/createmealplantestdata.json";
import { v4 as uuidv4 } from "uuid";

describe("Shopping list functionality", function () {
  // Creates Unique Id for test
  const uniqueId = uuidv4();

  // Logs in before each test to ensure they are not state dependant
  beforeEach(function () {
    cy.login(testdata);
  });

  // Creates a new meal plan using the data from createmealplantestdata,
  // except for createmealplantest.nameEn
  // uniqueId replaces nameEn to ensure each test is unique
  it("Create Meal", function () {
    // Creates a new meal plan
    cy.createnewmealplan(createmealplantestdata, uniqueId);
    // Ensures the created meal plan shows up on page
    cy.contains(uniqueId).should("exist");
  });

  // Checks if shopping list is empty upon creation
  it("Checks Shopping List Empty", function () {
    // Searches for the element containing with uniqueId
    // `[data-testid="${string}-shoppingListIcon"]`
    // Written as data-testid={`${mealplan.nameEn}-shoppingListIcon`} in the MealPlan.tsx file
    cy.shoppinglist(uniqueId);
    // Ensures there are no items in the shopping list.
    // Searchs for checkbox as checkbox will only exist if there are items.
    cy.get(".MuiCheckbox-root").should("not.exist");
  });

  // Adds a meal to the newly created meal plan to test shopping list feature
  it("Add meal to plan", function () {
    // Searches for the meal plan with uniqueId and clicks
    cy.contains(uniqueId).click();
    // Searchs for a meal and selects it
    cy.contains("coriander coconut chutney").click();
    // Searches for the Elements with BREAKFAST, selects the first one and adds it to the meal plan
    cy.contains("BREAKFAST").first().click();
  });

  // Goes back to Shopping list and ensures the shopping list includes ingredients from the meal
  it("View Shopping List", function () {
    // Searches for the element containing with uniqueId
    // `[data-testid="${string}-shoppingListIcon"]`
    // Written as data-testid={`${mealplan.nameEn}-shoppingListIcon`} in the MealPlan.tsx file
    cy.shoppinglist(uniqueId);
    // Ensures the page includes the english name and "shopping list" of the meal plan
    cy.contains(uniqueId).should("exist");
    cy.contains("Shopping List").should("exist");
    // Ensures ingredients from the meal are on the shopping list.
    cy.contains("COCONUT chunks").should("exist");
    cy.contains("4 tbsp").should("exist");
    cy.contains("200 g").should("exist");
    cy.contains("3.47").should("exist");
  });

  // Deletes the created meal plan to clear up the database.
  it("Deletes Created Mealplan", function () {
    cy.deletenewmealplan(uniqueId);
    cy.contains(uniqueId).should("not.exist");
  });
});
