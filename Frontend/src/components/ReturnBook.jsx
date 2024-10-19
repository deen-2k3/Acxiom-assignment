import React, { useState, useEffect } from "react";
import axios from "axios";
// Uncomment the following line if you plan to use useNavigate for redirection
// import { useNavigate } from "react-router-dom"; 

const ReturnBook = () => {
  const [issuedBooks, setIssuedBooks] = useState([]); // List of issued books
  const [selectedBook, setSelectedBook] = useState(""); // ID of the selected book
  const [authorName, setAuthorName] = useState(""); // Non-editable
  const [issueDate, setIssueDate] = useState(""); // Auto-populated and non-editable
  const [returnDate, setReturnDate] = useState(""); // Editable
  const [fine, setFine] = useState(0); // Fine, if any
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  // Uncomment this line to enable navigation
  // const navigate = useNavigate(); 

  // Fetch issued books from the backend
  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/issue/issuegetall"
        );
        console.log("Fetched issued books:", response.data);

        if (response.data.success) {
          setIssuedBooks(response.data.issues || []); // Default to empty array if issues is undefined
        } else {
          throw new Error("Failed to fetch issues.");
        }
      } catch (error) {
        console.error("Error fetching issued books", error);
        setErrorMessage("Failed to load issued books.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchIssuedBooks();
  }, []);

  // Handle book selection and auto-populate fields
  const handleBookSelection = (e) => {
    const selectedBookId = e.target.value;
    const bookDetails = issuedBooks.find((book) => book._id === selectedBookId);
    if (bookDetails) {
      setSelectedBook(selectedBookId);
      setAuthorName(bookDetails.bookId.author); // Adjusted to match the populated structure
      setIssueDate(bookDetails.issueDate.split("T")[0]); // Adjust to 'yyyy-MM-dd' format
    } else {
      // Reset fields if no book is selected
      setSelectedBook("");
      setAuthorName("");
      setIssueDate("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBook || !returnDate) {
      setErrorMessage("Please fill all required fields.");
      return;
    }
    if (new Date(returnDate) < new Date(issueDate)) {
      setErrorMessage("Return date cannot be earlier than issue date.");
      return;
    }

    try {
      // Replace `:issueId` with the actual ID of the selected book
      const response = await axios.delete(
        `http://localhost:8000/api/v1/issue/returnbook/${selectedBook}`, // Updated URL
        { returnDate }
      );
      const { message, fine } = response.data;
      setSuccessMessage(message);
      setFine(fine || 0); // Set fine if applicable
      setErrorMessage(""); // Clear error message

      // Check if fine is greater than 0
      if (fine > 0) {
        // Redirect to Pay Fine page
        // Uncomment the following line when using useNavigate
        // navigate("/pay-fine");
      } else {
        setSuccessMessage("Book returned successfully! No fine to pay.");
      }

      // Reset form fields after successful submission
      setSelectedBook("");
      setAuthorName("");
      setIssueDate("");
      setReturnDate("");
    } catch (error) {
      console.error("Error returning book", error);
      setErrorMessage("Failed to return the book.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
        Return Book
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading issued books...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Book Name - Dropdown */}
          <div className="form-group">
            <label
              htmlFor="bookSelect"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Select Book:
            </label>
            <select
              id="bookSelect"
              value={selectedBook}
              onChange={handleBookSelection}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Issued Book --</option>
              {issuedBooks.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.bookId.bookName} {/* Corrected to bookName */}
                </option>
              ))}
            </select>
          </div>

          {/* Author Name */}
          <div className="form-group">
            <label
              htmlFor="authorName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Author Name:
            </label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              disabled
              readOnly
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
              placeholder="Author Name (Auto-populated)"
            />
          </div>

          {/* Issue Date */}
          <div className="form-group">
            <label
              htmlFor="issueDate"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Issue Date:
            </label>
            <input
              type="date"
              id="issueDate"
              value={issueDate}
              disabled
              readOnly
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>

          {/* Return Date */}
          <div className="form-group">
            <label
              htmlFor="returnDate"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Return Date:
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Error message */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* Success message */}
          {successMessage && (
            <p className="text-green-500 text-sm">
              {successMessage}{" "}
              {fine > 0 && `A fine of $${fine} has been applied.`}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Confirm and Return Book
          </button>
        </form>
      )}
    </div>
  );
};

export default ReturnBook;
