const Student = require("../models/student-model");
const Program = require("../models/program-model");
const { handleRequest } = require("../utils/requestHandler");

exports.save = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const data = await newStudent.save();
    res.status(201).json({ state: true, data: data });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ state: false, error: err.message });
    } else {
      res.status(500).json({ state: false, error: err.message });
    }
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;
  try {
    const data = await Student.updateOne(
      { _id: id },
      { $set: updateInformation }
    );
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.infoPaged = async (req, res) => {
  handleRequest(res, async () => {
    const {
      PageSize = 10,
      PageNumber = 1,
      SortBy = "",
      SortDirection = "Asc",
    } = req.query;
    const pageSize = parseInt(PageSize);
    const pageNumber = parseInt(PageNumber);
    const allowedSortBy = ["firstName", "lastName", "code"];
    const allowedSortDirections = ["Asc", "Desc"];

    const direction =
      allowedSortDirections.includes(SortDirection) && SortDirection === "Desc"
        ? -1
        : 1;
    const sortObject = allowedSortBy.includes(SortBy)
      ? { [SortBy]: direction }
      : { _id: -1 };

    const data = await Student.find({})
      .populate("program", "name") // Populate program name
      .sort(sortObject)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    if (data.length === 0) {
      return { success: false, status: 404, message: "No hay información" };
    }
    return { success: true, status: 200, data };
  });
};

exports.findById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ state: false, message: "No encontrado" });
    } else {
      return res.status(200).json({ state: true, data: student });
    }
  } catch (error) {
    return res.status(500).json({ state: false, error: error.message });
  }
};

exports.findId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Student.find({ id: id });
    if (data.length === 0) {
      res.status(404).json({ state: "Usuario no encontrado" });
    } else {
      res.status(200).json({ state: true, data: data });
    }
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findCode = async (req, res) => {
  const { code } = req.query;
  try {
    const data = await Student.find({ code: code });
    if (data.length === 0) {
      res.status(404).json({ state: "Usuario no encontrado" });
    } else {
      res.status(200).json({ state: true, data: data });
    }
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Student.deleteOne({ id: id });
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.countDocumentsStudents = async (req, res) => {
  try {
    const countStudents = await Student.countDocuments();
    const countStudentsNumber = parseInt(countStudents);
    res.status(200).json({ success: true, countStudents: countStudentsNumber });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    console.log(error);
  }
};


exports.assignPrograms = async (req, res) => {
  try {
    const programs = await Program.find({});
    if (programs.length === 0) {
      return res.status(404).json({ success: false, message: "No hay programas disponibles" });
    }

    const programCount = programs.length;
    const studentsWithoutProgram = await Student.find({ program: { $exists: false } });

    for (const student of studentsWithoutProgram) {
      const randomProgram = programs[Math.floor(Math.random() * programCount)];
      student.program = randomProgram._id;
      await student.save();
    }

    res.status(200).json({ success: true, message: "Programas asignados a los estudiantes sin programa" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
