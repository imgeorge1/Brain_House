import mongoose from "mongoose";

const practiceSchema = new mongoose.Schema({
  city: { type: String, required: true },
  image: { type: String, default: "" },
  streets: [
    {
      street: { type: String, required: true },
      fullinfo: [
        {
          address: String,
          lecturer: String,
          phone: String,
          price: { type: Number, default: 0 },
          saleprice: { type: Number, default: 0 },
        },
      ],
    },
  ],
});

export default practiceSchema;
