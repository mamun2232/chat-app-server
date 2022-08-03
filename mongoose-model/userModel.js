const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  room: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  avater: {
    type: String,
  },
});

const User = new mongoose.model("User", userShema);

module.exports = User;
