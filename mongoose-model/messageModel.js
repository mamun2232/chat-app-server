const mongoose = require("mongoose");

const messageShema = mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },

  // user: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "User",
  // },
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Message = new mongoose.model("message", messageShema);

module.exports = Message;
