const routes = require("express").Router();
const {
  save,
  update,
  findAll,
  findId,
  findById,
  deleteTopic,
 
} = require("../controllers/topicsControllers");

routes.get("/", findAll);
routes.get("/:id", findId);
routes.get("/byId/:id", findById);
routes.post("/", save);
routes.patch("/:id", update);
routes.delete("/:id", deleteTopic);


module.exports = routes;