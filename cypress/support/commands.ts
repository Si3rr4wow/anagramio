/// <reference types="cypress" />

Cypress.Commands.add("login", () => {
  cy.intercept("GET", "/api/auth/session", {
    statusCode: 200,
    body: {
      user: {
        name: "Test User",
        email: "test@example.com",
      },
      expires: "2099-01-01T00:00:00.000Z",
    },
  });
});
