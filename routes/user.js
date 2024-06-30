const routes = require("express").Router();
const {
  save,
  deleteUser,
  findByUsername,
  update,
  findAll
} = require("../controllers/userControllers");

// routes.get("/", check.auth, findAll);
// routes.get("/:id", check.auth, findById);
// routes.post("/save", check.auth, save);
// routes.patch("/:id", check.auth, update);
// routes.delete("/:id", check.auth, deleteUser);

routes.get("/findUsername/:username", findByUsername);
routes.post("/save", save);
routes.get("/", findAll);
routes.patch("/update/:id", update);
routes.delete("/delete/:id", deleteUser);

module.exports = routes;