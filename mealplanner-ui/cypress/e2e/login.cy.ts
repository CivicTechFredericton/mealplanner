describe("Login test", () => {
  // visit page and get variables
  beforeEach(() => {
    cy.visit("http://localhost:3333/");
  });

  it("Test render", () => {
    const loginPage = cy.dataCy("login-page");
    const usernameInput = cy.dataCy("username-input");
    const passwordInput = cy.dataCy("password-input");
    const submitButton = cy.dataCy("submit-button");
    loginPage.should("exist");
    usernameInput.should("exist");
    passwordInput.should("exist");
    submitButton.should("exist");
  });

  it("Test login for user1", async () => {
    const loginPage = cy.dataCy("login-page");
    const usernameInput = cy.dataCy("username-input");
    const passwordInput = cy.dataCy("password-input");
    const submitButton = cy.dataCy("submit-button");
    const mealPlansPage = cy.dataCy("mealplans-page");

    // add values and test button
    usernameInput.type("user1@example.com");
    passwordInput.type("88b70df4515ebd1");
    await submitButton.click();
    loginPage.should("not.exist");
    mealPlansPage.should("exist");
  });
});
