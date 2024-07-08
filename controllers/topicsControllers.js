const Topic = require("../models/topic-model");
const Program = require("../models/program-model");
const Group = require("../models/group-model");
const { faker } = require("@faker-js/faker");
const { handleRequest } = require("../utils/requestHandler");

exports.save = async (req, res) => {
  handleRequest(res, async () => {
    if (req.body.quotas <= 0) {
      return {
        success: false,
        status: 400,
        message: "No se puede agregar una materia con 0 cupos",
      };
    }
    const newTopic = new Topic(req.body);
    const data = await newTopic.save();
    const group = new Group({
      group: "grupo 60",
      name: newTopic.name,
      topic: newTopic._id,
      quotas: newTopic.quotas,
    });
    await group.save();
    return { success: true, status: 200, data };
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;
  handleRequest(res, async () => {
    if (req.body.quotas <= 0) {
      return {
        success: false,
        status: 400,
        message: "No se puede agregar una materia con 0 cupos",
      };
    }
    const data = await Topic.updateOne({ id: id }, { $set: updateInformation });
    if (data.matchedCount === 0) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.findAll = async (req, res) => {
  handleRequest(res, async () => {
    const data = await Topic.find({}).populate("programs", "name");
    if (data.length === 0) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.findById = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Topic.findById(id).populate("programs", "name");
    if (!data) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.findId = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Topic.find({ id: id }).populate("programs", "name");
    if (!data) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.deleteTopic = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Topic.deleteOne({ id: id });
    return { success: true, status: 200, data };
  });
};

exports.findGroupsByTopicId = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Group.find({ topic: id });
    if (data.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No se encontraron grupos para esta materia",
      };
    }
    return { success: true, status: 200, data };
  });
};

//  función para añadir un programa a una materia
exports.addProgramToTopic = async (req, res) => {
  const { topicId, programId } = req.body;
  try {
    const topic = await Topic.findById(topicId);
    const program = await Program.findById(programId);

    if (!topic || !program) {
      return res
        .status(404)
        .json({ success: false, message: "Materia o programa no encontrado" });
    }

    if (!topic.programs.includes(programId)) {
      topic.programs.push(programId);
      await topic.save();
    }

    res.status(200).json({ success: true, data: topic });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// función para obtener materias por programa
exports.getTopicsByProgram = async (req, res) => {
  const { programId } = req.params;
  try {
    const topics = await Topic.find({ programs: programId }).populate(
      "programs",
      "name"
    );
    res.status(200).json({ success: true, data: topics });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.assignProgramsToAllTopics = async (req, res) => {
  const programIds = ["66836135323b7c660d055f95", "66836135323b7c660d055ff0"];
  try {
    const programs = await Program.find({ _id: { $in: programIds } });
    if (programs.length !== programIds.length) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Uno o más programas no encontrados",
        });
    }

    const topics = await Topic.find({});
    for (const topic of topics) {
      for (const programId of programIds) {
        if (!topic.programs.includes(programId)) {
          topic.programs.push(programId);
        }
      }
      await topic.save();
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Programas asignados a todas las materias existentes",
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Para generar materias a los programas
const topicNames = [
  "Matemáticas Básicas",
  "Física I",
  "Química General",
  "Biología",
  "Historia Universal",
  "Geografía",
  "Literatura",
  "Lengua Española",
  "Cálculo Diferencial",
  "Programación I",
  "Ingeniería de Software",
  "Redes",
  "Algoritmos y Estructuras de Datos",
  "Sistemas Operativos",
  "Bases de Datos",
  "Inteligencia Artificial",
  "Arquitectura de Computadores",
  "Ética Profesional",
  "Desarrollo Web",
  "Administración de Proyectos",
  "Cálculo Integral",
  "Estadística",
  "Física II",
  "Química Orgánica",
  "Microbiología",
  "Historia de Colombia",
  "Geografía Física",
  "Literatura Hispanoamericana",
  "Lengua Extranjera",
  "Programación II",
  "Ingeniería de Requisitos",
  "Seguridad Informática",
  "Redes Avanzadas",
  "Optimización",
  "Minería de Datos",
  "Arquitectura de Software",
  "Derecho Informático",
  "Desarrollo Móvil",
  "Gestión de Calidad",
];

let topicIdCounter = 100; // Contador global para los IDs secuenciales

exports.assignTopicsToPrograms = async (req, res) => {
  try {
    const excludedPrograms = [
      "66836135323b7c660d055f95",
      "66836135323b7c660d055ff0",
    ];
    const programs = await Program.find({ _id: { $nin: excludedPrograms } });

    if (programs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No hay programas disponibles" });
    }

    const topics = [];
    const date = new Date();

    programs.forEach((program, programIndex) => {
      for (let i = 0; i < 20; i++) {
        const topicName =
          topicNames[(programIndex * 20 + i) % topicNames.length]; // Asignar nombres de materias cíclicamente

        topics.push({
          id: topicIdCounter++, // Asignar y aumentar el contador de IDs
          name: topicName,
          aula: faker.datatype.number({ min: 101, max: 510 }),
          credits: faker.datatype.number({ min: 1, max: 4 }),
          date_registration: date,
          state: "activo",
          quotas: faker.datatype.number({ min: 1, max: 35 }),
          programs: [program._id],
        });
      }
    });

    await Topic.insertMany(topics);
    res
      .status(200)
      .json({
        success: true,
        message: "Materias asignadas a los programas exitosamente",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.findGroupsByProgram = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Topic.find({ programs: id });
    if (data.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No se encontraron grupos para esta materia",
      };
    }
    return { success: true, status: 200, data };
  });
};
