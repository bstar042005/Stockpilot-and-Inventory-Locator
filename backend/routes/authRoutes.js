const express = require("express");

const router = express.Router();

const {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} = require("../controllers/authController");

// Registration OTP
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Register & Login
router.post("/register", registerUser);
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

module.exports = router;