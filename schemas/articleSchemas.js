const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  hashtags: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    // enum: ["active", "inactive"],
  },
});

module.exports = articleSchema;
