// connectDB.js
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user.model");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");

    // Optionally check for admin user here
    const existingAdmin = await User.findOne({ userId: "admin" });
    if (!existingAdmin) {
      const adminUser = new User({
        userId: "admin",
        password: await bcrypt.hash("securePassword123", 10),
        isAdmin: true,
        membership: "1 Year",
      });

      await adminUser.save();
      console.log("Admin user created:", adminUser);
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = connectDB;
