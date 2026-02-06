import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  // 1. Fetch tasks from backend when app loads
  useEffect(() => {
    // We will connect this to the real backend URL later!
    console.log("Frontend loaded. Ready to fetch tasks.");
  }, [])

  // 2. Handle adding a new task
  const addTask = () => {
    if (!newTask) return;
    const task = { _id: Date.now(), title: newTask, completed: false }; // Temporary fake ID
    setTasks([...tasks, task]);
    setNewTask('');
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1> DevOps Task Manager 🚀</h1>
      
      <div>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App