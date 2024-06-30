const routes = require("express").Router();
const {
  save,
  deleteUser,
  findById,
  findId,
  update,
  findAll
} = require("../controllers/userControllers");

routes.get("/buscarId/:id", findId);
routes.get("/byId/:id", findById);
routes.post("/", save);
routes.get("/", findAll);
routes.patch("/:id", update);
routes.delete("/:id", deleteUser);

module.exports = routes;