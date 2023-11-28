const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

module.exports = feedbackSchema;
