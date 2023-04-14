// This test is for logging in with Google OAuth however due to the nature of OAuth, it is not possible to test this in Cypress.
// This test is for demonstration purposes only. It will not pass. sufficient documentation is provided for me to write my own tests.
// however if the OAuth flow did not require a redirect to a different domain, this test would work.

describe("user should be able to login", () => {
  it("should be able to log in", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#sign-in").click();
    cy.get(
      'form[action="http://localhost:3000/api/auth/signin/google"]'
    ).submit();
    cy.origin("https://accounts.google.com", () => {
      cy.get('input[name="identifier"]').type("");
      cy.get('input[name="identifier"]').type("{enter}");
      cy.get('input[name="password"]').type("");
      cy.get('input[name="password"]').type("{enter}");
    });
    cy.get("#sign-in").should("not.exist");
  });
});

export {}
