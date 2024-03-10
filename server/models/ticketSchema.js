const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  id: Number,
  categoryID: Number,
  image: String,
  correctAnswer: Number,
  quantityAnswer: Number,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
