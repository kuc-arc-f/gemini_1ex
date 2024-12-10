import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodoDialog from './AddTodoDialog';
import EditTodoDialog from './EditTodoDialog';
import SearchBar from './SearchBar';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get(`/api/todos/search?q=${query}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error searching todos:', error);
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      fetchTodos();
    }
  }, [searchQuery]);

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await axios.post('/api/todos', newTodo);
      setTodos([...todos, response.data]);
      setShowAddDialog(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleEditTodo = async (updatedTodo) => {
    try {
      const response = await axios.put(`/api/todos/${updatedTodo.id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? response.data : todo)));
      setShowEditDialog(false);
      setSelectedTodo(null);
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleOpenEditDialog = (todo) => {
    setSelectedTodo(todo);
    setShowEditDialog(true);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setShowAddDialog(true)}
      >
        TODO追加
      </button>

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={() => handleOpenEditDialog(todo)}
          onDelete={() => handleDeleteTodo(todo.id)}
        />
      ))}

      <AddTodoDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSubmit={handleAddTodo}
      />

      <EditTodoDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSubmit={handleEditTodo}
        todo={selectedTodo}
      />
    </div>
  );
};

export default TodoList;
