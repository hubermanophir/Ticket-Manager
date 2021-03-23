const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Ticket = require("../models/Ticket");

//Get all tickets
router.get("/", async (req, res) => {
  let ticketsArray;
  try {
    ticketsArray = await Ticket.find({});
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
  return res.status(200).json(ticketsArray);
});

module.exports = router;
