const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  video: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Reporte Cypress Automation Exercise",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: "cypress/reports/mochawesome",
  },
  e2e: {
    baseUrl: "https://automationexercise.com",
    // Le dice a Cypress donde buscar los archivos de prueba
    specPattern: "cypress/e2e/web/**/**/*.cy.js",
    // Le dice a Cypress cual archivo cargar antes de ejecutar los tests
    supportFile: "cypress/support/e2e.js",
    defaultCommandTimeout: 10000,
    // Define cuanto tiempo espera Cypress a que una pagina termine de cargar
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    setupNodeEvents(registrarEvento, configuracion) {
      require("cypress-mochawesome-reporter/plugin")(registrarEvento);


      configuracion.env = configuracion.env || {};

      const credencialesSeguras = {
        correoUsuarioValido: process.env.CYPRESS_VALID_USER_EMAIL,
        contrasenaUsuarioValida: process.env.CYPRESS_VALID_USER_PASSWORD,
      };

      Object.entries(credencialesSeguras).forEach(([clave, valor]) => {
        if (valor) {
          configuracion.env[clave] = valor;
        }
      });
      

      return configuracion;
    },
  },
});
