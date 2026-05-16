const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  target: String,
  progress: { type: Number, default: 0 },
  unit: String,
  completed: { type: Boolean, default: false },
  color: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', HabitSchema);