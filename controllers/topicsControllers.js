const Topic = require("../models/topic-model");

exports.save = async (req, res) => {
  try {
    const newTopic = new Topic(req.body);
    const data = await newTopic.save();
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;

  try {
    const data = await Topic.updateOne({ id: id }, { $set: updateInformation });
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Topic.find({});
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Topic.findById(id);
    if (!data) {
      return res.status(404).json({ state: false, message: "No encontrado" });
    }
    return res.status(200).json({ state: true, data: data });
  } catch (error) {
    return res.status(500).json({ state: false, error: error.message });
  }
};

exports.findId = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Topic.find({ id: id });
    if (!data) {
      return res.status(404).json({state: false, message: "No encontrado"});
    }
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.deleteTopic = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Topic.deleteOne({ id: id });
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};
