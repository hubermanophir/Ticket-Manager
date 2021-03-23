const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Ticket = require("../models/Ticket");

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

//returns array of tickets that their title includes the user's string
const stringInTicket = (ticketArray, userString) => {
  const newArray = [];
  ticketArray.forEach((ticket) => {
    if (ticket.title.includes(userString)) {
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
