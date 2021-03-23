const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const Ticket = require("../models/Ticket");

//------------------------------------routes---------------------------------------------------

//Get all tickets
router.get("/", async (req, res) => {
  let ticketsArray;
  const { query } = req;
  if (query.searchText) {
    ticketsArray = await Ticket.find({
      title: { $regex: query.searchText, $options: "i" },
    });
    return res.status(200).json(ticketsArray);
  }
  try {
    ticketsArray = await Ticket.find({});
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
  return res.status(200).json(ticketsArray);
});

router.patch("/:ticketId/:isDone", async (req, res) => {
  const { ticketId, isDone } = req.params;
  try {
    await Ticket.findById(ticketId);
  } catch (error) {
    return res.status(404).json({ error: "Ticket not found" });
  }
  await Ticket.findByIdAndUpdate(
    ticketId,
    { done: isDone === "done" ? true : false },
    { new: true },
    (err) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
    }
  );
  return res.status(200).json({ updated: true });
});

module.exports = router;
