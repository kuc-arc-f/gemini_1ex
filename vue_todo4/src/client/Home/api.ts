// src/api/index.js
import axios from 'axios';

//baseURL: 'http://localhost:3000/api', // バックエンドの URL
const api = axios.create({
  baseURL: '/api', // バックエンドの URL
});

export default {
  getTodos() {
    return api.get('/todos');
  },
  getTodo(id) {
    return api.get(`/todos/${id}`);
  },
  createTodo(todo) {
    return api.post('/todos', todo);
  },
  updateTodo(id, todo) {
    return api.put(`/todos/${id}`, todo);
  },
  deleteTodo(id) {
    return api.delete(`/todos/${id}`);
  },
  searchTodos(query) {
    return api.get(`/todos/search/${query}`);
  },
};
