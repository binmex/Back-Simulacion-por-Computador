const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { swaggerDocs, options } = require("./utils/swagger");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
require("./mongo/connect-db");

const app = express();

//setters
app.set("PORT", process.env.PORT || 4000);

//middelware
app.use(cors());
app.use(express.json());

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
app.use("/faculties", require("./routes/faculties"));
app.use("/programs", require("./routes/programs"));

app.use("/", (req, res) =>
  res.send("Back del proyecto de Simulación por Computadores")
);

app.listen(app.get("PORT"), () =>
  console.log(`Server listen on port: ${app.get("PORT")}`)
);

module.exports = app;
