const express = require("express");
const router = express.Router();
const articleSchema = require("../schemas/articleSchemas");
const mongoose = require("mongoose");

const Article = new mongoose.model("Article", articleSchema);

// get active articles api and can search articles
router.get("/", async (req, res) => {
  try {
    const search = req.query.search;
    const searchRegex = new RegExp(search, "i");

    let query = { status: "active" };
    if (req.query.authorEmail) {
      query = { authorEmail: req.query.authorEmail };
    }

    const articles = await Article.find({
      ...query,

      title: { $regex: searchRegex },
    });

    res.status(200).send(articles);
  } catch (e) {
    res.status(400).send(e);
  }
});

// get all article for admin
router.get("/admin/allArticles", async (req, res) => {
  try {
    const allArticles = await Article.find();
    res.status(200).send(allArticles);
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

// get trending articles
router.get("/trending", async (req, res) => {
  try {
    const trendingArticles = await Article.find()
      .sort({ viewCount: -1 })
      .limit(6);

    res.status(200).send(trendingArticles);
  } catch (e) {
    res.status(400).send(e);
  }
});

// post article api
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

// // update article api
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

// view count
router.patch("/viewCount/:id", async (req, res) => {
  try {
    const articleId = req.params.id;
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      {
        $inc: {
          viewCount: 1,
        },
      },
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({ success: true, viewCount: updatedArticle.viewCount });
  } catch (e) {
    res.status(400).send(e);
  }
});

// approve article
router.patch("/admin/:id", async (req, res) => {
  try {
    const result = await Article.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
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
  } catch (e) {
    res.status(400).send(e);
  }
});

// decline article
router.patch("/admin/decline/:id", async (req, res) => {
  try {
    const result = await Article.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "decline",
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
  } catch (e) {
    res.status(400).send(e);
  }
});

// make premium
router.patch("/admin/premium/:id", async (req, res) => {
  try {
    const result = await Article.updateOne(
      { _id: req.params.id },
      {
        $set: {
          subscription: "premium",
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
  } catch (e) {
    res.status(400).send(e);
  }
});

// user can delete
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

// admin article delete
router.delete("/admin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    result = await Article.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(201).send({ success: true });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
