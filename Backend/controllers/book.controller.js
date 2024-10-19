const Book = require("../models/book.model.js"); // Importing the Book model

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { bookName, author } = req.body;

    // Ensure both bookName and author are provided
    if (!bookName || !author) {
      return res.status(400).json({
        success: false,
        message: "Both bookName and author are required",
      });
    }

    // Create a new book instance
    const newBook = new Book({
      bookName,
      author,
    });

    // Save the new book to the database
    await newBook.save();

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update an existing book by ID
exports.updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { bookName, author } = req.body;

    // Find the book by ID and update it with new data
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { bookName, author },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    // Fetch all books from the database
    const books = await Book.find();

    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
