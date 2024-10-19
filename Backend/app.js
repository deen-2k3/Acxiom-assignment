const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/user.route.js"); // Import the auth routes
const bookRoutes = require("./routes/book.route.js");
const issueRoutes = require("./routes/issue.route.js"); // Ensure this is imported

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies to be sent and stored
  })
);
app.use(cookieParser());

app.use(express.json()); // This is crucial for parsing JSON in request bodies

app.use("/api/v1/auth", authRoutes); // All auth-related routes will have the "/api/v1/auth" prefix
app.use("/api/v1/book", bookRoutes); // Book routes
app.use("/api/v1/issue", issueRoutes); // Correctly set up issue routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server is running at ${PORT}`);
});
