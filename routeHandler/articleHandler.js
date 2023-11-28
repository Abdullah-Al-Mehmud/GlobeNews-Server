const express = require("express");
const router = express.Router();
const articleSchema = require("../schemas/articleSchemas");
const mongoose = require("mongoose");

const Article = new mongoose.model("Article", articleSchema);

// get api
router.get("/", async (req, res) => {
  try {
    const search = req.query.search;
    const searchRegex = new RegExp(search, "i");

    let query = { status: "active" };
    if (req.query.authorEmail) {
      query = { authorEmail: req.query.authorEmail };
    }

    if (req.query.tags) {
      query.hashtags = { $in: req.query.tags.split(",") };
    }

    // console.log(req.query.tags);
    // console.log(query);
    const articles = await Article.find({
      // hashtags: ,
      ...query,

      title: { $regex: searchRegex },
    });

    res.status(200).send(articles);
  } catch (e) {
    res.status(400).send(e);
  }
});

// get api by id
router.get("/:id", async (req, res) => {
  try {
    const id = await Article.findById(req.params.id);
    res.status(201).send(id);
  } catch (e) {
    res.status(400).send(e);
  }
});

// post api
router.post("/", async (req, res) => {
  try {
    console.log("54", req.body);
    // const hashtags = req.bo
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).send({ message: "added successfully ", success: true });
  } catch (e) {
    res.status(400).send(e);
  }
});

// // update api
router.put("/:id", async (req, res) => {
  try {
    const { title, publisher, hashtags, description, image } = req.body;
    console.log("61", req.body);

    const result = await Article.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title,
          publisher,
          hashtags,
          description,
          image,
        },
      }
    );
    if (result.modifiedCount === 1) {
      res.status(201).send({
        message: "updated successfully ",
        success: true,
        modifiedCount: result.modifiedCount,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Article.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(201).send({ success: true });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
