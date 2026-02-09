const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Database Connection (The Robust Fix)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanager';
console.log(`Attempting to connect to DB at: ${mongoURI}`);

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('✅ MongoDB Connected!'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// 2. The Task Schema (The Blueprint)
const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', TaskSchema);

// 3. The Routes (The Logic)
// GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Basic Root Route
app.get('/', (req, res) => {
  res.send('Backend is fully running with Tasks!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});