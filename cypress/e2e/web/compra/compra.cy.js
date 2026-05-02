import PaginaBase from "../../../support/pages/PaginaBase";
import PaginaCarrito from "../../../support/pages/PaginaCarrito";
import PaginaCompra from "../../../support/pages/PaginaCompra";
import PaginaProductos from "../../../support/pages/PaginaProductos";

describe("prueba de compra", () => {
  const paginaBase = new PaginaBase();
  const paginaCarrito = new PaginaCarrito();
  const paginaCompra = new PaginaCompra();
  const paginaProductos = new PaginaProductos();
  let compra;
  let productos;
  let usuarios;

  beforeEach(() => {
    cy.fixture("compra").then((datos) => {
      compra = datos;
    });

    cy.fixture("productos").then((datos) => {
      productos = datos;
    });

    cy.fixture("usuarios").then((datos) => {
      usuarios = datos;
    });
  });

  it("completa flujo de compra cuando el sitio lo permite de forma estable", {tags: ['@todo']}, () => {
    cy.generarUsuario(usuarios.usuarioNuevo).then((usuario) => {
      cy.registrarUsuario(usuario);
      paginaBase.validarSesionIniciadaComo(usuario.nombre);

      paginaProductos.visitar();
      paginaProductos.agregarProductoAlCarritoPorId(productos.primerProducto.id);
      paginaProductos.verCarritoDesdeModal();
      paginaCarrito.validarCargada();
      paginaCarrito.validarProducto(productos.primerProducto);

      paginaCarrito.procederAlPago();
      paginaCompra.validarResumenCompraVisible();
      paginaCompra.realizarPedido(compra.pedido.comentario);
      paginaCompra.llenarPago(compra.pago);
      paginaCompra.confirmarPago();
      paginaCompra.validarPedidoRealizado();

      paginaBase.eliminarCuenta();
    });
  });
});
