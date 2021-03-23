const express = require("express");
const app = express();
const api = require("./routes");
const cors = require("cors");

app.use(express.static("client/build"));
app.use(cors());
app.use("/api", api);

module.exports = app;
