const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memorySchema = new Schema({
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Memory = mongoose.model("Memory", memorySchema);

module.exports = Memory;
