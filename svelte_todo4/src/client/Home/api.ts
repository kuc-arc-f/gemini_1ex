// src/lib/api.ts
import axios from 'axios';
import type { Todo, NewTodo } from '../db/schema';

const API_URL = '/api/todos';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(API_URL);
  return response.data;
};

export const searchTodos = async (query: string): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${API_URL}/search?q=${query}`);
  return response.data;
};

export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await axios.get<Todo>(`${API_URL}/${id}`);
  return response.data;
};

export const createTodo = async (todo: NewTodo): Promise<Todo> => {
  const response = await axios.post<Todo>(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id: number, todo: NewTodo): Promise<Todo> => {
  const response = await axios.put<Todo>(`${API_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
