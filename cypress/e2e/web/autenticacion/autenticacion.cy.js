import PaginaAutenticacion from "../../../support/pages/PaginaAutenticacion";
import PaginaBase from "../../../support/pages/PaginaBase";

describe("Pruebas de autenticacion", () => {
  const paginaAutenticacion = new PaginaAutenticacion();
  const paginaBase = new PaginaBase();
  let usuarios;

  beforeEach(() => {
    cy.fixture("usuarios").then((datos) => {
      usuarios = datos;
    });
  });

  it("Registrar un nuevo usuario",{tags: ['@registrarUsuario','@todo']}, () => {
    cy.generarUsuario(usuarios.usuarioNuevo).then((usuario) => {
      cy.registrarUsuario(usuario);
      paginaBase.validarUsuarioLogueado(usuario.nombre);
      paginaBase.eliminarCuenta();
    });
  });

  it("Login exitoso con usuario valido", {tags: ['@todo']}, () => {
    cy.generarUsuario(usuarios.usuarioNuevo).then((usuario) => {
      cy.registrarUsuario(usuario);
      paginaAutenticacion.cerrarSesion();
      cy.iniciarSesion(usuario.correo, usuario.contrasena);
      paginaBase.validarSesionIniciadaComo(usuario.nombre);
      paginaBase.eliminarCuenta();
    });
  });

  it("permite login exitoso con credenciales seguras", {tags: ['@todo']}, function () {
    const prueba = this;

    cy.env(["correoUsuarioValido", "contrasenaUsuarioValida"], { log: false }).then(
      ({ correoUsuarioValido, contrasenaUsuarioValida }) => {
        if (!correoUsuarioValido || !contrasenaUsuarioValida) {
          prueba.skip();
          return;
        }

        cy.iniciarSesion(correoUsuarioValido, contrasenaUsuarioValida);
        cy.contains("a", "Logged in as").should("be.visible");
        paginaAutenticacion.cerrarSesion();
      }
    );
  });

  it("Logout exitoso", {tags: ['@todo']}, () => {
    cy.generarUsuario(usuarios.usuarioNuevo).then((usuario) => {
      cy.registrarUsuario(usuario);
      paginaAutenticacion.cerrarSesion();
      paginaAutenticacion.validarPaginaVisible();
      cy.iniciarSesion(usuario.correo, usuario.contrasena);
      paginaBase.eliminarCuenta();
    });
  });
});
