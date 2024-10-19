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

    // Set the issue date to the current date
    const issueDate = new Date();
    const returnDate = new Date(issueDate);
    returnDate.setDate(returnDate.getDate() + 15); // Set return date to 15 days later

    // Create a new issue record
    const newIssue = new Issue({
      bookId, // Use bookId
      author: book.author, // Populate author from the book document
      issueDate,
      returnDate,
      remarks: remarks || null, // If remarks are not provided, set to null
    });

    // Save the issue to the database
    await newIssue.save();

    // Update the book's availability status to 'issued'
    book.available = "issued"; // Corrected line to update book availability
    await book.save(); // Save the updated book document

    return res.status(201).json({
      success: true,
      message: "Book issued successfully.",
      issue: newIssue,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
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
    });
  } catch (error) {
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
  
      // Calculate the number of days between the issue date and the current date
      const currentDate = new Date();
      const issueDate = new Date(issue.issueDate); // Convert issue date to Date object
      const timeDifference = currentDate - issueDate; // Difference in milliseconds
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  
      // Determine if a fine applies
      let fine = 0;
      if (daysDifference > 15) {
        fine = (daysDifference - 15) * 5; // Example fine rate of $5 per day
      }
  
      // Check if the book is being returned early
      if (daysDifference <= 15) {
        // Update the book's availability status to 'not issued'
        book.available = "not issued";
        await book.save();
  
        // Delete the issue record
        await Issue.findByIdAndDelete(issueId); // Delete issue record or change it to a returned state
  
        return res.status(200).json({
          success: true,
          message: "Book returned successfully.",
          book,
          fine: 0, // No fine for early or on-time returns
        });
      } else {
        // If returned late, you may want to handle the fine differently
        return res.status(200).json({
          success: true,
          message: "Book returned successfully, but a fine applies.",
          book,
          fine: fine, // Provide the calculated fine amount
        });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        success: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };
  