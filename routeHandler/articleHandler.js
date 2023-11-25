const express = require("express");
const router = express.Router();
const articleSchema = require("../schemas/articleSchemas");
const mongoose = require("mongoose");

const Article = new mongoose.model("Article", articleSchema);

// get api
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find({ status: "active" });
    res.status(201).send(articles);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = await Article.findById(req.params.id);
    res.status(201).send(id);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
