// Este archivo se carga automaticamente antes de los tests.
// Aqui se importan comandos globales de Cypress.
import "./commands";
import { register as registerCypressGrep } from "@cypress/grep";
registerCypressGrep()