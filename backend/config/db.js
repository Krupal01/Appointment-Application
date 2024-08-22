// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...'.green);
  } catch (err) {
    console.error(err.message.red);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
