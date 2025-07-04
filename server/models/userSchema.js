import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import findOrCreate from "mongoose-findorcreate";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
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
  password: String,
  image: String,
  age: Number,
  city: String,
  phone: String,
  completed: {
    type: Number,
    default: 2,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  payDate: {
    type: String,
    default: null,
  },
  purchased_locations: {
    type: [String],
    default: [],
  },
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(findOrCreate);

// const User = db1Connection.model("User", userSchema);

export default userSchema;
