const express = require("express");

const router = express.Router();

const {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controllers/authController");

// Registration OTP
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Register & Login
router.post("/register", registerUser);
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

module.exports = router;