import PaginaBase from "./PaginaBase";

class PaginaInicio extends PaginaBase {
  visitar() {
    super.visitar("/");
  }

  validarSeccionesPrincipalesVisibles() {
    cy.contains("h2", "Category").should("be.visible");
    cy.contains("h2", "Features Items").should("be.visible");
    cy.get(".features_items .product-image-wrapper")
      .should("be.visible")
      .and("have.length.greaterThan", 0);
  }
}

export default PaginaInicio;
