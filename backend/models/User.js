const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { timestamps: true }); // Add timestamps for creation and update times

// Reminder schema
const reminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dateTimeString: { type: Date, required: true },
  repeatDays: { type: [String], default: [] }, // Default to an empty array
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
}, { timestamps: true }); // Add timestamps for creation and update times

// Indexes
reminderSchema.index({ user: 1 }); // Index on user field
reminderSchema.index({ dateTimeString: 1 }); // Index on dateTimeString field

// Models
const User = mongoose.model('User', userSchema);
const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = { User, Reminder };
