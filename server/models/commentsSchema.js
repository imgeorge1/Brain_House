const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
