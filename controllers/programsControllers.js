const Program = require("../models/program-model");

exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate("faculty");
    if (programs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No se encontraron programas" });
    } else {
      return res.status(200).json({ success: true, data: programs });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate("faculty");
    if (!program)
      return res
        .status(404)
        .json({ success: false, message: "Programa no encontrado" });
    return res.status(200).json({ success: true, data: program });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createProgram = async (req, res) => {
  const program = new Program(req.body);
  try {
    const newProgram = await program.save();
    return res.status(201).json({ success: true, data: newProgram });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateProgram = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;
  try {
    const data = await Program.updateOne(
      { _id: id },
      { $set: updateInformation }
    );
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program)
      return res
        .status(404)
        .json({ success: false, message: "Programa no encontrado" });
    await Program.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Programa eliminado" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
