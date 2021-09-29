const express = require("express");
const ticketsRouter = require("./tickets");
const router = express.Router();

router.use("/tickets", ticketsRouter);

module.exports = router;
