const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaTopic = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  aula: {
    type: String,
    required: true,
    unique: false,
  },
  credits: {
    type: Number,
    required: true,
  },
  date_registration: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    enum: ['activo','inactivo'],
    required: true,
  },
  quotas: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("topic", SchemaTopic);
