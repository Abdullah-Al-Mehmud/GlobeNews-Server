const express = require("express");
const router = express.Router();
const feedbackSchema = require("../schemas/feedbackSchema");
const mongoose = require("mongoose");

const Feedback = new mongoose.model("Feedback", feedbackSchema);

// getting data
router.get("/:id", async (req, res) => {
  try {
    const feedbackId = req.params.id;

    const feedback = await Feedback.findById(feedbackId);
    if (feedback) {
      res.status(200).send(feedback);
    } else {
      return res.status(400).send({ message: "feedback not found" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// post article api
router.post("/:id", async (req, res) => {
  try {
    // const hashtags = req.bo
    const feedbackData = req.body;
    const newFeedback = new Feedback({ _id: req.params.id, ...feedbackData });
    await newFeedback.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
