import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved? JSON.parse(saved) : []
  })
  
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  
  // BONUS: Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  // Auto save tasks
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Auto save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    document.body.className = darkMode? 'dark' : 'light'
  }, [darkMode])

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

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id!== id))
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id? {...task, completed:!task.completed } : task
    ))
  }

  const filteredTasks = tasks.filter(task => {
    if(filter === 'completed') return task.completed
    if(filter === 'pending') return!task.completed
    return true
  })

  return (
    <div className={`app ${darkMode? 'dark' : 'light'}`}>
      <div className="header">
        <h1>📚 Student Task Tracker</h1>
        {/* BONUS: Dark Mode Toggle */}
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      
      <div className="task-form">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

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

      <div className="task-list">
        {filteredTasks.length === 0? (
          <p className="empty">No tasks found</p>
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
