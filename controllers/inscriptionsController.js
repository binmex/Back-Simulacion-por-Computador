const Inscription = require("../models/inscription-model");
const Group = require("../models/group-model");
const Topic = require("../models/topic-model");
const Student = require("../models/student-model");


exports.saveInscription = async (req, res) => {
  try {
    const { student, group, registrationDate, status } = req.body;
    let targetGroup = await Group.findById(group._id);
    if (!targetGroup) {
      return res.status(404).json({ success: false, error: "Grupo no encontrado" });
    }

    // Vrificar si el estudiante ya está inscrito en el grupo
    const existingInscription = await Inscription.findOne({ student: student._id, group: group._id });
    if (existingInscription) {
      return res.status(400).json({ success: false, error: "El estudiante ya está inscrito en este grupo" });
    }

    // el estudiante ya está inscrito en algun< otro grupo de la misma materia
    const topicGroups = await Group.find({ topic: targetGroup.topic }).populate('topic');

    for (const topicGroup of topicGroups) {
      const existingInscription = await Inscription.findOne({ student: student._id, group: topicGroup._id });
      if (existingInscription) {
        return res.status(400).json({ success: false, error: "El estudiante ya está inscrito en otro grupo de la misma materia" });
      }
    }

    // Verificar si hay cupos disponibles en el grupo     

    // Si no hay cupos buscar o crear un nuevo grupo
    if (targetGroup.quotas <= 0) {
      
      const alternativeGroups = await Group.find({ 
        _id: { $ne: group._id },
        name: targetGroup.name, 
        quotas: { $gt: 0 } 
      });

      // Si hay grupos alternativos disponibles
      if (alternativeGroups.length > 0) {
        targetGroup = alternativeGroups[0];
      } else {
        const lastGroup = await Group.findOne({ grupo: { $regex: /grupo\d+/ } }).sort({ grupo: -1 });

        let newGroupName = "grupo1";
        if (lastGroup) {
         
          const lastGroupNumber = parseInt(lastGroup.grupo.replace("grupo", ""));
          newGroupName = `grupo${lastGroupNumber + 1}`;
        }

        const topic = await Topic.findById(targetGroup.topic);
        if (!topic) {
          return res.status(404).json({ success: false, error: "Materia no encontrada" });
        }

        // Crear un nuevo grupo 
        const newGroup = new Group({
          grupo: newGroupName,
          name: targetGroup.name,
          topic: targetGroup.topic,
          quotas: topic.quotas, //  cuotas de la materia original
        });

        await newGroup.save();

        targetGroup = newGroup;
      }
    }
    // inscribir al estudiante 
    const newInscription = new Inscription({
      student: student._id,
      group: targetGroup._id,
      registrationDate,
      status,
    });

    await newInscription.save();
    targetGroup.quotas--; // quitar cupos
    await targetGroup.save();

    return res.status(201).json({ success: true, data: newInscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.findAllInscription = async (req, res) => {
  try {
    const inscriptions = await Inscription.find({})
      .populate("topic")
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
      .populate("topic")
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
    await Inscription.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Inscripción eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
