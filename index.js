const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

require("dotenv").config();
require("./mongo/connect-db");

const app = express();

// Configuración de Swagger JSDoc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación de la API",
      version: "1.0.0",
      description: "Documentación  de la API de Simulación por Computador",
    },
  },
  apis: ["./routes/*.js"], // Rutas donde se encuentran los comentarios JSDoc
};

const specs = swaggerJsdoc(options);

//setters
app.set("PORT", process.env.PORT || 4000);

//middelware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/topics", require("./routes/topics"));
app.use("/inscriptions", require("./routes/inscriptions"));
app.use("/students", require("./routes/students"));
app.use("/", (req, res) =>
  res.send("Back de la actividad número 1 de Simulación por Computadores")
);

app.listen(app.get("PORT"), () =>
  console.log(`server listen on ${app.get("PORT")}`)
);
