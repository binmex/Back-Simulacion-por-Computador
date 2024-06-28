const express = require("express");
const router = express.Router();
const { upload } = require("../utils/UploadFile");
const { uploadFileToGCS } = require("../controllers/loginControllers");

router.post("/upload", upload.single("file"), uploadFileToGCS);

module.exports = router;
