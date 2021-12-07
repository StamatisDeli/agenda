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

  describe("User list", () => {
    it("renders the a users list", function () {
      cy.contains("Master Yoda");
      cy.contains("Anakin Skywalker");
    });
  });

  it("selects a user on click and changes color to blue", function () {
    cy.get("[data-testid=5c093af1c6ee9117a581c7d6]").click();

    cy.get("[data-testid=5c093af1c6ee9117a581c7d6]").should(
      "have.css",
      "background-color",
      "rgb(59, 130, 246)"
    );
  });

  describe.only("ContactInfo", () => {
    it("renders info panel to the right the first time the app inializes", function () {
      cy.contains("Select a user to edit");
    });

    it("renders the data of the selected user on the right section within a form", function () {
      cy.get("[data-testid=5c093af1c6ee9117a581c7d6]").click();

      cy.get("[data-testid=name-input]")
        .should("be.visible")
        .should("have.value", "Master Yoda");
    });

    it("the form should validate missing required field", function () {
      cy.get("[data-testid=5c093af1c6ee9117a581c7d6]").click();

      cy.get('[type="submit"]').click();

      cy.contains("Please enter phone").should("be.visible");
    });

    it("The cancel button should appear when user starts editing the form", function () {
      cy.get("[data-testid=5c093af1c6ee9117a581c7d6]").click();
      cy.get("#phone").type("0010101010");

      cy.get("[data-testid=cancel-button]").should("be.visible");
    });

    it("The cancel button should reset the form", function () {
      cy.get("[data-testid=5c093af1c6ee9117a581c7d6]").click();
      cy.get("#phone").type("0010101010");

      cy.get("[data-testid=cancel-button]").should("be.visible");
      cy.get("[data-testid=cancel-button]").click();

      cy.get("#phone").should("have.value", "");
    });

    it.only("The form should submit with the correct data", function () {
      const formData = {
        id: "5c093af1c6ee9117a581c7d6",
        photo: "https://randomuser.me/api/portraits/men/40.jpg",
        name: "Master Yoda",
        company: "ZOLAREX",
        email: "bates.washington@zolarex.io",
        phone: "0010101010",
        address: "958 Brevoort Place, Ona, Maine, 2433",
      };

      cy.intercept("PUT", "**/users/5c093af1c6ee9117a581c7d6", formData).as(
        "formPUT"
      );

      cy.get("[data-testid=5c093af1c6ee9117a581c7d6]").click();
      cy.get("#phone").type("0010101010");

      cy.get('[type="submit"]').click();
      cy.wait("@formPUT")
        .then((xhr) => xhr.response.body)
        .then((body) => {
          assert.deepEqual(body, formData);
        });
    });
  });
});
