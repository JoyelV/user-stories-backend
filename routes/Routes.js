const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); 
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to get events", error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      date,
      startTime,
      startPeriod,
      endTime,
      endPeriod,
      venueName,
      venueAddress,
      description,
      image,
      tickets,
    } = req.body;
   
    const newEvent = new Event({
      title,
      date,
      startTime,
      startPeriod,
      endTime,
      endPeriod,
      venueName,
      venueAddress,
      description,
      image,
      tickets: JSON.parse(tickets), 
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/:eventId', async (req, res) => {
const { eventId } = req.params; 
if (!eventId || eventId === 'undefined') {
  return res.status(400).json({ error: 'Event ID is missing or invalid' });
}

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
});


module.exports = router;
