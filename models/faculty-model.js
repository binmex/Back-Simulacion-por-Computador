const mongoose = require("mongoose");
const { Schema } = mongoose;

const FacultySchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ubication: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  date_registration: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  headquarter: {
    type: String,
    enum: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Aguazul"],
    required: true,
  },
});

module.exports = mongoose.model("faculty", FacultySchema);
