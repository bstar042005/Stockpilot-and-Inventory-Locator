const express = require("express");

const router = express.Router();

const {
  createActivity,
  getActivities,
} = require("../controllers/activityController");

// GET all activities
router.get("/", getActivities);

// CREATE activity
router.post("/", createActivity);

module.exports = router;