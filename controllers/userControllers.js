const User = require("../models/user-model");
const Student = require("../models/student-model");
const { encrypt, decrypt } = require("../utils/encryptation");
const bcrypt = require("bcrypt");
const { handleRequest } = require("../utils/requestHandler");
const { faker } = require("@faker-js/faker"); // Actualización de la importación

exports.save = async (req, res) => {
  const { username, password } = req.body;
  const encryptedUsername = encrypt(username);

  const user = await User.find({ username: encryptedUsername });
  if (user.length < 1) {
    const pwd = await bcrypt.hash(password, 10);
    req.body.password = pwd;
    req.body.username = encryptedUsername;

    const newUser = new User(req.body);
    try {
      const data = await newUser.save();
      res.status(200).json({ state: true, data: data });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  } else {
    return res
      .status(409)
      .json({ state: false, error: "El usuario ya existe." });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  if (req.body.password) {
    const pwd = await bcrypt.hash(req.body.password, 10);
    req.body.password = pwd;
  }
  if (req.body.username) {
    req.body.username = encrypt(req.body.username);
  }

  const updateInformation = req.body;
  try {
    const data = await User.updateOne({ _id: id }, { $set: updateInformation });
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await User.find({});
    data.forEach((user) => (user.username = decrypt(user.username)));
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const data = await User.findOne({ username });
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByIdAndDelete(id);
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

// Función auxiliar para procesar un lote de estudiantes
const processBatch = async (students) => {
  const users = [];

  for (const student of students) {
    const username = encrypt(student.email);

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      const password = bcrypt.hashSync(faker.internet.password(), 10); // Genera una contraseña cifrada
      const role = "student";
      const image = faker.image.avatar(); // Puedes usar un valor predeterminado o cualquier otro valor

      users.push({
        username,
        password,
        role,
        image,
      });
    }
  }

  if (users.length > 0) {
    await User.insertMany(users);
  }
};

// Nuevo endpoint para crear usuarios a partir de los estudiantes en lotes
exports.createUsersFromStudents = async (req, res) => {
  handleRequest(res, async () => {
    const pageSize = 1000; // Tamaño del lote
    let pageNumber = 1;
    let totalProcessed = 0;
    let hasMore = true;

    while (hasMore) {
      const students = await Student.find({})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      if (students.length === 0) {
        hasMore = false;
      } else {
        await processBatch(students);
        totalProcessed += students.length;
        pageNumber += 1;
      }
    }

    return {
      success: true,
      status: 200,
      message: `${totalProcessed} usuarios creados exitosamente`,
    };
  });
};
