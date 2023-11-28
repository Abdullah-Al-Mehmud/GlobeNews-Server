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

module.exports = router;
