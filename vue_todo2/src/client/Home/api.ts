import axios from 'axios';
import { Todo } from './types';

//const API_URL = 'http://localhost:3000/api/todos';
const API_URL = '/api/todos';

export const getTodos = async (query?: string) => {
  const url = query ? `${API_URL}?q=${query}` : API_URL;
  const response = await axios.get<Todo[]>(url);
  return response.data;
};

export const getTodo = async (id: number) => {
  const response = await axios.get<Todo>(`${API_URL}/${id}`);
  return response.data;
};

export const createTodo = async (todo: Todo) => {
  const response = await axios.post<Todo>(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id: number, todo: Todo) => {
  const response = await axios.put<Todo>(`${API_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

