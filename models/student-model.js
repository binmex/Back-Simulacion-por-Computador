const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaStudent = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  Identification: {
    type: Number,
    required: true,
    unique: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  documentType: {
    type: String,
    enum: ["CC", "TI", "CE"],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: false,
  },
  cellphone: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    enum: ["matriculado", "no matriculado"],
    required: false,
  },
});

module.exports = mongoose.model("student", SchemaStudent);
