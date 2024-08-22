// Import the required modules
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

require('dotenv').config();

// Create an instance of an Express app
const app = express();

// Define a custom Morgan format using colors for output
const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
const morganOptions = {
  stream: {
    write: (message) => {
      const status = parseInt(message.split(' ')[2], 10);
      let coloredMessage;

      if (status >= 500) coloredMessage = message.red;
      else if (status >= 400) coloredMessage = message.yellow;
      else if (status >= 300) coloredMessage = message.cyan;
      else if (status >= 200) coloredMessage = message.green;
      else coloredMessage = message.white;

      console.log(coloredMessage.trim());
    },
  },
};

// Use Morgan middleware with the custom format and options
app.use(morgan(morganFormat, morganOptions));

// Middleware to parse JSON
app.use(express.json());

//Connect Database
connectDB()

// Use routes
app.use('/api/users', require('./routes/userRoutes'));

// Define the port number to listen on
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`.blue));
