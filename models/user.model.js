let memorySchema = require("./memory.model").schema;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
    unique: true,
    trim: true,
  },
  memories: [memorySchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
