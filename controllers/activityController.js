const Activity = require('../models/Activity');
const Booking = require('../models/Booking');


exports.listActivities = async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
};


exports.bookActivity = async (req, res) => {
  const userId = req.user.userId; // from JWT
  const { activityId } = req.body;

  try {
    const booking = new Booking({ user: userId, activity: activityId });
    await booking.save();
    res.json({ msg: 'Activity booked successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Booking failed' });
  }
};


exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({ user: userId }).populate('activity');
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to get bookings" });
  }
};
