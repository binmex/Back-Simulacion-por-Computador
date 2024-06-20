const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProgramSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
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
    type: Schema.Types.ObjectId,
    ref: "faculty",
    required: true,
  },
  location: {
    type: String,
    enum: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Aguazul"],
    required: true,
  },
  modality: {
    type: String,
    enum: ["Virtual", "Distancia", "Presencial"],
    required: true,
  },
  date_registration: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("program", ProgramSchema);
