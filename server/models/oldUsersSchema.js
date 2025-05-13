// import mongoose from "mongoose";

// const oldUserSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: {
//     type: String,
//     unique: true,
//     validate: {
//       validator: (value) => validator.isEmail(value),
//       message: "Invalid email format",
//     },
//   },
//   image: String,
//   provider: { type: String, required: true },
//   completed: { type: Number, default: 2 },
//   isPaid: { type: Boolean, default: false },
//   payDate: { type: String, default: null },
// });

// // ✅ Export a function to create model using old connection
// export default (connection) => connection.model("OldUser", oldUserSchema);
