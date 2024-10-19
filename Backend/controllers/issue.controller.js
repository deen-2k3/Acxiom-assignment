const Issue = require("../models/issue.model.js"); // Adjust the path as needed
const Book = require("../models/book.model.js"); // Adjust the path as needed

// Create a new book issue
exports.issueBook = async (req, res) => {
  try {
    const { bookId, remarks } = req.body;

    // Validate required fields
    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required.",
      });
    }

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    // Check if the book is already issued
    if (book.available === "issued") {
      return res.status(400).json({
        success: false,
        message: "Book is already issued.",
      });
    }

    // Set the issue date to the current date and calculate return date
    const issueDate = new Date();
    const returnDate = new Date(issueDate);
    returnDate.setDate(returnDate.getDate() + 15); // Set return date to 15 days later

    // Create a new issue record
    const newIssue = new Issue({
      bookId,
      author: book.author,
      issueDate,
      returnDate,
      remarks: remarks || null,
    });

    // Save the issue to the database
    await newIssue.save();

    // Update the book's availability status to 'issued'
    book.available = "issued";
    await book.save();

    return res.status(201).json({
      success: true,
      message: "Book issued successfully.",
      issue: newIssue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

// Get all issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("bookId", "bookName author"); // Populate book details
    return res.status(200).json({
      success: true,
      issues,
      count: issues.length, // Include total count of issues
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const { issueId } = req.params;

    // Find the issue record
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue record not found.",
      });
    }

    // Find the corresponding book
    const book = await Book.findById(issue.bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    // Check if the book is already returned
    if (book.available === "not issued") {
      return res.status(400).json({
        success: false,
        message: "This book has already been returned.",
      });
    }

    // Calculate the number of days between the issue date and the current date
    const currentDate = new Date();
    const issueDate = new Date(issue.issueDate);
    const daysDifference = Math.floor(
      (currentDate - issueDate) / (1000 * 60 * 60 * 24)
    );

    // Determine if a fine applies
    const fineRate = 5; // Consider making this configurable
    const fine = daysDifference > 15 ? (daysDifference - 15) * fineRate : 0;

    // Update the book's availability status to 'not issued'
    book.available = "not issued";
    await book.save();
    await Issue.deleteOne({ _id: issueId });

    // Optionally, update the issue record with a return date
    issue.returnDate = currentDate;
    await issue.save();

    return res.status(200).json({
      success: true,
      message:
        daysDifference <= 15
          ? "Book returned successfully."
          : "Book returned successfully, but a fine applies.",
      book,
      fine,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
