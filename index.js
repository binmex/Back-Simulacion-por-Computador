const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./utils/swagger");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

require("dotenv").config();
require("./mongo/connect-db");

const app = express();

//setters
app.set("PORT", process.env.PORT || 4000);

//middelware
app.use(cors());
app.use(express.json());

// Leer los estilos CSS de Swagger-UI
const swaggerUICSSPath = path.resolve(
  __dirname,
  "./node_modules/swagger-ui-dist/swagger-ui.css"
);
const css = fs.readFileSync(swaggerUICSSPath, "utf8");

// Opciones personalizadas para Swagger-UI
const options = {
  customCss: css,
};

// Rutas
app.use(
  "/api/docs",
  express.static(path.join(__dirname, "./uitls/swagger.js")),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, options)
);
app.use("/topics", require("./routes/topics"));
app.use("/groups", require("./routes/groups"));
app.use("/inscriptions", require("./routes/inscriptions"));
app.use("/students", require("./routes/students"));

app.use("/", (req, res) =>
  res.send("Back de la actividad número 1 de Simulación por Computadores")
);

app.listen(app.get("PORT"), () =>
  console.log(`Server listen on port: ${app.get("PORT")}`)
);

// Exportar la aplicación Express
module.exports = app;
