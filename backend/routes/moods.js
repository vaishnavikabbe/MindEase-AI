const express = require('express');
const Mood = require('../models/Mood');

const router = express.Router();

// Save mood
router.post('/', async (req, res) => {
  try {
    const mood = new Mood(req.body);
    await mood.save();
    res.json(mood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get moods for user
router.get('/:userId', async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;