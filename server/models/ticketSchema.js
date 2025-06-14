import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  id: Number,
  categoryID: Number,
  image: String,
  correctAnswer: Number,
  quantityAnswer: Number,
  sort_id: {
    type: Number,
    default: null,
  },
});

// const Ticket = mongoose.model("Ticket", ticketSchema);

export default ticketSchema;
