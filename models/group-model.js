const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaGroup = new Schema({
    name: {
      type: String,
      required: true,
    },
    grupo: {
        type: String,
        enum: ["grupo 60","grupo 61","grupo 62"],
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
