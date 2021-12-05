describe("Agenda", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.fixture("users").then((json) => {
      cy.intercept("GET", "**/users", json);
    });

    cy.fixture("user").then((json) => {
      cy.intercept("GET", "**/users/**", json);
    });
  });

  it("renders the agenda", function () {
    cy.get("[data-testid=agenda]").should("be.visible");
  });

  it("renders the a users list", function () {
    cy.contains("Master Yoda");
    cy.contains("Anakin Skywalker");
  });

  it("renders info panel to the right the first time the app inializes", function () {
    cy.contains("Select a user to edit");
  });

  it("selects a user on click and changes color to blue", function () {
    cy.get("[data-testid=5c093af1c6ee9117a581c7d6]").click();

    cy.get("[data-testid=5c093af1c6ee9117a581c7d6]").should(
      "have.css",
      "background-color",
      "rgb(59, 130, 246)"
    );
  });

  const r = {
    id: "5c093af1c6ee9117a581c7d6",
    photo: "https://randomuser.me/api/portraits/men/40.jpg",
    name: "Master Yoda",
    company: "ZOLAREX",
    email: "bates.washington@zolarex.io",
    phone: "+1 (915) 447-2207",
    address: "958 Brevoort Place, Ona, Maine, 2433",
  };

  it("renders the data of the selected user on the right section within a form", function () {
    cy.get("[data-testid=5c093af1c6ee9117a581c7d6]").click();

    cy.get("[data-testid=name-input]")
      .should("be.visible")
      .should("have.value", "Master Yoda");
  });
});
