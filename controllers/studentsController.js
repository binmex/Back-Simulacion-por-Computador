const Student = require("../models/student-model");
const Topic = require("../models/topic-model");

// exports.save = async (req, res) => {
//   try {
//     const { topic } = req.body;
//     const topicId = topic._id;
    
//     const foundTopic = await Topic.findById(topicId);
    
//     if (!foundTopic) {
//       return res.status(404).json({ state: false, error: "no existe" });
//     }   

//     const newStudent = new Student(req.body);
//     const data = await newStudent.save();

//     foundTopic.students.push(newStudent);
//     await foundTopic.save();

//     res.status(200).json({ state: true, data: data });
//   } catch (err) {
//     res.status(500).json({ state: false, error: err.message });
//   }
// };
exports.save = async (req, res) => {
    try {
      const newStudent = new Student(req.body);
      const data = await newStudent.save();
      res.status(200).json({ state: true, data: data });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  };
exports.update = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;
  
  try {
    const data = await Student.updateOne({ id: id }, { $set: updateInformation });
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    // const data = await Student.find({}).populate("inscription");
    const data = await Student.find({})
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ state: false, message: "No encontrado" });
    }else{
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
    if(data.length === 0){ 
      res.status(404).json({ state: "Usuario no encontrado"});
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
