import React, { useState, useEffect } from 'react';
import { getTodos, deleteTodo } from './api';
import TodoDialog from './TodoDialog';
import { Todo } from './utils';
//import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const refreshTodos = async () => {
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('本当に削除しますか?')) {
      await deleteTodo(id);
      await refreshTodos();
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTodo(null);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsDialogOpen(true)}
      >
        TODOを追加
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold mb-2">{todo.title}</h2>
            <p className="text-gray-700 mb-4">{todo.content}</p>
            <div className="flex justify-end">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => handleEdit(todo)}
              >
                {/*
                <PencilIcon className="h-5 w-5" />
                */}
                Ediit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(todo.id)}
              >
                Delete 
                {/*
                <TrashIcon className="h-5 w-5" />
                */}
              </button>
            </div>
          </div>
        ))}
      </div>

      {isDialogOpen ? (
        <TodoDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        todo={selectedTodo}
        refreshTodos={refreshTodos}
      />
      ): null}
    </div>
  );
};

export default TodoList;
