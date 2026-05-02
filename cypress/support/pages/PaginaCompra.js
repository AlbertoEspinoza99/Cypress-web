class PaginaCompra {
  validarResumenCompraVisible() {
    cy.contains("h2", "Address Details").should("be.visible");
    cy.contains("h2", "Review Your Order").should("be.visible");
  }

  realizarPedido(comentario) {
    cy.get("textarea[name='message']").clear().type(comentario);
    cy.contains("a", "Place Order").click();
  }

  llenarPago(pago) {
    cy.get("[data-qa='name-on-card']").clear().type(pago.nombreEnTarjeta);
    cy.get("[data-qa='card-number']").clear().type(pago.numeroTarjeta);
    cy.get("[data-qa='cvc']").clear().type(pago.cvc);
    cy.get("[data-qa='expiry-month']").clear().type(pago.mesVencimiento);
    cy.get("[data-qa='expiry-year']").clear().type(pago.anioVencimiento);
  }

  confirmarPago() {
    cy.get("[data-qa='pay-button']").click();
  }

  validarPedidoRealizado() {
    cy.contains("b", "Order Placed!").should("be.visible");
  }
}

export default PaginaCompra;
