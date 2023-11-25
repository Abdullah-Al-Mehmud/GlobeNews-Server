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
  authorName: {
    type: String,
    required: true,
  },
  authorEmail: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
});

// authorName: user?.displayName,
//           authorEmail: user?.email,
//           authorImage: user?.photoURL,

module.exports = articleSchema;
