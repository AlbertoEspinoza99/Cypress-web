import PaginaBase from "./PaginaBase";

class PaginaCarrito extends PaginaBase {
  visitar() {
    super.visitar("/view_cart");
  }

  validarCargada() {
    cy.location("pathname").should("include", "/view_cart");
    cy.get("#cart_info_table").should("be.visible");
  }

  validarProducto(producto) {
    cy.contains("#cart_info_table .cart_description", producto.nombre)
      .parents("tr")
      .within(() => {
        cy.get(".cart_price").should("contain.text", producto.precio);
        cy.get(".cart_quantity button").should("contain.text", "1");
        cy.get(".cart_total").should("contain.text", producto.precio);
      });
  }

  eliminarProducto(nombreProducto) {
    cy.contains("#cart_info_table .cart_description", nombreProducto)
      .parents("tr")
      .within(() => {
        cy.get(".cart_quantity_delete").click();
      });
  }

  validarProductoEliminado(nombreProducto) {
    cy.get("#cart_info_table").should("not.contain.text", nombreProducto);
  }

  procederAlPago() {
    cy.contains("a", "Proceed To Checkout").click();
  }
}

export default PaginaCarrito;
