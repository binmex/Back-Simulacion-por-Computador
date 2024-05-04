// inscription-model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const InscriptionSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "group",
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Inscrito", "No inscrito", "Cancelado"],
    default: "No inscrito",
    required: true,
  },
});

module.exports = mongoose.model("inscription", InscriptionSchema);
