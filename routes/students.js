const routes = require("express").Router();
const {
  save,
  update,
  findAll,
  findId,
  findById,
  deleteStudent,
 
} = require("../controllers/studentsController");

routes.get("/", findAll);
routes.get("/:id", findId);
routes.get("/byId/:id", findById);
routes.post("/", save);
routes.patch("/:id", update);
routes.delete("/:id", deleteStudent);


module.exports = routes;