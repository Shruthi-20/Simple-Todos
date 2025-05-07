// Write your code here
import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo, editTodo, toggleComplete} = props
  const {id, title, isCompleted} = todoDetails

  const [isEdit, setIsEdit] = useState(false)
  const [newTodoTitle, setNewTitle] = useState(title)

  const onDelete = () => {
    deleteTodo(id)
  }

  const onClickCheckbox = () => {
    toggleComplete(id)
  }

  const onSave = () => {
    if (newTodoTitle.trim() !== '') {
      editTodo(id, newTodoTitle)
      setIsEdit(false)
    }
  }

  const onEditClick = () => {
    setIsEdit(true)
  }

  return (
    <li className="card-item-container" key={id}>
      <div className="title-container">
        <input
          type="checkbox"
          size={25}
          onChange={onClickCheckbox}
          className="checkbox-container"
        />
        {isEdit ? (
          <input
            type="text"
            className="edit-input"
            value={newTodoTitle}
            onChange={event => setNewTitle(event.target.value)}
          />
        ) : (
          <p className={`todo-text ${isCompleted ? 'completed' : ''}`}>
            {title}
          </p>
        )}
      </div>
      <div className="buttons-container">
        <button
          type="button"
          className="edit-save-btn"
          onClick={isEdit ? onSave : onEditClick}
        >
          {isEdit ? 'Save' : 'Edit'}
        </button>
        <button type="button" className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
