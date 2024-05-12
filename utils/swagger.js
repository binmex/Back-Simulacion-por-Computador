const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación de la API",
      version: "1.0.0",
      description: "Documentación  de la API de Simulación por Computador",
    },
  },
  apis: [`${path.join(__dirname, "../routes/*.js")}`], // Rutas donde se encuentran los comentarios JSDoc
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
};

module.exports = swaggerUi.setup(swaggerDocs, options);
