import testdata from "../fixtures/testdata.json";
import createmealplantestdata from "../fixtures/createmealplantestdata.json";
import { v4 as uuidv4 } from "uuid";

describe("createnewmealplan", () => {
  const uniqueId = uuidv4();
  beforeEach(function () {
    cy.login(testdata);
  });

  it("Create Meal", function () {
    cy.createnewmealplan(createmealplantestdata, uniqueId);
    cy.contains(uniqueId);
  });

  it("Delete Meal", function () {
    cy.deletenewmealplan(uniqueId);
    cy.contains(uniqueId).should("not.exist");
  });

  it("Validate successful Logout", function () {
    cy.logout();
  });
});
