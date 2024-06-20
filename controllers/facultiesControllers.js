const Faculty = require("../models/faculty-model");

exports.getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    if (faculties.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No se encontraron facultades" });
    } else {
      return res.status(201).json({ success: true, data: faculties });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty)
      return res
        .status(404)
        .json({ success: false, message: "Facultad no encontrada" });
    return res.status(200).json({ success: true, data: faculty });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createFaculty = async (req, res) => {
  const faculty = new Faculty(req.body);
  try {
    const newFaculty = await faculty.save();
    return res.status(201).json({ success: true, data: newFaculty });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateFaculty = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;
  try {
    const faculty = await Faculty.findById(id)
    if(!faculty){
      return res.status(404).json({success: false, message: "Facultad no encontrada"})
    }
    const data = await Faculty.updateOne(
      { _id: id },
      { $set: updateInformation }
    );
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty)
      return res
        .status(404)
        .json({ success: false, message: "Facultad no encontrada" });
    await Faculty.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Facultad eliminada" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
