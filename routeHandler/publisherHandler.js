const express = require("express");
const router = express.Router();
const publisherSchema = require("../schemas/publisherSchemas");
const mongoose = require("mongoose");

const Publisher = new mongoose.model("Publisher", publisherSchema);

// get
router.get("/", async (req, res) => {
  try {
    const allPublishers = await Publisher.find();
    res.status(200).send(allPublishers);
  } catch (e) {
    res.status(400).send(e);
  }
});

// post
router.post("/", async (req, res) => {
  try {
    const newPublisher = new Publisher(req.body);
    await newPublisher.save();
    res
      .status(201)
      .send({ message: "User added successfully ", success: true });
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
