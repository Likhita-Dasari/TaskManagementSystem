const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Registering  New User

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).send({ message: "Username and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "Username already exists" });
    }

    // Count total users to determine the role 
    const userCount = await User.countDocuments();
    const assignedRole = userCount === 0 ? "admin" : "user";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: assignedRole,
    });

    return res.status(201).send({
      message: `User registered successfully as ${assignedRole}`,
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "Server error", error: error.message });
  }
};

// Login User

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check inputs
    if (!username || !password) {
      return res.status(400).send({ message: "Username and password are required" });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: "Invalid credentials" });

    // Create Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.send({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "Server error", error: error.message });
  }
};


// Get Logged-in User

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (error) {
    return res.status(500).send({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
