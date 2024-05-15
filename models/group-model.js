const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaGroup = new Schema({
  group: {
    type: String,
    enum: ["grupo1", "grupo2", "grupo3"],
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "topic",
    required: true,
  },
  quotas: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("group", SchemaGroup);
