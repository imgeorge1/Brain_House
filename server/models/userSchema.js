import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import findOrCreate from "mongoose-findorcreate";
import validator from "validator";

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
  image: String,
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
  payDate: {
    type: Date,
    default: null,
  },
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

export default User;
