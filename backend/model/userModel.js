const mongoose = require('mongoose');
const Enums = require('../constant/enums');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: Object.values(Enums.ROLES), // Use Enums for role validation
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    trim: true,
  },
});

// Create User Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
