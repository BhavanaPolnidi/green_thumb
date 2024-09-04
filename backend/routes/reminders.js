const express = require('express');
const router = express.Router();
const { Reminder } = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch reminders for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Use req.user.id to find reminders
    const reminders = await Reminder.find({ user: req.user.id }).exec();
    res.json(reminders);
  } catch (err) {
    console.error('Error fetching reminders:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Add a new reminder
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, dateTimeString, repeatDays } = req.body;

  // Validate input
  if (!title || !dateTimeString) {
    return res.status(400).json({ msg: 'Title and Date/Time are required' });
  }

  const newReminder = new Reminder({
    user: req.user.id, // Use req.user.id to associate reminder with user
    title,
    description,
    dateTimeString,
    repeatDays,
  });

  try {
    const reminder = await newReminder.save();
    res.json(reminder);
  } catch (err) {
    console.error('Error adding reminder:', err);
    res.status(500).json({ msg: 'Error adding the reminder!' });
  }
});

// Delete a reminder
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // Use req.user.id to ensure reminder belongs to user
    });

    if (!result) {
      return res.status(404).json({ msg: 'Reminder not found' });
    }

    res.json({ message: 'Reminder deleted successfully' });
  } catch (err) {
    console.error('Error deleting reminder:', err);
    res.status(500).json({ msg: 'Error deleting the reminder!' });
  }
});

module.exports = router;
