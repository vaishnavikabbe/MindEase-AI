const express = require('express');
const Habit = require('../models/Habit');

const router = express.Router();

// Get all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create habit
router.post('/', async (req, res) => {
  try {
    const habit = new Habit(req.body);
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update habit
router.put('/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete habit
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;