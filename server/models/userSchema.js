const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const findOrCreate = require("mongoose-findorcreate");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: "Invalid email format",
    },
  },
  provider: {
    type: String,
    required: true,
  },
  completed: {
    type: Number,
    default: 2,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;
