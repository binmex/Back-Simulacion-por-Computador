const express = require("express");

require('dotenv').config();

require("./mongo/connect-db");

const app = express();

//setters
app.set("PORT", process.env.PORT || 4000);

//middelware
app.use(express.json());

app.use("/topics", require("./routes/topics"));
// app.use("/inscriptions", require("./routes/inscriptions"));
app.use("/students", require("./routes/students"));
app.use("/", (req, res) =>
  res.send("Back de la actividad número 1 de Simulación por Computadores")
);

app.listen(app.get("PORT"), () =>
  console.log(`server listen on ${app.get("PORT")}`)
);