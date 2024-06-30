const User = require("../models/user-model");
const { encrypt, decrypt } = require("../utils/encryptation");
const bcrypt = require("bcrypt");

exports.save = async (req, res) => {
  const { username, password } = req.body;
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
    data.forEach((user) => user.username = decrypt(user.username))
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const data = await User.findOne({ username });
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