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
    return res.status(500).json({ Error: error.massage });
  }
  return res.status(200).json(ticketsArray);
});

//Mark between done and undone
router.patch("/:ticketId/:isDone", async (req, res) => {
  const { ticketId, isDone } = req.params;
  if (isDone !== "done" && isDone !== "undone") {
    return res.status(400).json({ Error: "Must be done or undone" });
  }
  try {
    await Ticket.findById(ticketId);
  } catch (error) {
    return res.status(404).json({ Error: "Ticket not found" });
  }
  await Ticket.findByIdAndUpdate(
    ticketId,
    { done: isDone === "done" ? true : false },
    { new: true },
    (err) => {
      if (err) {
        return res.status(500).json({ Error: err.massage });
      }
    }
  );
  return res.status(200).json({ updated: true });
});

//Post a new ticket route
router.post("/", async (req, res) => {
  const { body } = req;
  const nowDate = new Date();
  nowDate.setHours(nowDate.getHours() + 2);
  const ticket = new Ticket({
    title: body.title,
    content: body.content,
    userEmail: body.userEmail,
    done: body.done,
    creationTime: nowDate,
    labels: body.labels,
  });
  try {
    await ticket.save();
  } catch (error) {
    return res.status(500).json({ Error: error.massage });
  }
  return res.status(200).json({ Message: "Ticket added" });
});

//Delete ticket by id
router.delete("/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  try {
    await Ticket.findById(ticketId);
  } catch (error) {
    return res.status(404).json({ Error: "Ticket not found" });
  }
  try {
    await Ticket.findOneAndDelete({ _id: ticketId });
  } catch (error) {
    return res.status(500).json({ Error: error.massage });
  }
  return res.status(200).json({ message: "Ticket deleted successfully" });
});

module.exports = router;
