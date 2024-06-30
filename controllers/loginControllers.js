const { bucket } = require("../utils/UploadFile");
const User = require("../models/user-model");
const  jwt = require("../utils/jwt");
const { encrypt } = require("../utils/encryptation");
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

exports.validate = async (req, res) => {
  const { username, password } = req.body;
  const encryptedUsername = encrypt(username);
  
  const user = await User.findOne({ username: encryptedUsername });
  if (!user) {
    return res.status(404).json({ state: false, error: `Usuario no encontrado.` });
  }

  const pwd = bcrypt.compareSync(password, user.password);
  if (!pwd) {
    res.status(404).json({ state: false, error: `Usuario no encontrado.` });
  } else {
    try {
      const token = jwt.createToken(user);
      console.log("usuario"+user)
      res.status(200).json({ state: true, data: {message: "Usuario encontrado", image: user.image}, token });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  }
};

exports.save = async (req, res) => {
  const { username, password, role } = req.body;
  const encryptedUsername = encrypt(username);
  
  const user = await User.find({ username: encryptedUsername });
  if (user.length < 1) {
    const pwd = await bcrypt.hash(password, 10);
    req.body.password = pwd;
    req.body.username = encryptedUsername;
    
    const newUser = new User(req.body);
    try {
      const data = await newUser.save();
      res.status(200).json({ state: true, data: data });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  } else {
    return res.status(409).json({ state: false, error: "El usuario ya existe." });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  if (req.body.password) {
    const pwd = await bcrypt.hash(req.body.password, 10);
    req.body.password = pwd;
  }
  if (req.body.username) {
    req.body.username = encrypt(req.body.username);
  }

  const updateInformation = req.body;
  try {
    const data = await User.updateOne({ _id: id }, { $set: updateInformation });
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findById(id);
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByIdAndDelete(id);
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};
