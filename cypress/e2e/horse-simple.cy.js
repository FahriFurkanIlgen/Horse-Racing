describe("Horse Race Simple E2E", () => {
  it("should display the app title", () => {
    cy.visit("/");
    cy.contains("Horse Racing Simulator").should("be.visible");
  });

  it("should show Generate Horses button", () => {
    cy.visit("/");
    cy.contains("Generate Horses").should("be.visible");
  });
});
