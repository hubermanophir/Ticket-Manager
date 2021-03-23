const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  userEmail: { type: String },
  done: { type: Boolean },
  creationTime: { type: Date },
  labels: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Ticket", TicketSchema);
