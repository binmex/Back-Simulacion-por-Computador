const routes = require("express").Router();
const { upload } = require("../utils/UploadFile");
const check = require("../middleware/auth");
const {
  validate,
  uploadFileToGCS,
  uploadFileTemporal,
  decodeToken,
} = require("../controllers/loginControllers");

routes.post("/upload", upload.single("file"), uploadFileToGCS);
routes.post("/uploadTemporal", upload.single("file"), uploadFileTemporal);
routes.post("/", validate);
routes.post("/decode", decodeToken);

module.exports = routes;
