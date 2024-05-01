const Student = require("../models/student-model");
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
      { id: id },
      { $set: updateInformation }
    );
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Student.find({});
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

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Student.deleteOne({ id: id });
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};
