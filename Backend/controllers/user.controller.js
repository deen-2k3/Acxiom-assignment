const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { userId, password, isAdmin } = req.body;

    // Ensure all fields are provided
    if (!userId || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    let user = await User.findOne({ userId });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      userId,
      password: hashedPassword,
      isAdmin,
    });

    // Save user to the database
    await user.save();

    // Omit password from response
    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error); // Log error details for debugging
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: "An error occurred during registration.", // Avoid exposing error details
    });
  }
};

exports.login = async (req, res) => {
  const { userId, password } = req.body;

  // Check if all fields are provided
  if (!userId || !password) {
    return res.status(403).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.userId, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send response with token
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .cookie("userId", user._id.toString(), {
        maxAge: 1 * 24 * 60 * 60 * 1000, // Same expiration time
        httpOnly: false, // Consider using httpOnly for security
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.userId}`, // Changed to userId for clarity
        user: {
          userId: user.userId,
          isAdmin: user.isAdmin,
          membership: user.membership, // You can send other fields as needed
        },
        success: true,
      });
  } catch (error) {
    console.error(error); // Log error details for debugging
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: "An error occurred during login.", // Avoid exposing error details
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 }) // Clear the token cookie
      .cookie("userId", "", { maxAge: 0 }) // Clear the userId cookie
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.error(error); // Log error details for debugging
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: "An error occurred during logout.", // Avoid exposing error details
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password, isAdmin, membership } = req.body;

    // Ensure at least one field is provided
    if (!password && !isAdmin && !membership) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required for update",
      });
    }

    // Update user fields
    const updateFields = {};
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10); // Hash the password if it's being updated
    }
    if (isAdmin !== undefined) {
      updateFields.isAdmin = isAdmin;
    }
    if (membership) {
      updateFields.membership = membership;
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Omit password from response
    updatedUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: "An error occurred during user update.",
    });
  }
};
  
exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Omit password from response
    user.password = undefined;

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: "An error occurred during user retrieval.",
    });
  }
};
