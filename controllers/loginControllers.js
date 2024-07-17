const { bucket } = require("../utils/UploadFile");
const User = require("../models/user-model");
const Student = require("../models/student-model");
const jwt = require("../utils/jwt");
const { encrypt, decrypt } = require("../utils/encryptation");
const bcrypt = require("bcrypt");

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

exports.uploadFileTemporal = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const folderName = "Temporal/";
  const blob = bucket.file(`${folderName}${req.file.originalname}`);
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
      res.status(200).send(`${encrypt(url)}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generating signed URL");
    }
  });

  blobStream.end(req.file.buffer);
};

exports.validate = async (req, res) => {
  const { username, password } = req.body;
  const encryptedUsername = encrypt(username);

  const user = await User.findOne({ username: encryptedUsername });
  if (!user) {
    return res
      .status(404)
      .json({ state: false, error: `Usuario no encontrado.` });
  }

  const pwd = bcrypt.compareSync(password, user.password);
  if (!pwd) {
    res.status(404).json({ state: false, error: `Usuario no encontrado.` });
  } else {
    try {
      const student = await Student.findOne({
        email: decrypt(encryptedUsername),
      });
      const token = jwt.createToken(user, student);
      const image = encrypt(user.image)
      res.status(200).json({
        state: true,
        data: {
          message: "Usuario encontrado",
          image: image,
          username: user.username,
          role: user.role,
        },
        token,
      });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  }
};

exports.decodeToken = (req, res) => {
  const { token } = req.body;
  try {
    const decodeToken = jwt.decodeToken(token);
    const emailDecoded = decrypt(decodeToken.name);
    res.status(200).json({
      state: true,
      data: { email: emailDecoded, emailToken: decodeToken.name },
    });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
};
