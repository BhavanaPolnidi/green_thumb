const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User, Reminder } = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); 
const { JWT_SECRET } = require('../config');

const router = express.Router();

// Registration
router.post('/signup', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, name: user.name });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Access the user's id from req.user
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reminders
router.get('/reminders', authMiddleware, async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id }); // Access the user's id from req.user
    res.json(reminders);
  } catch (error) {
    console.error('Error fetching reminders:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add reminder
router.post('/reminders', authMiddleware, async (req, res) => {
  try {
    const { title, description, dateTimeString, repeatDays } = req.body;
    const newReminder = new Reminder({
      title,
      description,
      dateTimeString,
      repeatDays,
      user: req.user.id, // Access the user's id from req.user
    });
    const savedReminder = await newReminder.save();
    res.status(201).json(savedReminder);
  } catch (error) {
    console.error('Error saving reminder:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete reminder
router.delete('/reminders/:id', authMiddleware, async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // Access the user's id from req.user
    });

    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    res.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    console.error('Error deleting reminder:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
