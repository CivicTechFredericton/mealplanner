import testdata from "../fixtures/testdata.json";
import createmealplantestdata from "../fixtures/createmealplantestdata.json";
import { v4 as uuidv4 } from "uuid";

describe("Edit Meal Plan Name and User", () => {
  const uniqueId = uuidv4();
  const uniqueId2 = uuidv4();
  beforeEach(function () {
    cy.login(testdata);
  });

  it("Create Meal", function () {
    cy.createnewmealplan(createmealplantestdata, uniqueId, "Admin");
    cy.contains(uniqueId).should("exist");
  });

  it("Edit Meal Plan", function () {
    cy.editMealPlanNameUser(uniqueId, uniqueId2, "Admin", "Meal Designer");
  });

  it("Make sure values are changed", function () {
    // Added wait as Cypress can test before it can take snapshot
    cy.wait(1000);
    cy.contains(uniqueId).should("not.exist");
    cy.get(`[data-testid="${uniqueId2}-mealcard"]`).contains("Meal Designer");
  });

  it("Delete Meal", function () {
    cy.deletenewmealplan(uniqueId2);
    cy.contains(uniqueId2).should("not.exist");
  });
});