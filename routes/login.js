const routes = require("express").Router();
const { upload } = require("../utils/UploadFile");
const check = require("../middleware/auth");
const {
  validate,
  uploadFileToGCS,
  uploadFileTemporal,
} = require("../controllers/loginControllers");

routes.post("/upload", upload.single("file"), uploadFileToGCS);
routes.post("/uploadTemporal", upload.single("file"), uploadFileTemporal);
routes.post("/", validate);

module.exports = routes;
