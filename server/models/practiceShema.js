import mongoose from "mongoose";

const practiceSchema = new mongoose.Schema({
  city: { type: String, required: true },
  streets: [
    {
      street: { type: String, required: true },
      fullinfo: [
        {
          address: String,
          lecturer: String,
          phone: String,
        },
      ],
    },
  ],
});

// const Signs = mongoose.model("Signs", practiceSchema);
export default practiceSchema;
