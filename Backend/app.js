const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db.js");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();

  console.log(`server is running at ${PORT}`);
});
