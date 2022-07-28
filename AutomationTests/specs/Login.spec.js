context("Login test", () => {
  it("test", () => {
    cy.visit("http://localhost:3333/#/");
    cy.get("[data-cy='login-page']").should("exist");
  });
});
