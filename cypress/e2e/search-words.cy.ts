describe("Home page", () => {
  const url = Cypress.env("SITE_NAME");

  before(() => {
    cy.clearCookies();
  });
  it("Searches for ac", () => {
    cy.login();
    cy.visit(url);

    cy.get("input[name=word]").type("slate");

    cy.wait(2000);

    cy.get("li").first().click();

    cy.get("#definition").should("not.be.empty");
  });
});
