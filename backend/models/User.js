const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // NEW FIELD
    role: {
      type: String,
      enum: ["admin", "worker"],
      default: "worker",
    },

        otp: String,
        otpExpiry: Date,

    currentStreak: {
      type: Number,
      default: 1,
    },

    longestStreak: {
      type: Number,
      default: 1,
    },

    lastLoginDate: {
      type: Date,
      default: Date.now,
    },

    resetOtp: {
    type: String,
    default: null,
    },

    resetOtpExpiry: {
        type: Date,
        default: null,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);