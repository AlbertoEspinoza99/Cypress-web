import PaginaAutenticacion from "./pages/PaginaAutenticacion";

Cypress.Commands.add("limpiarAnuncios", () => {
  cy.document({ log: false }).then((documento) => {
    documento
      .querySelectorAll(
        [
          "iframe[id^='aswift_']",
          "iframe[id^='google_ads']",
          "iframe[src*='googlesyndication']",
          "ins.adsbygoogle",
          ".adsbygoogle",
        ].join(",")
      )
      .forEach((elemento) => elemento.remove());
  });
});

Cypress.Commands.add("generarUsuario", (usuarioBase) => {
  const idUnico = `${Date.now()}${Cypress._.random(1000, 9999)}`;
  const correo = usuarioBase.correo.includes("{{unique}}")
    ? usuarioBase.correo.replace("{{unique}}", idUnico)
    : usuarioBase.correo.replace("@", `.${idUnico}@`);

  cy.wrap({ ...usuarioBase, correo }, { log: false });
});

Cypress.Commands.add("registrarUsuario", (usuario) => {
  const paginaAutenticacion = new PaginaAutenticacion();

  paginaAutenticacion.visitar();
  paginaAutenticacion.registrar(usuario);
});

Cypress.Commands.add("iniciarSesion", (correo, contrasena) => {
  const paginaAutenticacion = new PaginaAutenticacion();

  paginaAutenticacion.visitar();
  paginaAutenticacion.iniciarSesion(correo, contrasena);
});
