import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoDialog from "./TodoDialog";
import { z } from "zod";
const API_URL = "/api/todos";

// Zod バリデーションスキーマ
const todoSchema = z.object({
  title: z.string().min(1, { message: "タイトルは必須です" }),
  content: z.string().min(1, { message: "内容は必須です" }),
  publicType: z.enum(["public", "private"]),
  foodOrange: z.boolean().optional(),
  foodApple: z.boolean().optional(),
  foodBanana: z.boolean().optional(),
  pubDate1: z.string().optional(),
  pubDate2: z.string().optional(),
  pubDate3: z.string().optional(),
  qty1: z.string().optional(),
  qty2: z.string().optional(),
  qty3: z.string().optional(),
});

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = () => {
    setCurrentTodo(null);
    setIsDialogOpen(true);
  };

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    setIsEditDialogOpen(true);
  };

  const handleDeleteTodo = (todo) => {
    setDeleteConfirmation(todo);
  };

  const confirmDeleteTodo = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteConfirmation.id}`);
      setTodos(todos.filter((todo) => todo.id !== deleteConfirmation.id));
      setDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditDialogOpen(false);
    setCurrentTodo(null);
  };

  const handleSaveTodo = async (todoData) => {
    try {
      // バリデーション
      todoSchema.parse(todoData);

      if (currentTodo) {
        // Update existing todo
        const response = await axios.put(
          `${API_URL}/${currentTodo.id}`,
          todoData
        );
        setTodos(
          todos.map((todo) =>
            todo.id === currentTodo.id ? response.data : todo
          )
        );
      } else {
        // Create new todo
        const response = await axios.post(API_URL, todoData);
        setTodos([...todos, response.data]);
      }
      handleCloseDialog();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Zod バリデーションエラー
        const errorMessages = error.errors.map((err) => err.message).join(", ");
        alert(`バリデーションエラー: ${errorMessages}`);
      } else {
        console.error("Error saving todo:", error);
      }
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`${API_URL}/search?query=${query}`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error searching todos:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO List</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-400 px-3 py-2 rounded-md w-full md:w-1/2"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleAddTodo}
      >
        Add Todo
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="border-b border-gray-300 py-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{todo.title}</h3>
                <p className="text-gray-600">{todo.content}</p>
              </div>
              <div>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleEditTodo(todo)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteTodo(todo)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isDialogOpen ? (
        <TodoDialog
        isOpen={isDialogOpen}
        isEdit={false}
        todo={currentTodo}
        onClose={handleCloseDialog}
        onSave={handleSaveTodo}
        />
      )
      : null}
      {isEditDialogOpen ? (
        <TodoDialog
        isOpen={isEditDialogOpen}
        isEdit={true}
        todo={currentTodo}
        onClose={handleCloseDialog}
        onSave={handleSaveTodo}
        />
      ) : null}

      {/* 削除確認ダイアログ */}
      {deleteConfirmation ? (
      <div
      open={!!deleteConfirmation}
      onClose={() => setDeleteConfirmation(null)}
      className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-30" />

          <div className="bg-white rounded-lg p-6 max-w-sm z-50">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold">
                Confirm Delete
              </h3>
            </div>
            <p>Are you sure you want to delete this todo?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => setDeleteConfirmation(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={confirmDeleteTodo}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      )
      : null}
      
    </div>
  );
};

export default TodoList;