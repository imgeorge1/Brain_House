const mongoose = require("mongoose");

const signSchema = new mongoose.Schema({
  signID: Number,
  id: Number,
  image: String,
});

const Signs = mongoose.model("Signs", signSchema);

module.exports = Signs;
