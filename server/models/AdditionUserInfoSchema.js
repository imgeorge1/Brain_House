import mongoose from "mongoose";

const AdditionUserInfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
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

// const AdditionUserInfo = mongoose.model(
//   "AdditionUserInfo",
//   AdditionUserInfoSchema
// );

export default AdditionUserInfoSchema;
