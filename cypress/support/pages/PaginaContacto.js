import PaginaBase from "./PaginaBase";

class PaginaContacto extends PaginaBase {
  visitar() {
    super.visitar("/contact_us");
  }

  validarCargada() {
    cy.location("pathname").should("include", "/contact_us");
    cy.contains("h2", "Get In Touch").should("be.visible");
  }

  enviarFormulario(contacto) {
    this.validarCargada();
    cy.get("[data-qa='name']").clear().type(contacto.nombre);
    cy.get("[data-qa='email']").clear().type(contacto.correo);
    cy.get("[data-qa='subject']").clear().type(contacto.asunto);
    cy.get("[data-qa='message']").clear().type(contacto.mensaje);
    cy.get("input[name='upload_file']").selectFile(contacto.adjunto, {
      force: true,
    });
    cy.on("window:confirm", () => true);
    cy.get("[data-qa='submit-button']").click();
  }

  validarMensajeExito() {
    cy.contains(
      ".status.alert.alert-success",
      "Success! Your details have been submitted successfully."
    ).should("be.visible");
  }
}

export default PaginaContacto;
