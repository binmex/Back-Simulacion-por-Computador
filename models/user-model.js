const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaUser = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    required: true,
  },
});

module.exports = mongoose.model("user", SchemaUser);
