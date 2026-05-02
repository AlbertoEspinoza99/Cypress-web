import PaginaProductos from "../../../support/pages/PaginaProductos";

describe("prueba de productos", () => {
  const paginaProductos = new PaginaProductos();
  let productos;

  beforeEach(() => {
    cy.fixture("productos").then((datos) => {
      productos = datos;
    });

    paginaProductos.visitar();
    paginaProductos.validarCargada();
  });

  it("Validar busqueda de producto existente", {tags: ['@todo']}, () => {
    paginaProductos.buscar(productos.busqueda.termino);
    paginaProductos.validarResultadosBusqueda(productos.busqueda.termino);
  });

  it("Ver detalle de un producto", {tags: ['@todo']}, () => {
    paginaProductos.verProductoPorId(productos.primerProducto.id);
    paginaProductos.validarDetalleProducto(productos.primerProducto);
  });
});
