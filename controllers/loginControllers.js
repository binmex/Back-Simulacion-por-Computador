const { bucket } = require("../utils/UploadFile");

exports.uploadFileToGCS = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    console.error(err);
    res.status(500).send("Error uploading file");
  });

  blobStream.on("finish", async () => {
    try {
      const [url] = await blob.getSignedUrl({
        action: "read",
        expires: "01-01-2100",
      });

      res.status(200).send(`${url}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generating signed URL");
    }
  });

  blobStream.end(req.file.buffer);
};
