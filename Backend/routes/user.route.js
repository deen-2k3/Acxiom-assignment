const express = require("express");
const router = express.Router();
const { register, login, logout, updateUser, getUser } = require("../controllers/user.controller.js");

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

// Logout Route
router.post("/logout", logout);

// Update User Route (for admin use)
router.put("/update/:userId", updateUser);

// Get User Route (to retrieve user details by userId)
router.get("/user/:userId", getUser);

module.exports = router;
