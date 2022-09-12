import multipleuserslogintestdata from "../fixtures/multipleuserslogintestdata.json";
import { v4 as uuidv4 } from "uuid";

describe("Check Meal Plan Avatars ", function () {
  it("Check Meal Plan Avatars for each user", function () {
    cy.get(multipleuserslogintestdata).each((param) => {
      cy.visit("/");
      cy.get('[data-testid="username-textField"] input').type(param.username);
      cy.get('[data-testid="password-textField"] input').type(param.password);
      cy.get('[data-testid="login-button"]').click({ multiple: true });
      cy.url().should("include", "/mealplans");
      if (param.user === "Admin" || param.user === "Meal Designer") {
        multipleuserslogintestdata.forEach((user) => {
          const uniqueId = uuidv4();
          cy.createmealplanquick(user.user, uniqueId);
          cy.get(`[data-testid="${uniqueId}-mealcard"]`)
            .get('[data-testid="user-initials"]')
            .contains(user.avatar);
          cy.get(`[data-testid="${uniqueId}-mealcard"]`)
            .get('[data-testid="mealcard-header"]')
            .contains(user.user);
          cy.deletenewmealplan(uniqueId);
        });
      } else {
        const uniqueId = uuidv4();
        cy.createmealplanquick(param.user, uniqueId);
        cy.get(`[data-testid="${uniqueId}-mealcard"]`)
          .get('[data-testid="user-initials"]')
          .contains(param.avatar);
        cy.get(`[data-testid="${uniqueId}-mealcard"]`)
          .get('[data-testid="mealcard-header"]')
          .contains(param.user);
        cy.deletenewmealplan(uniqueId);
      }
      cy.logout();
    });
  });
});
