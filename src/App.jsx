import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const addTask = () => {
    if(input) {
      setTasks([...tasks, input])
      setInput('')
    }
  }

  return (
    <div style={{padding: '20px', maxWidth: '400px', margin: '0 auto'}}>
      <h1>📚 Student Task Tracker</h1>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
        style={{padding: '8px', width: '70%'}}
      />
      <button onClick={addTask} style={{padding: '8px'}}>Add</button>
      
      {tasks.map((task, i) => (
        <div key={i} style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc'}}>
          {task} 
          <button 
            onClick={() => setTasks(tasks.filter((_, index) => index !== i))}
            style={{marginLeft: '10px'}}
          >❌</button>
        </div>
      ))}
    </div>
  )
}

export default App
