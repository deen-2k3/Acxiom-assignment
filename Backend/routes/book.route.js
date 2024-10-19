const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Route to add a book
router.post('/add', bookController.addBook);

// Route to update a book by its ID
router.put('/update/:bookId', bookController.updateBook);
router.get('/getbooks', bookController.getAllBooks); // Add this route for getting all books


module.exports = router;
