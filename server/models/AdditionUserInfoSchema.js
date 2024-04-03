const mongoose = require("mongoose");

const AdditionUserInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
  phone: {
    type: Number,
  },
});

const AdditionUserInfo = mongoose.model(
  "AdditionUserInfo",
  AdditionUserInfoSchema
);

module.exports = AdditionUserInfo;
