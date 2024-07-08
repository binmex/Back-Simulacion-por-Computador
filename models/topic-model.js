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
    enum: ["activo", "inactivo"],
    required: true,
  },
  quotas: {
    type: Number,
    required: true,
  },
  programs: [
    {
      type: Schema.Types.ObjectId,
      ref: "program",
    },
  ],
});

module.exports = mongoose.model("topic", SchemaTopic);
