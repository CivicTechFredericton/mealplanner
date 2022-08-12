import testdata from "../fixtures/testdata.json";
import createmealplantestdata from "../fixtures/createmealplantestdata.json";

describe("createnewmealplan", () => {
  it("Validate successful Login", function () {
    cy.login(testdata);
    cy.createnewmealplan(createmealplantestdata);

    cy.contains(createmealplantestdata.mealplannameEn)
      .get(`[data-testid="${createmealplantestdata.mealplannameEn}-delete"]`)
      .click({ multiple: true });
    cy.contains(createmealplantestdata.mealplannameEn).should("not.exist");
  });

  it("Validate successful Logout", function () {
    cy.logout();
  });
});
