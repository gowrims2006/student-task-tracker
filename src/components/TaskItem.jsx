function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div className={`task-item ${task.completed? 'done' : ''}`}>
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>❌</button>
    </div>
  )
}
export default TaskItem
