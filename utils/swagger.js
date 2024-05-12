const swaggerJsdoc = require("swagger-jsdoc");
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

module.exports = swaggerJsdoc(swaggerOptions);
