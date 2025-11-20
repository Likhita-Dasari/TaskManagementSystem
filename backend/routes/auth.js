const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const {protect} = require("../middleware/auth");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get logged-in with user's details
router.get("/me", protect, getProfile);

module.exports = router;
