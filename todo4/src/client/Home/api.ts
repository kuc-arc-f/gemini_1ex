// src/api/index.ts
import axios from 'axios';
import { NewTodo, Todo } from '../utils';

const API_URL = '/api/todos'; // バックエンドのURL

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTodo = async (todo: NewTodo): Promise<Todo> => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id: number, todo: NewTodo): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const searchTodos = async (query: string): Promise<Todo[]> => {
  const response = await axios.get(`${API_URL}/search/${query}`);
  return response.data;
};
