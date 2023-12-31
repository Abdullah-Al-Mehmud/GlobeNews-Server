const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const articleHandler = require("./routeHandler/articleHandler");
const feedbackHandler = require("./routeHandler/feedbackHandler");
const usersHandler = require("./routeHandler/usersHandler");
const publisherHandler = require("./routeHandler/publisherHandler");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// database connection  with mongoose
mongoose
  .connect(process.env.URI)
  .then(() => console.log("connected successful"))
  .catch((err) => console.log(err));

// application routes
// articles routes
app.use("/articles", articleHandler);
app.use("/feedback", feedbackHandler);
app.use("/users", usersHandler);
app.use("/publishers", publisherHandler);
// app.use("/users")

app.use("/", (req, res) => {
  res.send("Globe News server");
});

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(port);
