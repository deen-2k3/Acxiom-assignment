const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true, // Name of the book is required
  },
  author: {
    type: String,
    required: true,
    immutable: true, // Author should not be editable
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
    
    },
  remarks: {
    type: String,
    required: false // Remarks are optional
  }
});

module.exports = mongoose.model("Issue", issueSchema);
