const Inscription = require("../models/inscription-model");

exports.saveInscription = async (req, res) => {
  try {
    const newInscription = new Inscription(req.body);
    const data = await newInscription.save();
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.findAllInscription = async (req, res) => {
  try {
    const inscriptions = await Inscription.find({}).populate('topic').populate('student');
    res.status(200).json({ success: true, data: inscriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.findByIdInscription = async (req, res) => {
  const { id } = req.params;
  try {
    const inscription = await Inscription.findById(id);
    if (!inscription) {
      return res.status(404).json({ success: false, message: "Inscripción no encontrada" });
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
    const updatedInscription = await Inscription.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedInscription) {
      return res.status(404).json({ success: false, message: "Inscripción no encontrada" });
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
    res.status(200).json({ success: true, message: "Inscripción eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
