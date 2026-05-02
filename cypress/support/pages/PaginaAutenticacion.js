import PaginaBase from "./PaginaBase";

class PaginaAutenticacion extends PaginaBase {
  visitar() {
    super.visitar("/login");
  }

  validarPaginaVisible() {
    cy.location("pathname").should("include", "/login");
    cy.contains("h2", "Login to your account").should("be.visible");
    cy.contains("h2", "New User Signup!").should("be.visible");
  }

  iniciarRegistro(nombre, correo) {
    this.validarPaginaVisible();
    cy.get("[data-qa='signup-name']").clear().type(nombre);
    cy.get("[data-qa='signup-email']").clear().type(correo);
    cy.get("[data-qa='signup-button']").click();
  }

  completarInformacion(usuario) {
    cy.contains("b", "Enter Account Information").should("be.visible");

    const selectorTitulo = usuario.titulo === "Mrs" ? "#id_gender2" : "#id_gender1";

    cy.get(selectorTitulo).check();
    cy.get("[data-qa='password']").clear().type(usuario.contrasena, { log: false });
    cy.get("[data-qa='days']").select(usuario.diaNacimiento);
    cy.get("[data-qa='months']").select(usuario.mesNacimiento);
    cy.get("[data-qa='years']").select(usuario.anioNacimiento);
    cy.get("#newsletter").check();
    cy.get("#optin").check();
    cy.get("[data-qa='first_name']").clear().type(usuario.nombrePersona);
    cy.get("[data-qa='last_name']").clear().type(usuario.apellido);
    cy.get("[data-qa='company']").clear().type(usuario.empresa);
    cy.get("[data-qa='address']").clear().type(usuario.direccion);
    cy.get("[data-qa='address2']").clear().type(usuario.direccion2);
    cy.get("[data-qa='country']").select(usuario.pais);
    cy.get("[data-qa='state']").clear().type(usuario.estado);
    cy.get("[data-qa='city']").clear().type(usuario.ciudad);
    cy.get("[data-qa='zipcode']").clear().type(usuario.codigoPostal);
    cy.get("[data-qa='mobile_number']").clear().type(usuario.numeroMovil);
  }

  crearCuenta() {
    cy.get("[data-qa='create-account']").click();
    cy.contains("b", "Account Created!").should("be.visible");
    cy.get("[data-qa='continue-button']").click();
  }

  registrar(usuario) {
    this.iniciarRegistro(usuario.nombre, usuario.correo);
    this.completarInformacion(usuario);
    this.crearCuenta();
  }

  cerrarSesion() {
    cy.contains("a", "Logout").click();
    this.validarPaginaVisible();
  }

  iniciarSesion(correo, contrasena) {
    this.validarPaginaVisible();
    cy.get("[data-qa='login-email']").clear().type(correo);
    cy.get("[data-qa='login-password']").clear().type(contrasena, { log: false });
    cy.get("[data-qa='login-button']").click();
  }
}

export default PaginaAutenticacion;
