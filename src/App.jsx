import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studentTasks')
    return saved? JSON.parse(saved) : []
  })
  
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    localStorage.setItem('studentTasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('theme', darkMode? 'dark' : 'light')
    document.body.className = darkMode? 'dark' : 'light'
  }, [darkMode])

  const addTask = () => {
    if(input.trim() === '') return
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }])
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
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode? '🌙 Dark' : '☀️ light'}
        </button>
      </div>
      
      <TaskForm input={input} setInput={setInput} addTask={addTask} />

      <div className="filters">
        <button className={filter === 'all'? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'pending'? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
        <button className={filter === 'completed'? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />

      <p className="stats">Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}</p>
    </div>
  )
}
export default App
