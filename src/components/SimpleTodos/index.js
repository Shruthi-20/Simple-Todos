import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

// Write your code here
class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList.map(item => ({
      ...item,
      isCompleted: false,
    })),
    inputValue: '',
    count: 1,
    tempTodos: [],
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  onAddTodo = () => {
    const {inputValue, count, tempTodos} = this.state
    const trimmedInput = inputValue.trim()
    const parsedCount = parseInt(count, 10)
    if (trimmedInput === '') return

    const newTodo = {
      id: uuidv4(),
      title: trimmedInput,
      isCompleted: false,
    }

    this.setState(
      prevState => ({
        tempTodos: [...prevState.tempTodos, newTodo],
        inputValue: '',
      }),
      () => {
        if (tempTodos.length === parsedCount) {
          this.setState(prevState => ({
            todosList: [...prevState.todosList, ...prevState.tempTodos],
            tempTodos: [],
            count: 1,
          }))
        }
      },
    )
  }

  onDeleteTodo = id => {
    const {todosList} = this.state
    const filteredTodos = todosList.filter(todo => todo.id !== id)
    this.setState({todosList: filteredTodos})
  }

  onEditTodo = (id, updatedTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: updatedTitle} : todo,
      ),
    }))
  }

  onToggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  onChangeCount = event => {
    this.setState({count: parseInt(event.target.value, 10)})
  }

  render() {
    const {todosList, inputValue, count, tempTodos} = this.state
    return (
      <div className="bg-page">
        <div className="card-container">
          <h1 className="card-heading">Simple Todos</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Add new task"
              className="input-text"
              value={inputValue}
              onChange={this.onChangeInput}
            />
            <input
              className="number-input"
              type="number"
              min="1"
              value={count}
              onChange={this.onChangeCount}
            />
            <button type="button" className="add-btn" onClick={this.onAddTodo}>
              Add
            </button>
          </div>
          {tempTodos.length > 0 && (
            <div className="temp-todos-container">
              <h2 className="temp-heading">Tasks to Add:</h2>
              <ul className="temp-todos-list">
                {tempTodos.map(todo => (
                  <li key={todo.id} className="temp-todo-item">
                    <p className="temp-todo-text">{todo.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ul className="todo-container">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                deleteTodo={this.onDeleteTodo}
                editTodo={this.onEditTodo}
                toggleComplete={this.onToggleComplete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
