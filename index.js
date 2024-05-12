const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./utils/swagger");
const cors = require("cors");

require("dotenv").config();
require("./mongo/connect-db");

const app = express();

//setters
app.set("PORT", process.env.PORT || 4000);

//middelware
app.use(cors());
app.use(express.json());
app.use("/api/docs", swaggerUi.serve, swaggerDocs);
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
