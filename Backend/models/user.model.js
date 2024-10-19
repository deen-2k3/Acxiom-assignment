const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  membership: {
    type: String,
    default: "6 months", // Change here: use quotes for string
    enum: ["6 months", "1 Year", "2 Years"], // Use quotes and fix the plural
  },
});

module.exports = mongoose.model("User", userSchema);
