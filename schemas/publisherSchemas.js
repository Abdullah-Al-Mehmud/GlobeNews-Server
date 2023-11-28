const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = publisherSchema;
