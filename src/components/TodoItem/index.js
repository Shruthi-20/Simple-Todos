// Write your code here
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo} = props
  const {id, title} = todoDetails

  const onDelete = () => {
    deleteTodo(id)
  }

  return (
    <li className="card-item-container">
      <p className="todo-text">{title}</p>
      <button type="button" className="delete-btn" onClick={onDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
