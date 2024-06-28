const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const storageClient = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
  },
});

const bucketName = process.env.BUCKET_NAME;
const bucket = storageClient.bucket(bucketName);

const uploadFileToGCS = async (req, res) => {
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

      res.status(200).send(`File uploaded successfully. Public URL: ${url}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generating signed URL");
    }
  });

  blobStream.end(req.file.buffer);
};

module.exports = {
  upload,
  uploadFileToGCS,
};
