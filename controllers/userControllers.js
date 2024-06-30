const User = require("../models/user-model");
const { handleRequest } = require("../utils/requestHandler");

exports.save = async (req, res) => {
    try {
      const newUser = new User(req.body);
      const data = await newUser.save();
      res.status(201).json({ state: true, data: data });
    } catch (err) {
      if (err.name === "ValidationError") {
        res.status(400).json({ state: false, error: err.message });
      } else {
        res.status(500).json({ state: false, error: err.message });
      }
    }
  };

  exports.findAll = async (req, res) => {
    handleRequest(res, async () => {
      const data = await User.find({});
      if (data.length === 0) {
        return { success: false, status: 404, message: "No encontrado" };
      }
      return { success: true, status: 200, data };
    });
  };

  exports.update = async (req, res) => {
    const { id } = req.params;
    const updateInformation = req.body;
    try {
      const data = await User.updateOne(
        { _id: id },
        { $set: updateInformation }
      );
      res.status(200).json({ state: true, data: data });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  };

  exports.findById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ state: false, message: "No encontrado" });
      } else {
        return res.status(200).json({ state: true, data: user });
      }
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  };
  
  exports.findId = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await User.find({ id: id });
      if (data.length === 0) {
        res.status(404).json({ state: "Usuario no encontrado" });
      } else {
        res.status(200).json({ state: true, data: data });
      }
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  };

  exports.deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const data = await User.deleteOne({ id: id });
      res.status(200).json({ state: true, data: data });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  };