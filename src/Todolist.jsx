import { useState, useEffect } from 'react';
import './index.css';

const Todolist = ({ mode, toggleMode }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { text: input.trim(), id: Date.now(), completed: false }]);
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="todo-page">
      <div className={`todo-container ${mode === 'dark' ? 'dark-mode' : ''}`}>
        <div className={`form-check form-switch text-${mode === 'light' ? 'dark' : 'light'}`}>
          <input className="form-check-input" onClick={toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            {`Enable ${mode === 'light' ? "Dark Mode" : "Light Mode"}..`}
          </label>
        </div>
        <h1>Todo List</h1>
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new task..."
            className="todo-input"
          />
          <button type="submit" className="todo-button">Add</button>
        </form>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <span onClick={() => toggleComplete(todo.id)} className="todo-text">
                {todo.text}
              </span>
              <button onClick={() => removeTodo(todo.id)} className="delete-button">×</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
