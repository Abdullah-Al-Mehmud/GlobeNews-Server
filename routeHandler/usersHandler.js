const express = require("express");
const router = express.Router();
const userSchema = require("../schemas/usersSchemas");
const mongoose = require("mongoose");

const User = new mongoose.model("User", userSchema);

// get user
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send(allUsers);
  } catch (e) {
    res.status(400).send(e);
  }
});

// making admin
router.get("/admin/:email", async (req, res) => {
  try {
    const useEmail = req.params.email;
    const query = { email: useEmail };

    const user = await User.findOne(query);
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
      res.status(200).send({ admin });
    } else {
      return res.status(400).send({ message: "admin not found" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// making premium
// getting data
router.get("/premium/:email", async (req, res) => {
  try {
    const useEmail = req.params.email;
    const query = { email: useEmail };

    const user = await User.findOne(query);
    let premium = false;
    if (user) {
      premium = user?.isPremium === "premium";
      res.status(200).send({ premium });
    } else {
      return res.status(400).send({ message: "premium not found" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// post user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(201)
      .send({ message: "User added successfully ", success: true });
  } catch (e) {
    res.status(400).send(e);
  }
});

// patch
router.patch("/:id", async (req, res) => {
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          role: "admin",
        },
      }
    );
    if (result.modifiedCount === 1) {
      res.status(200).send({
        message: "updated successfully ",
        success: true,
        modifiedCount: result.modifiedCount,
      });
    } else {
      res.status(400).send({
        message: "Document not found or not modified",
        success: false,
        modifiedCount: result.modifiedCount,
      });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(201).send({ success: true });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
