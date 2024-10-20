const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/todo");
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("not connected", err);
});
db.once("open", () => {
  console.log("connected");
});

app.use(bodyparser.json());

app.use(`/api`, require("./routes/todo"));

app.listen(9000, () => {
  console.log("server started");
});
