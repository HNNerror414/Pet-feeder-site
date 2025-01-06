const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  date: { type: String, required: true },
  intervals: { type: Number, required: true },
  repeat: { type: String, required: true },
  feedingTimes: { type: [String], required: true }
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
