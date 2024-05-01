const Topic = require("../models/topic-model");
const { handleRequest } = require("../utils/requestHandler");

exports.save = async (req, res) => {
  handleRequest(res, async () => {
    const newTopic = new Topic(req.body);
    const data = await newTopic.save();
    return { success: true, status: 200, data };
  });
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;
  handleRequest(res, async () => {
    const data = await Topic.findByIdAndUpdate(id, updateInformation);
    return { success: true, status: 200, data };
  });
};

exports.findAll = async (req, res) => {
  handleRequest(res, async () => {
    const data = await Topic.find({});
    if (data.length === 0) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.findById = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Topic.findById(id);
    if (!data) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.findId = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Topic.find({ id: id });
    if (!data) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.deleteTopic = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Topic.deleteOne({ id: id });
    return { success: true, status: 200, data };
  });
};
