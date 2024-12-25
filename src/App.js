import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editTodo, deleteTodo } from './store/todoSlice';
import './App.css';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (!input || /[^a-zA-Z0-9 ]/.test(input)) {
      alert('Invalid input: No special characters allowed.');
      return;
    }
    if (editingId !== null) {
      dispatch(editTodo({ id: editingId, newText: input }));
      setEditingId(null);
    } else {
      dispatch(addTodo({ id: Date.now(), text: input }));
    }
    setInput('');
  };

  const handleEditTodo = (id, text) => {
    setEditingId(id);
    setInput(text);
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Todo App</h1>
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter your todo"
          />
          <button
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition duration-200"
            onClick={handleAddTodo}
          >
            {editingId !== null ? 'Edit Todo' : 'Add Todo'}
          </button>
        </div>
        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition duration-200"
            >
              <span className="text-lg font-medium text-gray-800">{todo.text}</span>
              <div>
                <button
                  className="text-blue-500 mr-3 hover:text-blue-700 transition duration-200"
                  onClick={() => handleEditTodo(todo.id, todo.text)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition duration-200"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
