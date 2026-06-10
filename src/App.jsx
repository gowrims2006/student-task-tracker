import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Step 8: Load from Local Storage
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('studentTasks')
      return saved? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  
  // Bonus: Dark Mode - Load from storage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  // Step 9: Save tasks to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem('studentTasks', JSON.stringify(tasks))
  }, [tasks])

  // Bonus: Save theme + apply to body
  useEffect(() => {
    localStorage.setItem('theme', darkMode? 'dark' : 'light')
    document.body.className = darkMode? 'dark' : 'light'
  }, [darkMode])

  const addTask = () => {
    if(input.trim() === '') return
    setTasks([...tasks, { 
      id: Date.now(), 
      text: input.trim(), 
      completed: false 
    }])
    setInput('')
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

      <p style={{textAlign: 'center', marginTop: '20px'}}>
        Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}
      </p>
    </div>
  )
}

export default App
