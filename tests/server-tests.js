const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("../mongo/connect-db");

const app = express();

//middelware
app.use(cors());
app.use(express.json());
app.use("/topics", require("../routes/topics"));
app.use("/groups", require("../routes/groups"));
app.use("/inscriptions", require("../routes/inscriptions"));
app.use("/students", require("../routes/students"));

app.use("/", (req, res) =>
  res.send("Back de la actividad número 1 de Simulación por Computadores")
);

// Exportar la aplicación Express
module.exports = app;