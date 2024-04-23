const {pool} = require('../mysql/connect-db')

exports.save = async (req, res) => {
    try {
      pool.query("show databases")
      res.status(200).json({ state: true, data: null });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  };
exports.update = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;
  
  try {
    pool.query("show databases")
    res.status(200).json({ state: true, data: null });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    pool.query("show databases")
    res.status(200).json({ state: true, data: null });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findById = async (req, res) => {
  const { id } = req.params;
  try {
    pool.query("show databases")
    if (!student) {
      return res.status(404).json({ state: false, message: "No encontrado" });
    }
    return res.status(200).json({ state: true, data: null });
  } catch (error) {
    return res.status(500).json({ state: false, error: error.message });
  }
};

exports.findId = async (req, res) => {
  const { id } = req.params;
  
  try {
    pool.query("show databases")
    res.status(200).json({ state: true, data: null });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  
  try {
    pool.query("show databases")
    res.status(200).json({ state: true, data: null });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};
