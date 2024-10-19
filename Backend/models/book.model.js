const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true, // Corrected from 'require' to 'required'
  },
  author: {
    type: String,
    required: true, // Corrected from 'require' to 'required'
  },
  available: {
    type: String,
    enum: ["issued", "not issued"], // Changed to "not issued" for consistency
    default: "not issued", // Optional: Set default value
  },
});

module.exports = mongoose.model("Book", bookSchema);
