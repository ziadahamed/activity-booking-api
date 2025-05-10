const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const Activity = require('../models/Activity');
const {
  listActivities,
  bookActivity,
  getMyBookings
} = require('../controllers/activityController');


router.get('/activities', listActivities);


router.post('/book', auth, bookActivity);


router.get('/my-bookings', auth, getMyBookings);


router.post('/create-activity', async (req, res) => {
  try {
    const activity = new Activity({
      title: "Football Match",
      description: "Local league match",
      location: "Chennai Stadium",
      date: "2025-05-11",
      time: "6:00 PM"
    });
    await activity.save();
    res.json(activity);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create activity" });
  }
});

module.exports = router;
