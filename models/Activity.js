const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: String,
  time: String
});

module.exports = mongoose.model('Activity', activitySchema);
