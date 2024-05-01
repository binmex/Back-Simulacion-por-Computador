const Inscription = require("../models/inscription-model");
const topicModel = require("../models/topic-model");
const { handleRequest } = require("../utils/requestHandler");

exports.saveInscription = async (req, res) => {
  handleRequest(res, async () => {
    const insertion = req.body
    //validar cantidad de cupos disponibles:
    const currentTopic = await topicModel.findOne({ _id: req.body.topic });
    const numInscritos = await Inscription.countDocuments({
      topic: req.body.topic,
    });

    //evalua si se lleno el curso
    if (currentTopic.quotas === numInscritos) {
      var searchTerm = currentTopic.name; //bajo que variable se realizara el like

      let contador = (
        await topicModel.find({ name: { $regex: new RegExp(searchTerm, "i") } })
      ).length; //contador para saber que # de grupo se va a abrir

      //crear una nueva asignatura(Topic)
      const newTopicDetails = { ...currentTopic.toObject() };
      delete newTopicDetails._id;
      newTopicDetails.name += `_G_${contador + 1}`;

      // Crear el nuevo documento en la colección de asignaturas
      const newTopic = await topicModel.create(newTopicDetails);

      //debemos agregar al estudiante a la nueva materia
      insertion.topic = newTopic._id

    }
    const newInscription = new Inscription(insertion);
    const data = await newInscription.save();
    return { success: true, status: 200, data };
  });
};

exports.findAllInscription = async (req, res) => {
  try {
    const inscriptions = await Inscription.find({})
      .populate("topic")
      .populate("student");
    res.status(200).json({ success: true, data: inscriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.findByIdInscription = async (req, res) => {
  const { id } = req.params;
  try {
    const inscription = await Inscription.findById(id)
      .populate("topic")
      .populate("student");
    if (!inscription) {
      return res
        .status(404)
        .json({ success: false, message: "Inscripción no encontrada" });
    }
    res.status(200).json({ success: true, data: inscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateInscription = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedInscription = await Inscription.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updatedInscription) {
      return res
        .status(404)
        .json({ success: false, message: "Inscripción no encontrada" });
    }
    res.status(200).json({ success: true, data: updatedInscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteInscription = async (req, res) => {
  const { id } = req.params;
  try {
    await Inscription.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Inscripción eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
