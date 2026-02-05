const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection (We will use an Environment Variable for the URL later!)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanager';

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Attempting to connect to DB at: ${mongoURI}`);
});