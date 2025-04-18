const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  type: String,
  price: Number,
  quantity: Number,
  description: String,
});

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  startTime: String,
  startPeriod: String,
  endTime: String,
  endPeriod: String,
  venueName: String,
  venueAddress: String,
  image: String, 
  description: String,
  tickets: [ticketSchema],
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
