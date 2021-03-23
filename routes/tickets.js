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

  try {
    ticketsArray = await Ticket.find({});
  } catch (error) {
    return res.status(500).json({ Error: error });
  }

  if (query.searchText) {
    ticketsArray = stringInTicket(ticketsArray, query.searchText);
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

//-----------------------------------functions-------------------------------------------------

//returns array of tickets that their title includes the user's string
const stringInTicket = (ticketArray, userString) => {
  const lowerCaseUserString = userString.toLowerCase();
  const newArray = [];
  ticketArray.forEach((ticket) => {
    const lowerCaseTitle = ticket.title.toLowerCase();
    if (lowerCaseTitle.includes(lowerCaseUserString)) {
      newArray.push(ticket);
    }
  });
  return getUnique(newArray, "_id");
};

//returns an array without duplicates
const getUnique = (arr, comp) => {
  const unique = arr
    .map((e) => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => arr[e])
    .map((e) => arr[e]);

  return unique;
};

module.exports = router;
