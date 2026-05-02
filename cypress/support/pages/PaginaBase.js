class PaginaBase {

  visitar(ruta = "/") {
    cy.visit(ruta);
    cy.limpiarAnuncios();
  }

  validarInicioVisible() {
    cy.location("pathname").should("eq", "/");
    cy.contains("a", "Home").should("be.visible");
    cy.contains("h2", "Features Items").should("be.visible");
  }

  validarUsuarioLogueado(nombreUsuario) {
    cy.contains("a", `Logged in as ${nombreUsuario}`).should("be.visible");
  }

  eliminarCuenta() {
    cy.contains("a", "Delete Account").click();
    cy.contains("b", "Account Deleted!").should("be.visible");
    cy.get("[data-qa='continue-button']").click();
  }

  validarSesionIniciadaComo(nombreUsuario) {
    cy.contains("a", `Logged in as ${nombreUsuario}`).should("be.visible");
  }

  irAInicio() {
    cy.contains("a", "Home").click();
    cy.limpiarAnuncios();
  }

}

export default PaginaBase;
