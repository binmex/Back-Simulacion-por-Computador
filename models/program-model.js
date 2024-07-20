const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProgramSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ["Pregrado", "Posgrado"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  snies_code: {
    type: String,
    required: true,
    unique: true,
  },
  faculty: {
    type: String, // Cambia esto si necesitas almacenar como string en lugar de ObjectId
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  modality: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("program", ProgramSchema);
