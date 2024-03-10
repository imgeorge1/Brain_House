const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // and so on...
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
