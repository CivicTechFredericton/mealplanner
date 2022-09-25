import testdata from "../fixtures/testdata.json";
import createmealplantestdata from "../fixtures/createmealplantestdata.json";
import editmealplanHeadertestdata from "../fixtures/editmealplanheadertestdata.json";
import { v4 as uuidv4 } from "uuid";

//
describe("Edit Meal Plan Name, User, Description and Tags", () => {
  // Unique IDs for uniqueness
  const uniqueId = uuidv4();
  const uniqueId2 = uuidv4();
  // Log in before each it statement
  beforeEach(function () {
    cy.login(testdata);
  });

  // Creates new mealplan from test data, using uniqueId english name and "Admin" as user
  it("Create Meal", function () {
    cy.createnewmealplan(createmealplantestdata, uniqueId, "Admin");
    cy.contains(uniqueId).should("exist");
  });

  // Replaces uniqueId with UniqueId2 and "Admin" with "Meal Designer"
  it("Edit Meal Plan name and user", function () {
    cy.editMealPlanNameUser(uniqueId, uniqueId2, "Admin", "Meal Designer");
  });

  //
  it("Edit Meal Plan tags and descriptions ", function () {
    cy.editmealplanHeader(uniqueId2, editmealplanHeadertestdata);
  });

  it("Make sure Name and User values are changed", function () {
    // Added wait as Cypress can test before it can take snapshot
    cy.wait(1000);
    cy.contains(uniqueId).should("not.exist");
    cy.get(`[data-testid="${uniqueId2}-mealcard"]`)
      .contains("Admin")
      .should("not.exist");
    cy.get(`[data-testid="${uniqueId2}-mealcard"]`).contains("Meal Designer");
  });

  it("Make sure the tags and descriptions are changed", function () {
    cy.checkDescriptionAndTags(
      uniqueId2,
      createmealplantestdata,
      editmealplanHeadertestdata
    );
  });

  it("Delete Meal", function () {
    cy.deletenewmealplan(uniqueId2);
    cy.contains(uniqueId2).should("not.exist");
  });
});
