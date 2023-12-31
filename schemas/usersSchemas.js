const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  isPremium: {
    type: String,
  },
  premiumTaken: {
    type: Date,
  },
});

module.exports = usersSchema;
