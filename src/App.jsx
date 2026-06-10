import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Step 8 & 9: Local Storage + useEffect
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved? JSON.parse(saved) : []
  })
  
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all') // all, pending, completed

  // Auto save to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Step 6: App Logic - addTask
  const addTask = () => {
    if(input.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: input, 
        completed: false 
      }])
      setInput('')
    }
  }

  // Step 6: deleteTask
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id!== id))
  }

  // Step 6: toggleTask - Complete feature
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id? {...task, completed:!task.completed } : task
    ))
  }

  // Step 7: Filtering logic
  const filteredTasks = tasks.filter(task => {
    if(filter === 'completed') return task.completed
    if(filter === 'pending') return!task.completed
    return true // all
  })

  return (
    <div className="app">
      <h1>📚 Student Task Tracker</h1>
      
      {/* TaskForm Logic */}
      <div className="task-form">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Step 7: Filter Buttons */}
      <div className="filters">
        <button 
          className={filter === 'all'? 'active' : ''}
          onClick={() => setFilter('all')}
        >All</button>
        <button 
          className={filter === 'pending'? 'active' : ''}
          onClick={() => setFilter('pending')}
        >Pending</button>
        <button 
          className={filter === 'completed'? 'active' : ''}
          onClick={() => setFilter('completed')}
        >Completed</button>
      </div>

      {/* TaskList Logic */}
      <div className="task-list">
        {filteredTasks.length === 0? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed? 'done' : ''}`}>
              <input 
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </div>
          ))
        )}
      </div>

      <p className="stats">
        Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}
      </p>
    </div>
  )
}

export default App
