# Cypress Auto Web

Proyecto de automatizacion web con Cypress para validar flujos funcionales del sitio [Automation Exercise](https://automationexercise.com).

La suite está estructurada por funcionalidades del sitio web, con datos externos en fixtures, comandos reutilizables de Cypress y generación de reportes HTML mediante `cypress-mochawesome-reporter`.


## Objetivo

Automatizar pruebas end-to-end de los principales recorridos del usuario en una tienda web:

- Carga de la pagina de inicio.
- Registro, login y logout de usuarios.
- Busqueda y detalle de productos.
- Agregado, validacion y eliminacion de productos en carrito.
- Envio del formulario de contacto con archivo adjunto.
- Flujo de compra con registro, carrito, checkout y confirmacion de pedido.

## Tecnologias

- Node.js
- Cypress `15.14.2`
- `@cypress/grep` para filtrar pruebas por tags.
- `cypress-mochawesome-reporter` para generar reportes HTML.
- GitHub Actions para ejecucion en CI.

## Estructura del proyecto

```text
.
|-- cypress.config.js
|-- cypress.env.json
|-- package.json
|-- package-lock.json
|-- .github/
|   `-- workflows/
|       `-- web-pipeline.yml
`-- cypress/
    |-- e2e/
    |   `-- web/
    |       |-- autenticacion/
    |       |-- carrito/
    |       |-- compra/
    |       |-- contacto/
    |       |-- productos/
    |       `-- pruebaHumo/
    |-- fixtures/
    |   |-- compra.json
    |   |-- contacto.json
    |   |-- productos.json
    |   |-- usuarios.json
    |   `-- adjunto-contacto.txt
    `-- support/
        |-- commands.js
        |-- e2e.js
        `-- pages/
            |-- PaginaAutenticacion.js
            |-- PaginaBase.js
            |-- PaginaCarrito.js
            |-- PaginaCompra.js
            |-- PaginaContacto.js
            |-- PaginaInicio.js
            `-- PaginaProductos.js
```

La suite activa se encuentra en `cypress/e2e/web`. Los ejemplos generados por Cypress en `cypress/e2e/1-getting-started` y `cypress/e2e/2-advanced-examples` no forman parte del `specPattern` configurado.

## Configuracion principal

La configuracion esta definida en `cypress.config.js`:

- `baseUrl`: `https://automationexercise.com`
- `specPattern`: `cypress/e2e/web/**/**/*.cy.js`
- `supportFile`: `cypress/support/e2e.js`
- `defaultCommandTimeout`: `10000`
- `pageLoadTimeout`: `60000`
- `video`: habilitado
- `screenshotsFolder`: `cypress/screenshots`
- `videosFolder`: `cypress/videos`
- `reporter`: `cypress-mochawesome-reporter`
- `reportDir`: `cypress/reports/mochawesome`

## Instalacion

Requisitos recomendados:

- Node.js 22 o superior, alineado con el workflow de GitHub Actions.
- npm.

Instalar dependencias:

```bash
npm install
```

En CI se recomienda usar:

```bash
npm ci
```

## Ejecucion local

Abrir Cypress en modo interactivo:

```bash
npx cypress open
```

Ejecutar toda la suite web en modo headless:

```bash
npx cypress run
```

Ejecutar un spec puntual:

```bash
npx cypress run --spec "cypress/e2e/web/productos/producto.cy.js"
```

Ejecutar pruebas por tag con `@cypress/grep`:

```bash
npx cypress run --expose grepTags="@todo"
```

Ejecutar solo el caso de registro de usuario:

```bash
npx cypress run --expose grepTags="@registrarUsuario"
```

## Tags disponibles

Actualmente los tests usan estos tags:

- `@todo`: tag general usado en la suite.
- `@registrarUsuario`: tag especifico del caso de registro de usuario.

Los tags se declaran dentro de cada `it`, por ejemplo:

```js
it("Registrar un nuevo usuario", { tags: ["@registrarUsuario", "@todo"] }, () => {
  // prueba
});
```

## Datos de prueba

Los datos estan centralizados en `cypress/fixtures`:

- `usuarios.json`: datos base para registro e inicio de sesion.
- `productos.json`: productos usados en busquedas, detalle y carrito.
- `contacto.json`: informacion para el formulario de contacto.
- `compra.json`: comentario de pedido y datos de pago.
- `adjunto-contacto.txt`: archivo usado en la prueba de contacto.

Para evitar colisiones en el registro, el comando `cy.generarUsuario()` crea correos unicos a partir del usuario base definido en el fixture.

## Credenciales seguras

El test `permite login exitoso con credenciales seguras` lee estas variables de entorno:

- `CYPRESS_VALID_USER_EMAIL`
- `CYPRESS_VALID_USER_PASSWORD`

Estas variables se transforman internamente en:

- `correoUsuarioValido`
- `contrasenaUsuarioValida`

Si las credenciales no existen, ese test se omite automaticamente. No se recomienda guardar credenciales reales en archivos versionados.

Ejemplo en PowerShell:

```powershell
$env:CYPRESS_VALID_USER_EMAIL="usuario@example.com"
$env:CYPRESS_VALID_USER_PASSWORD="password-seguro"
npx cypress run
```

## Comandos personalizados

Los comandos globales estan en `cypress/support/commands.js`:

- `cy.limpiarAnuncios()`: elimina iframes y elementos publicitarios que pueden interferir con las pruebas.
- `cy.generarUsuario(usuarioBase)`: genera un usuario con correo unico.
- `cy.registrarUsuario(usuario)`: registra un usuario usando la pagina de autenticacion.
- `cy.iniciarSesion(correo, contrasena)`: inicia sesion usando la pagina de autenticacion.

## Page Objects

Los objetos de pagina estan en `cypress/support/pages`:

- `PaginaBase`: navegacion comun, validacion de inicio, sesion y eliminacion de cuenta.
- `PaginaInicio`: validaciones principales del home.
- `PaginaAutenticacion`: registro, login y logout.
- `PaginaProductos`: busqueda, detalle y agregado de productos.
- `PaginaCarrito`: validacion, eliminacion y checkout desde carrito.
- `PaginaContacto`: envio del formulario de contacto con archivo adjunto.
- `PaginaCompra`: resumen, pedido, pago y confirmacion de compra.

## Reportes, videos y screenshots

Despues de ejecutar Cypress se generan artefactos en:

- `cypress/reports/mochawesome`: reporte HTML de Mochawesome.
- `cypress/videos`: videos de ejecucion.
- `cypress/screenshots`: capturas de fallos.

Estos artefactos tambien se suben en el workflow de GitHub Actions cuando la ejecucion termina, incluso si hay fallos.

## Integracion continua

El workflow `.github/workflows/web-pipeline.yml` ejecuta la suite en:

- `push` hacia `main`.
- `pull_request` hacia `main`.
- `workflow_dispatch` manual con seleccion de tag.

El pipeline:

- Usa Ubuntu latest.
- Instala Node.js 22.
- Instala dependencias con `npm ci`.
- Ejecuta Cypress.
- Publica reportes, screenshots y videos como artefactos.

Para ejecutar el login con credenciales seguras en CI, configurar estos secrets en GitHub:

- `CYPRESS_VALID_USER_EMAIL`
- `CYPRESS_VALID_USER_PASSWORD`

## Como agregar una nueva prueba

1. Crear o reutilizar un Page Object en `cypress/support/pages`.
2. Agregar datos necesarios en `cypress/fixtures`.
3. Crear el spec dentro de `cypress/e2e/web/<modulo>/<nombre>.cy.js`.
4. Usar tags en los `it` si se necesita filtrado.
5. Ejecutar localmente el spec antes de subir cambios.

Ejemplo:

```bash
npx cypress run --spec "cypress/e2e/web/contacto/contacto.cy.js"
```

## Notas de mantenimiento

- Mantener los selectores centralizados en los Page Objects siempre que sea posible.
- Evitar datos sensibles en fixtures o archivos versionados.
- Revisar los reportes Mochawesome despues de fallos en CI.
- Si el sitio muestra anuncios o iframes que bloquean acciones, reutilizar `cy.limpiarAnuncios()`.
- Si se agregan carpetas nuevas de tests web, mantenerlas bajo `cypress/e2e/web` para que entren en el `specPattern`.
