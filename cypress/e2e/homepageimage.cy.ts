// class to select is bg-[url('/login-page-hero.jpg')]

describe("home page image should load", () => {
    it ("should load the home page image", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#home-page-image").should("exist");
    })
})

export {}