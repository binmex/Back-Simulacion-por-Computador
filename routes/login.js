const routes = require("express").Router();
const { upload } = require("../utils/UploadFile");
const { uploadFileToGCS } = require("../controllers/loginControllers");
const check = require("../middleware/auth");
const {
  validate,
  findAll,
  findById,
  save,
  deleteUser,
  update,
} = require("../controllers/loginController");

// routes.get("/", check.auth, findAll);
// routes.get("/:id", check.auth, findById);
// routes.post("/save", check.auth, save);
// routes.patch("/:id", check.auth, update);
// routes.delete("/:id", check.auth, deleteUser);
// routes.post("/", validate);

routes.post("/upload", upload.single("file"), uploadFileToGCS);
routes.get("/", findAll);
routes.get("/:id", findById);
routes.post("/save", save);
routes.patch("/:id", update);
routes.delete("/:id", deleteUser);
routes.post("/", validate);

module.exports = routes;
