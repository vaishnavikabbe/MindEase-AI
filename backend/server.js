const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mindease')
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Habit Schema
const habitSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  target: String,
  progress: Number,
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

// Mood Schema
const moodSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mood: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Habit = mongoose.model('Habit', habitSchema);
const Mood = mongoose.model('Mood', moodSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'MindEase API is running! 🧠' });
});

// Get all habits
app.get('/api/habits', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create habit
app.post('/api/habits', async (req, res) => {
  try {
    const habit = new Habit(req.body);
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update habit
app.put('/api/habits/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete habit
app.delete('/api/habits/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save mood
app.post('/api/moods', async (req, res) => {
  try {
    const mood = new Mood(req.body);
    await mood.save();
    res.json(mood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get moods
app.get('/api/moods/:userId', async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.params.userId });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});