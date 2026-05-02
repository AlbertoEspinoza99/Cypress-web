import PaginaBase from "./PaginaBase";

class PaginaProductos extends PaginaBase {
  visitar() {
    super.visitar("/products");
  }

  validarCargada() {
    cy.location("pathname").should("include", "/products");
    cy.contains("h2", "All Products").should("be.visible");
    cy.get(".features_items .product-image-wrapper")
      .should("be.visible")
      .and("have.length.greaterThan", 0);
  }

  buscar(termino) {
    cy.get("#search_product").clear().type(termino);
    cy.get("#submit_search").click();
  }

  validarResultadosBusqueda(termino) {
    cy.contains("h2", "Searched Products").should("be.visible");
    cy.get(".features_items .product-image-wrapper")
      .should("be.visible")
      .and("have.length.greaterThan", 0);
    cy.get(".features_items").should("contain.text", termino);
  }

  verProductoPorId(idProducto) {
    cy.get(`a[href='/product_details/${idProducto}']`).first().click();
    cy.limpiarAnuncios();
  }

  validarDetalleProducto(producto) {
    cy.location("pathname").should("include", `/product_details/${producto.id}`);
    cy.get(".product-information").within(() => {
      cy.contains(producto.nombre).should("be.visible");
      cy.contains(producto.precio).should("be.visible");
      cy.contains("Availability").should("be.visible");
      cy.contains("Condition").should("be.visible");
      cy.contains("Brand").should("be.visible");
    });
  }

  agregarProductoAlCarritoPorId(idProducto) {
    cy.get(`a[data-product-id='${idProducto}']`).first().click();
    cy.get(".modal-content").should("be.visible");
    cy.contains(".modal-title", "Added!").should("be.visible");
  }

  continuarComprando() {
    cy.contains("button", "Continue Shopping").click();
  }

  verCarritoDesdeModal() {
    cy.contains(".modal-content a", "View Cart").click();
    cy.limpiarAnuncios();
  }
}

export default PaginaProductos;
