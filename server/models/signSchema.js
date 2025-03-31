import mongoose from "mongoose";

const signSchema = new mongoose.Schema({
  signID: Number,
  id: Number,
  image: String,
});

const Signs = mongoose.model("Signs", signSchema);
export default Signs;
