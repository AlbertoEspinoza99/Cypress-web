import PaginaInicio from "../../../support/pages/PaginaInicio";

describe("prueba de humo", () => {
  const paginaInicio = new PaginaInicio();

  it("Validar que inicio carga correctamente", {tags: ['@todo']}, () => {
    paginaInicio.visitar();
    paginaInicio.validarInicioVisible();
    paginaInicio.validarSeccionesPrincipalesVisibles();
  });
});
