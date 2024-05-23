const Inscription = require("../models/inscription-model");
const Group = require("../models/group-model");
const Topic = require("../models/topic-model");

exports.saveInscription = async (req, res) => {
  try {
    const { student, group: groupId, registrationDate, status } = req.body;

    // Verificar si hay cupos disponibles en el grupo original
    const originalGroup = await Group.findById(groupId);
    if (!originalGroup) {
      return res
        .status(404)
        .json({ success: false, error: "Grupo no encontrado" });
    }

    if (originalGroup.quotas > 0) {
      // Si hay cupos disponibles en el grupo original, inscribir al estudiante en ese grupo
      const newInscription = new Inscription({
        student: student._id,
        group: groupId,
        registrationDate,
        status,
      });

      await newInscription.save();
      originalGroup.quotas--; // Decrementar los cupos disponibles en el grupo original
      await originalGroup.save();

      return res.status(201).json({ success: true, data: newInscription });
    } else {
      // Buscar el siguiente grupo disponible especificamente para la materia del grupo original
      const originalTopic = await Topic.findById(originalGroup.topic);
      if (!originalTopic) {
        return res
          .status(404)
          .json({ success: false, error: "materia no encontrada" });
      }

      const availableGroups = await Group.find({
        topic: originalTopic._id,
        quotas: { $gt: 0 },
      }).sort({ grupo: 1 });

      let targetGroup;
      if (availableGroups.length > 0) {
        targetGroup = availableGroups[0];
      } else {
        // Crear un nuevo grupo para la materia
        const lastGroup = await Group.findOne({
          topic: originalTopic._id,
        }).sort({ grupo: -1 });

        let newGroupName = "grupo 60";
        if (lastGroup) {
          const lastGroupNumber = parseInt(
            lastGroup.grupo.replace("grupo ", "")
          );
          newGroupName = `grupo ${lastGroupNumber + 1}`;
        }

        const newGroup = new Group({
          grupo: newGroupName,
          name: originalGroup.name,
          topic: originalTopic._id,
          quotas: originalTopic.quotas,
        });

        await newGroup.save();
        targetGroup = newGroup;
      }

      // Inscribir al estudiante en el grupo alternativo
      const newInscription = new Inscription({
        student: student._id,
        group: targetGroup._id,
        registrationDate,
        status: "Inscrito",
      });

      await newInscription.save();
      targetGroup.quotas--; // Decrementar los cupos disponibles en el grupo alternativo
      await targetGroup.save();

      return res.status(201).json({ success: true, data: newInscription });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.findAllInscription = async (req, res) => {
  try {
    const inscriptions = await Inscription.find({})
      .populate("group")
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
      .populate("group")
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
    const inscription = await Inscription.findById(id);
    if (!inscription) {
      return res
        .status(404)
        .json({ success: false, error: "Inscripción no encontrada" });
    }

    await Inscription.findByIdAndDelete(id);

    const group = await Group.findById(inscription.group);
    if (!group) {
      return res
        .status(404)
        .json({ success: false, error: "Grupo no encontrado" });
    }

    group.quotas++;
    await group.save();

    res
      .status(200)
      .json({ success: true, message: "Inscripción eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.findStudentsByTopic = async (req, res) => {
  const { topicId } = req.params;
  try {
    const groups = await Group.find({ topic: topicId }).select('_id');
    const groupIds = groups.map(group => group._id);
    const inscriptions = await Inscription.find({ 
      group: { $in: groupIds },
      status: "Inscrito" // Filtrar por estado "Inscrito"
    })
      .populate('student');
    const students = inscriptions.map(inscription => inscription.student);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};


const mongoose = require('mongoose');

exports.findStudentsByTopicAndGroup = async (req, res) => {
  const { topicId, groupId } = req.params;
  // Validar si groupId es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ success: false, error: "El ID del grupo no es válido" });
  }

  try {
    const group = await Group.findOne({ _id: groupId, topic: topicId });
    if (!group) {
      return res.status(404).json({ success: false, error: "Grupo no encontrado para la materia especificada" });
    }

    const inscriptions = await Inscription.find({ 
      group: groupId,
      status: "Inscrito" // Filtrar por estado "Inscrito"
    })
      .populate('student');
    const students = inscriptions.map(inscription => inscription.student);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

