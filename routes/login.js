const express = require('express');
const router = express.Router();
const { upload, uploadFileToGCS } = require('../utils/UploadFile');

router.post('/upload', upload.single('file'), uploadFileToGCS);

module.exports = router;
