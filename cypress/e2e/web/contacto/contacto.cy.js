import PaginaContacto from "../../../support/pages/PaginaContacto";
import PaginaInicio from "../../../support/pages/PaginaInicio";

describe("pruebas de contacto", () => {
  const paginaContacto = new PaginaContacto();
  const paginaInicio = new PaginaInicio();
  let contacto;

  beforeEach(() => {
    cy.fixture("contacto").then((datos) => {
      contacto = datos;
    });

    paginaContacto.visitar();
  });

  it("Enviar formulario de contacto correctamente", {tags: ['@todo']}, () => {
    paginaContacto.enviarFormulario(contacto);
    paginaContacto.validarMensajeExito();
    paginaContacto.irAInicio();
    paginaInicio.validarInicioVisible();
  });
});
