const swaggerJsdoc = require("swagger-jsdoc");
const schemas = require("./swaggerSchemas");
const fs = require("fs");
const path = require("path");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación de la API",
      version: "1.0.0",
      description: "Documentación  de la API de Simulación por Computador",
    },
    components: {
      schemas: {
        ...schemas,
      },
    },
  },
  apis: [`${path.join(__dirname, "../routes/*.js")}`], // Rutas donde se encuentran los comentarios JSDoc
};

// Leer los estilos CSS de Swagger-UI
const swaggerUICSSPath = path.resolve(
  __dirname,
  "../node_modules/swagger-ui-dist/swagger-ui.css"
);
const css = fs.readFileSync(swaggerUICSSPath, "utf8");

// Opciones personalizadas para Swagger-UI
const options = {
  customCss: css,
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerDocs, options };
