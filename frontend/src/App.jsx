import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // 1. The API URL (Points to your Local Port Forward)
  const API_URL = '/tasks';

  // 2. Fetch Tasks on Load (The missing piece!)
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      console.log('Fetched tasks:', data); // Check the Console for this!
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!newTask) return;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTask, completed: false }),
      });
      if (response.ok) {
        setNewTask('');
        fetchTasks(); // Refresh the list after adding
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="App">
      <h1>DevOps Task Manager 🚀</h1>
      
      <div className="input-group">
        <input 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a new task..." 
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;