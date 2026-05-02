import PaginaCarrito from "../../../support/pages/PaginaCarrito";
import PaginaProductos from "../../../support/pages/PaginaProductos";

describe("pruebas del carrito de compras", () => {
  const paginaCarrito = new PaginaCarrito();
  const paginaProductos = new PaginaProductos();
  let productos;

  beforeEach(() => {
    cy.fixture("productos").then((datos) => {
      productos = datos;
    });

    paginaProductos.visitar();
    paginaProductos.validarCargada();
  });

  it("Agregar producto al carrito", {tags: ['@todo']}, () => {
    paginaProductos.agregarProductoAlCarritoPorId(productos.primerProducto.id);
    paginaProductos.verCarritoDesdeModal();
    paginaCarrito.validarCargada();
    paginaCarrito.validarProducto(productos.primerProducto);
  });

  it("Validar producto agregado en el carrito", {tags: ['@todo']}, () => {
    paginaProductos.agregarProductoAlCarritoPorId(productos.primerProducto.id);
    paginaProductos.continuarComprando();
    paginaProductos.agregarProductoAlCarritoPorId(productos.segundoProducto.id);
    paginaProductos.verCarritoDesdeModal();
    paginaCarrito.validarCargada();
    paginaCarrito.validarProducto(productos.primerProducto);
    paginaCarrito.validarProducto(productos.segundoProducto);
  });

  it("Remover producto del carrito", {tags: ['@todo']}, () => {
    paginaProductos.agregarProductoAlCarritoPorId(productos.primerProducto.id);
    paginaProductos.verCarritoDesdeModal();
    paginaCarrito.validarCargada();
    paginaCarrito.eliminarProducto(productos.primerProducto.nombre);
    paginaCarrito.validarProductoEliminado(productos.primerProducto.nombre);
  });
});
