function TaskForm({ input, setInput, addTask }) {
  return (
    <div className="task-form">
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
        placeholder="Enter new task..."
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  )
}
export default TaskForm
