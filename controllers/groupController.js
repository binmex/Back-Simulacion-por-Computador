const Group = require("../models/group-model");
const Topic = require("../models/topic-model");


exports.save = async (req, res) => {
  try {
    const {  topic } = req.body;
    
    let topicId;
    console.log(topic._id)
    if (topic && topic._id) {
      topicId = topic._id;
    } else {
      throw new Error("El campo 'topic._id' es requerido en el cuerpo de la solicitud");
    }

    
    const existingTopic = await Topic.findById(topicId);
    console.log(existingTopic);
    if (!existingTopic) {
      throw new Error("materia no existe");
    }
    const newGroup = new Group({
      grupo: req.body.grupo,
      name: existingTopic.name,
      topic: existingTopic._id,
      quotas: existingTopic.quotas,
    });

    const data = await newGroup.save();
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.findById = async (req, res) => {
    const { id } = req.params;
    try {
      const group = await Group.findById(id);
      if (!group) {
        return res.status(404).json({ state: false, message: "No encontrado" });
      } else {
        return res.status(200).json({ state: true, data: group });
      }
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  };
  exports.findByName = async (req, res) => {
    const { name } = req.query;
    try {
      const group = await Group.findOne({ name });
      if (!group) {
        return res.status(404).json({ state: false, message: "Grupo no encontrado" });
      } else {
        return res.status(200).json({ state: true, data: group });
      }
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  };