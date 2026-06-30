const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      default: "",
    },

    productId: {
      type: String,
      default: "",
    },

    details: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Activity",
  activitySchema
);