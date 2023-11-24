const express = require("express");
const router = express.Router();
const articleSchema = require("../schemas/articleSchemas");
const mongoose = require("mongoose");

const Article = new mongoose.model("Article", articleSchema);

// get api
// router.get("/", async (req, res) => {});
router.post("/", async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
