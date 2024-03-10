const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdditionUserInfoSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
  phone: {
    type: Number,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

const AdditionUserInfo = mongoose.model(
  "AdditionUserInfo",
  AdditionUserInfoSchema
);

module.exports = AdditionUserInfo;
