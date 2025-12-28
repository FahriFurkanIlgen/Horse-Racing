describe("Horse Race App E2E", () => {
  it("should load the home page", () => {
    cy.visit("/");
    cy.contains("Horse").should("exist");
  });

  it("should generate horses and schedule", () => {
    cy.visit("/");
    cy.contains("Generate Horses").click();
    cy.contains("Generate Schedule").click();
    cy.contains("Race").should("exist");
  });

  it("should run a race and show results", () => {
    cy.visit("/");
    cy.contains("Generate Horses").click();
    cy.contains("Generate Schedule").click();
    cy.contains("Start Race").click();
    cy.contains("LeaderBoard", { timeout: 10000 }).should("exist");
  });
});
