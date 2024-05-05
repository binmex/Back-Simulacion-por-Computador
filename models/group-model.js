const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaGroup = new Schema({
  grupo: {
    type: String,
    enum: ["grupo1", "grupo2", "grupo3"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "topic",
    required: true,
  },
  quotas: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("group", SchemaGroup);
